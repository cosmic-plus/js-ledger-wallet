**ledger-wallet /**
[Readme](https://cosmic.plus/#view:js-ledger-wallet)
• [Examples](https://cosmic.plus/#view:js-ledger-wallet/EXAMPLES)
• [Contributing](https://cosmic.plus/#view:js-ledger-wallet/CONTRIBUTING)
• [Changelog](https://cosmic.plus/#view:js-ledger-wallet/CHANGELOG)

# Contributing

Welcome to new contributors! This project is open to input & edits.

## Bug Reports & Feature Requests

Please use the [dedicated form](https://github.com/cosmic-plus/js-ledger-wallet/issues/new/choose).

## Pull Requests

1. Fork [js-ledger-wallet](https://github.com/cosmic-plus/js-ledger-wallet).
2. Commit your changes to the fork.
3. Create a pull request.

If you want to implement a new feature, please get in touch first:
[Keybase](https://keybase.io/team/cosmic_plus),
[Telegram](https://t.me/cosmic_plus), [Email](mailto:mister.ticot@cosmic.plus).

## Project Structure

- `es5/`: JS transpiled code (generated at build time, not commited).
- `src/`: JS source code.
- `static/`: Static files, added to `web/` at build time.
- `test/`: Test suite.
- `web/`: JS bundled code (generated at build time, commited in a submodule).

## Workflow

**Clone:**

```
git clone https://git.cosmic.plus/js-ledger-wallet
cd js-ledger-wallet
npm run get
```

**Commit:**

```
npm run test
npm run lint
git ci ...
```

Please sign your commits with your PGP key.

**Release:**

First of all update the package version into `package.json`.

```
export version={semver}
npm run make-release
npm run publish-release
```

Please sign your commits and tags with your PGP key.

## Scripts

Those helpers require a POSIX shell.

- `npm run get`: Fetch the `web` sub-repository.
- `npm run test`: Run the test suite.
- `npm run lint`: Lint code.
- `npm run clean`: Clean the `web/` directory.
- `npm run watch`: Automatically transpile & bundle code after each change.
- `npm run build`: Build the production transpiled code & browser bundle.
- `npm run check`: Check the production browser bundle integrity.
- `version={semver} npm run make-release`: Build & locally commit release.
- `version={semver} npm run publish-release`: Check, tag, push & publish release.
