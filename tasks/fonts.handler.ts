import { src, dest, watch } from 'gulp'
import { _src, _dist } from './_paths'
import browsersync from 'browser-sync'

function handleFonts () {
  return src(_src.fonts.file)
    .pipe(dest(_dist.fonts))
    .pipe(browsersync.stream())
}

function watchFonst () {
  watch(_src.fonts.watch, handleFonts)
}

export {
  handleFonts,
  watchFonst
}