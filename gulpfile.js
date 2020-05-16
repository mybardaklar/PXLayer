'use strict'

require('module-alias/register')

// gulp
const gulp = require('gulp')

// import tasks
const taskTemplates = require('@pxlayer/tasks/templates')
const taskStyles = require('@pxlayer/tasks/styles')
const taskScripts = require('@pxlayer/tasks/scripts')
const taskIcons = require('@pxlayer/tasks/icons')
const taskImages = require('@pxlayer/tasks/images')
const taskCopy = require('@pxlayer/tasks/copy')
const taskClean = require('@pxlayer/tasks/clean')
const browserSync = require('@pxlayer/tasks/browserSync')
const paths = require('@pxlayer/tasks/paths')

// Watch files
const watchFiles = () => {
  // watch template files
  gulp.watch(
    paths.watch.template,
    gulp.series(taskClean.template, taskTemplates.build, browserSync.reload)
  )

  // watch style files
  gulp.watch(
    paths.watch.sass,
    gulp.series(taskStyles.build, browserSync.reload)
  )

  // watch script files
  gulp.watch(
    paths.watch.js,
    gulp.series(taskScripts.lint, taskScripts.build, browserSync.reload)
  )

  // watch icon files
  gulp.watch(
    paths.watch.svg,
    gulp.series(taskClean.icons, taskIcons.build, browserSync.reload)
  )

  // watch image files
  gulp.watch(
    paths.watch.img,
    gulp.series(taskClean.img, taskImages.optimise, browserSync.reload)
  )

  // watch font files
  gulp.watch(
    paths.watch.font,
    gulp.series(taskClean.font, taskCopy.fonts, browserSync.reload)
  )
}

// define tasks
const build = gulp.series(
  taskClean.dist,
  gulp.parallel(
    taskTemplates.build,
    taskStyles.build,
    gulp.series(taskScripts.lint, taskScripts.build),
    taskIcons.build,
    taskImages.optimise,
    taskCopy.fonts
  ),
  gulp.parallel(watchFiles, browserSync.init)
)

// expose tasks to CLI
exports.default = build
