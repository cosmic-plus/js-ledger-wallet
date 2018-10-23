# @cosmic-plus/ledger-wallet

This is a wrapper around the official Ledger libraries for Stellar:

* [Stellar app API](https://www.npmjs.com/package/@ledgerhq/hw-app-str)
* [Transport Node HID](https://www.npmjs.com/package/@ledgerhq/hw-transport-node-hid) - Node.js only
* [Transport U2F](https://www.npmjs.com/package/@ledgerhq/hw-transport-u2f) - Browser only

Ledger wallet support may be a bit tricky to implement because it doesn't
require the same libraries whether you're on Node.js or in web browser. Also, 
it requires [quite a few lines of 
code](https://github.com/cosmic-plus/node-ledger-wallet/blob/master/src/ledger.js) 
and does't give much clue about how bip path should be handled.

This library is solving that by loading the right dependencies automatically and
providing a few simple on-liners.

**Disclaimer:** This library is developped independently from the Stellar 
Foundation and Ledger.

## Install

### NPM/Yarn

* NPM: `npm install @cosmic-plus/ledger-wallet`
* Yarn: `yarn add @cosmic-plus/ledger-wallet`

In your scripts: `const ledgerWallet = require('@cosmic-plus/ledger-wallet')`

### Bower

`bower install cosmic-plus-ledger-wallet`

In your HTML pages:

```HTML
<script src="./bower_components/cosmic-plus-ledger-wallet/ledger-wallet.js"></script>
```

### HTML

```HTML
<script src="https://cosmic.plus/web-ledger-wallet/ledger-wallet.js"></script>
```

*Note:* For production release it is advised to serve your own copy of the 
libraries.

## Get Started

### Connect to a Ledger wallet

This will try to connect until you call the disconnect method or until the
connection is established.

```js
await ledgerWallet.connect([$account_number])
```

### Ensure the Ledger wallet is still connected

You can use connect() without parameter at any point of your code for this
purpose.

```js
await ledgerWallet.connect()
```

### Disconnect

Close an open connection or stop to wait for connection:

```js
ledgerWallet.disconnect()
```

### Get wallet public key

Once connection is established:

```js
const accountId = ledgerWallet.publicKey
```

### Sign transaction

Once connection is established:

```js
await ledgerWallet.sign(transaction)
```

### onConnect / onDisconnect event handlers

You can set handlers that will be called on device connection and disconnection:

```js
ledgerWallet.onConnect = myConnectionHandler
ledgerWallet.onDisconnect = myDisconnectionHandler
```

### Advanced bip pathes uses

Optionally you can pass the account index and internal flag:

```js
// ledgerWallet.connect([accountNumber], [accountIndex], [internalFlag])
// => bip path 44'/148'/accountNumber'/internalFlag'/accountIndex'
await ledgerWallet.connect(2, 10)
await ledgerWallet.connect(2, 10, true)
```

The usage of those fields is explained into the [Bitcoin Bip44 
Proposal](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki). In 
general, you only need the account number. The account index is another way to 
derivate different addresses, and an account with the internal flag set to true 
should not be used publicly and is directly related to the account with the 
same values but without internal flag.


### Misc

Other available data (once connection is established):

* Stellar app version: `ledgerWallet.version`
* Hash signing app option: `ledgerWallet.multiOpsEnabled`
* Bip path: `ledgerWallet.path`

Underlying components:

* Ledger Transport instance: `ledgerWallet.transport`
* Ledger StellarApp instance: `ledgerWallet.application`
