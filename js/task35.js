/**
 * Created by yawenina on 11/27/16.
 */
var line_number = 1;
var command_area = document.querySelector('.command-area');
var line_number_elem = document.querySelector('.line-number');
var refresh_btn = document.querySelector('#refresh');

function setLineNumber(e) {
  if (e.keyCode === 13) {
    ++line_number;
    var li = document.createElement('li');
    li.textContent = line_number;
    line_number_elem.appendChild(li);
  }
}

function clearCommandArea() {
  command_area.value = '';
  line_number_elem.innerHTML = '';
  line_number = 1;
  var li = document.createElement('li');
  li.textContent = line_number;
  line_number_elem.appendChild(li);
}

function validateCommand() {

}

command_area.addEventListener('keyup', setLineNumber);
refresh_btn.addEventListener('click', clearCommandArea);