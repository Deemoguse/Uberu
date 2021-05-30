import { src, dest, watch } from 'gulp'
import browsersync from 'browser-sync'
import webpackStream from 'webpack-stream'
import { Configuration } from 'webpack'
import { _src, _dist } from './_paths'
import yargs from 'yargs'

// @ts-ignore
const production = yargs.argv.prod

const webpackConfig: Configuration = {
  mode: production ? 'production' : 'development',
  module: {
    rules: [{
      test: /\.(js|ts)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  resolve: {
    extensions: ['.ts','.js'],
  },
  output: {
    filename: 'main.js',
    publicPath: '/'
  }
}

function handleTS () {
  return src(_src.ts.file)
    .pipe(webpackStream(webpackConfig))
    .pipe(dest(_dist.js))
    .pipe(browsersync.stream())
}

function watchTS () {
  watch(_src.ts.watch, handleTS)
}

export {
  handleTS,
  watchTS,
}