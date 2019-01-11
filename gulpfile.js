const gulp     = require('gulp');
const plumber  = require('gulp-plumber');

const pug      = require('gulp-pug'),
      prettify = require('gulp-html-prettify');

const sass         = require('gulp-sass'),
      cleanCSS     = require('gulp-clean-css'),
      autoprefixer = require('gulp-autoprefixer');

const imagemin    = require('gulp-imagemin');
const concat      = require('gulp-concat');
const sourcemaps  = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

const filesToCopy = [
  './src/favicon.png',
  './src/js/*'
];

sass.compiler = require('node-sass');

gulp.task('pug', () => {
  return gulp.src('./src/pug/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src('./src/scss/*.scss')
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(concat('app.min.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('img', () => {
  return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'))
    .pipe(browserSync.stream());
});

gulp.task('copy', () => {
  return gulp.src(filesToCopy, { base: './src' })
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['pug', 'sass', 'img', 'copy'], () => {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('./src/pug/**/*.pug', ['pug']);

  gulp.watch('./src/scss/**/*.scss', ['sass']);

  gulp.watch('./src/img/*', ['img']);

  gulp.watch(filesToCopy, ['copy']);

  gulp.watch('./dist/.html').on('change', browserSync.reload);
});

gulp.task('default', ['serve']);