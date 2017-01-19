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
  nowSelectCity: 0,
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

//生成图标渲染数据
let chartData = {"day": {}, "week": {}, "month": {}}
function initAqiChartData() {
  let city = Object.keys(aqiSourceData)[pageState.nowSelectCity];
  chartData.day = aqiSourceData[city];
  if (pageState.nowGraTime === 'week') {
    let weekIdx = 1;
    let start, end;
    let dataList = Object.values(chartData.day);
    for (let i = 0; i < 91; i = i + 7) {
      if ((i+7) <= 91) {
        start = i;
        end = i + 7;
      } else {
        start = i;
        end = 91;
      }
      //slice不会改变原数组， 而splice会改变原数组;
      let total = dataList.slice(start, end).reduce((prev,next) => {
        return prev + next;
      }, 0)
      let average = parseInt(total / (end - start));
      let key = 'week' + weekIdx;
      chartData.week[key] = average;
      weekIdx++;
    }
    return;
  }

  if (pageState.nowGraTime === 'month') {
    let totalDays = 0;
    for (let i = 1; i <= 12; i++){
      //  获取一个月一共有多少天;
      let monthDays = new Date(2016, i, 0).getDate();
      let dataList = Object.values(chartData.day);
      let dataDays = dataList.length;
      let end = totalDays + monthDays <= dataDays ? totalDays + monthDays : dataDays;
      let total = dataList.slice(totalDays, end + 1).reduce((prev,next) => {
        return prev + next;
      }, 0)
      let average = parseInt(total / (end - totalDays));
      chartData.month[i] = average;
      totalDays += monthDays;
      if (end >= dataDays) {
        break;
      }
    }
  }

}

function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();