/**
 * Created by yawenina on 11/27/16.
 */
var line_number = 1;
var textarea = document.querySelector('.command-area');
var line_number_elem = document.querySelector('.line-number');

function setLineNumber(e) {
  if (e.keyCode === 13) {
    ++line_number;
    var li = document.createElement('li');
    li.textContent = line_number;
    line_number_elem.appendChild(li);
  }
}

textarea.addEventListener('keyup', setLineNumber);