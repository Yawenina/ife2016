/**
 * Created by yawenina on 1/24/17.
 */
function bubbleSort(wrapper) {
  let arr = wrapper.children;
  let len = arr.length;
  while (len--) {
    setTimeout(function () {
      console.time();
      for (let i = 0; i < len; i++) {
        setTimeout(function () {
          arr[i].style.backgroundColor = "blue";
        }, 200)
        setTimeout(function () {
          arr[i+1].style.backgroundColor = "blue";
        }, 200)
        setTimeout(function () {
          if (arr[i].dataset.val > arr[i+1].dataset.val) {
            swap(arr, i, i+1);
          }
        }, 500)
      }
    }, 500)
  };
  return arr;
}

function swap(data, i, j) {
  let parent = data[i].parentElement;
  setTimeout(function () {
    parent.insertBefore(data[j], data[i+1]);
  }, 500)
  setTimeout(function () {
    parent.insertBefore(data[i], data[j+1]);
  }, 500)
  // let temp = data[i];
  // data[i] = data[j];
  // data[j] = temp;
}

export default { bubbleSort }