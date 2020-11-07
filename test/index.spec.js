/* eslint-env jasmine */
"use strict"

const StellarSdk = require("stellar-sdk")
const { friendbot } = require("@cosmic-plus/base")

const ledgerWallet = require("../src")

const { any } = jasmine

/* Setup */

const horizon = "https://horizon-testnet.stellar.org"
const xdr =
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=="

const tx1 = new StellarSdk.Transaction(xdr, StellarSdk.Networks.TESTNET)
const tx2 = new StellarSdk.Transaction(xdr, StellarSdk.Networks.TESTNET)

jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000

/* Specifications */

describe("ledgerWallet", () => {
  afterEach(async () => {
    ledgerWallet.onConnect = undefined
    ledgerWallet.onDisconnect = undefined
    await ledgerWallet.disconnect()
  })

  describe("connect()", () => {
    it("connects with Ledger Wallet", async () => {
      await ledgerWallet.connect()
    })

    it("sets .path using default", async () => {
      await ledgerWallet.connect()
      expect(ledgerWallet.path).toMatch(/^m\/44'\/148'\/0'$/)
    })

    it("sets .path using number", async () => {
      await ledgerWallet.connect(4)
      expect(ledgerWallet.path).toMatch(/^m\/44'\/148'\/3'$/)
    })

    it("sets .path using custom derivation path (1)", async () => {
      await ledgerWallet.connect("m/44'/148'/2'")
      expect(ledgerWallet.path).toMatch(/^m\/44'\/148'\/2'$/)
    })

    it("sets .path using custom derivation path (2)", async () => {
      await ledgerWallet.connect("m/44'/148'/4'/1'/6'")
      expect(ledgerWallet.path).toMatch(/^m\/44'\/148'\/4'\/1'\/6'$/)
    })

    it("sets .publicKey", async () => {
      await ledgerWallet.connect()
      expect(ledgerWallet.publicKey).toEqual(any(String))
      expect(ledgerWallet.publicKey.length).toEqual(56)
      StellarSdk.Keypair.fromPublicKey(ledgerWallet.publicKey)
    })

    it("sets properties related to stellar-app-ledger", async () => {
      await ledgerWallet.connect()
      expect(ledgerWallet.version).toEqual(any(String))
      expect(ledgerWallet.multiOpsEnabled).toEqual(any(Boolean))
    })

    it("sets misc properties", async () => {
      await ledgerWallet.connect()
      expect(ledgerWallet.transport).toEqual(any(Object))
      expect(ledgerWallet.application).toEqual(any(Object))
    })
  })

  describe("sign()", () => {
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
      await ledgerWallet.connect()
      // eslint-disable-next-line no-console
      console.log("Please reject the dummy transaction")
      return ledgerWallet
        .sign(tx2)
        .then(() => {
          return new Error("Did not throw an error")
        })
        .catch((error) => expect(error).toEqual(any(Error)))
    })
  })

  describe(".disconnect()", () => {
    it("disconnects from Ledger Wallet", async () => {
      await ledgerWallet.connect()
      await ledgerWallet.disconnect()
    })

    it("unsets session properties", async () => {
      await ledgerWallet.connect()
      await ledgerWallet.disconnect()
      expect(ledgerWallet.path).toBe(null)
      expect(ledgerWallet.publicKey).toBe(null)
      expect(ledgerWallet.version).toEqual(null)
      expect(ledgerWallet.multiOpsEnabled).toEqual(null)
      expect(ledgerWallet.transport).toEqual(null)
      expect(ledgerWallet.application).toEqual(null)
    })
  })

  describe(".scan()", () => {
    beforeAll(async () => {
      // eslint-disable-next-line no-console
      console.log("Ensure that test accounts exist...")
      await wantAccount(1)
      await wantAccount(2)
      await wantAccount(5)
      await wantAccount(10)
    })

    it("scans for accounts (retry: 0)", async () => {
      const accounts = await ledgerWallet.scan({ horizon, attempts: 1 })
      expect(accounts).toEqual(testAccounts.slice(0, 2))
    })

    it("scans for accounts (retry: default = 3)", async () => {
      const accounts = await ledgerWallet.scan({ horizon })
      expect(accounts).toEqual(testAccounts.slice(0, 3))
    })

    it("scans for accounts (retry: 5)", async () => {
      const accounts = await ledgerWallet.scan({ horizon, attempts: 5 })
      expect(accounts).toEqual(testAccounts)
    })
  })

  describe(".newAccount()", () => {
    it("connect the next unused account", async () => {
      const accounts = await ledgerWallet.scan({
        horizon,
        attempts: 1,
        includeMerged: true
      })
      const last = accounts[accounts.length - 1]
      await ledgerWallet.newAccount(horizon)

      const accountIndex = +ledgerWallet.path.replace(/^.*([0-9]+)'/, "$1")
      if (last) expect(accountIndex).toEqual(last.account)
      else expect(accountIndex).toEqual(0)
    })
  })

  describe("events", () => {
    it("calls .onConnect on connection", async () => {
      let connect = false
      ledgerWallet.onConnect = () => connect = true
      await ledgerWallet.connect()
      expect(connect).toBe(true)
    })

    it("calls .onDisconnect on disconnection", async () => {
      let disconnect = false
      ledgerWallet.onDisconnect = () => disconnect = true
      await ledgerWallet.connect()
      await ledgerWallet.disconnect()
      expect(disconnect).toBe(true)
    })
  })
})

/* Helpers */
let testAccounts = []

async function wantAccount (account) {
  await ledgerWallet.connect(account)
  await friendbot(ledgerWallet.publicKey).catch(() => null)

  testAccounts.push({
    account,
    publicKey: ledgerWallet.publicKey,
    state: "open",
    path: ledgerWallet.path
  })

  await ledgerWallet.disconnect()
}
