// gulp
const gulp     = require("gulp");

// packages
const pug      = require("gulp-pug");
const prettify = require("gulp-html-prettify");
const plumber  = require("gulp-plumber");
const paths    = require("./paths");

// template task
const templatesBuild = () => {
  return gulp
    .src(paths.src.template)
    .pipe(plumber())
    .pipe(pug({
      doctype: "html",
      data: {
        fs: require("fs")
      }
    }))
    .pipe(prettify({indent_char: " ", indent_size: 2}))
    .pipe(gulp.dest(paths.dest.template));
};

// exports
module.exports = {
  build: templatesBuild
};
