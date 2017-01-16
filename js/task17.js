/**
 * Created by yawenina on 1/16/17.
 */
'use strict'
// var aqiSourceData = {
//   "北京": {
//     "2016-01-01": 10,
//     "2016-01-02": 10,
//     "2016-01-03": 10,
//     "2016-01-04": 10
//   }
// };
function $(selector) {
  return document.querySelector(selector);
}

//随机生成模拟数据
function getDateStr(date) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  let date = new Date('2016-01-01');
  let dateStr = '';
  let returnData = {};
  for (let i = 1; i < 92; i++) {
    dateStr = getDateStr(date);
    returnData[dateStr] = Math.ceil(Math.random() * seed);
    date.setDate(date.getDate() + 1);
  }
  return returnData;
}

let aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

//记录页面状态
let pageState = {
  nowSelectCity: -1,
  nowGraTime: 'day'
}

function graTimeChange() {
  pageState.nowGraTime = $("input[name='gra-time']:checked").value;
  console.log(pageState.nowGraTime);
  initAqiChartData();
  renderChart();
}

function citySelectChange() {
  pageState.nowSelectCity = $('#city-select').value;
  console.log(pageState.nowSelectCity);
  initAqiChartData();
  renderChart();
}


function initGraTimeForm() {
  $('#form-gra-time').addEventListener('change', graTimeChange, false);
}

function initCitySelector() {
  let citySelect = $('#city-select');
  //渲染select表单
  let cities = Object.keys(aqiSourceData);
  let fragment = document.createDocumentFragment();
  cities.forEach((city, index) => {
    let option = document.createElement('option');
    option.textContent = city;
    option.value = index;
    fragment.appendChild(option);
  })
  citySelect.appendChild(fragment);

  //绑定事件
  citySelect.addEventListener('change', citySelectChange, false);
}

function init() {
  initGraTimeForm();
  initCitySelector();
}

init();