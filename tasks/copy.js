// gulp
const gulp = require('gulp')

// packages
const plumber = require('gulp-plumber')
const paths = require('./paths')

// copy fonts
const copyFonts = () => {
  return gulp
    .src(paths.src.font)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dest.font))
}

// exports
module.exports = {
  fonts: copyFonts
}
