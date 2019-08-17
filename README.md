**ledger-wallet /**
[Readme](https://cosmic.plus/#view:js-ledger-wallet)
• [Examples](https://cosmic.plus/#view:js-ledger-wallet/EXAMPLES)
• [Contributing](https://cosmic.plus/#view:js-ledger-wallet/CONTRIBUTING)
• [Changelog](https://cosmic.plus/#view:js-ledger-wallet/CHANGELOG)

# Readme

![Licence](https://img.shields.io/github/license/cosmic-plus/js-ledger-wallet.svg)
[![Dependencies](https://badgen.net/david/dep/cosmic-plus/js-ledger-wallet)](https://david-dm.org/cosmic-plus/js-ledger-wallet)
![Vulnerabilities](https://snyk.io/test/npm/@cosmic-plus/ledger-wallet/badge.svg)
![Size](https://badgen.net/bundlephobia/minzip/@cosmic-plus/ledger-wallet)
![Downloads](https://badgen.net/npm/dt/@cosmic-plus/ledger-wallet)

This is a wrapper around the official Ledger libraries for Stellar:

- [Stellar app API](https://www.npmjs.com/package/@ledgerhq/hw-app-str)
- [Transport Node HID](https://www.npmjs.com/package/@ledgerhq/hw-transport-node-hid) - Node.js only
- [Transport U2F](https://www.npmjs.com/package/@ledgerhq/hw-transport-u2f) - Browser only

Ledger wallet support may be a bit tricky to implement because it doesn't
require the same libraries whether you're on Node.js or in web browser. Also, it
requires [quite a few lines of
code](https://github.com/cosmic-plus/js-ledger-wallet/blob/master/src/index.js).

This library is solving that by loading the right dependencies automatically and
providing a few simple one-liners.

## Install

### NPM/Yarn

- NPM: `npm install @cosmic-plus/ledger-wallet`
- Yarn: `yarn add @cosmic-plus/ledger-wallet`

In your scripts: `const ledgerWallet = require('@cosmic-plus/ledger-wallet')`

### Bower

`bower install cosmic-plus-ledger-wallet`

In your HTML pages:

```HTML
<script src="./bower_components/cosmic-plus-ledger-wallet/ledger-wallet.js"></script>
```

### HTML

```HTML
<script src="https://cdn.cosmic.plus/ledger-wallet@1.x"></script>
```

_Note:_ For production release it is advised to serve your own copy of the
libraries.

## Methods

### await ledgerWallet.connect([account_number])

This will wait for a connection with the Ledger Wallet application for Stellar.
If _account_number_ is not provided, account 0 will be used. Note that you'll
have to `ledgerWallet.disconnect()` if you want the library to stop listening
for a connection.

If at some point you need to make sure that the Ledger Wallet is still
connected, you can `await ledgerWallet.connect()` again (will re-use previously set _account_number_).

If you need to switch to another account, you can directly `await ledgerWallet.connect(new_account_number)` without prior deconnection.

### await ledgerWallet.sign(transaction)

Ask the user to confirm _transaction_ on its Ledger Wallet. If confirmed,
returns the signed transaction. Else, throw an error.

This method requires that you `ledgerWallet.connect()` first.

### ledgerWallet.disconnect()

Close the connection with Ledger Wallet Stellar application, or stop listening
for a connection if none have been established.

## Events

### ledgerWallet.onConnect = Function

_Function_ to execute on connection.

### ledgerWallet.onDisconnect = Function

_Function_ to execute on disconnection.

## Properties

Those properties become available once the Ledger device is connected.

### ledgerWallet.publicKey

Contains the public key of the selected account.

### ledgerWallet.path

Contains the bip path for the selected account

### ledgerWallet.version

Ledger Wallet Stellar application version.

### ledgerWallet.multiOpsEnabled

Whether or not user accept to sign transactions without checking them on the
device first. This allows to sign long transactions that could normally not be
handled by the device memory, but this is insecure.

### ledgerWallet.transport

The Ledger Transport instance (internal component).

### ledgerWallet.application

The Ledger Stellar application instance (internal component).

## Feedback & More

You'll find several ways to contact me at <https://cosmic.plus>.
