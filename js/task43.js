
function getImages (prevImgList, newImg) {
  return [...prevImgList, newImg]
}

let oneImg = [
  "https://images.pexels.com/photos/175960/pexels-photo-175960.jpeg?w=940&h=650&auto=compress&cs=tinysrgb"
];
let twoImgs = getImages(oneImg, 'https://images.pexels.com/photos/175554/pexels-photo-175554.jpeg?w=940&h=650&auto=compress&cs=tinysrgb');
let threeImgs = getImages(twoImgs, "https://images.pexels.com/photos/175960/pexels-photo-175960.jpeg?w=940&h=650&auto=compress&cs=tinysrgb");
let fourImgs = getImages(threeImgs, "https://images.pexels.com/photos/2324/skyline-buildings-new-york-skyscrapers.jpg?w=940&h=650&cs=tinysrgb");
let fiveImgs = getImages(fourImgs, "https://images.pexels.com/photos/816/city-sky-skyline-sailboats.jpg?w=940&h=650&auto=compress&cs=tinysrgb");
let sixImgs = getImages(fiveImgs, "https://images.pexels.com/photos/2324/skyline-buildings-new-york-skyscrapers.jpg?h=130&auto=compress&cs=tinysrgb");

new Gallery('.gallery-container', oneImg);
new Gallery('.gallery-container', twoImgs);
// new Gallery('.gallery-container', threeImgs);
new Gallery('.gallery-container', fourImgs);
new Gallery('.gallery-container', fiveImgs);
new Gallery('.gallery-container', sixImgs);