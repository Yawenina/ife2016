/**
 * Created by yawenina on 12/10/16.
 */
options = {
  maxDate,
  minData,
}

function $(selector) {
  return document.querySelector(selector);
}
function Calender(wrapperSelector, options) {
  let today = new Date();
  this.year = today.getFullYear();
  this.month = today.getMonth();
}

function renderSelect(min, max) {
  let select = document.createElement('select');
  let fragment = document.createDocumentFragment();
  for (let i = min; i <= max; i++) {
    let option = document.createElement('option');
    option.textContent = i;
    option.value = i;
    fragment.appendChild(option);
  }
  select.appendChild(fragment);
}

//顶部选择框
function renderCalenderHeader() {
  let div = document.createElement('div');
  div.className = 'selection';
  //向前按钮
  let prevBtn = document.createElement('button');
  prevBtn.textContent = "<";
  prevBtn.className = 'btn prev';
  prevBtn.addEventListener('click', function () {
    this.month = this.month - 1;
    if (this.month - 1 < 0) {
      this.year = this.year - 1;
      this.month = 12;
    }
    this.renderCalender();
  }.bind(this));

  //向后按钮
  let nextBtn = document.createElement('button');
  nextBtn.textContent = ">";
  nextBtn.className = 'btn next';
  nextBtn.addEventListener('click', function () {
    this.month = this.month + 1;
    if (this.month + 1 > 12) {
      this.year = this.year + 1;
      this.month = 1;
    }
    this.renderCalender();
  }.bind(this));

  let yearSelect = this.renderSelect(1976, 2020);
  let minSelect = this.renderSelect(1, 12);
}

function init() {
  let div = document.createElement('div');
  div.className = 'calender';
}