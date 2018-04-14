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
    const {flashInterval = 100} = options
    this._dirname = dirname
    this._flusing = false
    this._flushTimer = setInterval(() => this.flush(), flashInterval || 1).unref()
    this._storages = {}
  }

  async getStorage (storageKey) {
    await this.waitWhileFlushing()
    let storage = this._storages[storageKey]
    const isEmpty = Object.keys(storage || {}).length === 0
    if (isEmpty) {
      storage = this._storages[storageKey] = (await this.fromFile(storageKey)) || {}
    }
    return storage
  }

  async delStorage (storageKey) {
    await this.waitWhileFlushing()
    const exists = this._storages.hasOwnProperty(storageKey)
    if (exists) {
      this._storages[storageKey] = {}
      return true
    } else {
      return false
    }
  }

  async storageKeys () {
    const storageKeys = Object.keys(this._storages || {})
    const filenames = await aglob(this.getFilename('*'))
    for (const filename of filenames) {
      const storageKey = path.basename(filename, '.json')
      if (!~storageKeys.indexOf(storageKey)) {
        storageKeys.push(storageKey)
      }
    }
    return storageKeys
  }

  async drop (resourceName) {
    const superMethod = super.drop.bind(this)
    const dropped = await superMethod(resourceName)
    await this.flush()
    await unlinkAsync(this.getFilename(resourceName))
    await this.flush()
    return dropped
  }

  async waitWhileFlushing () {
    while (this._flusing) {
      await asleep(40)
    }
  }

  /**
   * Flush data into json files
   * @returns {Promise}
   */
  async flush () {
    if (this._flusing) {
      return
    }
    await this.waitWhileFlushing()
    this._flusing = true
    await asleep(1)
    for (let storageKey of Object.keys(this._storages)) {
      const data = this._storages[storageKey]
      try {
        await this.toFile(storageKey, data || {})
      } catch (e) {
        this._flusing = false
        throw e
      }
      delete this._storages[storageKey]
    }
    await asleep(10)
    this._flusing = false
  }

  async close () {
    await this.flush()
  }

  async fromFile (resourceName) {
    let written
    try {
      written = String(await readFileAsync(this.getFilename(resourceName)))
    } catch (e) {
      return null
    }
    const data = JSON.parse(written)
    // TODO deserialize recursively
    return deserialize.all(data)
  }

  async toFile (resourceName, data) {
    const content = JSON.stringify(serialize.all(data), null, 2)
    const filename = this.getFilename(resourceName)
    // TODO serialize recursively
    await writeout(filename, content, {
      skipIfIdentical: true,
      mkdirp: true
    })
  }

  getFilename (resourceName) {
    return path.join(this._dirname, `${resourceName}.json`)
  }
}

module.exports = JSONDriver
