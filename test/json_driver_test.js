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
    let driver01 = new JsonDriver(`${__dirname}/../tmp/testing-driver`)
    assert.ok(driver01)
    yield driver01.connect()
    yield driver01.create('/foo', { msg: 'This is foo' })
    yield driver01.disconnect()

    {
      let driver02 = new JsonDriver(`${__dirname}/../tmp/testing-driver`)
      yield driver02.connect()
      let foo = yield driver02.read('/foo')
      assert.deepEqual(foo, { msg: 'This is foo' })
      yield driver02.delete('/foo')
      yield driver02.disconnect()
    }
  }))
})

/* global describe, before, after, it */
