const { series, src } = require('gulp')
const browserSync = require('browser-sync')
const clean = require('gulp-clean')

// ================================================

const { baseDist } = require('./paths.config')
const { devHandleImg, prodHandleImg, watchImg } = require('./tasks/handleImg')
const { devHandlePug, prodHandlePug, watchPug  } = require('./tasks/handlePug')
const { devHandleScss, prodHandleScss, watchScss } = require('./tasks/handleScss')
const { devHandleTs, prodHandleTs, watchTs } = require('./tasks/handleTs')
const { handleFonst, watchFonts } = require('./tasks/handleFonst')

// ================================================

const cleanDist = () => src(baseDist + '/*').pipe(clean())

const startServe = () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    watch: true,
    notify: false
  })

  watchPug()
  watchTs()
  watchScss()
  watchImg()
  watchFonts()
}

// ================================================

exports.serve = series(cleanDist, devHandlePug, devHandleTs, devHandleScss, handleFonst, devHandleImg, startServe)
exports.build = series(cleanDist, prodHandlePug, prodHandleTs, prodHandleScss, handleFonst, prodHandleImg)