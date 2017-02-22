# clay-driver-json@2.0.0

Clay driver to save data into JSON files

+ Functions
  + [create(args)](#clay-driver-json-function-create)
+ [JSONDriver](clay-driver-json-classes) Class
  + [new JSONDriver(dirname, options)](#clay-driver-json-classes-j-s-o-n-driver-constructor)
  + [driver.getStorage()](#clay-driver-json-classes-j-s-o-n-driver-getStorage)
  + [driver.doFlush()](#clay-driver-json-classes-j-s-o-n-driver-doFlush)

## Functions

<a class='md-heading-link' name="clay-driver-json-function-create" ></a>

### create(args) -> `JSONDriver`

Create driver instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |



<a class='md-heading-link' name="clay-driver-json-classes"></a>

## JSONDriver Class

Abstract driver


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-constructor" ></a>

### new JSONDriver(dirname, options)

Constructor of JSONDriver class

| Param | Type | Description |
| ----- | --- | -------- |
| dirname | string | Directory name to save data |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-getStorage" ></a>

### driver.getStorage()



<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-doFlush" ></a>

### driver.doFlush() -> `Promise`

Flush to file if needed



