// gulp
const gulp = require('gulp')

// packages
const svgmin = require('gulp-svgmin')
const paths = require('./paths')

const svgminPlugins = [
  {
    removeStyleElement: true
  },
  {
    removeComments: true
  },
  {
    removeDoctype: true
  },
  {
    removeTitle: true
  },
  {
    removeDesc: true
  },
  {
    removeUselessDefs: true
  },
  {
    cleanupAttrs: true
  },
  {
    addClassesToSVGElement: {
      classNames: ['pxl-icon']
    }
  }
]

// icon task
const iconBuild = () => {
  return gulp
    .src(paths.src.svg)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        },
        plugins: svgminPlugins
      })
    )
    .pipe(gulp.dest(paths.dest.svg))
}

// exports
module.exports = {
  build: iconBuild
}
