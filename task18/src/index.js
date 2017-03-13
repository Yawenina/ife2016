/**
 * Created by yawenina on 1/24/17.
 */
'use strict'
import Sort from './sort.js';

let queue = [];
let wrapper = document.querySelector("#queue");
let dataBtnGroup = document.querySelector(".data-btn-group");
let sortBtnGroup = document.querySelector(".sort-btn-group");
let input = document.querySelector(".num-input");
let dataHandlers = {
  "leftIn": leftIn,
  "rightIn": rightIn,
  "leftOut": leftOut,
  "rightOut":rightOut
};
let sortHandlers = {
  "bubble": Sort.bubbleSort,
};

function updateQueue(e) {
  e.preventDefault();
  let action = e.target.value;
  let val = input.value;
  if (action === "leftIn" || action === "rightIn") {
    if (val < 10 || val > 100) {
      alert("请输入10-100之间的数字！");
      return false;
    }
    if (queue.length > 60) {
      alert (val);
      return false;
    }
  }
  dataHandlers[action](val);
  input.value = "";
}

function leftIn(val) {
  let span = document.createElement("span");
  queue.unshift(val);
  span.dataset.val = val;
  span.style.height = val + "px";
  wrapper.insertBefore(span, wrapper.firstElementChild);
}

function rightIn(val) {
  let span = document.createElement("span");
  queue.push(val);
  span.dataset.val = val;
  span.style.height = val + "px";
  wrapper.appendChild(span, wrapper.firstElementChild);
}

function leftOut() {
  const data = queue.shift();
  wrapper.removeChild(wrapper.firstElementChild);
  alert(data);
}

function rightOut() {
  const data = queue.pop();
  wrapper.removeChild(wrapper.lastElementChild);
  alert(data);
}

function sortBtnHandler(e) {
  e.preventDefault();
  let type = e.target.value;
  sortHandlers[type](wrapper);
}


dataBtnGroup.addEventListener("click", updateQueue);
sortBtnGroup.addEventListener("click", sortBtnHandler);