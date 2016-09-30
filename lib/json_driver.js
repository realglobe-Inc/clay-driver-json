/**
 * Abstract driver
 * @augments Driver
 * @class JSONDriver
 */
'use strict'

const { Driver } = require('clay-driver-base')
const co = require('co')
const { has, get, set, remove } = require('json-pointer')
const { LogPrefixes } = require('clay-constants')
const { MemoryDriver } = require('clay-driver-memory')

const { DRIVER_PREFIX } = LogPrefixes

/** @lends JSONDriver */
class JSONDriver extends MemoryDriver {
  // ---------------------
  // Basic Interfaces
  // ---------------------
  constructor (dirname) {
    super()
    const s = this
    s._dirname = dirname
    s._flushTimer = -1
    s._needsFlush = false
    s._flushInterval = 300
  }

  /** @inheritDoc */
  open (config = {}) {
    super.open(config)
    const s = this
    s._flushTimer = setTimeout(() => {
      s.flushIfNeeded()
    }, s._flushInterval).unref()
    s._needsFlush = true
    return Promise.resolve(s)
  }

  /** @inheritDoc */
  close (config = {}) {
    const s = this
    super.close(config)
    return co(function * () {
      yield s.flushIfNeeded()
      clearInterval(s._flushTimer)
      s._needsFlush = false
      s._flushTimer = -1
      return Promise.resolve(s)
    })
  }

  // ---------------------
  // CRUD Interfaces
  // ---------------------

  /** @inheritDoc */
  create (namepath, data) {
    const s = this
    const create = (...args) => super.create(...args)
    return co(function * () {
      let result = yield create(namepath, data)
      s._needsFlush = true
      return result
    })
  }

  /** @inheritDoc */
  read (namepath) {
    const s = this
    return super.read(namepath)
  }

  /** @inheritDoc */
  update (namepath, data) {
    const s = this
    const update = (...args) => super.update(...args)
    return co(function * () {
      let result = yield update(namepath, data)
      s._needsFlush = true
      return result
    })
  }

  /** @inheritDoc */
  delete (namepath) {
    const s = this
    let del = (...args) => super.delete(...args)
    return co(function * () {
      let result = yield del(namepath)
      s._needsFlush = true
      return result
    })
  }

  // ---------------------
  // Other Interfaces
  // ---------------------

  /** @inheritDoc */
  cursor (namepath, options = {}) {
    const s = this
    return super.cursor(namepath, options)
  }

  // ---------------------
  // Custom method
  // ---------------------
  flushIfNeeded () {
    const s = this
    return co(function * () {
      console.log('!s._needsFlush', s._needsFlush)
      if (!s._needsFlush) {
        return false
      }
      let { _pool: pool } = s
      console.log(pool)
      s._needsFlush = false
      return true
    })
  }
}

module.exports = JSONDriver
