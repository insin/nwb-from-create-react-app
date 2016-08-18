As an alternative to ejecting from [create-react-app](https://github.com/facebookincubator/create-react-app) v0.2, [nwb](https://github.com/insin/nwb) v0.12 provides what should be a compatible zero-configuration setup for what you can do with your app in terms of the Babel features and Webpack loaders available, and default polyfills applied.

## Switching to `nwb` from a `create-react-app` app

- Move `index.html` into `src/` - nwb looks here by default and falls back to a default template if not present.

- Create a `public/` directory and move `favicon.ico` into it - nwb serves static content from this directory when developing and copies its contents to `dist/` when building.

- Tweak package.json to use nwb and its development commands.

  ```diff
   "devDependencies": {
  -  "react-scripts": "0.2.1"
  +  "nwb": "0.12.0"
   },
  ```
  ```diff
   "scripts": {
  -    "start": "react-scripts start",
  -    "build": "react-scripts build",
  -    "eject": "react-scripts eject"
  +    "start": "nwb serve-react-app",
  +    "build": "nwb build-react-app",
  +    "test": "nwb test",
  +    "test:coverage": "nwb test --coverage",
  +    "test:watch": "nwb test --server"
   }
  ```

- Tweak `.gitignore` - nwb generates builds in `dist/` and generates test coverage reports in`coverage/`.

  ```diff
   # production
  -build
  +dist
  +
  +# testing
  +coverage
  ```

## Configuration

You can create a `nwb.config.js` file to [provide configuration](https://github.com/insin/nwb/blob/master/docs/Configuration.md#configuration) and install [plugin modules](https://github.com/insin/nwb/blob/master/docs/Plugins.md#plugins) to add new functionality.

### CSS Modules

The following `nwb.config.js` will configure use of CSS modules for your app's CSS:

```js
module.exports = {
  webpack: {
    loaders: {
      css: {
        modules: true,
        localIdentName: '[name]__[local]__[hash:base64:5]'
      }
    }
  }
}
```

See [the `css-modules` branch](https://github.com/insin/nwb-from-create-react-app/tree/css-modules) for a working example.

### Sass

Installing `nwb-sass` will allow you to import `.scss` and `.sass` files:

```
npm install --save-dev nwb-sass
```

See [the `sass` branch](https://github.com/insin/nwb-from-create-react-app/tree/sass) for a working example.

## Testing

Without doing anything else, you can now write tests using Mocha and Expect in `-test.js`, `.test.js` or `.spec.js` files anywhere under `src/` or `tests/` and use the new test commands to run them in PhantomJS with Karma.

- `npm run test` - run tests once
- `npm run test:coverage` - run tests and create a coverage report in `coverage/`
- `npm run test:watch` - run tests on every change

## Missing / Different features

- nwb doesn't configure default ESLint rules as part of its Webpack setup.
- The nwb dev server doesn't support proxying; nwb only provides middleware for using its build in your own Express server.
- Use [`webpack.publicPath` config](https://github.com/insin/nwb/blob/master/docs/Configuration.md#publicpath-string) in `nwb.config.js` instead of `"homepage"` config in `package.json` to configure the public path to static assets.
