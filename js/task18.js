/**
 * Created by yawenina on 1/22/17.
 */
'use strict'

let queue = [];
let wrapper = document.querySelector("#queue");
let btnGroup = document.querySelector(".btn-group");
let input = document.querySelector(".num-input");
let handlers = {
  "leftIn": leftIn,
  "rightIn": rightIn,
  "leftOut": leftOut,
  "rightOut":rightOut
};

function updateQueue(e) {
  e.preventDefault();
  let val = input.value;
  if (val < 10 || val > 100) {
    alert("请输入10-100之间的数字！");
    return false;
  }
  if (queue.length > 60) {
    alert (val);
    return false;
  } else {
    let action = e.target.value;
    handlers[action](val);
  }
}

function leftIn(val) {
  let span = document.createElement("span");
  queue.unshift(span);
  span.style.height = val + "px";
  wrapper.insertBefore(span, wrapper.firstElementChild);
}

btnGroup.addEventListener("click", updateQueue);