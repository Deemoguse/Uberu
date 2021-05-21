const { src, dest, watch } = require('gulp')
const sass = require('gulp-sass')
const sassGlob = require('gulp-sass-glob')
const autoprefix = require('gulp-autoprefixer')
const path = require('../paths.config')
const browserSync = require('browser-sync')

// =======================

function devHandleScss () {
  return src(path.src.scss.dev)
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(dest(path.dist.css))
}

function prodHandleScss () {
  return src(path.src.scss.prod)
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefix({
      browsers: ['last 10 version']
    }))
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