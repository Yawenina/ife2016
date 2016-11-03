/**
 * Created by yawenina on 11/1/16.
 */
//cache dom
let input_type_div = $('.input-type');
let submit_form_btn = $('#submitFormBtn');
let add_input_btn = $('#addInput');
let option_input = $('#addOptions');
let show_options_div = $('.show-options');

let input_type = '输入框';
let options = [];
let translateType = {
  '输入框': 'text',
  '单选框': 'radio',
  '多选框': 'checkbox',
  '下拉框': 'select',
  '文本域': 'textarea'
}

//工具函数
function $(selector) {
  return document.querySelector(selector)
}
function hideElem(selector) {
  $(selector).style.display = 'none';
}
function showElem(selector) {
  $(selector).style.display = 'block';
}


function getInputType() {
  //获取input类型
  input_type = $("input[name='inputType']:checked").value;
  //表单联动
  $('#labelName').value = input_type;
  showOptionDivs(input_type);
}
//表单联动
function showOptionDivs() {
  if (input_type === '单选框' || input_type === '多选框' || input_type === "下拉框") {
    hideElem('.rules');
    hideElem('.length-limitation');
    showElem('.options');
  } else if (input_type === '文本域') {
    hideElem('.options');
    hideElem('.rules');
    showElem('.length-limitation');
  } else {
    hideElem('.options');
    showElem('.rules');
    showElem('.length-limitation');
  }
}

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

function deleteOption() {
  let target_node = event.target;
  if (target_node.nodeName === 'SPAN') {
    let index = options.indexOf(target_node.value);
    options.splice(index, 1);
    show_options_div.removeChild(target_node);
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

//获取Input配置信息
function getInputInfo() {
  let type = translateType[input_type];
  let label = $('#labelName').value;
  let settings = $("input[name='settings']:checked").value;
  let rules = $("input[name='rules']:checked").value;
  if (type === 'text' || type === 'textarea') {
    rules  = rules + '，长度为' + $('#lowLength').value + '-' + $('#highLength').value + '个字符';
  }
  return {
    type,
    label,
    settings,
    options,
    rules
  }
}

function createInput(config) {
  let div = document.createElement('div');
  div.className = 'form-control';
  let label = document.createElement('label');
  label.textContent = config.label;
  div.appendChild(label);

  if (config.type === 'select') {
    if (!options.length) {
      alert('请添加下拉框选项！');
    } else {
      let select = createSelection(options);
      div.appendChild(select);
      return div;
    }
  }

  if (config.type === 'radio' || config.type === 'checkbox') {
    if (!options.length) {
      alert('请添加选择框选项！');
    } else {
      let id = $('main').children.length - 2;
      createRadioOrCheckBox(config.type, options, id, div);
      return div;
    }
  }
}

function createSelection(options) {
    let select = document.createElement('select');
    for(let i = 0, len = options.length; i < len; i++ ) {
      let option = document.createElement('option');
      option.value = options[i];
      option.textContent = options[i];
      select.appendChild(option);
    }
    return select;
}

function createRadioOrCheckBox(type, options, id, parentNode) {
  for (let i = 0, len = options.length; i < len; i++) {
    let input = document.createElement('input');
    let label = document.createElement('label');
    input.type = type;
    input.value = options[i];
    input.name = type + id;
    label.textContent = options[i];
    parentNode.appendChild(input);
    parentNode.appendChild(label);
  }
}

function addInput() {
  //获取配置信息
  let config = getInputInfo();
  //生成Input
  let input = createInput(config);
  //插入到DOM中
  if (input) {
    $('main').insertBefore(input, submit_form_btn);
  }
}

//绑定事件
input_type_div.addEventListener('change', getInputType);
option_input.addEventListener('keyup', addOptions);
show_options_div.addEventListener('mouseenter', showDeleteOption, true);
show_options_div.addEventListener('mouseleave', showNormalOption, true);
show_options_div.addEventListener('click', deleteOption);
add_input_btn.addEventListener('click', addInput);