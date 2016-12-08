/**
 * Created by yawenina on 12/6/16.
 */
function $(selector) {
  return document.querySelector(selector);
}

function sortedTable(wrapperSelector, options) {
  this.wrapperElem = $(wrapperSelector);
  this.theadCols = options.thead;
  this.data = options.data;
  this.sortCols = options.sortCols;
  this.handlerFn = options.handlerFn;
  this.isTheadFrozen = options.isTheadFrozen;
  this.table = null;
  this.tbody = null;
  this.init()
}

function sortColsFn(type, col, e){
  return function(){
    this.data.sort(function(a, b){
      if (type === 'asc') {
        return a[col] - b[col];
      } else {
        return b[col] - a[col];
      }
    });
    this.renderTbody(this.data)
  }
}

function bindEvent(elem, fn) {
  elem.addEventListener('click', fn.bind(this));
}

function createBasicTable() {
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');
  let tr = document.createElement('tr');

  thead.appendChild(tr);
  table.appendChild(thead);
  table.appendChild(tbody);

  for (let i = 0; i < this.theadCols.length; i++) {
    let th = document.createElement('th');
    th.textContent = this.theadCols[i];
    if (this.sortCols.indexOf(this.theadCols[i]) !== -1) {
      let div = document.createElement('div');
      div.className = 'sort-arrow-wrapper';
      let ascSpan = document.createElement('span');
      ascSpan.className = 'asc';
      if (this.handlerFn[0]) {
        this.bindEvent(ascSpan, this.handlerFn[0])
      } else {
        this.bindEvent(ascSpan, this.sortColsFn('asc', i));
      }

      let dscSpan = document.createElement('span');
      dscSpan.className = 'dsc';
      if (this.handlerFn[1]) {
        this.bindEvent(dscSpan, this.handlerFn[1])
      } else {
        this.bindEvent(dscSpan, this.sortColsFn('dsc', i));
      }

      div.appendChild(ascSpan);
      div.appendChild(dscSpan);
      th.appendChild(div);
    }
    tr.appendChild(th);
  }

  this.table = table;
  this.thead = thead;
  this.tbody = tbody;
  this.wrapperElem.appendChild(table);
}

function renderTbody(data) {
  this.tbody.innerHTML = ''
  data.forEach(row => {
    let tr = document.createElement('tr');
    let fragment = document.createDocumentFragment();
    row.forEach(col => {
      let td = document.createElement('td');
      td.textContent = col;
      fragment.appendChild(td);
    })
    tr.appendChild(fragment);
    this.tbody.appendChild(tr);
  })
}

function getTableOffsetTop() {
  let elem = this.table;
  let tableWidth = elem.offsetWidth;
  let topPos = 0;
  let bottomPos = 0;
  while (elem.offsetParent) {
    topPos += elem.offsetTop;
    elem = elem.offsetParent;
  }
  bottomPos = topPos + this.tbody.offsetHeight;
  return {
    tableWidth,
    topPos,
    bottomPos
  }
}

function FrozenThead(top, bottom, width) {
  console.log(width)
  let windowOffset = window.pageYOffset;
  if (windowOffset >= top && windowOffset <= bottom) {
    this.thead.style.width = width + 'px';
    this.thead.className = 'frozen';
  } else {
    this.thead.className = '';
  }
}

function init() {
  this.createBasicTable();
  this.renderTbody(this.data);
  if (this.isTheadFrozen) {
    let pos = this.getTableOffsetTop();
    window.onscroll = FrozenThead.bind(this, pos.topPos, pos.bottomPos, pos.tableWidth);
  }
}


sortedTable.prototype = {
  constructor: sortedTable,
  createBasicTable,
  renderTbody,
  init,
  bindEvent,
  sortColsFn,
  getTableOffsetTop
}

new sortedTable('.table-example', {
  thead: ['姓名', '语文', '数学', '英语', '总分'],
  data: [
    ['小红', 80, 81, 82, 83],
    ['小明', 99, 72, 93, 100],
    ['小黄', 85, 98, 96, 95],
    ['小红', 80, 81, 82, 83],
    ['小明', 99, 72, 93, 100],
    ['小黄', 85, 98, 96, 95],
    ['小红', 80, 81, 82, 83],
    ['小明', 99, 72, 93, 100],
    ['小黄', 85, 98, 96, 95],
    ['小红', 80, 81, 82, 83],
    ['小明', 99, 72, 93, 100],
    ['小黄', 85, 98, 96, 95]
  ],
  sortCols: ['语文', '总分', '英语'],
  handlerFn: [],
  isTheadFrozen: true
});
