/**
 * Created by yawenina on 10/29/16.
 */
let radio_wrapper = $('.radio-wrapper');
let at_school_radio = $('#atSchoolRadio');
let city_select = $('#cities');
let schools_options = $('#schools');

function $(selector) {
  return document.querySelector(selector);
}
function personTypeHandler() {
  let at_school_div = $('#atSchool');
  let out_school_div = $('#outSchool');
  if (at_school_radio.checked) {
    at_school_div.style.display = 'flex';
    out_school_div.style.display = 'none';
  } else {
    out_school_div.style.display = 'flex';
    at_school_div.style.display = 'none';
  }
}

function renderSchoolsOptions () {
  let schools = [
    ['清华大学', '北京大学', '中国人民大学'],
    ['复旦大学', '同济大学', '上海交通大学'],
    ['四川大学', '电子科技大学', '西南财经大学']
  ];
  let show_schools = schools[city_select.selectedIndex];
  let fragment = document.createDocumentFragment();
  schools_options.textContent = '';
  show_schools.forEach(function (school) {
    let option = document.createElement('option');
    option.value = school;
    option.text = school;
    fragment.appendChild(option);
  });
  schools_options.appendChild(fragment);
}

radio_wrapper.addEventListener('change', personTypeHandler);

city_select.addEventListener('change', renderSchoolsOptions);


// 初始化大学选择下拉框
renderSchoolsOptions();
