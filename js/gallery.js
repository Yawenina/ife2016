/**
 * Created by yawenina on 1/6/17.
 */

function Gallery(container, images) {
  // TODO:未传参数的报错
  let imgLen = images.length;
  this.container = document.querySelector(container);
  this.images = images;
  this.wrapper = null;
  this.init();

  if (imgLen === 3) {
    this.setThreeImgStyles();
  }

  if (imgLen === 5) {
    this.setFiveImgStyles();
  }
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
  this.wrapper = div;
}

function getGalleryInfos(wrapper) {
  console.log(wrapper);
  let parentWidth = wrapper.clientWidth;
  let parentHeight = wrapper.clientHeight;
  let children = wrapper.children;
  return {
    parentWidth,
    parentHeight,
    children
  }
}

function setImgSize(img, width, height) {
  img.style.width = width + 'px';
  img.style.height = height + 'px';
}

Gallery.prototype.setThreeImgStyles = function () {
  let galleryInfo  = getGalleryInfos(this.wrapper);
  let imgs = galleryInfo.children;
  let halfHeight = galleryInfo.parentHeight*0.5;
  let firstImgWidth = galleryInfo.parentWidth - halfHeight;
  setImgSize(imgs[0], firstImgWidth, galleryInfo.parentHeight);
  setImgSize(imgs[1], halfHeight, halfHeight);
  setImgSize(imgs[2], halfHeight, halfHeight);
  imgs[1].style.right = 0;
  imgs[2].style.right = 0;
  imgs[2].style.bottom = 0;
}

Gallery.prototype.setFiveImgStyles = function () {
  let galleryInfo  = getGalleryInfos(this.wrapper);
  let imgs = galleryInfo.children;
  let twoThirdHeight = galleryInfo.parentHeight*(2/3);
  let oneThirdHeight = galleryInfo.parentHeight*(1/3);
  let oneThirdWidth = galleryInfo.parentWidth*(1/3);
  setImgSize(imgs[0], oneThirdWidth*2, twoThirdHeight);
  setImgSize(imgs[1], oneThirdWidth, oneThirdWidth);
  setImgSize(imgs[2], oneThirdWidth, oneThirdHeight);
  setImgSize(imgs[3], oneThirdWidth, oneThirdHeight);
  setImgSize(imgs[4], oneThirdWidth, galleryInfo.parentHeight - oneThirdWidth);
  imgs[1].style.right = 0;
  imgs[2].style.left = 0;
  imgs[2].style.bottom = 0;
  imgs[3].style.left = oneThirdWidth + 'px';
  imgs[3].style.bottom = 0;
  imgs[4].style.bottom = 0;
  imgs[4].style.right = 0;
}


