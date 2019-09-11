/* global describe it expect jasmine */
"use_strict"

const StellarSdk = require("stellar-sdk")
const ledgerWallet = require("../src")
const { any } = jasmine

/* Setup */

const xdr =
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
const tx1 = new StellarSdk.Transaction(xdr, StellarSdk.Networks.TESTNET)
const tx2 = new StellarSdk.Transaction(xdr, StellarSdk.Networks.TESTNET)

jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000
jasmine.currentEnv_.configure({ random: false })

/* Specifications */

describe("ledgerWallet", () => {
  let connect = 0,
    disconnect = 0
  ledgerWallet.onConnect = () => connect = true
  ledgerWallet.onDisconnect = () => disconnect = true

  it("connects with Ledger Wallet", async () => {
    await ledgerWallet.connect()
  })

  describe("connection", () => {
    it("sets .path", async () => {
      await ledgerWallet.connect()
      expect(ledgerWallet.path).toMatch(/^44'\/148'\/\d+'?$/)
      expect(ledgerWallet.path).toMatch(/^44'\/148'(\/\d+'?){1,3}$/)
    })

    it("sets .publicKey", async () => {
      await ledgerWallet.connect()
      expect(ledgerWallet.publicKey).toEqual(any(String))
      expect(ledgerWallet.publicKey.length).toEqual(56)
      StellarSdk.Keypair.fromPublicKey(ledgerWallet.publicKey)
    })
  })

  it("signs transactions", async () => {
    await ledgerWallet.connect()
    // eslint-disable-next-line no-console
    console.log("Please accept the dummy transaction")
    await ledgerWallet.sign(tx1)
    const hasSigned = StellarSdk.Utils.verifyTxSignedBy
    const pubkey = ledgerWallet.publicKey
    expect(hasSigned(tx1, pubkey)).toBe(true)
  })

  it("throws when user refuses to sign", async () => {
    // eslint-disable-next-line no-console
    console.log("Please reject the dummy transaction")
    return ledgerWallet
      .sign(tx2)
      .then(() => {
        return new Error("Did not throw an error")
      })
      .catch(error => expect(error).toEqual(any(Error)))
  })

  it("disconnects", async () => {
    await ledgerWallet.disconnect()
  })

  describe("events", () => {
    it("calls .onDisconnect on disconnection", async () => {
      expect(disconnect).toBe(true)
    })

    it("calls .onConnect on connection", async () => {
      expect(connect).toBe(true)
    })
  })
})
