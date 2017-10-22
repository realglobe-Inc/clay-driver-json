/**
 * Test case for jsonDriver.
 * Runs with mocha.
 */
'use strict'

const JsonDriver = require('../lib/json_driver.js')
const {ok, equal, deepEqual} = require('assert')
const clayLump = require('clay-lump')
const rimraf = require('rimraf')
const clayDriverTests = require('clay-driver-tests')

describe('json-driver', function () {
  this.timeout(50000)

  before(async () => {

  })

  after(async () => {

  })

  it('Json driver', async () => {
    const driver = new JsonDriver(`${__dirname}/../tmp/testing-driver`, {
      flashInterval: 100
    })
    const created = await driver.create('User', {
      username: 'okunishinishi'
    })
    const created2 = await driver.create('User', {
      username: 'hoge'
    })
    ok(created2.id !== created.id)
    ok(created.id)
    equal(created.username, 'okunishinishi')

    const one = await driver.one('User', created.id)

    equal(String(created.id), String(one.id))

    const updated = await driver.update('User', one.id, {
      password: 'hogehoge'
    })
    equal(String(updated.id), String(one.id))
    equal(updated.password, 'hogehoge')

    const list = await driver.list('User', {
      filter: {username: 'okunishinishi'}
    })

    deepEqual(list.meta, {offset: 0, limit: 100, length: 1, total: 1})
    await driver.flush()
    {
      const list = await driver.list('User', {
        filter: {username: 'okunishinishi'}
      })
      deepEqual(list.meta, {offset: 0, limit: 100, length: 1, total: 1})
    }

    const destroyed = await driver.destroy('User', one.id)
    equal(destroyed, 1)
    const destroyed2 = await driver.destroy('User', one.id)
    equal(destroyed2, 0)

    const resources = await driver.resources()
    equal(resources[0].name, 'User')

    equal((await driver.list('User')).meta.total, 1)
    await driver.flush()
    equal((await driver.list('User')).meta.total, 1)
    await driver.drop('User')
    equal((await driver.list('User')).meta.total, 0)
    await driver.flush()
    equal((await driver.list('User')).meta.total, 0)

    await driver.close()
  })

  it('Run clayDriverTests', async () => {
    const dirname = `${__dirname}/../tmp/testing-driver-2`
    rimraf.sync(dirname)
    const driver = new JsonDriver(dirname, {
      flashInterval: 100
    })
    await clayDriverTests.run(driver)

    await driver.close()
  })

  it('From lump', async () => {
    const dirname = `${__dirname}/../tmp/testing-lump-driver`
    rimraf.sync(dirname)
    const driver = new JsonDriver(dirname, {
      flashInterval: 1
    })
    const lump = clayLump('Lump01', {
      driver
    })
    const Hoge = lump.resource('Hoge')

    const count = await Hoge.count()

    const hoge01 = await Hoge.create({name: 'hoge01'})
    equal(hoge01.name, 'hoge01')
    await lump.driver.flush()
    const hoge01AsOne = await Hoge.one(hoge01.id)
    equal(hoge01AsOne.name, 'hoge01')

    equal(await Hoge.count(), count + 1)

    await driver.close()
  })
})

/* global describe, before, after, it */
