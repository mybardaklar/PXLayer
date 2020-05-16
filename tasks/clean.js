// packages
const del = require('del')
const paths = require('./paths')

// clean
const cleanDist = () => {
  return del([paths.build])
}

// clean HTML templates
const cleanTemplate = () => {
  return del([paths.clean.template])
}

// clean SVG icons
const cleanIcons = () => {
  return del([paths.clean.svg])
}

// clean images
const cleanImg = () => {
  return del([paths.clean.img])
}

// clean fonts
const cleanFont = () => {
  return del([paths.clean.font])
}

// exports
module.exports = {
  dist: cleanDist,
  template: cleanTemplate,
  icons: cleanIcons,
  img: cleanImg,
  font: cleanFont
}
