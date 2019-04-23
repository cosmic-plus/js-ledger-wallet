"use_strict"
/**
 * Connection/disconnection test
 */

const { misc } = require("@cosmic-plus/jsutils")
const ledger = require("../src/ledger.js")

// eslint-disable-next-line no-console
console.log(ledger)

ledger.onConnect = function () {
  // eslint-disable-next-line no-console
  console.log(ledger.path + ": " + ledger.publicKey)
}

ledger.onDisconnect = function () {
  misc.timeout(1000).then(test)
}

async function test () {
  await ledger.connect(0)
}

test()
