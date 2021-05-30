import { src, dest, watch } from 'gulp'
import sass from 'gulp-dart-sass'
import sassGlob from 'gulp-sass-glob'
import autoprefix from 'gulp-autoprefixer'
import browserSync from 'browser-sync'
import concat from 'gulp-concat-css'
import cleanCss from 'gulp-clean-css'
import replace from 'gulp-string-replace'
import { _src, _dist } from './_paths'
import yargs from 'yargs'

// @ts-ignore
const production = yargs.argv.prod

const pathRegExp = /url\s*[(]["']?[^()"']+\/([\w+\b_-]+)\.([\w+\b]+)["']?[)]/gi
const pathRegExpFunction = (initial: string, filename: string, extname: string) => {
  switch (extname) {
    case 'woff2': case 'woff': case 'ttf': case 'eot':
      return `url("assets/fonts/${filename}.${extname}")`
    default:
      return production ? `url("assets/${filename}.${extname}")` : initial
  }
}

function devHandleScss () {
  return src(_src.scss.file)
    .pipe(sassGlob({allowEmpty: true}))
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(replace(pathRegExp, pathRegExpFunction))
    .pipe(dest(_dist.css))
    .pipe(browserSync.stream())
}

function prodHandleScss () {
  return src(_src.scss.file)
    .pipe(sassGlob({allowEmpty: true}))
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(autoprefix())
    .pipe(cleanCss())
    .pipe(replace(pathRegExp, pathRegExpFunction))
    .pipe(dest(_dist.css))
}

function watchScss () {
  watch(_src.scss.watch, devHandleScss)
}

export {
  devHandleScss,
  prodHandleScss,
  watchScss
}