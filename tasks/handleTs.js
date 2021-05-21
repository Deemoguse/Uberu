const { src, dest, watch } = require('gulp')
const ts = require('gulp-typescript')
const browserSync = require('browser-sync')
const path = require('../paths.config')
const uglify = require('gulp-uglify')

// ==========================

const tsProject = ts.createProject('tsconfig.json')

// ==========================

function devHandleTs () {
  return src(path.src.ts.dev)
  .pipe(tsProject())
  .pipe(dest(path.dist.js))
}

function prodHandleTs () {
  return src(path.src.ts.dev)
  .pipe(tsProject())
  .pipe(uglify())
  .pipe(dest(path.dist.js))
}

function watchTs () {
  watch(path.src.ts.watch, devHandleTs).on('change', browserSync.reload)
}

// ==========================

module.exports = {
  devHandleTs,
  prodHandleTs,
  watchTs
}
