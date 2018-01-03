clay-driver-json
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_shield_url]][bd_travis_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/clay-driver-json
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/clay-driver-json
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/clay-driver-json.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/clay-driver-json
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/clay-driver-json.svg?token=
[bd_license_url]: https://github.com/realglobe-Inc/clay-driver-json/blob/master/LICENSE
[bd_codeclimate_url]: http://codeclimate.com/github/realglobe-Inc/clay-driver-json
[bd_codeclimate_shield_url]: http://img.shields.io/codeclimate/github/realglobe-Inc/clay-driver-json.svg?style=flat
[bd_codeclimate_coverage_shield_url]: http://img.shields.io/codeclimate/coverage/github/realglobe-Inc/clay-driver-json.svg?style=flat
[bd_gemnasium_url]: https://gemnasium.com/realglobe-Inc/clay-driver-json
[bd_gemnasium_shield_url]: https://gemnasium.com/realglobe-Inc/clay-driver-json.svg
[bd_npm_url]: http://www.npmjs.org/package/clay-driver-json
[bd_npm_shield_url]: http://img.shields.io/npm/v/clay-driver-json.svg?style=flat
[bd_standard_url]: http://standardjs.com/
[bd_standard_shield_url]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

<!-- Badge End -->


<!-- Description Start -->
<a name="description"></a>

Clay driver to save data into JSON files

<!-- Description End -->


<!-- Overview Start -->
<a name="overview"></a>



<!-- Overview End -->


<!-- Sections Start -->
<a name="sections"></a>

<!-- Section from "doc/guides/01.Installation.md.hbs" Start -->

<a name="section-doc-guides-01-installation-md"></a>

Installation
-----

```bash
$ npm install clay-driver-json --save
```


<!-- Section from "doc/guides/01.Installation.md.hbs" End -->

<!-- Section from "doc/guides/02.Usage.md.hbs" Start -->

<a name="section-doc-guides-02-usage-md"></a>

Usage
---------

```javascript
'use strict'

const { JSONDriver } = require('clay-driver-memory')

{
  const clayLump = require('clay-lump')
  let lump01 = clayLump({
    driver: new JSONDriver({})
  })
  /* ... */
}

```


<!-- Section from "doc/guides/02.Usage.md.hbs" End -->

<!-- Section from "doc/guides/03.API.md.hbs" Start -->

<a name="section-doc-guides-03-a-p-i-md"></a>

API
---------

# clay-driver-json@4.0.5

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






<!-- Section from "doc/guides/03.API.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [Apache-2.0 License](https://github.com/realglobe-Inc/clay-driver-json/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------

+ [ClayDB][clay_d_b_url]
+ [Realglobe, Inc.][realglobe,_inc__url]

[clay_d_b_url]: https://github.com/realglobe-Inc/claydb
[realglobe,_inc__url]: http://realglobe.jp

<!-- Links End -->
