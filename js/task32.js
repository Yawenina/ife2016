/**
 * Created by yawenina on 11/8/16.
 */
var options = $('.options');
var create_form_btn = $('#create-form-btn');
var form_elems_div = $('.form-elems');
var name_input = $('.name');
var name_config = {
  label: '名称',                    // 表单标签
  type: 'input',                   // 表单类型
  validator: function (value) {
    return /^[a-zA-z0-9]{4,16}$/.test(value);
  },    // 表单验证规
  rules: '必填，长度为4-16个字符',    // 填写规则提示
  success: '格式正确',              // 验证通过提示
  fail: '名称长度为4-16个字符'               // 验证失败提示
}

var psd_config = {
  label: '密码',
  type: 'password',
  validator: function (value) {
    return /^[a-zA-z0-9]{4,16}$/.test(value);
  },
  rules: '必填，长度为4-16个字符',
  success: '格式正确',
  fail: '长度为4-16个字符'
}

var email_config = {
  label: '邮箱',
  type: 'email',
  validator: function (value) {
    return /([a-zA-Z0-9_-])+@([a-zA-Z0-9])+\.([a-zA-Z]{2,3})/.test(value);
  },
  rules: '必填，输入合法邮箱',
  success: '格式正确',
  fail: '邮箱格式不正确'
}

var phone_config = {
  label: '电话',
  type: 'number',
  validator: function (value) {
    return /^[1][0-9]{10}$/.test(value)
  },
  rules: '必填，输入合法手机号',
  success: '格式正确',
  fail: '手机号格式不正确'
}

var inputs_config = {
  name: name_config,
  password: psd_config,
  email: email_config,
  phone: phone_config
}

function $(selector) {
  return document.querySelector(selector)
}

function getFormElems() {
  let formElems = [];
  let input_types = document.getElementsByName('type');
  for (let i=0, len = input_types.length; i < len; i++) {
    if (input_types[i].checked) {
      formElems.push(input_types[i].value)
    }
  }
  return formElems;
}

function createInput(config) {
  let div = document.createElement('div');
  let label = document.createElement('label');
  let input = document.createElement('input');
  let p = document.createElement('p');
  div.className = 'form-control';
  label.textContent = config.label;
  input.type = config.type;
  p.textContent = config.rules;
  p.className = 'rules';
  p.style.display = 'none';
  div.appendChild(label);
  div.appendChild(input);
  div.appendChild(p);
  input.addEventListener('focus', function (e) {
    e.target.nextElementSibling.style.display = 'block';
  });
  input.addEventListener('blur', function (e) {
    let target = e.target;
    let info = target.nextElementSibling;
    let isValid = config.validator(target.value);
    if (isValid) {
      info.textContent = config.success;
      info.className = 'success';
      input.className = 'success';
    } else {
      info.textContent = config.fail;
      info.className = 'error';
      target.className = 'error';
    }
  });
  return div;
}

function createFormElems() {
  var final_form = $('#final-form');
  //获取表单元素
  var form_elems = getFormElems();
  //设置表单样式
  var form_style = $("input[name='form-style']:checked").value;
  final_form.innerHTML = '';
  final_form.className = form_style;
  //生成表单元素，绑定到#final-form
  for(let i = 0, len = form_elems.length; i < len; i++) {
    let curr_input_type = form_elems[i];
    let curr_input = createInput(inputs_config[curr_input_type]);
    final_form.appendChild(curr_input);
  }
  var submit_btn = document.createElement('button');
  submit_btn.textContent = '提交';
  submit_btn.className = 'btn';
  final_form.appendChild(submit_btn);
}
//事件绑定
create_form_btn.addEventListener('click', createFormElems)
