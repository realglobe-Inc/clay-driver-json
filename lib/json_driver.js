/**
 * Abstract driver
 * @augments Driver
 * @class JSONDriver
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
  // ---------------------
  // Basic Interfaces
  // ---------------------
  constructor (dirname = 'var/clay') {
    super()
    const s = this
    s._dirname = dirname
    s._flushTimer = -1
    s._needsFlush = false
    s._flushInterval = 300
  }

  /**
   * Connect driver
   * @param {Object} config
   * @returns {Promise}
   */
  connect (config = {}) {
    let connect = (...args) => super.connect(...args)
    const s = this
    return co(function * () {
      s._flushTimer = setTimeout(() => {
        s.flushIfNeeded()
      }, s._flushInterval).unref()
      s._needsFlush = true
      yield connect(config)

      let fromFile = yield s.readFromJsonFile()
      if (fromFile) {
        s._pool = fromFile
      }
      return s
    })
  }

  /**
   * Disconnect driver
   * @param {Object} config
   * @returns {Promise}
   */
  disconnect (config = {}) {
    const s = this
    let disconnect = (...args) => super.disconnect()
    return co(function * () {
      yield s.flushIfNeeded()
      clearInterval(s._flushTimer)
      s._needsFlush = false
      s._flushTimer = -1
      yield disconnect(config)
      return s
    })
  }

  // ---------------------
  // CRUD Interfaces
  // ---------------------

  /**
   * Create data with namepath
   * @param {string} namepath - Namepath string
   * @param {Object} data - Resource data to create
   * @returns {Promise}
   */
  create (namepath, data) {
    const s = this
    const create = (...args) => super.create(...args)
    return co(function * () {
      let result = yield create(namepath, data)
      s._needsFlush = true
      return result
    })
  }

  /**
   * Read data with namepath
   * @param {string} namepath - Namepath string
   * @returns {Promise}
   */
  read (namepath) {
    const s = this
    return super.read(namepath)
  }

  /**
   * Update data with namepath
   * @param {string} namepath - Namepath string
   * @param {Object} data - Resource data to create
   * @returns {Promise}
   */
  update (namepath, data) {
    const s = this
    const update = (...args) => super.update(...args)
    return co(function * () {
      let result = yield update(namepath, data)
      s._needsFlush = true
      return result
    })
  }

  /**
   * Delete data with namepath
   * @param {string} namepath - Namepath string
   * @returns {Promise}
   */
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

  /**
   * Get cursor to iterate
   * @param {string} namepath - Namepath string
   * @param {Object} options - Optional settings
   * @returns {Promise.<Driver.Cursor>}
   */
  cursor (namepath, options = {}) {
    const s = this
    return super.cursor(namepath, options)
  }

  // ---------------------
  // Custom method
  // ---------------------

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
      let { _pool: pool } = s
      yield s.saveToJsonFile(pool)
      s._needsFlush = false
      return true
    })
  }

  get indexJsonFilename () {
    const s = this
    let { _dirname: dirname } = s
    return path.join(dirname, 'index.json')
  }

  dataJsonFilenameOf (name) {
    const s = this
    let { _dirname: dirname } = s
    return path.join(dirname, 'data', `${spinalcase(name)}.json`)
  }

  /**
   * Save data to json file
   * @param {Object} data - Data to save
   * @returns {Promise}
   */
  saveToJsonFile (data) {
    const s = this
    return co(function * () {
      let names = Object.keys(data)
      let paths = {}
      for (let name of names) {
        let value = data[ name ]
        if (typeof value === 'undefined') {
          continue
        }
        let filename = s.dataJsonFilenameOf(name)
        let content = JSON.stringify(value, null, 2)
        yield writeout(filename, content, {
          skipIfIdentical: true,
          mkdirp: true
        })
        paths[ name ] = path.relative(s._dirname, filename)
      }
      yield writeout(s.indexJsonFilename, JSON.stringify(paths, null, 2), {
        force: true
      })
    })
  }

  /**
   * Read data from json file
   * @returns {Promise.<Object>}
   */
  readFromJsonFile () {
    const s = this
    return co(function * () {
      let data = {}
      let paths
      try {
        paths = JSON.parse(yield readFileAsync(s.indexJsonFilename))
      } catch (e) {
        return false
      }
      for (let name of Object.keys(paths)) {
        let filename = path.join(s._dirname, paths[ name ])
        data[ name ] = JSON.parse(yield readFileAsync(filename))
      }
      return data
    })
  }
}

module.exports = JSONDriver
