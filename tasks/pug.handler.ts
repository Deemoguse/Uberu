import { src, dest, watch } from 'gulp'
import browsersync from 'browser-sync'
import replace from 'gulp-string-replace'
import pug from 'gulp-pug'
import { _src, _dist } from './_paths'
import localsPug from '../src/locals.pug'

function devHandlePug () {
  return src(_src.pug.file)
    .pipe(pug({locals: localsPug}))
    .pipe(dest(_dist.html))
    .pipe(browsersync.stream())
}

function prodHandlePug () {
  const pathRegExp = /src\s*=\s*['"][^'"]+\/(\w+|\b)\.(jpg|png|svg)['"]/gi
  const pathRegExpFunction = (initialString: string, filename: string, extname: string) => {
    switch (extname) {
      case 'svg': case 'png': case 'jpg':
        return `src="assets/${filename}.${extname}"`
      default:
        return initialString
    }
  }

  return src(_src.pug.file)
    .pipe(pug({locals: localsPug}))
    .pipe(replace(pathRegExp, pathRegExpFunction))
    .pipe(dest(_dist.html))
}

function watchPug () {
  watch(_src.pug.watch, devHandlePug)
}

export {
  devHandlePug,
  prodHandlePug,
  watchPug
}