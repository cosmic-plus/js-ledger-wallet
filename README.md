# stellar-ledger-wallet

This is a wrapper around the official Ledger libraries for Stellar:

* [Stellar app API](https://www.npmjs.com/package/@ledgerhq/hw-app-str)
* [Transport Node HID](https://www.npmjs.com/package/@ledgerhq/hw-transport-node-hid) - Node.js only
* [Transport U2F](https://www.npmjs.com/package/@ledgerhq/hw-transport-u2f) - Browser only

Ledger wallets support may be a bit tricky to implement because it doesn't 
require the same libraries whether you're on Node.js or in web browser. Also, 
it requires [quite a few lines of 
code](https://github.com/MisterTicot/js-stellar-ledger-wallet/src/ledger.js) 
and does't give much clue about how bip path should be handled.

This library is solving that by loading the right dependencies automatically and
providing a few simple on-liners. When it is packed into a bundle, only the web
support is thrown in.

*Disclaimer:* This library is developped independently from the Stellar 
Foundation and Ledger.

## This is an alpha release

While the implemented features are supposed to work just fine, this library
have not been sufficiently tested to ensure reliability. Moreover, the
methods it exports may be subject to future modification in a
compatibility-breaking way.

Please don't use it in production yet. Please consider yourself a tester and 
report any issue or doubt you may encounter while using this software.

The beta release will be announced on [Galactic Talk](https://galactictalk.com).

## Install

### NPM/Yarn

* `npm install stellar-ledger-wallet`
* `yarn add stellar-ledger-wallet`

```js
import ledgerWallet from 'stellar-ledger-wallet'
// Or
const ledgerWallet = require('stellar-ledger-wallet')
```

### Bower

`bower install stellar-ledger-wallet`

In your HTML pages:

```HTML
  <body>
  ...
    <!-- Best placed at the end of body to not delay page loading -->
    <script src="./bower_components/stellar-sdk/stellar-sdk.min.js"></script>
    <script src="./bower_components/stellar-ledger-wallet/ledger-wallet.js"></script>
  </body>
```

### HTML

```HTML
  <body>
  ...
    <!-- Best placed at the end of body to not delay page loading -->
    <script src="https://unpkg.com/stellar-sdk/dist/stellar-sdk.min.js"></script>
    <script src="https://raw.github.com/MisterTicot/web-stellar-ledger-wallet/master/ledger-wallet.js"></script>
  </body>
```

*Note:* For production release it is advised to serve your own copy of the 
libraries.

## Get Started

### Connect to a Ledger wallet

This will try to connect until you call the disconnect method or until 
connection is established. Returns a *Promise* that will resolve when this 
happens and will reject in browser environment when the Ledger wallet can't be
supported

```js
/// ledgerWallet.connect(accountNumber)
ledgerWallet.connect(0)
  .then(function () { console.log('Ledger Wallet connected') })
  .catch(console.error)
```

You can use it before any other operation to ensure the device is connected. If 
a connection is already opened it will simply resolve without doing anything. 
In that case, you can also call connect() without any argument, and it will 
keep using the same account number.


### Disconnect

Close open connection and stop any running connection attempt.

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
ledgerWallet.sign(transaction)
  .then(function () { console.log('Transaction have been signed.') })
  .catch(console.error)
```

### More complex bip pathes

Optionaly you can pass the account index and internal flag:

```js
// ledgerWallet.connect([accountNumber], [accountIndex], [internalFlag])
// => bip path 44'/148'/accountNumber'/internalFlag'/accountIndex'
ledgerWallet.connect(2, 10)
ledgerWallet.connect(2, 10, true)
```

The usage of those fields is explained into the [Bitcoin Bip44 
Proposal](https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki). In 
general, you'll only need the account number. The account index is another way 
to derivate different addresses, and an account with the internal flag set to 
true should not be used publicly and is directly related to the account with 
the same values but without internal flag.


### Misc

Once connection is established:

Other available data:

* Stellar app version: ledgerWallet.version
* Bip path: ledgerWallet.path

Underlying components:

* Ledger Transport instance: ledgerWallet.transport
* Ledger Str App instance: ledgerWallet.application

## That's all Folks :)
