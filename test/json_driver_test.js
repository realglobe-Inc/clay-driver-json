/**
 * Test case for jsonDriver.
 * Runs with mocha.
 */
'use strict'

const JsonDriver = require('../lib/json_driver.js')
const assert = require('assert')
const clayDriverTests = require('clay-driver-tests')
const co = require('co')

describe('json-driver', function () {
  this.timeout(13000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Json driver', () => co(function * () {
    let driver = new JsonDriver(`${__dirname}/../tmp/testing-driver`, {
      flashInterval: 0
    })
    let created = yield driver.create('users', {
      username: 'okunishinishi'
    })
    let created2 = yield driver.create('users', {
      username: 'hoge'
    })
    assert.ok(created2.id !== created.id)
    assert.ok(created.id)
    assert.equal(created.username, 'okunishinishi')

    let one = yield driver.one('users', created.id)

    assert.equal(String(created.id), String(one.id))

    let updated = yield driver.update('users', one.id, {
      password: 'hogehoge'
    })
    assert.equal(String(updated.id), String(one.id))
    assert.equal(updated.password, 'hogehoge')

    let list = yield driver.list('users', {
      filter: { username: 'okunishinishi' }
    })
    assert.deepEqual(list.meta, { offset: 0, limit: 100, length: 1, total: 1 })

    let destroyed = yield driver.destroy('users', one.id)
    assert.equal(destroyed, 1)
    let destroyed2 = yield driver.destroy('users', one.id)
    assert.equal(destroyed2, 0)

    assert.equal((yield driver.list('users')).meta.total, 1)
    yield driver.drop('users')
    assert.equal((yield driver.list('users')).meta.total, 0)
  }))

  it('Run clayDriverTests', () => co(function * () {
    let driver = new JsonDriver(`${__dirname}/../tmp/testing-driver-2`, {
      flashInterval: 0
    })
    yield clayDriverTests.run(driver)
  }))
})

/* global describe, before, after, it */
