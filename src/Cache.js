/* @flow */

import EventEmitter from 'events'
import Value from './Value'
import { promiseTimeout, PromiseTimeoutError } from './util'

export default class Cache<K, V> extends EventEmitter {
  stores: Array<Store<K, V>>;
  options: CacheOptions;

  constructor(stores: Array<Store<K, V>>, options: CacheOptions = {}) {
    super()

    if (!Array.isArray(stores) || !stores.length) {
      throw new TypeError('`stores` must be an Array with at least one Store')
    }

    this.stores = stores
    this.options = options

    // register store error handlers
    this.stores.forEach((store) => {
      if (typeof store.registerErrorHandler === 'function') {
        store.registerErrorHandler((...args) => this.emitError(...args))
      }
    })

    // dummy error listener
    this.on('error', () => {})
  }

  async get(key: K): Promise<?Value<V>> {
    // eslint-disable-next-line no-restricted-syntax
    for (const store of this.stores) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const value = await (
          typeof this.options.timeout === 'number' && this.options.timeout > 0
            ? promiseTimeout(store.get(key), this.options.timeout)
            : store.get(key)
        )
        if (value) {
          return value
        }
      } catch (error) {
        // Promise timeout
        if (error instanceof PromiseTimeoutError && error.code === 'ETIMEDOUT') {
          return undefined
        }

        this.emitError('Failed to get an item from store', {
          key,
          error
        })
      }
    }

    return undefined
  }

  async set(key: K, value: V, options: TTLOptions): Promise<Array<*>> {
    return Promise.all(this.stores.map((store) => store.set(key, value, options)))
  }

  async delete(key: K): Promise<Array<*>> {
    return Promise.all(this.stores.map((store) => store.delete(key)))
  }

  clear() {
    this.stores.forEach((store) => store.clear())
  }

  async refresh(key: K,
    func: (K | void) => Promise<V> | V | Promise<wrappedValue<V>> | wrappedValue<V>,
    options: TTLOptions): Promise<V> {
    let value = await func(key)
    let cacheOptions = options

    if (value) {
      if (Object.prototype.hasOwnProperty.call(value, 'value') && typeof value.cacheOptions === 'object') {
        cacheOptions = Object.assign({}, cacheOptions, value.cacheOptions)
        // $FlowFixMe: flow fails to recognize hasOwnProperty checks (https://github.com/facebook/flow/issues/2008)
        value = value.value
      }

      // use stale as expire if undefined, and vica versa
      cacheOptions = Object.assign({}, cacheOptions, {
        expire: typeof cacheOptions.expire !== 'number' && typeof cacheOptions.stale === 'number' ?
          cacheOptions.stale : cacheOptions.expire
      })

      // do not save with zero expire
      // expire only means: failover cache only
      if (typeof cacheOptions.expire === 'number') {
        // $FlowFixMe: flow fails to recognize hasOwnProperty checks (https://github.com/facebook/flow/issues/2008)
        this.set(key, value, cacheOptions)
      }
    }

    // $FlowFixMe: flow fails to recognize hasOwnProperty checks (https://github.com/facebook/flow/issues/2008)
    return value
  }

  async wrap(key: K, func: Function, options: TTLOptions = {}): Promise<?V> {
    const value = await this.get(key)

    // try to refresh if not in cache or the value is expired
    if (!value || value.isStale()) {
      try {
        const result = await this.refresh(key, func, options)
        return result
      } catch (ex) {
        // skip cache
        if (ex.noCache) {
          throw ex
        }

        // throw error if the value is outdated
        if (!value || (value && value.isExpired())) {
          throw ex
        }
        // ignore if stale
        return value.value
      }
    }

    return value.value
  }

  getStats(): StoreStats {
    return this.stores.reduce((stats, store) => {
      const { getCount, hitCount } = store.getStats()
      return {
        getCount: stats.getCount + getCount,
        hitCount: stats.hitCount + hitCount
      }
    }, { getCount: 0, hitCount: 0 })
  }

  resetStats(): StoreStats {
    this.stores.forEach((store) => store.resetStats())
    return this.getStats()
  }

  emitError(message: string, context: { error: Error }) {
    this.emit('error', message, context)
  }
}

type wrappedValue<V> = { value: V, cacheOptions: TTLOptions }
type CacheOptions = { timeout?: Number }
