/**
 * Created by yawenina on 1/9/17.
 */
function wallGallery(wrapper, images, options) {
  var options = options || {};
  this.wrapper = document.querySelector(wrapper);
  this.columns = options.columns ? options.columns : 4;
  this.padding = options.padding ? options.padding : 16;
  this.images = images;
  this.colElems = [];
  this.colHeightList = [];
}

wallGallery.prototype.renderColumns = function () {
  let wallWrapper = document.createElement('div');
  let fragment = document.createDocumentFragment();
  let colWidth = 100/this.columns;
  wallWrapper.className = 'wall-gallery';
  for (let i = 1, len = this.columns + 1; i < len; i++) {
    let div = document.createElement('div');
    div.className = 'column-' + i;
    div.style.width = colWidth + '%';
    if (i !== len - 1) {
      div.style.paddingRight = this.padding + 'px';
    }
    this.colElems.push(div);
    fragment.appendChild(div);
  }
  wallWrapper.appendChild(fragment);
  this.wrapper.appendChild(wallWrapper);
}

wallGallery.prototype.initColHeight = function () {
  let colHeightList = [];
  for(let i = 0, len = this.columns; i < len; i++) {
    colHeightList.push(0);
  }
  this.colHeightList = colHeightList;
}

wallGallery.prototype.addImg = function (imgArr) {
  for (let i = 0, len = imgArr.length; i < len; i++) {
    let img = document.createElement('img');
    img.src = imgArr[i];
    let colHeightList = [];
    for(let i = 0, len = this.colElems.length; i < len; i++) {
      colHeightList.push(this.colElems[i].clientHeight);
    }
    let minHeight = Math.min.apply(null, colHeightList);
    let minHeightIdx = colHeightList.indexOf(minHeight);
    this.colElems[minHeightIdx].appendChild(img);
  }

};

wallGallery.prototype.init = function () {
  this.renderColumns();
  this.initColHeight();
  this.addImg(this.images);
  return this;
}