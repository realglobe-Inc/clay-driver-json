clay-driver-json
==========

<!---
This file is generated by ape-tmpl. Do not update manually.
--->

<!-- Badge Start -->
<a name="badges"></a>

[![Build Status][bd_travis_com_shield_url]][bd_travis_com_url]
[![npm Version][bd_npm_shield_url]][bd_npm_url]
[![JS Standard][bd_standard_shield_url]][bd_standard_url]

[bd_repo_url]: https://github.com/realglobe-Inc/clay-driver-json
[bd_travis_url]: http://travis-ci.org/realglobe-Inc/clay-driver-json
[bd_travis_shield_url]: http://img.shields.io/travis/realglobe-Inc/clay-driver-json.svg?style=flat
[bd_travis_com_url]: http://travis-ci.com/realglobe-Inc/clay-driver-json
[bd_travis_com_shield_url]: https://api.travis-ci.com/realglobe-Inc/clay-driver-json.svg?token=aeFzCpBZebyaRijpCFmm
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

# clay-driver-json@1.0.4

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






<!-- Section from "doc/guides/03.API.md.hbs" End -->


<!-- Sections Start -->


<!-- LICENSE Start -->
<a name="license"></a>

License
-------
This software is released under the [MIT License](https://github.com/realglobe-Inc/clay-driver-json/blob/master/LICENSE).

<!-- LICENSE End -->


<!-- Links Start -->
<a name="links"></a>

Links
------



<!-- Links End -->
