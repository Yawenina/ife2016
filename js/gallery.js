/**
 * Created by yawenina on 1/6/17.
 */

function Gallery(container, images) {
  // TODO:未传参数的报错
  this.container = document.querySelector(container);
  this.images = images;
  this.init();
}

Gallery.prototype.init = function () {
  this.renderHtml();
}

Gallery.prototype.renderHtml = function () {
  let div = document.createElement('div');
  let fragment = document.createDocumentFragment();
  let imgLen = this.images.length;
  div.classList = 'gallery-' + imgLen;
  for (let i = 0; i < imgLen; i++) {
    let img = document.createElement('img');
    img.src = this.images[i];
    fragment.appendChild(img);
  }
  div.appendChild(fragment);
  this.container.appendChild(div);
}



