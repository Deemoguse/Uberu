import { parallel, series } from 'gulp'
import { handleTS } from './tasks/ts.handler'
import { devHandlePug, prodHandlePug } from './tasks/pug.handler'
import { devHandleScss, prodHandleScss } from './tasks/scss.handler'
import { devHandleImg, prodHandleImg } from './tasks/img.handler'
import { handleFonts } from './tasks/fonts.handler'
import serve from './tasks/_serve'
import clean from './tasks/_clean'

exports.serve = series(clean, parallel(handleTS, devHandlePug, devHandleScss, devHandleImg, handleFonts), serve)
exports.build = series(clean, parallel(handleTS, prodHandlePug, prodHandleScss, prodHandleImg, handleFonts))
exports.preview = series(clean, parallel(handleTS, devHandlePug, devHandleScss, devHandleImg, handleFonts))