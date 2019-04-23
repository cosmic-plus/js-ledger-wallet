"use_strict"
/**
 * Signing test
 */

const StellarSdk = require("stellar-sdk")
const { misc } = require("@cosmic-plus/jsutils")

const ledger = require("../src")

// eslint-disable-next-line no-console
console.log(ledger)

StellarSdk.Network.useTestNetwork()

async function test () {
  await ledger.connect()

  const pubkey = ledger.publicKey
  // eslint-disable-next-line no-console
  console.log(`Public Key: ${pubkey}`)
  const tx = makeTransaction(pubkey)

  try {
    // eslint-disable-next-line no-console
    console.log("Waiting for confirmation...")
    await ledger.sign(tx)
    // eslint-disable-next-line no-console
    console.log("Transaction signed")
    await ledger.disconnect()
  } catch (error) {
    console.error(error)
    // eslint-disable-next-line no-console
    console.log("Retry in 5 seconds\n")
    misc.timeout(5000).then(test)
  }
}

function makeTransaction (pubkey) {
  const account = new StellarSdk.Account(pubkey, "0")
  const txBuilder = new StellarSdk.TransactionBuilder(account)
  return txBuilder.setTimeout(0).build()
}

test()
