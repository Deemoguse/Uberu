const {src, dest, watch} = require('gulp')
const path = require('../paths.config')

// ================

function handleFonst () {
  return src(path.src.fonts)
    .pipe(dest(path.dist.fonts))
}

function watchFonts () {
  watch(path.src.fonts, handleFonst)
}

// ================

module.exports = {
  handleFonst,
  watchFonts,
}