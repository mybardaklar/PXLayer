/* eslint-disable */
const gulp = require('gulp');

// Pug related plugins
const pug           = require('gulp-pug'),
      prettify      = require('gulp-html-prettify');

// CSS related plugins
const sass          = require('gulp-sass'),
      uglifycss     = require('gulp-uglifycss'),
      autoprefixer  = require('gulp-autoprefixer');
      sass.compiler = require('node-sass');

// JS related plugins
const uglify        = require('gulp-uglify'),
      babelify      = require('babelify'),
      browserify    = require('browserify'),
      source        = require('vinyl-source-stream'),
      buffer        = require('vinyl-buffer'),
      stripDebug    = require('gulp-strip-debug');

// Image related plugins
const imagemin      = require('gulp-imagemin');

// SVG related plugins
const svgstore      = require('gulp-svgstore'),
      svgmin        = require('gulp-svgmin');

// Utility plugins
const rename        = require('gulp-rename'),
      sourcemaps    = require('gulp-sourcemaps'),
      plumber       = require('gulp-plumber'),
      options       = require('gulp-options'),
      gulpif        = require('gulp-if'),
      path          = require('path');

// Browers related plugins
const browserSync   = require('browser-sync').create();

// Project related variables
const SRC = {
  pug : './src/pug/*.pug',
  sass: './src/sass/*.sass',
  js  : './src/js/app.js',
  svg : './src/svg/*.svg',
  img : './src/img/*',
  font: './src/fonts/**/*'
}
const DEST = {
  pug : './dist',
  sass: './dist/css',
  js  : './dist/js',
  svg : './dist/img',
  img : './dist/img',
  font: './dist/fonts'
}
const WATCH = {
  pug : './src/pug/**/*.pug',
  sass: './src/sass/**/*.sass',
  js  : './src/js/**/*.js',
  svg : './src/svg/**/*.svg',
  img : './src/img/**/*',
  font: './src/fonts/**/*'
}

// Task for compiling Pug templates
gulp.task('pug', () => {
  return gulp.src(SRC.pug)
    .pipe(plumber())
    .pipe(pug({ doctype: 'html' }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(DEST.pug))
    .pipe(browserSync.stream());
});

// Task for ompiling SASS files
gulp.task('sass', () => {
  return gulp.src(SRC.sass)
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', console.error.bind(console)))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    }))
    .pipe(uglifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST.sass))
    .pipe(browserSync.stream());
});

// Task for compiling JS files
gulp.task('js', () => {
  return browserify(SRC.js)
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(buffer())
    .pipe(gulpif(options.has('production'), stripDebug()))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(DEST.js))
    .pipe(browserSync.stream());
});

// Task for compressing svg files
gulp.task('svgstore', () => {
  return gulp.src(SRC.svg)
    .pipe(svgmin(file => {
      const prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(rename({ prefix: 'pxl-icon-' }))
    .pipe(svgstore())
    .pipe(rename({ basename: 'pxl-svg-sprite' }))
    .pipe(gulp.dest(DEST.svg))
    .pipe(browserSync.stream());
});

// Task for compressing image files
gulp.task('img', () => {
  return gulp.src(SRC.img)
    .pipe(imagemin())
    .pipe(gulp.dest(DEST.img))
    .pipe(browserSync.stream());
});

// Task for copying font files
gulp.task('fonts', () => {
  return gulp.src(SRC.font)
    .pipe(plumber())
    .pipe(gulp.dest(DEST.font))
    .pipe(browserSync.stream());
});

// Server task
gulp.task('serve', ['pug', 'sass', 'js', 'svgstore', 'img', 'fonts'], () => {
  browserSync.init({
    server: './dist'
  });

  gulp.watch(WATCH.pug , ['pug']);
  gulp.watch(WATCH.sass, ['sass']);
  gulp.watch(WATCH.js  , ['js']);
  gulp.watch(WATCH.svg , ['svgstore']);
  gulp.watch(WATCH.img , ['img']);
  gulp.watch(WATCH.font, ['fonts']);

  gulp.watch('./dist/*.html').on('change', browserSync.reload);
});
gulp.task('default', ['serve']);
