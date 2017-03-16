/**
 * Test case for jsonDriver.
 * Runs with mocha.
 */
'use strict'

const JsonDriver = require('../lib/json_driver.js')
const { ok, equal, deepEqual } = require('assert')
const clayLump = require('clay-lump')
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
      flashInterval: 100
    })
    let created = yield driver.create('users', {
      username: 'okunishinishi'
    })
    let created2 = yield driver.create('users', {
      username: 'hoge'
    })
    ok(created2.id !== created.id)
    ok(created.id)
    equal(created.username, 'okunishinishi')

    let one = yield driver.one('users', created.id)

    equal(String(created.id), String(one.id))

    let updated = yield driver.update('users', one.id, {
      password: 'hogehoge'
    })
    equal(String(updated.id), String(one.id))
    equal(updated.password, 'hogehoge')

    let list = yield driver.list('users', {
      filter: { username: 'okunishinishi' }
    })

    deepEqual(list.meta, { offset: 0, limit: 100, length: 1, total: 1 })
    yield driver.flush()
    list = yield driver.list('users', {
      filter: { username: 'okunishinishi' }
    })
    deepEqual(list.meta, { offset: 0, limit: 100, length: 1, total: 1 })

    let destroyed = yield driver.destroy('users', one.id)
    equal(destroyed, 1)
    let destroyed2 = yield driver.destroy('users', one.id)
    equal(destroyed2, 0)

    let resources = yield driver.resources()
    deepEqual(resources, [ { name: 'users', version: 'latest' } ])

    equal((yield driver.list('users')).meta.total, 1)
    yield driver.flush()
    equal((yield driver.list('users')).meta.total, 1)
    yield driver.drop('users')
    equal((yield driver.list('users')).meta.total, 0)
    yield driver.flush()
    equal((yield driver.list('users')).meta.total, 0)
  }))

  it('Run clayDriverTests', () => co(function * () {
    let driver = new JsonDriver(`${__dirname}/../tmp/testing-driver-2`, {
      flashInterval: 100
    })
    yield clayDriverTests.run(driver)
  }))

  it('From lump', () => co(function * () {
    let lump = clayLump('Lump01', {
      driver: new JsonDriver(`${__dirname}/../tmp/testing-lump-driver`, {
        flashInterval: 0
      })
    })
    let Hoge = lump.resource('Hoge')

    let count = yield Hoge.count()

    let hoge01 = yield Hoge.create({ name: 'hoge01' })
    equal(hoge01.name, 'hoge01')
    // yield lump.driver.flush()
    let hoge01AsOne = yield Hoge.one(hoge01.id)
    equal(hoge01AsOne.name, 'hoge01')

    equal(yield Hoge.count(), count + 1)
  }))
})

/* global describe, before, after, it */
