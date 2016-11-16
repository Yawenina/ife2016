/**
 * Created by yawenina on 11/14/16.
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
      changeDirection();
      break;
    case 'TUN RIG':
      pos.direction = pos.direction + 90 >= 360 ? 0 : pos.direction + 90;
      changeDirection();
      break;
    case 'TUN BAC':
      pos.direction += 180;
      if (pos.direction === 360) {
        pos.direction = 0;
      }else if (pos.direction === 450) {
        pos.direction = 90;
      }
      changeDirection();
      break;
    case 'GO':
      switch(pos.direction) {
        case 0:
          pos.row = pos.row - 1 < 1 ? 1 : pos.row - 1;
          break;
        case 90:
          pos.col = pos.col + 1 > 10 ? 10 : pos.col + 1;
          break;
        case 180:
          pos.row = pos.row + 1 > 10 ? 10 : pos.row + 1;
          break;
        case 270:
          pos.col = pos.col - 1 < 1 ? 1 : pos.col - 1;
          break;
      }
      changePos();
      break;
  }
}

function inputHandler(e) {
  if (e.keyCode ===  13) {
    getCommand();
  }
}
submitBtn.addEventListener('click', getCommand);
input.addEventListener('keyup', inputHandler);

window.onload = function () {
  initPosition();
};



