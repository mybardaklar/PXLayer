"use strict";

// gulp
const gulp = require("gulp");

// import tasks
const templates = require("./tasks/templates");
const styles    = require("./tasks/styles");
const scripts   = require("./tasks/scripts");
const icons     = require("./tasks/icons");
const images    = require("./tasks/images");
const copy      = require("./tasks/copy");
const clean     = require("./tasks/clean");
const server    = require("./tasks/browserSync");
const paths     = require("./tasks/paths");

// Watch files
const watchFiles = () => {
  // watch template files
  gulp.watch(
    paths.watch.template,
    gulp.series(clean.template, templates.build, server.reload)
  );

  // watch style files
  gulp.watch(
    paths.watch.sass,
    gulp.series(styles.build, server.reload)
  );

  // watch script files
  gulp.watch(
    paths.watch.js,
    gulp.series(scripts.lint, scripts.build, server.reload)
  );

  // watch icon files
  gulp.watch(
    paths.watch.svg,
    gulp.series(clean.icons, icons.build, server.reload)
  );

  // watch image files
  gulp.watch(
    paths.watch.img,
    gulp.series(clean.img, images.optimise, server.reload)
  );

  // watch font files
  gulp.watch(
    paths.watch.font,
    gulp.series(clean.font, copy.fonts, server.reload)
  );
};

// define tasks
const build = gulp.series(
  clean.dist,
  gulp.parallel(
    templates.build,
    styles.build,
    gulp.series(scripts.lint, scripts.build),
    icons.build,
    images.optimise,
    copy.fonts
  ),
  gulp.parallel(watchFiles, server.init)
);

// expose tasks to CLI
exports.default = build;
