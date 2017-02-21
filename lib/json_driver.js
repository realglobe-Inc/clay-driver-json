/**
 * Abstract driver
 * @augments Driver
 * @class JSONDriver
 * @param {string} dirname - Directory name to save data
 * @param {Object} options - Optional settings
 */
'use strict'

const co = require('co')
const path = require('path')
const { readFileAsync } = require('asfs')
const { LogPrefixes } = require('clay-constants')
const { MemoryDriver } = require('clay-driver-memory')
const { spinalcase } = require('stringcase')
const writeout = require('writeout')

const { DRIVER_PREFIX } = LogPrefixes

/** @lends JSONDriver */
class JSONDriver extends MemoryDriver {
  constructor (dirname = 'var/clay', options = {}) {
    super()
    const s = this
    let { flashInterval = 300 } = options
    s._dirname = dirname
    s._flushTimer = -1
    s._needsFlush = false
    s._flushTimer = setTimeout(() => {
      s.flushIfNeeded()
    }, flashInterval).unref()
    s._needsFlush = true
    s._storages = {}
  }

  /** @override */
  getStorage (namespace) {
    const s = this
    return co(function * () {
      let storage = s._storages[ namespace ]
      if (!storage) {
        storage = s._storages[ namespace ] = (yield s.fromFile(namespace)) || {}
      }
      return storage
    })
  }

  /**
   * Flush to file if needed
   * @returns {Promise}
   */
  flushIfNeeded () {
    const s = this
    return co(function * () {
      if (!s._needsFlush) {
        return false
      }
      for (let namespace of Object.keys(s._storages)) {
        let data = s._storages[ namespace ]
        yield s.toFile(namespace, data)
        delete s._storages[ namespace ]
      }
      s._needsFlush = false
      return true
    })
  }

  fromFile (namespace) {
    const s = this
    return co(function * () {
      try {
        return JSON.parse(yield readFileAsync(s.getFilename(namespace)))
      } catch (e) {
        return null
      }
    })
  }

  toFile (namespace, data) {
    const s = this
    return co(function * () {
      let content = JSON.stringify(data, null, 2)
      let filename = s.getFilename(namespace)
      yield writeout(filename, content, {
        skipIfIdentical: true,
        mkdirp: true
      })
    })
  }

  getFilename (namespace) {
    const s = this
    return path.join(s._dirname, `${namespace}.json`)
  }
}

module.exports = JSONDriver
