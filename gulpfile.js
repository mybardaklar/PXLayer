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
      babel         = require('gulp-babel');

// Image related plugins
const imagemin      = require('gulp-imagemin');

// Utility plugins
const rename        = require('gulp-rename'),
      sourcemaps    = require('gulp-sourcemaps'),
      plumber       = require('gulp-plumber');

// Browers related plugins
const browserSync   = require('browser-sync').create();

// Project related variables
const pugSRC        = './src/pug/*.pug',
      pugURL        = './dist';

const sassSRC       = './src/sass/*.sass',
      sassURL       = './dist/css';

const jsSRC         = './src/js/app.js',
      jsURL         = './dist/js';

const imgSRC        = './src/img/*',
      imgURL        = './dist/img';

const fontSRC       = './src/fonts/**/*',
      fontURL       = './dist/fonts';

const pugWatch      = './src/pug/**/*.pug';
const sassWatch     = './src/sass/**/*.sass';
const jsWatch       = './src/js/**/*.js';
const imgWatch      = './src/img/**/*';
const fontWatch     = './src/fonts/**/*';

// Task for compiling Pug templates
gulp.task('pug', () => {
  return gulp.src(pugSRC)
    .pipe(plumber())
    .pipe(pug({ doctype: 'html' }))
    .pipe(prettify({indent_char: ' ', indent_size: 2}))
    .pipe(gulp.dest(pugURL))
    .pipe(browserSync.stream());
});

// Task for ompiling SASS files
gulp.task('sass', () => {
  return gulp.src(sassSRC)
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass({
      errLogToConsole: true
    }).on('error', console.error.bind(console)))
    .pipe(autoprefixer({
      browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
    }))
    .pipe(uglifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(sassURL))
    .pipe(browserSync.stream());
});

// Task for compiling JS files
gulp.task('js', () => {
  return gulp.src(jsSRC)
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsURL))
    .pipe(browserSync.stream());

  return browserify(jsSRC)
    .transform(babelify, { presets: ['@babel/preset-env'] })
    .bundle()
    .pipe(source('app.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(buffer())
    .pipe(gulpif(options.has('production'), stripDebug()))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(jsURL))
    .pipe(browserSync.stream());
});

// Task for compressing image files
gulp.task('img', () => {
  return gulp.src(imgSRC)
    .pipe(imagemin())
    .pipe(gulp.dest(imgURL))
    .pipe(browserSync.stream());
});

// Task for copying font files
gulp.task('fonts', () => {
  return gulp.src(fontSRC)
    .pipe(plumber())
    .pipe(gulp.dest(fontURL))
    .pipe(browserSync.stream());
});

// Server task
gulp.task('serve', ['pug', 'sass', 'js', 'img', 'fonts'], () => {
  browserSync.init({
    server: './dist'
  });

  gulp.watch(pugWatch, ['pug']);
  gulp.watch(sassWatch, ['sass']);
  gulp.watch(jsWatch, ['js']);
  gulp.watch(imgWatch, ['img']);
  gulp.watch(fontWatch, ['fonts']);

  gulp.watch('./dist/.html').on('change', browserSync.reload);
});
gulp.task('default', ['serve']);
