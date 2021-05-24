const {src, dest, watch} = require('gulp')
const path = require('../paths.config')

// ================

function handleFonts () {
  return src(path.src.fonts)
    .pipe(dest(path.dist.fonts))
}

function watchFonts () {
  watch(path.src.fonts, handleFonts)
}

// ================

module.exports = {
  handleFonts,
  watchFonts,
}