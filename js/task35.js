/**
 * Created by yawenina on 11/27/16.
 */
var line_number = 0;
var command_area = document.querySelector('.command-area');
var line_number_elem = document.querySelector('.line-number');
var refresh_btn = document.querySelector('#refresh');
var exec_command_btn = document.querySelector('#execute');

function setLineNumber(e) {
  let match = e.target.value.split('\n').length - 1;
  if (match > line_number) {
    let new_lines_count = match - line_number;
    for (let i = 0; i < new_lines_count; i++) {
      ++line_number;
      let li = document.createElement('li');
      li.textContent = line_number + 1;
      line_number_elem.appendChild(li);
    }
  } else {
    let new_lines_count = line_number - match;
    console.log(new_lines_count);
    for (let i = 0; i < new_lines_count; i++) {
      --line_number;
      let lastChild = line_number_elem.lastElementChild;
      line_number_elem.removeChild(lastChild);
    }
  }
}

function setLineNumberScroll(e) {
  line_number_elem.scrollTop = e.target.scrollTop;
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
  let isValidate = true;
  let command_arr = command_area.value.split('\n');
  for(let i = 0; i < command_arr.length; i++) {
    let curr_command = command_arr[i].toUpperCase().split(' ');
    let curr_number_elem = line_number_elem.children[i];
    curr_number_elem.className = '';
    if (/[^TRA|MOV|GO]/gi.test(curr_command[0])) {
      curr_number_elem.className = 'error-command';
      isValidate = false;
      continue;
    }
    if (curr_command[0] === 'GO') {
      if (/[^0-9]/.test(curr_command[1]) || curr_command.length > 2) {
        curr_number_elem.className = 'error-command';
        isValidate = false;
      }
      continue;
    } else if (/[^LEF|RIG|TOP|BOT]/gi.test(curr_command[1])) {
      curr_number_elem.className = 'error-command';
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

function execCommand() {
  let isValidate = validateCommand();
  if (isValidate) {

  } else {
    return false;
  }
}
command_area.addEventListener('keyup', setLineNumber);
command_area.addEventListener('scroll', setLineNumberScroll);
exec_command_btn.addEventListener('click', execCommand);
refresh_btn.addEventListener('click', clearCommandArea);