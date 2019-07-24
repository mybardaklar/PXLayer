// gulp
const gulp          = require("gulp");

// packages
const eslint = require("gulp-eslint");
const babel  = require("gulp-babel");
const uglify = require("gulp-uglify");
const paths  = require("./paths");

// Lint scripts
const scriptsLint = () => {
  return gulp
    .src([
      "./assets/js/modules/**/*",
      "./assets/js/main.js",
      "./gulpfile.js"
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
};

// Scripts Task
const scriptsBuild = () => {
  return gulp
    .src(paths.src.js)
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.js));
};

// exports
module.exports = {
  lint: scriptsLint,
  build: scriptsBuild
};
