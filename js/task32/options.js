/**
 * Created by yawenina on 11/2/16.
 */
//对单选多选的处理模块
function addOptions() {
  event.preventDefault();
  let key_code = event.code;
  let option = '';
  if (key_code === 'Comma' || key_code === 'Space') {
    option = option_input.value.slice(0, -1);
  } else if (key_code === 'Enter') {
    option = option_input.value;
  } else {
    return;
  }
  if (option && options.indexOf(option) === -1) {
    options.push(option);
    updateOptionsDOM(option);
  }
  option_input.value = '';
}

function showDeleteOption() {
  let target_node = event.target;
  if (target_node.nodeName === 'SPAN') {
    target_node.textContent = '点击删除' + target_node.textContent;
    target_node.className = 'delete-option option'
  } else {
    return false;
  }
}

function showNormalOption() {
  let target_node = event.target;
  if (target_node.nodeName === 'SPAN') {
    target_node.textContent = target_node.textContent.slice(4);
    target_node.className = 'option'
  } else {
    return false;
  }
}

function deleteOption(parentNode) {
  let target_node = event.target;
  if (target_node.nodeName === 'SPAN') {
    let index = options.indexOf(target_node.value);
    options.splice(index, 1);
    parentNode.removeChild(target_node);
  } else {
    return false;
  }
}

function updateOptionsDOM(text) {
  let span = document.createElement('span');
  span.className = 'option';
  span.textContent = text;
  show_options_div.appendChild(span);
}