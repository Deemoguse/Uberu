const { src, dest, watch } = require('gulp')
const replace = require('gulp-string-replace')
const path = require('../paths.config')
const pug = require('gulp-pug')
const pugLinter = require('gulp-pug-linter')
const pugLintStylish = require('puglint-stylish')

// =======================

const pugLinterOptions = {
  failAfterError: true,
  reporter: pugLintStylish
}

// =======================

function devHandlePug () {
  return src(path.src.pug.dev)
    .pipe(pugLinter(pugLinterOptions))
    .pipe(pug())
    .pipe(dest(path.dist.html))
}

function prodHandlePug () {
  const imgRegExp = /src\s*=\s*['"][^'"]+\/(\w+|\b)\.(jpg|png|svg)['"]/gi
  const imgRegExpFunction = (initialString, filename, extname) => {
    switch (extname) {
      case 'svg': case 'png': case 'jpg':
        return `src="img/${filename}.${extname}"`
      default:
        return initialString
    }
  }

  return src(path.src.pug.prod)
    .pipe(pugLinter(pugLinterOptions))
    .pipe(pug())
    .pipe(replace(imgRegExp, imgRegExpFunction))
    .pipe(dest(path.dist.html))
}

function watchPug () {
  watch(path.src.pug.watch, devHandlePug)
}

// =======================

module.exports = {
  devHandlePug,
  prodHandlePug,
  watchPug
}
