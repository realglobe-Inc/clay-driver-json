/**
 * Clay driver to save data into JSON files
 * @module clay-driver-json
 * @version 4.0.16
 */

'use strict'

const create = require('./create')
const JsonDriver = require('./json_driver')

let lib = create.bind(this)

Object.assign(lib, JsonDriver, {
  create,
  JsonDriver
})

module.exports = lib
