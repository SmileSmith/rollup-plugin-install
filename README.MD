# rollup-plugin-install

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
