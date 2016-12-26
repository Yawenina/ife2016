/**
 * Created by yawenina on 12/26/16.
 */

function $(selector) {
  return document.querySelector(selector);
}

function Calender(wrapper) {
  this.wrapper = $(wrapper);
  this.year = new Date().getFullYear();
  this.month = new Date().getMonth() + 1;
  this.title = document.createElement('h3');

  this.init();
}

function init() {
  //日期选择框
  //生成表格头部
  this.renderHeader();
  //wrapper绑定事件
  this.wrapper.addEventListener('click', function (e) {
    let action = e.target.className;
    if (action.match(/prev/gi)) {
      this.month = this.month - 1;
      if (this.month === 0) {
        this.year = this.year - 1;
        this.month = 12;
      }
    } else {
      this.month = this.month + 1;
      if (this.month === 13) {
        this.year = this.year + 1;
        this.month = 1;
      }
    }
    this.renderCalender();
  }.bind(this));

  //生成日历

}


function renderHeader() {
  let header = document.createElement('header');
  let prevBtn = document.createElement('button');
  let nextBtn = document.createElement('button');
  let weekday = ['日', '一', '二', '三', '四', '五', '六'];
  let weekElem = document.createElement('div');

  prevBtn.className = 'btn prev';
  nextBtn.className = 'btn next';
  weekElem.className = 'weekday';

  weekday.forEach(function (day) {
    let span = document.createElement('span');
    span.textContent = day;
    weekElem.appendChild(span);
  });

  header.appendChild(prevBtn);
  header.appendChild(this.title);
  header.appendChild(nextBtn);
  header.appendChild(weekElem);
  this.wrapper.appendChild(header);
}

function renderCalender() {
  //清空之前的日期
  //获取日期
  //排版，绑定点击事件
}

Calender.prototype = {
  constructor: Calender,
  renderHeader,
  renderCalender,
  init
}

new Calender('.container')