/**
 * Create driver instance
 * @function create
 * @param {...*} args
 * @returns {JSONDriver}
 */
'use strict'

const JSONDriver = require('./json_driver')

/** @lends create */
function create (...args) {
  return new JSONDriver(...args)
}

module.exports = create
