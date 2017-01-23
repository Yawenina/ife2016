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
  handlers[action](val);
  input.value = "";
}

function leftIn(val) {
  let span = document.createElement("span");
  queue.unshift(val);
  span.style.height = val + "px";
  wrapper.insertBefore(span, wrapper.firstElementChild);
}

function rightIn(val) {
  let span = document.createElement("span");
  queue.push(val);
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

btnGroup.addEventListener("click", updateQueue);