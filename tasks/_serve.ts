import browsersync from 'browser-sync'
import { watchFonst } from './fonts.handler'
import { watchPug } from './pug.handler'
import { watchScss } from './scss.handler'
import { watchTS } from './ts.handler'

export function serve () {
  browsersync.init({
    server: "./dist/",
    port: 4000,
    notify: false
  })

  watchTS()
  watchPug()
  watchScss()
  watchFonst()
}

export default serve