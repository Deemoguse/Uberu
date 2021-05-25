const baseSrc = 'src'
const baseDist = 'dist'

module.exports = {
  baseSrc,
  baseDist,
  src: {
    pug: {
      dev: baseSrc + '/index.pug',
      prod: baseSrc + '/index.pug',
      watch: baseSrc + '/**/*.pug',
    },
    scss: {
      dev: baseSrc + '/assets/scss/index.scss',
      prod: baseSrc + '/assets/scss/index.scss',
      watch: baseSrc + '/assets/scss/**/*.scss',
    },
    ts: {
      dev: baseSrc + '/scripts/**/*.ts',
      prod:baseSrc + '/scripts/**/*.ts',
      contac: [
        __dirname + '/node_modules/animejs/lib/anime.min.js'
      ],
      watch: baseSrc + '/scripts/**/*.ts'
    },
    img: {
      dev: baseSrc + '/assets/img/**/**',
      prod: baseSrc + '/assets/img/**/**',
      watch: baseSrc + '/assets/img/**/**',
    },
    fonts: baseSrc + '/assets/fonts/**/*.ttf',
  },
  dist: {
    html: baseDist,
    css: baseDist,
    js: baseDist,
    img: baseDist + '/img/',
    fonts: baseDist + '/fonts/',
  }
}