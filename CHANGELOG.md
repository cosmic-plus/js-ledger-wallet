**ledger-wallet /**
[Readme](https://cosmic.plus/#view:js-ledger-wallet)
• [Examples](https://cosmic.plus/#view:js-ledger-wallet/EXAMPLES)
• [Contributing](https://cosmic.plus/#view:js-ledger-wallet/CONTRIBUTING)
• [Changelog](https://cosmic.plus/#view:js-ledger-wallet/CHANGELOG)

# Changelog

All notable changes to this project will be documented in this file.

This project adheres to **[Semantic
Versioning](https://semver.org/spec/v2.0.0.html)**. Version syntax is
`{major}.{minor}.{patch}`, where a field bump means:

- **Patch**: The release contains bug fixes.
- **Minor**: The release contains backward-compatible changes.
- **Major**: The release contains compatibility-breaking changes.

**Remember:** Both micro and minor releases are guaranteed to respect
backward-compatibility and can be updated to without risk of breakage. For major
releases, please check this changelog before upgrading.

## 2.6.0 - 2020-11-08

### Changed

- Logic: Update Ledger libraries to 5.28.x.

## 2.5.0 - 2020-09-12

### Changed

- Logic: Update @ledger libraries to 5.23.x.

## 2.4.0 - 2020-06-21

### Changed

- Meta: Switch to `@kisbox/helpers`.

### Fixed

- Meta: Remove redundant dependency.

## 2.3.0 - 2020-04-18

### Changed

- Logic: Update [@ledgerhq] libraries. (HID transport updates)

## 2.2.0 - 2020-02-01

### Changed

- Logic: Update @ledger libraries to 5.7.x. (dependencies updates, better
  errors)

## 2.1.0 - 2020-01-04

### Changed

- Logic: Upgrade @ledgerhq libraries to 5.x. This saves 16KiB or more when the
  library gets bundled.
- Logic: Improve device waiting. This should prevent errors due to device not
  being ready yet without re-introducing the invite spamming issue. If there's
  still issues in specific environments, please let me know on
  Keybase#cosmic_plus.

## 2.0.1 - 2019-12-29

### Chore

- Documentation: update README.md.

## 2.0.0 - 2019-12-28

### Breaking

- API: `.connect()` always connect to account 1. To ensure the device is still
  connected, code must now explicitly pass the same account parameter than for
  initialization (e.g: `.connect(4)`). Before `.connect()` was enough but it led
  to unexpected behavior.
- API: Account numbering now starts at 1. This is to be consistent with
  Ledger/Trezor account numbering. Code using `.connect(number)` must be updated
  accordingly. `.connect()` continues to select `m/44'/148'/0'` as before.
- API: `.path` is now properly prefixed by `m/`. (e.g.: `m/44'/148'/0'` instead
  of `44'/148'/0'`)

### Removed

- API: REMOVE deprecated properties & parameters. The following `ledgerWallet`
  properties have been removed: `.account`, `.index`, `.internalFlag`, and
  `.error`. The related parameters have been removed from `.connect()`
  (parameters 2 and 3 are now ignored).

### Added

- API: Add `.newAccount()`. This method connects the first unused account of a
  Ledger device. ([See
  documentation](https://cosmic.plus/#view:js-ledger-wallet/%23ledgerwalletnewaccount))
- API: Add `.scan()`. This method scans for existing accounts on the Ledger
  device. ([See
  documentation](https://cosmic.plus/#view:js-ledger-wallet/%23ledgerwalletscan))
- API: Add `.getPublicKeys()`. This method retrieves multiple public keys at
  once. ([See
  documentation](https://cosmic.plus/#view:js-ledger-wallet/%23ledgerwalletgetpublickeys))

### Fixed

- API: Ensure `.path` and `publicKey` are set only when connected.
- Logic: Fix the timing of `connect()`/`disconnect()`.

## 1.5.0 - 2019-11-26

### Changed

- Logic: Remove device polling. @cosmic-plus/ledger-wallet included logic for
  detecting device disconnections. However, this logic was causing alert
  spamming in some environments. Because there's no way to probe the device
  without making those messages appear, the only sane solution was to remove
  this feature.

### Fixed

- Logic: Fix `.connect()` errors handling. The old logic was causing some
  browsers to spam device requests.

## 1.4.0 - 2019-11-23

### Changed

- Logic: Update [@ledgerhq] libraries to 4.74.2. (bugfixes)

## 1.3.1 - 2019-11-09

### Changed

- Documentation: Update documentation.

## 1.3.0 - 2019-11-02

### Deprecated

- API: Deprecate `index` & `internalFlag` .connect() parameters. Those
  parameters were used to construct derivation paths after [BIP44]
  specifications. However, those are rarely used in Stellar & were removed from
  this library documentation months ago.

  The new way to specify arbitrary derivation paths is to pass them explicitly
  (e.g.: "m/44'/148'/1'/2'").

### Added

- API: Add support for arbitrary derivation paths. Example:
  `ledger.connect("m/44'/255'/5'")`

### Fixed

- Logic: Always use `null` for empty variables. The code was not consistent in
  its usage of `null` and `undefined`.

## 1.2.0 - 2019-10-26

### Changed

- Logic: Update Ledger libraries to 4.73.x. (bugfixes)

### Fixed

- Logic: Fix two timing bugs. - `onConnect` callback was fired before the end
  of initialization. - In some cases, polling could cause an alive session to
  disconnect.

## 1.1.2 - 2019-09-14

### Fixed

- Meta: Remove stellar-sdk from bower dependencies.

## 1.1.1 - 2019-08-31

### Fixed

- Documentation: Fix contributing guidelines.

## 1.1.0 - 2019-08-17

### Added

- Doc: Add EXAMPLES.md.

## 1.0.0 - 2019-08-10

**Note:** This major release doesn't contain any breaking change. The version
bump only means that this library is public and stable.

### Fixed

- Make bundlers pick the transpiled code.

## 0.3.6 - 2019-07-31

### Changed

- Remove `ledgerWallet.connect()` dependency on StellarSdk.

## 0.3.5 - 2019-07-26

### Changed

- Automate release procedure.
- Add contributing guidelines.
- Update Ledger libraries to 4.68.x

## 0.3.4 - 2019-07-20

### Changed

- Switch to new cosmic.plus paths (cdn.cosmic.plus, new repository name).
- Improve discoverability (add badges, keywords, set homepage...).

## 0.3.3 - 2019-06-22

### Changed

- Update Ledger libraries to 4.63.x.

## 0.3.2 - 2019-06-08

### Changed

- Update Ledger libraries to 4.61.x.

## 0.3.1 - 2019-05-03

### Changed

- Update Ledger libraries to 4.55.0.

## 0.3.0 - 2019-04-26

### Added

- Bundle transpiled ES5 code within the package.

## 0.2.20 - 2019-04-19

### Changed

- Update Ledger libraries to 4.53.0.

## 0.2.19 - 2019-04-01

### Changed

- Update Ledger libraries to 4.48.0.

## 0.2.18 - 2019-03-18

### Changed

- Update Ledger libraries to 4.46.0.

## 0.2.17 - 2019-03-13

### Changed

- Update Ledger libraries.

## 0.2.16 - 2019-03-09

### Changed

- Update Ledger libraries.

## 0.2.15 - 2019-03-04

### Changed

- Update Ledger libraries.

## 0.2.15 - 2019-03-04

### Changed

- Update Ledger libraries.

## 0.2.14 - 2019-02-26

### Changed

- Update Ledger libraries.

## 0.2.13 - 2019-02-22

### Changed

- Update Ledger libraries.

### Fixed

- Fix connection/disconnection polling for Node.js.

## 0.2.12 - 2019-02-14

### Fixed

- Prevent loss of connection while waiting for transaction confirmation.

## 0.2.11 - 2019-02-14

### Changed

- Update Ledger libraries.

## 0.2.10 - 2019-01-29

### Changed

- Update Ledger libraries.

## 0.2.09 - 2018-12-18

### Changed

- Update Ledger libraries.

## Older Releases

There is no changelog for older releases. Please look take a look at [commit
history](https://github.com/cosmic-plus/js-ledger-wallet/commits/master).

[bip44]: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
[@ledgerhq]: https://github.com/LedgerHQ/ledgerjs/releases
