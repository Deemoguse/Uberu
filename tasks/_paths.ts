const _baseSrc = 'src'
const _baseDist = 'dist'

const _src = {
  ts: {
    file: _baseSrc + '/main.ts',
    watch: _baseSrc + '/**/*.ts'
  },
  pug: {
    file: _baseSrc + '/*.pug',
    watch: _baseSrc + '/**/*.pug'
  },
  scss: {
    file: [_baseSrc + '/assets/style/index.scss', _baseSrc + '/components/**/*.scss'],
    watch: _baseSrc + '/**/*.scss'
  },
  img: {
    file: _baseSrc + '/assets/**/*.{svg,png,jpg}',
    watch: _baseSrc + '/assets/**/*.{svg,png,jpg}'
  },
  fonts: {
    file: _baseSrc + '/assets/fonts/**/*.{woff2,woff,ttf,eot}',
    watch: _baseSrc + '/assets/fonts/**/*.{woff2,woff,ttf,eot}',
  }
}

const _dist = {
  js: _baseDist + '/',
  html: _baseDist + '/',
  css: _baseDist + '/',
  img: _baseDist + '/assets/',
  fonts: _baseDist + '/assets/fonts/'
}

export {
  _src,
  _dist,
  _baseSrc,
  _baseDist,
}