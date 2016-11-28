/**
 * Created by yawenina on 11/27/16.
 */
var line_number = 1;
var command_area = document.querySelector('.command-area');
var line_number_elem = document.querySelector('.line-number');
var refresh_btn = document.querySelector('#refresh');
var exec_command_btn = document.querySelector('#execute');

function setLineNumber(e) {
  if (e.keyCode == 13) {
    ++line_number;
    let li = document.createElement('li');
    li.textContent = line_number;
    line_number_elem.appendChild(li);
  }
}

function clearCommandArea() {
  command_area.value = '';
  line_number_elem.innerHTML = '';
  line_number = 1;
  let li = document.createElement('li');
  li.textContent = line_number;
  line_number_elem.appendChild(li);
}

function validateCommand() {
  // TODO: add 'Go' and simplify  the procedure
  let isValidate = true;
  let command_arr = command_area.value.split('\n');
  for(let i = 0; i < command_arr.length; i++) {
    let curr_command = command_arr[i].toUpperCase().split(' ');
    line_number_elem.children[i].className = '';
    if (/[^TRA|MOV]/gi.test(curr_command[0])) {
      line_number_elem.children[i].className = 'error-command';
      isValidate = false;
      continue;
    }
    if (/[^LEF|RIG|TOP|BOT]/gi.test(curr_command[1])) {
      line_number_elem.children[i].className = 'error-command';
      isValidate = false;
      continue;
    }
    if (curr_command[2]) {
      if (/[^0-9]/.test(curr_command[2])) {
        line_number_elem.children[i].className = 'error-command';
        isValidate = false;
      }
    }
  }
  return isValidate;
}

command_area.addEventListener('keyup', setLineNumber);
exec_command_btn.addEventListener('click', validateCommand);
refresh_btn.addEventListener('click', clearCommandArea);