// packages
const browsersync = require('browser-sync').create()
const paths = require('./paths')

// BrowserSync
const init = (done) => {
  browsersync.init({
    server: {
      baseDir: paths.build
    },
    port: 3000,
    open: false
  })
  done()
}

// BrowserSync reload
const reload = (done) => {
  browsersync.reload()
  done()
}

// exports
module.exports = {
  init: init,
  reload: reload
}
