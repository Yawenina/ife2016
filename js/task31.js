/**
 * Created by yawenina on 10/29/16.
 */
let radios = document.querySelectorAll('input[type="radio"]');
let last_person_type = 'atSchool';
let city_select = document.getElementById('cities');
let schools_options = document.getElementById('schools');
let schools = [
  ['清华大学', '北京大学', '中国人民大学'],
  ['复旦大学', '同济大学', '上海交通大学'],
  ['四川大学', '电子科技大学', '西南财经大学']
]

function personTypeHandler() {
  let curr_person_type = event.target.value;
  if (curr_person_type === last_person_type) {
    return false;
  } else {
    document.getElementById(last_person_type).style.display = 'none';
    document.getElementById(curr_person_type).style.display = 'flex';
    last_person_type = curr_person_type;
  }
}

function renderSchoolsOptions () {
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

Array.prototype.forEach.call(radios, function (node) {
  node.addEventListener('click', personTypeHandler);
});

city_select.addEventListener('change', renderSchoolsOptions);


// 初始化大学选择下拉框
renderSchoolsOptions();
