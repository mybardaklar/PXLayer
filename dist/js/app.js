$(document).ready(function() {

  var modalStatus = $('input[type="radio"].pxl-modal-trigger--on').prop('checked');
  if(modalStatus) {
    $('body').addClass('pxl-modal--on');
  }

  $('input[type="radio"].pxl-modal-trigger--on').change(function() {
    var status = $(this).prop('checked');
    
    if(status) {
      $('body').addClass('pxl-modal--on');
    }
  });
  $('input[type="radio"].pxl-modal-trigger--off').change(function() {
    var status = $(this).prop('checked');
    
    if(status) {
      $('.pxl-modal').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
        $('body').removeClass('pxl-modal--on');
      })
    }
  });

});