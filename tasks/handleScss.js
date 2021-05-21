const { src, dest, watch } = require('gulp')
const sass = require('gulp-dart-sass')
const sassGlob = require('gulp-sass-glob')
const autoprefix = require('gulp-autoprefixer')
const path = require('../paths.config')
const browserSync = require('browser-sync')
const replace = require('gulp-string-replace')
const clearCss = require('gulp-clean-css')

// =======================

const fontUrlRegExp = /src:\s*?url[\(].+\/(.+)\.ttf[\)]/gm

// =======================

function devHandleScss () {
  return src(path.src.scss.dev)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(replace(fontUrlRegExp, (_, filename) => `src:url(/fonts/${filename}.ttf)`))
    .pipe(dest(path.dist.css))
}

function prodHandleScss () {
  return src(path.src.scss.prod)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefix({browsers: ['last 10 version']}))
    .pipe(replace(fontUrlRegExp, (_, filename) => `src:url(/fonts/${filename}.ttf)`))
    .pipe(cleanCss())
    .pipe(desc(path.dist.css))
}

function watchScss () {
  watch(path.src.scss.watch, devHandleScss).on('change', browserSync.reload)
}

// =======================

module.exports = {
  devHandleScss,
  prodHandleScss,
  watchScss
}