[npm]: https://img.shields.io/npm/v/rollup-plugin-install
[npm-url]: https://www.npmjs.com/package/rollup-plugin-install
[size]: https://packagephobia.now.sh/badge?p=rollup-plugin-install
[size-url]: https://packagephobia.now.sh/result?p=rollup-plugin-install

# rollup-plugin-install

[![npm][npm]][npm-url]
[![size][size]][size-url]

## Usage

- run `yarn add rollup-plugin-install --dev`
- add the plugin into `vite.config.js` or `rollup.config.js`

``` js
// vite.config.js
const { autoInstallPlugin } = require('rollup-plugin-install')

module.exports = {
  plugins: [autoInstallPlugin(/*options*/)],
}
```

## Options

### `bin`

Type: `'npm' | 'yarn'`<br>
Default: `npm`

use `npm` or `yarn` to install npm module
