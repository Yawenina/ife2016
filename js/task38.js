/**
 * Created by yawenina on 12/6/16.
 */
// var options = {
//   'thead': [],
//   data: {
//     [],
//     []
//   },
//   sortWay: 'asc | dsc',
//   sortCols: []
// }

function $(selector) {
  return document.querySelector(selector);
}

function sortedTable(wrapperSelector, options) {
  this.wrapperElem = $(wrapperSelector);
  this.thead = options.thead;
  this.data = options.data;
  this.sortCols = options.sortCols;
  this.table = null;
  this.tbody = null;
}

function createBasicTable() {
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let tr = document.createElement('tr');

  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tbody);

  for (let i = 0; i < this.thead.length; i++) {
    let th = document.createElement('th');
    th.textContent = this.thead[i];
    if (this.sortCols.indexOf(this.thead[i]) !== -1) {
      let div = document.createElement('div');
      div.className = 'sort-arrow-wrapper';
      let ascSpan = document.createElement('span');
      ascSpan.className = 'asc';
      let dscSpan = document.createElement('span');
      dscSpan.className = 'dsc';
      div.appendChild(ascSpan);
      div.appendChild(dscSpan);
      th.appendChild(div);
    }
    tr.appendChild(th);
  }

  this.table = table;
  this.tbody = tbody;
  this.wrapperElem.appendChild(table);
}

function renderTbody(data) {
  for (let key in data) {
    let tr = document.createElement('tr');
    let fragment = document.createDocumentFragment();
    let td = document.createElement('td');
    td.textContent = key;
    fragment.appendChild(td);
    data[key].forEach(function (item) {
      let td = document.createElement('td');
      td.textContent = item;
      fragment.appendChild(td);
    });
    tr.appendChild(fragment);
    this.tbody.appendChild(tr);
  }
}

function init() {
  this.createBasicTable();
  this.renderTbody(this.data);
}


sortedTable.prototype = {
  constructor: sortedTable,
  createBasicTable,
  renderTbody,
  init
}

new sortedTable('.container', {
  thead: ['姓名', '语文', '数学', '英语', '总分'],
  data: {
    '小红': [80, 81, 82, 83],
    '小明': [85, 72, 93, 100],
    '小黄': [99, 98, 96, 95]
  },
  sortCols: ['语文', '总分']
}).init();