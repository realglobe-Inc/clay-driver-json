/**
 * Driver to store data into json files
 * @augments Driver
 * @class JSONDriver
 * @param {string} dirname - Directory name to save data
 * @param {Object} [options={}] - Optional settings
 * @param {number} [options.flashInterval=300] - Interval of auto flush
 */
'use strict'

const path = require('path')
const aglob = require('aglob')
const asleep = require('asleep')
const {readFileAsync, unlinkAsync} = require('asfs')
const {LogPrefixes} = require('clay-constants')
const {MemoryDriver} = require('clay-driver-memory')
const {serialize, deserialize} = require('clay-serial')
const writeout = require('writeout')

const {DRIVER_PREFIX} = LogPrefixes

/** @lends JSONDriver */
class JSONDriver extends MemoryDriver {
  constructor (dirname = 'var/clay', options = {}) {
    super()
    const s = this
    const {flashInterval = 100} = options
    s._dirname = dirname
    s._flusing = false
    s._flushTimer = setInterval(() => s.flush(), flashInterval || 1).unref()
    s._storages = {}
  }

  async getStorage (storageKey) {
    const s = this
    await s.waitWhileFlushing()
    let storage = s._storages[storageKey]
    const isEmpty = Object.keys(storage || {}).length === 0
    if (isEmpty) {
      storage = s._storages[storageKey] = (await s.fromFile(storageKey)) || {}
    }
    return storage
  }

  async delStorage (storageKey) {
    const s = this
    await s.waitWhileFlushing()
    const exists = s._storages.hasOwnProperty(storageKey)
    if (exists) {
      s._storages[storageKey] = {}
      return true
    } else {
      return false
    }
  }

  async storageKeys () {
    const s = this
    const storageKeys = Object.keys(s._storages || {})
    const filenames = await aglob(s.getFilename('*'))
    for (const filename of filenames) {
      const storageKey = path.basename(filename, '.json')
      if (!~storageKeys.indexOf(storageKey)) {
        storageKeys.push(storageKey)
      }
    }
    return storageKeys
  }

  async drop (resourceName) {
    const s = this
    const superMethod = super.drop.bind(s)
    const dropped = await superMethod(resourceName)
    await s.flush()
    await unlinkAsync(s.getFilename(resourceName))
    await s.flush()
    return dropped
  }

  async waitWhileFlushing () {
    const s = this
    while (s._flusing) {
      await asleep(40)
    }
  }

  /**
   * Flush data into json files
   * @returns {Promise}
   */
  async flush () {
    const s = this
    if (s._flusing) {
      return
    }
    await s.waitWhileFlushing()
    s._flusing = true
    await asleep(1)
    for (let storageKey of Object.keys(s._storages)) {
      const data = s._storages[storageKey]
      try {
        await s.toFile(storageKey, data || {})
      } catch (e) {
        s._flusing = false
        throw e
      }
      delete s._storages[storageKey]
    }
    await asleep(10)
    s._flusing = false
  }

  async close () {
    const s = this
    await s.flush()
  }

  async fromFile (resourceName) {
    const s = this
    let written
    try {
      written = String(await readFileAsync(s.getFilename(resourceName)))
    } catch (e) {
      return null
    }
    const data = JSON.parse(written)
    // TODO deserialize recursively
    return deserialize.all(data)
  }

  async toFile (resourceName, data) {
    const s = this
    const content = JSON.stringify(serialize.all(data), null, 2)
    const filename = s.getFilename(resourceName)
    // TODO serialize recursively
    await writeout(filename, content, {
      skipIfIdentical: true,
      mkdirp: true
    })
  }

  getFilename (resourceName) {
    const s = this
    return path.join(s._dirname, `${resourceName}.json`)
  }
}

module.exports = JSONDriver
