# clay-driver-json@2.0.0

Clay driver to save data into JSON files

+ Functions
  + [create(args)](#clay-driver-json-function-create)
+ [JSONDriver](clay-driver-json-classes) Class
  + [new JSONDriver()](#clay-driver-json-classes-j-s-o-n-driver-constructor)
  + [driver.connect(config)](#clay-driver-json-classes-j-s-o-n-driver-connect)
  + [driver.disconnect(config)](#clay-driver-json-classes-j-s-o-n-driver-disconnect)
  + [driver.create(namepath, data)](#clay-driver-json-classes-j-s-o-n-driver-create)
  + [driver.read(namepath)](#clay-driver-json-classes-j-s-o-n-driver-read)
  + [driver.update(namepath, data)](#clay-driver-json-classes-j-s-o-n-driver-update)
  + [driver.delete(namepath)](#clay-driver-json-classes-j-s-o-n-driver-delete)
  + [driver.cursor(namepath, options)](#clay-driver-json-classes-j-s-o-n-driver-cursor)
  + [driver.flushIfNeeded()](#clay-driver-json-classes-j-s-o-n-driver-flushIfNeeded)
  + [driver.saveToJsonFile(data)](#clay-driver-json-classes-j-s-o-n-driver-saveToJsonFile)
  + [driver.readFromJsonFile()](#clay-driver-json-classes-j-s-o-n-driver-readFromJsonFile)

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

### new JSONDriver()

Constructor of JSONDriver class



<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-connect" ></a>

### driver.connect(config) -> `Promise`

Connect driver

| Param | Type | Description |
| ----- | --- | -------- |
| config | Object |  |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-disconnect" ></a>

### driver.disconnect(config) -> `Promise`

Disconnect driver

| Param | Type | Description |
| ----- | --- | -------- |
| config | Object |  |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-create" ></a>

### driver.create(namepath, data) -> `Promise`

Create data with namepath

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |
| data | Object | Resource data to create |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-read" ></a>

### driver.read(namepath) -> `Promise`

Read data with namepath

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-update" ></a>

### driver.update(namepath, data) -> `Promise`

Update data with namepath

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |
| data | Object | Resource data to create |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-delete" ></a>

### driver.delete(namepath) -> `Promise`

Delete data with namepath

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-cursor" ></a>

### driver.cursor(namepath, options) -> `Promise.<Driver.Cursor>`

Get cursor to iterate

| Param | Type | Description |
| ----- | --- | -------- |
| namepath | string | Namepath string |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-flushIfNeeded" ></a>

### driver.flushIfNeeded() -> `Promise`

Flush to file if needed

<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-saveToJsonFile" ></a>

### driver.saveToJsonFile(data) -> `Promise`

Save data to json file

| Param | Type | Description |
| ----- | --- | -------- |
| data | Object | Data to save |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-readFromJsonFile" ></a>

### driver.readFromJsonFile() -> `Promise.<Object>`

Read data from json file



