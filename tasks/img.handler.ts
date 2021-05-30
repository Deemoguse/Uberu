import { src, dest, watch } from 'gulp'
import imagemin from 'gulp-imagemin'
import flatten from 'gulp-flatten'
import browserSync from 'browser-sync'
import { _src, _dist } from './_paths'

function devHandleImg () {
  return src(_src.img.file)
    .pipe(dest(_dist.img))
    .pipe(browserSync.stream())
}

function prodHandleImg () {
  const imageminOptions = [
    imagemin.mozjpeg({quality: 75, progressive: true}),
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.gifsicle({optimizationLevel: 5})
  ]

  return src(_src.img.file)
    .pipe(flatten({includeParents: 0}))
    // .pipe(imagemin(imageminOptions))
    .pipe(dest(_dist.img))
}

function watchImg () {
  watch(_src.img.watch, devHandleImg)
}

export {
  devHandleImg,
  prodHandleImg,
  watchImg
}