/**
 * Created by yawenina on 11/14/16.
 */
let block = document.querySelector('.block');
let input = document.querySelector('#command');
let submitBtn = document.querySelector('#execute');
let pos = {
  row: 1,
  col: 1,
  direction: 0
};

function initPosition() {
  let row = Math.ceil(Math.random() * 10);
  let col = Math.ceil(Math.random() * 10);
  pos.row = row;
  pos.col = col;
  changePos();
}

function changePos() {
  block.style.top = pos.row * 40 + 'px';
  block.style.left = pos.col * 40 + 'px';
}

function changeDirection() {
  block.style.transform = "rotate(" + pos.direction + "deg)";
}
function getCommand() {
  let command = input.value.toUpperCase();
  switch (command) {
    case 'TUN LEF':
      pos.direction  = pos.direction - 90 < 0 ? 270 : pos.direction - 90;
      break;
    case 'TUN RIG':
      pos.direction = pos.direction + 90 >= 360 ? 0 : pos.direction;
      break;
    case 'TUN BAC':
      pos.direction += 180;
      break;
  }
  changeDirection();
}

submitBtn.addEventListener('click', getCommand);

window.onload = function () {
  initPosition();
};

