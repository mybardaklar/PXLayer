// gulp
const gulp = require("gulp");

// packages
const imagemin = require("gulp-imagemin");
const paths    = require("./paths");

// optimize images in place
const optimiseImages = () => {
  return gulp
    .src(paths.src.img, { base: "./assets/img" })
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: false }, { collapseGroups: true }]
        })
      ])
    )
    .pipe(gulp.dest(paths.dest.img));
};

// exports
module.exports = {
  optimise: optimiseImages
};
