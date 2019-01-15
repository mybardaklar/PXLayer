const PXLOverlay = require('./PXLOverlay');

document.addEventListener('DOMContentLoaded', () => {

  PXLOverlay.whenDOMLoaded();
  PXLOverlay.whenStateOn();
  PXLOverlay.whenStateOff();

});