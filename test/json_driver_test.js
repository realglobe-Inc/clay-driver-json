/**
 * Test case for jsonDriver.
 * Runs with mocha.
 */
'use strict'

const JsonDriver = require('../lib/json_driver.js')
const assert = require('assert')
const co = require('co')

describe('json-driver', function () {
  this.timeout(3000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Json driver', () => co(function * () {
    let driver = new JsonDriver()
    assert.ok(driver)
    yield driver.open()
    yield driver.create('/foo', { msg: 'This is foo' })
    yield driver.close()
  }))
})

/* global describe, before, after, it */
