'use strict'

const { JSONDriver } = require('clay-driver-memory')

{
  const clayLump = require('clay-lump')
  let lump01 = clayLump({
    driver: new JSONDriver({})
  })
  /* ... */
}
