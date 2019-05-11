// gulp
const gulp         = require("gulp");

// packages
const sass         = require("gulp-sass");
const sourcemaps   = require("gulp-sourcemaps");
const postcss      = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano      = require("cssnano");
const rename       = require("gulp-rename");
const plumber      = require("gulp-plumber");
const paths        = require("./paths");

// Styles Task
const stylesBuild = () => {
  const plugins = [
    autoprefixer({browsers: ["last 1 version"]}),
    cssnano()
  ];

  return gulp
    .src(paths.src.sass)
    .pipe(sourcemaps.init({
      loadMaps: true
    }))
    .pipe(sass({
      outputStyle: "expanded"
    }))
    .pipe(plumber())
    .pipe(postcss(plugins))
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest(paths.dest.sass));
};

// exports
module.exports = {
  build: stylesBuild
};
