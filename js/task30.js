/**
 * Created by yawenina on 10/27/16.
 */
let inputs = document.getElementsByTagName('input'),
    submitBtn = document.getElementById('submitBtn'),
    warningInfo = {
      "name": {
        'regexp': '^[a-zA-z0-9]{4,16}$',
        'tips': '必填，长度为4-16个字符',
        'error': '名称格式有误',
        'success': '名称可用',
        'is_passed': false
      },
      "psd": {
        'regexp': '^[a-zA-z0-9]{4,16}$',
        'tips': '必填，长度为4-16个字符',
        'error': '长度为4-16个字符',
        'success': '密码可用',
        'is_passed': false
      },
      "psdConfirm": {
        'tips': '再次输入相同密码',
        'error': '密码输入不一致',
        'success': '密码输入一致',
        'is_passed': false
      },
      "email": {
        'regexp': '([a-zA-Z0-9_-])+@([a-zA-Z0-9])+\.([a-zA-Z]{2,3})',
        'tips': '必填, 输入合法邮箱',
        'error': '邮箱格式不正确',
        'success': '邮箱可用',
        'is_passed': false
      },
      "phone": {
        'regexp': '^[1][0-9]{10}$',
        'tips': '必填，输入合法手机号',
        'error': '手机格式不正确',
        'success': '手机可用',
        'is_passed': false
      }
    }

// 事件处理
function blurHandler() {
  let target = event.target,
      id = target.id,
      value = target.value,
      tipsElem = target.nextElementSibling,
      flag = false;
  if (id === 'psdConfirm') {
    flag  = (value && inputs[2].value === value ) ? true : false
  } else {
    flag = new RegExp(warningInfo[id]['regexp']).test(value)
  }
  if (flag) {
    target.style.borderColor = "green"
    tipsElem.textContent = warningInfo[id]['success']
    tipsElem.className = 'success'
    warningInfo[id]['is_passed'] = true
  } else {
    target.style.borderColor = "red";
    tipsElem.textContent = warningInfo[id]['error'];
    tipsElem.className = 'error';
  }
}

function focusHandler() {
  let target = event.target,
      id = target.id,
      tipsElem = target.nextElementSibling;
  tipsElem.textContent = warningInfo[id]['tips'];
  tipsElem.className = 'rule';
}

function submitHandler() {
  event.preventDefault();
  let not_all_passed = Object.values(warningInfo).some(function (item) {
    return item['is_passed'] === false;
  });
  if (not_all_passed) {
    alert('有不合法字段，提交失败！')
  } else {
    alert('提交成功！')
  }
}

// 事件绑定
Array.prototype.forEach.call(inputs, function (item) {
  item.addEventListener('focus', focusHandler, false);
  item.addEventListener('blur', blurHandler, false);
});

submitBtn.addEventListener('click', submitHandler, false)