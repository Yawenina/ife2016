/**
 * Created by yawenina on 12/26/16.
 */

function $(selector) {
  return document.querySelector(selector);
}

function Calender(wrapper, options) {
  this.wrapper = $(wrapper);
  this.options = options ? options : null;
  this.container = document.createElement('div');
  this.year = new Date().getFullYear();
  this.month = new Date().getMonth() + 1;
  this.title = document.createElement('h3');
  this.pickedDate = document.createElement('input');
  this.lastPicked = null;
  this.init();
}

function init() {
  //日期选择框
  this.container.className = 'calender hide';
  this.pickedDate.addEventListener('click', function () {
    let containerClass = this.container.className;
    this.container.className = containerClass.indexOf('hide') > -1 ? 'calender show' : 'calender hide';
  }.bind(this));
  //生成表格头部
  this.renderHeader();
  //wrapper绑定事件
  this.container.addEventListener('click', function (e) {
    let action = e.target.className;
    if (action.match(/prev/gi)) {
      this.month = this.month - 1;
      if (this.month === 0) {
        this.year = this.year - 1;
        this.month = 12;
      }
      this.renderCalender();
      return false;
    }
    if (action.match(/next/gi)) {
      this.month = this.month + 1;
      if (this.month === 13) {
        this.year = this.year + 1;
        this.month = 1;
      }
      this.renderCalender();
      return false;
    }

  }.bind(this));

  //生成日历
  this.renderCalender();
  this.wrapper.appendChild(this.pickedDate);
  this.wrapper.appendChild(this.container);
}


function renderHeader() {
  let header = document.createElement('header');
  let div = document.createElement('div');
  let prevBtn = document.createElement('button');
  let nextBtn = document.createElement('button');
  let weekday = ['日', '一', '二', '三', '四', '五', '六'];
  let weekElem = document.createElement('div');

  div.className = 'content'
  prevBtn.className = 'btn prev';
  nextBtn.className = 'btn next';
  weekElem.className = 'weekday';

  weekday.forEach(function (day) {
    let span = document.createElement('span');
    span.textContent = day;
    weekElem.appendChild(span);
  });

  div.appendChild(prevBtn);
  div.appendChild(this.title);
  div.appendChild(nextBtn);
  header.appendChild(div);
  header.appendChild(weekElem);
  this.container.appendChild(this.pickedDate);
  this.container.appendChild(header);
}

function formatDate(year, month, day) {
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  return year + '-' + month + '-' + day;
}

function renderCalender() {
  //清空之前的日历
  let lastChild = this.container.lastElementChild;
  if (lastChild.tagName === 'TABLE') {
    this.container.removeChild(lastChild);
  }
    //生成日期
    let table = document.createElement('table');
    let firstDay = new Date(this.year, this.month - 1, 1).getDay();
    let monthTotalDays = new Date(this.year, this.month, 0).getDate();
    let weekDays = new Array(firstDay);
    let tr = document.createElement('tr');
    this.title.textContent = this.year + '年' + this.month + '月';
    for (let i = 0; i < weekDays.length; i++) {
      let td = document.createElement('td');
      td.textContent = '';
      tr.appendChild(td);
    }
    for (let i = 1; i <= monthTotalDays; i++) {
      let td = document.createElement('td');
      td.textContent = i;
      td.dataset.date = this.formatDate.call(this, this.year, this.month, i);
      tr.appendChild(td);
      weekDays.push(i);
      if (weekDays.length === 7) {
        weekDays = [];
        table.appendChild(tr);
        tr = document.createElement('tr');
      }
      if (i === monthTotalDays) {
        table.appendChild(tr);
      }
    }
    table.addEventListener('click', function (e) {
      if (this.lastPicked) {
        this.lastPicked.className = '';
      }
      e.target.className = 'picked';
      this.lastPicked = e.target;
      this.pickedDate.value = e.target.dataset.date;
      if (this.options && this.options.pickedCb) {
        this.options.pickedCb(e.target.dataset.date);
      }
    }.bind(this));
    this.container.appendChild(table);
}

Calender.prototype = {
  constructor: Calender,
  renderHeader,
  renderCalender,
  formatDate,
  init
}

new Calender('.calender-wrapper', {
  pickedCb: function (value) {
    alert('你选择的日期是' + value);
  }
});