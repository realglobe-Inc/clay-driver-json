/**
 * Clay driver to save data into JSON files
 * @module clay-driver-json
 * @version 1.0.3
 */

'use strict'

const create = require('./create')
const JsonDriver = require('./json_driver')
const JSONDriver = require('./json_driver')

let lib = create.bind(this)

Object.assign(lib, JsonDriver, {
  JSONDriver,
  create,
  JsonDriver
})

module.exports = lib
