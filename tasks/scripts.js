// gulp
const gulp          = require("gulp");

// packages
const eslint        = require("gulp-eslint");
const webpack       = require("webpack");
const webpackStream = require("webpack-stream");
const webpackConfig = require("../webpack.config");
const paths         = require("./paths");

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
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(paths.dest.js));
};

// exports
module.exports = {
  lint: scriptsLint,
  build: scriptsBuild
};
