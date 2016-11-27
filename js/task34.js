/**
 * Created by yawenina on 11/27/16.
 */
let block = document.querySelector('.block');
let input = document.querySelector('#command');
let submitBtn = document.querySelector('#execute');
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

function changePos(direction) {
  switch(direction) {
    case 'TOP':
      pos.row = pos.row - 1 < 1 ? 1 : pos.row - 1;
      break;
    case 'RIG':
      pos.col = pos.col + 1 > 10 ? 10 : pos.col + 1;
      break;
    case 'BOT':
      pos.row = pos.row + 1 > 10 ? 10 : pos.row + 1;
      break;
      case 'LEF':
      pos.col = pos.col - 1 < 1 ? 1 : pos.col - 1;
      break;
  }
  block.style.top = pos.row * 40 + 'px';
  block.style.left = pos.col * 40 + 'px';
}

function changeDirection(direction) {
  switch (direction) {
    case 'LEF':
      pos.direction = 3;
      break;
    case 'TOP':
      pos.direction = 0;
      break;
    case 'RIG':
      pos.direction = 1;
      break;
    case 'BOT':
      pos.direction = 2;
      break;
    }
    block.style.transform = block.style.transform = "rotate(" + pos.direction * 90 + "deg)";
  }

function execCommand() {
  let command = input.value.toUpperCase().split(' ');
  if (command[0] === 'TRA') {
    changePos(command[1]);
  } else {
    changeDirection(command[1]);
    changePos(command[1]);
  }
}

function inputHandler(e) {
  if (e.keyCode ===  13) {
    execCommand();
  }
}

submitBtn.addEventListener('click', execCommand);
input.addEventListener('keyup', inputHandler);

window.onload = function () {
  initPosition();
};



