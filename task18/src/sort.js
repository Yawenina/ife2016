/**
 * Created by yawenina on 1/24/17.
 */
function bubbleSort(arr) {
  let len = arr.length;
  while (len--) {
    for (let i = 0; i < len; i++) {
      if (arr[i] > arr[i+1]) {
        swap(arr, i, i+1);
      }
    }
  };
  return arr;
}

function swap(data, i, j) {
  let temp = data[i];
  data[i] = data[j];
  data[j] = temp;
}

export default { bubbleSort }