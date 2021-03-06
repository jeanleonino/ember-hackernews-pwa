/* eslint-env node */
'use strict'

const EmberApp = require('ember-cli/lib/broccoli/ember-app')
const autoprefixer = require('autoprefixer')
const targets = require('./config/targets')

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    'ember-cli-babel': {
      includePolyfill: false,
    },

    // babel: {
    //   // plugins: ['minify-dead-code-elimination'],
    //   // presets: ['minify'],
    // },

    'asset-cache': {
      version: '6',

      include: [
        'assets/hn*.js',
        'assets/**/**/*',
        // 'assets/images/ember-hn192.png',
        // 'assets/images/ember-hn512.png',
        // 'assets/images/ember-hn180.png',
      ],
      exclude: [
        'assets/**/*.map',
        'assets/vendor*.js',
        'assets/vendor*.css',
        'assets/hackernews*.js',
        // 'assets/hackernews*.css',
        'assets/*test*',
        'assets/passed.png',
        'assets/failed.png',
      ],

      lenientErrors: false,
    },

    'ember-service-worker': {
      // registrationStrategy: 'async',
      registrationStrategy: 'inline',
      versionStrategy: 'every-build',
    },

    'ember-cli-critical': {
      critical: {
        minify: true,
        inlineImages: true,
      },
    },

    fingerprint: {
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
      // prepend: 'https://hackernews.io/'
    },

    postcssOptions: {
      compile: {
        enabled: false,
      },
      filter: {
        enabled: true,
        plugins: [
          {
            module: autoprefixer,
            options: {
              browsers: targets.browsers,
            },
          },
        ],
      },
    },

    minifyHTML: {
      enabled: true,
      htmlFiles: ['index.html'],
      minifierOptions: {
        useShortDoctype: true,
        sortClassName: true,
        sortAttributes: true,
        removeRedundantAttributes: true,
        // removeOptionalTags: true,
        removeAttributeQuotes: true,
        maxLineLength: 80,
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true,
        minifyCSS: false,
      },
    },

    vendorFiles: {
      'jquery.js': null,
      'vendor.css': null,
    },

    emberCliConcat: {
      enabled: true,
      outputDir: 'assets',
      outputFileName: 'hn',
      useSelfClosingTags: false,
      wrapScriptsInFunction: false,
      treeTypes: ['all'],

      js: {
        useAsync: true,
        concat: true,
        contentFor: 'concat-js',
        footer: null,
        header: null,
        preserveOriginal: true,
      },

      css: {
        concat: false,
        contentFor: 'concat-css',
        footer: null,
        header: null,
        preserveOriginal: true,
      },
    },

    imagemin: {
      enabled: true,
      plugins: [require('imagemin-optipng')(), require('imagemin-svgo')()],
    },
  })

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // app.import('app/styles/loader.scss', { outputFile: 'loader.css' })

  return app.toTree()
}
