/**
 * Created by yawenina on 11/14/16.
 */
let block = document.querySelector('.block');
let pos = {
  row: 1,
  col: 1
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

window.onload = function () {
  initPosition();
};