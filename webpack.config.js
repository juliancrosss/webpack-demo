const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./config/webpack.parts');

const glob = require('glob');

// Glob CSS files as an array of CSS files. This can be
// problematic due to CSS rule ordering so be careful!
const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, './build'),
  //style: glob.sync('./app/**/*.css'),
};

const commonConfig = merge([
  {
    entry: {
      vendor: ['react'],
    },
    //plugins: [
      //new webpack.optimize.CommonsChunkPlugin({
        //name: 'vendor',
      //}),
    //],
  },
  {
    // Entries have to resolve to files! They rely on Node
    // convention by default so if a directory contains *index.js*,
    // it resolves to that.
    entry: {
      app: PATHS.app,
      //style: PATHS.style,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          eslint: {
            // Fail only on errors
            failOnWarning: false,
            failOnError: true,

            // Toggle autofix
            fix: false,

            // Output to Jenkins compatible XML
            outputReport: {
              filePath: 'checkstyle.xml',
              formatter: require('eslint/lib/formatters/checkstyle'),
            },
          },
        },
      }),
    ],
  },
  parts.lintJavaScript({ include: PATHS.app }),
  parts.lintCSS({ include: PATHS.app }),
  parts.loadFonts({
    options: {
      //name: '[name].[ext]',
      name: 'fonts/[name].[hash:8].[ext]',
    },
  }),
  parts.loadJavaScript({ include: PATHS.app }),
  parts.extractBundles([
    {
      name: 'vendor',
      minChunks: ({ resource }) => (
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/)
        ),
    },
    {
      name: 'manifest',
      minChunks: Infinity,
    },
  ]),
]);

//const productionConfig = () => commonConfig;
const productionConfig = merge([
  {
    //recordsPath: 'records.json',
    performance: {
      hints: 'warning', // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    output: {
      chunkFilename: '[name].[chunkhash:8].js',
      filename: '[name].[chunkhash:8].js',
    },
    plugins: [
      new webpack.HashedModuleIdsPlugin(),
    ],
  },
  //parts.extractCSS({ use: 'css-loader' }),
  parts.clean(PATHS.build),
  parts.minifyJavaScript({ useSourceMap: true }),
  parts.minifyCSS({
    options: {
      discardComments: {
        removeAll: true,
      },
      // Run cssnano in safe mode to avoid
      // potentially unsafe transformations.
      safe: true,
    },
  }),
  //parts.attachRevision(),
  parts.generateSourceMaps({ type: 'source-map' }),
  parts.extractCSS({
    use: ['css-loader', parts.autoprefix()],
  }),
  parts.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*`, { nodir: true }),
  }),
  parts.loadImages({
    options: {
      limit: 15000,
      //name: '[name].[ext]',
      name: 'img/[name].[hash:8].[ext]',
    },
  }),
  parts.setFreeVariable(
    'process.env.NODE_ENV',
    'production'
  ),
]);

const developmentConfig = merge([
  {
    output: {
      devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    },
  },
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map' }),
  parts.devServer({
    // Customize host/port here if needed
    host: process.env.HOST,
    port: process.env.PORT,
  }),
  parts.loadCSS(),
  parts.loadImages(),
]);

module.exports = (env) => {
  //console.log('env', env);

  //return commonConfig;
  if (env === 'production') {
    return merge(commonConfig, productionConfig);
  }

  //http://localhost:8080/webpack-dev-server/
  return merge(commonConfig, developmentConfig);
};