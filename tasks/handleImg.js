const { src, dest, watch } = require('gulp')
const imagemin = require('gulp-imagemin')
const flatten = require('gulp-flatten')
const path = require('../paths.config');
const browserSync = require('browser-sync');

// =======================

function devHandleImg () {
  return src(path.src.img.dev)
    .pipe(dest(path.dist.img))
}

function prodHandleImg () {
  const imageminOptions = [
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.gifsicle({optimizationLevel: 5})
  ]

  return src(path.src.img.prod)
    .pipe(flatten({includeParents: 0}))
    .pipe(imagemin(imageminOptions))
    .pipe(dest(path.dist.img))
}

function watchImg () {
  watch(path.src.img.watch, devHandleImg).on('change', browserSync.reload)
}

// =======================

module.exports = {
  devHandleImg, 
  prodHandleImg, 
  watchImg
}