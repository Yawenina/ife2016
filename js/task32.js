/**
 * Created by yawenina on 11/8/16.
 */
var options = $('.options')
var create_form_btn = $('#create-form-btn')
var input_types = document.getElementsByName('type')

function $(selector) {
  return document.querySelector(selector)
}

create_form_btn.addEventListener('click', function () {
  for (let i=0, len = input_types.length; i < len; i++) {
    if (input_types[i].checked) {
      console.log(input_types[i].value)
    }
  }
})