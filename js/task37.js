/**
 * Created by yawenina on 12/4/16.
 */
function $(selector) {
  return document.querySelector(selector);
}

function hide(selector) {
  $(selector).style.display = 'none';
}

function show(selector) {
  $(selector).style.display = 'block';
}

$('body').addEventListener('click', function (e) {
  let target = e.target;
  if (target.dataset.toggle === 'modal') {
    let modalId = target.dataset.target;
    show(modalId);
    $(modalId).addEventListener('click', function (e) {
      let target = e.target;
      if ( target.dataset.dismiss === 'modal' || ('#' + target.id) === modalId) {
        hide(modalId)
      } else {
        return false
      }
    })
  }
});

