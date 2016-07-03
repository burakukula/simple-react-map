const webpack = require('webpack');
const fs      = require('fs');
const path    = require('path'),
      join    = path.join,
      resolve = path.resolve;

const getConfig = require('hjs-webpack');

const root    = resolve(__dirname);
const src     = join(root, 'src');
const modules = join(root, 'node_modules');
const dest    = join(root, 'dist');

const NODE_ENV = process.env.NODE_ENV;
const isDev = NODE_ENV === 'development';

var config = getConfig({
  isDev: isDev,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true,
  html: function (data) {
    // here we return an object where each key is a file to be generated
    return {
      '200.html': data.defaultTemplate(),
      'index.html': [
        '<html>',
          '<head>',
          '<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAMx8Sp3BWyNmKtGN52pYTI_JtaUnWNREU"></script>',
          '<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">',
          '</head>',
          '<body>',
            '<div id="root"></div>',
            '<script src="' + data.main + '"></script>',
          '</body>',
        '</html>'
      ].join('')
    }
  }
})
config.postcss = [].concat([
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({})
])
const dotenv = require('dotenv');

const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.config.js`),
  silent: true,
});
const envVariables =
    Object.assign({}, dotEnvVars, environmentEnv);

const defines =
  Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  }, {
    __NODE_ENV__: JSON.stringify(NODE_ENV)
  });

  config.plugins = [
    new webpack.DefinePlugin(defines)
  ].concat(config.plugins);

const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;
const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l &&
      l.loader && l.loader.match(match));
  return found ? found[0] : null;
}
// existing css loader
const cssloader =
  findLoader(config.module.loaders, matchCssLoaders);
  const newloader = Object.assign({}, cssloader, {
    test: /\.module\.css$/,
    include: [src],
    loader: cssloader.loader
      .replace(matchCssLoaders,
      `$1$2?modules&localIdentName=${cssModulesNames}$3`)
  })
  config.module.loaders.push(newloader);
  cssloader.test =
    new RegExp(`[^module]${cssloader.test.source}`)
  cssloader.loader = newloader.loader

config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: 'style!css'
})


module.exports = config;