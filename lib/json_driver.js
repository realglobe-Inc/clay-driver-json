/**
 * Driver to store data into json files
 * @augments Driver
 * @class JSONDriver
 * @param {string} dirname - Directory name to save data
 * @param {Object} [options={}] - Optional settings
 * @param {number} [options.flashInterval=300] - Interval of auto flush
 */
'use strict'

const co = require('co')
const path = require('path')
const aglob = require('aglob')
const asleep = require('asleep')
const { readFileAsync } = require('asfs')
const { LogPrefixes } = require('clay-constants')
const { MemoryDriver } = require('clay-driver-memory')
const { serialize, deserialize } = require('clay-serial')
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
    s._flushTimer = setInterval(() => s.flush(), flashInterval || 1).unref()
    s._storages = {}
  }

  getStorage (storageKey) {
    const s = this
    return co(function * () {
      yield s.waitWhileFlushing()
      let storage = s._storages[ storageKey ]
      let isEmpty = Object.keys(storage || {}).length === 0
      if (isEmpty) {
        storage = s._storages[ storageKey ] = (yield s.fromFile(storageKey)) || {}
      }
      return storage
    })
  }

  delStorage (storageKey) {
    const s = this
    return co(function * () {
      yield s.waitWhileFlushing()
      let exists = s._storages.hasOwnProperty(storageKey)
      if (exists) {
        s._storages[ storageKey ] = {}
        return true
      } else {
        return false
      }
    })
  }

  storageKeys () {
    const s = this
    return co(function * () {
      let storageKeys = Object.keys(s._storages || {})
      let filenames = yield aglob(s.getFilename('*'))
      for (let filename of filenames) {
        let storageKey = path.basename(filename, '.json')
        if (!~storageKeys.indexOf(storageKey)) {
          storageKeys.push(storageKey)
        }
      }
      return storageKeys
    })
  }

  drop (resourceName) {
    const s = this
    let superMethod = super.drop.bind(s)
    return co(function * () {
      let dropped = yield superMethod(resourceName)
      yield s.flush()
      return dropped
    })
  }

  waitWhileFlushing () {
    const s = this
    return co(function * () {
      while (s._flusing) {
        yield asleep(40)
      }
    })
  }

  /**
   * Flush data into json files
   * @returns {Promise}
   */
  flush () {
    const s = this
    return co(function * () {
      if (s._flusing) {
        return
      }
      yield s.waitWhileFlushing()
      s._flusing = true
      yield asleep(1)
      for (let storageKey of Object.keys(s._storages)) {
        let data = s._storages[ storageKey ]
        try {
          yield s.toFile(storageKey, data || {})
        } catch (e) {
          s._flusing = false
          throw e
        }
        delete s._storages[ storageKey ]
      }
      yield asleep(10)
      s._flusing = false
    })
  }

  fromFile (resourceName) {
    const s = this
    return co(function * () {
      let written
      try {
        written = String(yield readFileAsync(s.getFilename(resourceName)))
      } catch (e) {
        return null
      }
      let data = JSON.parse(written)
      // TODO deserialize recursively
      return deserialize.all(data)
    })
  }

  toFile (resourceName, data) {
    const s = this
    return co(function * () {
      let content = JSON.stringify(serialize.all(data), null, 2)
      let filename = s.getFilename(resourceName)
      // TODO serialize recursively
      yield writeout(filename, content, {
        skipIfIdentical: true,
        mkdirp: true
      })
    })
  }

  getFilename (resourceName) {
    const s = this
    return path.join(s._dirname, `${resourceName}.json`)
  }
}

module.exports = JSONDriver
