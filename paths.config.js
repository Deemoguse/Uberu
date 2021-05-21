const baseSrc = 'src'
const baseDist = 'dist'

module.exports = {
  baseSrc,
  baseDist,
  src: {
    pug: {
      dev: baseSrc + '/index.pug',
      prod: baseSrc + '/index.pug',
      watch: baseSrc + '/**/*.pug'
    },
    scss: {
      dev: baseSrc + '/assets/scss/index.scss',
      prod: baseSrc + '/assets/scss/index.scss',
      watch: baseSrc + '/assets/scss/**/*.scss',
    },
    ts: {
      dev: baseSrc + '/scripts/index.ts',
      prod: baseSrc + '/scripts/index.ts',
      watch: baseSrc + '/scripts/**/*.ts'
    },
    img: {
      dev: baseSrc + '/assets/img/**/**',
      prod: baseSrc + '/assets/img/**/**',
      watch: baseSrc + '/assets/img/**/**'
    },
  },
  dist: {
    html: baseDist,
    css: baseDist,
    js: baseDist,
    img: baseDist + '/img/',
  }
}