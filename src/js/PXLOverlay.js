class PXLOverlay {

  constructor() {
    this.pxl_body = document.querySelector('#pxl-body');
    this.stateOn  = document.querySelectorAll('input[type=radio].pxl-overlay-state--on');
    this.stateOff = document.querySelectorAll('input[type=radio].pxl-overlay-state--off');
  }

  blurBackground(el, type) {
    const overlayStatus = el.checked;
    if(overlayStatus) {
      if(type) {
        this.pxl_body.classList.add('pxl-overlay--on');
      } else {
        this.pxl_body.classList.remove('pxl-overlay--on');
      }
    }
  }

  whenDOMLoaded() {
    this.stateOn.forEach((el) => {
      this.blurBackground(el, true);
    });
  }

  whenStateOn() {
    this.stateOn.forEach((el) => {
      el.addEventListener('change', (e) => {
        this.blurBackground(el, true);
      });
    });
  }

  whenStateOff() {
    this.stateOff.forEach((el) => {
      el.addEventListener('change', (e) => {
        let openOverlay = false;

        this.stateOn.forEach((el) => {
          let overlayStatus = el.checked;
          if(overlayStatus)
            openOverlay = true;
        });

        if(!openOverlay) this.blurBackground(el, false);
      });
    });
  }

}

module.exports = new PXLOverlay();