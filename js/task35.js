/**
 * Created by yawenina on 11/27/16.
 */
let line_number = 0;
let command_area = document.querySelector('.command-area');
let line_number_elem = document.querySelector('.line-number');
let refresh_btn = document.querySelector('#refresh');
let exec_command_btn = document.querySelector('#execute');
let block = document.querySelector('.block');
let directions = {
  'TOP': 0,
  'RIG': 1,
  'BOT': 2,
  'LEF': 3
};
let pos = {
  row: 1,
  col: 10,
  direction: 0
};

function initPosition() {
  let row = Math.ceil(Math.random() * 10);
  let col = Math.ceil(Math.random() * 10);
  pos.row = row;
  pos.col = col;
  changePos();
}

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
    for (let i = 0; i < new_lines_count; i++) {
      --line_number;
      let lastChild = line_number_elem.lastElementChild;
      line_number_elem.removeChild(lastChild);
    }
    if (line_number_elem.children.length == 1) {
      line_number_elem.children[0].className = ''
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

function validateCommand(commands) {
  let isValidate = true;
  let command_arr = commands;
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
      if ((curr_command[1] && /[^0-9]/.test(curr_command[1])) || curr_command.length > 2) {
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

function changePos(direction, step) {
  step = parseInt(step);
  switch(direction) {
    case 0:
      pos.row = pos.row - step < 1 ? 1 : pos.row - step;
      break;
    case 1:
      pos.col = pos.col + step > 10 ? 10 : pos.col + step;
      break;
    case 2:
      pos.row = pos.row + step > 10 ? 10 : pos.row + step;
      break;
    case 3:
      pos.col = pos.col - step < 1 ? 1 : pos.col - step;
      break;
  }
  requestAnimationFrame(function () {
    block.style.top = pos.row * 40 + 'px';
    block.style.left = pos.col * 40 + 'px';
  })
}

function changeDirection(direction) {
  pos.direction = directions[direction];
  block.style.transform = block.style.transform = "rotate(" + pos.direction * 90 + "deg)";
}

function setPosition(command) {
  let command_split = command.split(' ');
  let step = 0;
  switch (command_split[0]) {
    case 'GO':
      step = command_split[1] ? command_split[1] : 1;
      changePos(pos.direction, step);
      break;
    case 'TRA':
      step = command_split[2] ? command_split[2] : 1;
      changePos(directions[command_split[1]], step);
      break;
    case 'MOV':
      step = command_split[2] ? command_split[2] : 1;
      changeDirection(command_split[1]);
      changePos(pos.direction, step);
      break;
  }
};

function execCommand() {
  let commands = command_area.value.trim().toUpperCase().split('\n');
  //检查指令是否合法
  if (commands) {
    let isValidate = validateCommand(commands);
    if (isValidate) {
      //执行指令
      setPosition(commands[0]);
      let i = 1;
      let commands_len = commands.length;
      var timer = setInterval(function () {
        if (i >=  commands_len) {
          clearInterval(timer);
          return false;
        } else {
          setPosition(commands[i]);
          i++;
        }
      }, 1000);
    } else {
      return false;
    }
  }
}

window.onload = function () {
  initPosition();
  command_area.addEventListener('keyup', setLineNumber);
  command_area.addEventListener('scroll', setLineNumberScroll);
  exec_command_btn.addEventListener('click', execCommand);
  refresh_btn.addEventListener('click', clearCommandArea);
};
