<a name="1.3.5"></a>
## 1.3.5 (2017-03-29)


### feat

* feat(cache): allow zero expire, document (#12) 57c02fa



<a name="1.3.4"></a>
## 1.3.4 (2017-03-29)


### chore

* chore(package): bump version to 1.3.4 caf5758

### feat

* feat(example): fix example 2ba3b55

### fix

* fix(cache): do not save without expire in refresh df6265d
* fix(cache): use createdAt 4013913
* fix(refresh): cache options merge d1e4e07



<a name="1.3.3"></a>
## 1.3.3 (2017-03-28)


### chore

* chore(package): bump version to 1.3.3 ff2be34
* chore(package): update dependencies 80e3646

### fix

* fix(cache): allow falsy values to be set b8065ff



<a name="1.3.2"></a>
## 1.3.2 (2017-03-07)


### chore

* chore(package): bump version to 1.3.2 651cd91

### fix

* fix(babel): revert babel preset change, remove spread in super instead (the cause is still unknown) 8e38576



<a name="1.3.1"></a>
## 1.3.1 (2017-03-07)


### chore

* chore(package): bump version to 1.3.1 f76533b

### fix

* fix(babel): use es2015 preset 40d6d53



<a name="1.3.0"></a>
# 1.3.0 (2017-03-07)


* feat(store, cache): add store error handler and get timeout 19ee994

### chore

* chore(package): bump version to 1.3.0 0879f0c
* chore(package): update dependencies 9e0c332



<a name="1.2.0"></a>
# 1.2.0 (2017-02-28)


### chore

* chore(package): bump version to 1.2.0 e892613

### feat

* feat(error): no cache ebb0f71



<a name="1.1.1"></a>
## 1.1.1 (2017-02-08)


### chore

* chore(package): bump version to 1.1.1 0efc8e4

### fix

* fix(cache): stale and expired behaviour 8cd9eea



<a name="1.1.0"></a>
# 1.1.0 (2017-02-07)


### chore

* chore(package): update version to 1.1.0 4c7feb8

### feat

* feat(cache): only save value if expire is greater than 0 bbd8c9e



<a name="1.0.4"></a>
## 1.0.4 (2017-02-02)


### chore

* chore(package): bump version to 1.0.4 881a2aa

### fix

* fix(cache): set stores in wrap without nextTick d0b9654



<a name="1.0.3"></a>
## 1.0.3 (2017-02-01)


### chore

* chore(package): bump version to 1.0.3 4eb03a7

### fix

* fix(package): fix main field e462690



<a name="1.0.2"></a>
## 1.0.2 (2017-02-01)


### chore

* chore(package): bump version to 1.0.2 8ccef09

### fix

* fix(npm): fix publish a0fdfae



<a name="1.0.1"></a>
## 1.0.1 (2017-02-01)


### chore

* chore(circle): add circleci test configuration 9c56f17
* chore(package): bump version to 1.0.1 a92ecf1

### docs

* docs(package): add documentations and example dc94000

### feat

* feat(cache): add option to set ttl on every result 7bc1543
* feat(cache): cache is an event emitter, emit store get error 829aaca
* feat(package): first implementation 8bcf242
* feat(package): update types 02d4671
* feat(stores): add LRU store b03538e
* feat(stores): add redis store b83f0be

### fix

* fix(npm): add .npmignore 28c7cdb
* fix(package): fix build script 55c7f6a

### refactor

* refactor(chore): remove .vscode ab9e2c9



