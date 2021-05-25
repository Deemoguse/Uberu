const { src, dest, watch } = require('gulp')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const ts = require('gulp-typescript')
const babel = require('gulp-babel')
const browserSync = require('browser-sync')
const path = require('../paths.config')

// ==========================

const tsProject = ts.createProject('tsconfig.json')

// ==========================

function devHandleTs () {
  return src([...path.src.ts.contac, path.src.ts.dev])
    .pipe(tsProject())
    .pipe(concat('index.js'))
    .pipe(dest(path.dist.js))
}

function prodHandleTs () {
  return src([...path.src.ts.contac, path.src.ts.dev])
    .pipe(tsProject())
    .pipe(concat('index.js', {newLine: ';'}))
    .pipe(babel())
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
