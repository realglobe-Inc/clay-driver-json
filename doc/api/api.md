# clay-driver-json@2.1.1

Clay driver to save data into JSON files

+ Functions
  + [create(args)](#clay-driver-json-function-create)
+ [`JSONDriver`](#clay-driver-json-classes) Class
  + [new JSONDriver(dirname, options)](#clay-driver-json-classes-j-s-o-n-driver-constructor)
  + [driver.getStorage()](#clay-driver-json-classes-j-s-o-n-driver-getStorage)
  + [driver.delStorage()](#clay-driver-json-classes-j-s-o-n-driver-delStorage)
  + [driver.drop()](#clay-driver-json-classes-j-s-o-n-driver-drop)
  + [driver.one(namespace, id)](#clay-driver-json-classes-j-s-o-n-driver-one)
  + [driver.list(namespace, condition)](#clay-driver-json-classes-j-s-o-n-driver-list)
  + [driver.create(namespace, attributes)](#clay-driver-json-classes-j-s-o-n-driver-create)
  + [driver.update(namespace, id, attributes)](#clay-driver-json-classes-j-s-o-n-driver-update)
  + [driver.destroy(namespace, id)](#clay-driver-json-classes-j-s-o-n-driver-destroy)

## Functions

<a class='md-heading-link' name="clay-driver-json-function-create" ></a>

### create(args) -> `JSONDriver`

Create driver instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |



<a class='md-heading-link' name="clay-driver-json-classes"></a>

## `JSONDriver` Class

Driver to store data into json files

**Extends**: 

+ `Driver`



<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-constructor" ></a>

### new JSONDriver(dirname, options)

Constructor of JSONDriver class

| Param | Type | Description |
| ----- | --- | -------- |
| dirname | string | Directory name to save data |
| options | Object | Optional settings |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-getStorage" ></a>

### driver.getStorage()



<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-delStorage" ></a>

### driver.delStorage()



<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-drop" ></a>

### driver.drop()



<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-one" ></a>

### driver.one(namespace, id) -> `Promise.<ClayEntity>`

Get single resource from namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namespace to work with |
| id | ClayId | Resource id |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-list" ></a>

### driver.list(namespace, condition) -> `Promise.<ClayCollection>`

List resource in namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namespace to work with |
| condition | ListCondition | List condition query |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-create" ></a>

### driver.create(namespace, attributes) -> `Promise.<ClayEntity>`

Create data with namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namepath string |
| attributes | Object | Resource attributes to create |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-update" ></a>

### driver.update(namespace, id, attributes) -> `Promise.<ClayEntity>`

Update data with namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namepath string |
| id | ClayId | Resource id |
| attributes | Object | Resource attributes to update |


<a class='md-heading-link' name="clay-driver-json-classes-j-s-o-n-driver-destroy" ></a>

### driver.destroy(namespace, id) -> `Promise.<number>`

Delete data with namespace

| Param | Type | Description |
| ----- | --- | -------- |
| namespace | string | Namepath string |
| id | ClayId | Resource id |




