// file paths
module.exports = {
  build: './dist',
  src: {
    template: './views/*.pug',
    sass: './assets/sass/**/*.+(scss|sass)',
    js: './assets/js/main.js',
    svg: './assets/svg/**/*.svg',
    img: './assets/img/**/*',
    font: './assets/fonts/**/*'
  },
  dest: {
    template: './dist',
    sass: './dist/css',
    js: './dist/js',
    svg: './assets/svg-min',
    img: './dist/img',
    font: './dist/fonts'
  },
  watch: {
    template: './views/**/*.pug',
    sass: './assets/sass/**/*.+(scss|sass)',
    js: './assets/js/**/*.js',
    svg: './assets/svg/**/*.svg',
    img: './assets/img/**/*',
    font: './assets/fonts/**/*'
  },
  clean: {
    template: './dist/*.html',
    svg: './assets/svg-min/**/*',
    img: './dist/img/**/*',
    font: './dist/fonts/**/*'
  }
}
