/**
 * Driver to store data into json files
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
    s._flusing = false
    s._flushTimer = setInterval(() => s.doFlush(), flashInterval).unref()
    s._storages = {}
  }

  /** @inheritdoc */
  getStorage (namespace) {
    const s = this
    return co(function * () {
      while (s._flusing) {
        yield new Promise((resolve) => process.nextTick(() => resolve))
      }
      let storage = s._storages[ namespace ]
      if (!storage) {
        storage = s._storages[ namespace ] = (yield s.fromFile(namespace)) || {}
      }
      return storage
    })
  }

  /** @inheritdoc */
  delStorage (namespace) {
    const s = this
    return co(function * () {
      while (s._flusing) {
        yield new Promise((resolve) => process.nextTick(() => resolve))
      }
      let exists = s._storages.hasOwnProperty(namespace)
      if (exists) {
        delete s._storages[ namespace ]
        return true
      } else {
        return false
      }
    })
  }

  /** @inheritdoc */
  drop (namespace) {
    const s = this
    return co(function * () {
      let deleted = yield s.delStorage(namespace)
      if (!s._flusing) {
        yield s.doFlush()
      }
      return deleted
    })
  }

  doFlush () {
    const s = this
    return co(function * () {
      s._flusing = true
      try {
        for (let namespace of Object.keys(s._storages)) {
          let data = s._storages[ namespace ]
          yield s.toFile(namespace, data || {})
          delete s._storages[ namespace ]
        }
      } catch (e) {
        throw e
      } finally {
        s._flusing = false
      }
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
    return path.join(s._dirname, `${spinalcase(namespace)}.json`)
  }
}

module.exports = JSONDriver
