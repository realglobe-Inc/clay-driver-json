# clay-driver-json@4.0.2

Clay driver to save data into JSON files

+ Functions
  + [create(args)](#clay-driver-json-function-create)
+ [`JSONDriver`](#clay-driver-json-class) Class
  + [new JSONDriver(dirname, options)](#clay-driver-json-class-j-s-o-n-driver-constructor)
  + [driver.flush()](#clay-driver-json-class-j-s-o-n-driver-flush)
  + [driver.one(resourceName, id)](#clay-driver-json-class-j-s-o-n-driver-one)
  + [driver.list(resourceName, condition)](#clay-driver-json-class-j-s-o-n-driver-list)
  + [driver.create(resourceName, attributes)](#clay-driver-json-class-j-s-o-n-driver-create)
  + [driver.update(resourceName, id, attributes)](#clay-driver-json-class-j-s-o-n-driver-update)
  + [driver.destroy(resourceName, id)](#clay-driver-json-class-j-s-o-n-driver-destroy)
  + [driver.drop(resourceName)](#clay-driver-json-class-j-s-o-n-driver-drop)
  + [driver.resources()](#clay-driver-json-class-j-s-o-n-driver-resources)

## Functions

<a class='md-heading-link' name="clay-driver-json-function-create" ></a>

### create(args) -> `JSONDriver`

Create driver instance

| Param | Type | Description |
| ----- | --- | -------- |
| args | * |  |



<a class='md-heading-link' name="clay-driver-json-class"></a>

## `JSONDriver` Class

Driver to store data into json files

**Extends**:

+ `Driver`



<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-constructor" ></a>

### new JSONDriver(dirname, options)

Constructor of JSONDriver class

| Param | Type | Description |
| ----- | --- | -------- |
| dirname | string | Directory name to save data |
| options | Object | Optional settings |
| options.flashInterval | number | Interval of auto flush |


<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-flush" ></a>

### driver.flush() -> `Promise`

Flush data into json files

<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-one" ></a>

### driver.one(resourceName, id) -> `Promise.<ClayEntity>`

Get single entity from resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| id | ClayId | Resource id |


<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-list" ></a>

### driver.list(resourceName, condition) -> `Promise.<ClayCollection>`

List entities from resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| condition | ListCondition | List condition query |


<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-create" ></a>

### driver.create(resourceName, attributes) -> `Promise.<ClayEntity>`

Create a new entity with resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| attributes | Object | Resource attributes to create |


<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-update" ></a>

### driver.update(resourceName, id, attributes) -> `Promise.<ClayEntity>`

Update an existing entity in resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| id | ClayId | Resource id |
| attributes | Object | Resource attributes to update |


<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-destroy" ></a>

### driver.destroy(resourceName, id) -> `Promise.<number>`

Delete a entity resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |
| id | ClayId | Resource id |


<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-drop" ></a>

### driver.drop(resourceName) -> `Promise.<boolean>`

Drop resource

| Param | Type | Description |
| ----- | --- | -------- |
| resourceName | string | Name of resource |


<a class='md-heading-link' name="clay-driver-json-class-j-s-o-n-driver-resources" ></a>

### driver.resources() -> `Promise.<Resource>`

List resources



