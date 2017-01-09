/**
 * Created by yawenina on 1/9/17.
 */
let imagesArr = [
  'http://placehold.it/250x400/E97452/fff',
  'http://placehold.it/250x300/4C6EB4/fff',
  'http://placehold.it/250x250/449F93/fff',
  'http://placehold.it/200x300/936FBC/fff',
  'http://placehold.it/350x200/75A0CC/fff',
  'http://placehold.it/300x250/4296AD/fff',
  'http://placehold.it/400x300/D25064/fff',
  'http://placehold.it/200x280/936FBC/fff'
]

let newImgs = [
  'http://placehold.it/350x150/75A0CC/fff',
  'http://placehold.it/300x250/4296AD/fff',
  'http://placehold.it/400x300/D25064/fff',
]
new wallGallery('.gallery-container', imagesArr, {columns: 5}).init().addImg(newImgs);