"use_strict"
/**
 * Connection/disconnection test
 */

const { timeout } = require("@cosmic-plus/jsutils/misc")
const ledger = require("../src/ledger.js")

// eslint-disable-next-line no-console
console.log(ledger)

ledger.onConnect = function () {
  // eslint-disable-next-line no-console
  console.log(ledger.path + ": " + ledger.publicKey)
}

ledger.onDisconnect = async function () {
  await timeout(1000)
  test()
}

async function test () {
  await ledger.connect(0)
}

test()
