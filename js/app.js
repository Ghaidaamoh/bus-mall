'use strict';
let maxAttempts = prompt('please enter the attempt time');

document.write(`<span id="maxAttempts">number of attempts ${maxAttempts}</span>`);
let oldarray=[];

// document.write(`<span id="maxAttempts">number of attempts ${maxAttempts}</span>`);


let attempts = 0;
let attemptsEl = document.getElementById('attempts');
let bus = [];
let busImagesNames = [];
let busClicks = [];
let busViews = [];
function busImage(busName) {

    this.busName = busName.split('.')[0];
    this.source = 'img/' + busName;
    this.clicks = 0;
    this.views = 0;
    bus.push(this);
    busImagesNames.push(this.busName);

 
    

}
function settingItems() {
    let data = JSON.stringify(bus);
    console.log(data);
    localStorage.setItem('buses', data);

}

function gettingItems() {
    let stringObj = localStorage.getItem('buses');
    let normalObj = JSON.parse(stringObj);
    if (normalObj !== null) {
        bus = normalObj;
    }
  renderImg();

}


let busImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

for (let i = 0; i < busImages.length; i++) {
    new busImage(busImages[i]);

}

function generateImage() {

    return Math.floor(Math.random() * bus.length);
    
}

let lImgEl = document.getElementById('leftImg');

let rImgEl = document.getElementById('rightImg');

let rImgEl1 = document.getElementById('rightImg2');

let leftImgIndex;
let rightImgIndex;
let rightImgIndex2;
function renderImg() {
    leftImgIndex = generateImage();
    rightImgIndex = generateImage();
    rightImgIndex2 = generateImage();


    while (leftImgIndex === rightImgIndex || leftImgIndex === rightImgIndex2 || rightImgIndex===rightImgIndex2 ||oldarray[0]=== leftImgIndex || oldarray[0]===rightImgIndex||oldarray[0]===rightImgIndex2 || oldarray[1]=== leftImgIndex ||oldarray[1]=== rightImgIndex ||oldarray[1]=== rightImgIndex2 || oldarray[2]=== leftImgIndex ||oldarray[2]=== rightImgIndex ||oldarray[2]=== rightImgIndex2) {


    while (leftImgIndex === rightImgIndex || leftImgIndex === rightImgIndex2) {

        leftImgIndex = generateImage();

      }

   

      while (rightImgIndex === leftImgIndex || rightImgIndex === rightImgIndex2) {
        rightImgIndex = generateImage();

    
    }
      while (rightImgIndex2 === leftImgIndex || rightImgIndex2 === rightImgIndex) {
        rightImgIndex2 = generateImage();
    

    
    }
      while (rightImgIndex2 === leftImgIndex || rightImgIndex2 === rightImgIndex) {
        rightImgIndex2 = generateImage();

      }
      

    

    lImgEl.setAttribute('src', bus[leftImgIndex].source);
    lImgEl.setAttribute('title', bus[leftImgIndex].source);
    bus[leftImgIndex].views++;

    rImgEl.setAttribute('src', bus[rightImgIndex].source);
    rImgEl.setAttribute('title', bus[rightImgIndex].source);
    bus[rightImgIndex].views++;


    rImgEl1.setAttribute('src', bus[rightImgIndex2].source);
    rImgEl1.setAttribute('title', bus[rightImgIndex2].source);
    bus[rightImgIndex2].views++;

attemptsEl.textContent = attempts;
 
oldarray[0]=leftImgIndex;// =oldarry.push(lefImgIndex)
oldarray[1]=rightImgIndex;
oldarray[2]=rightImgIndex2;



    attemptsEl.textContent = attempts;


}

renderImg();

lImgEl.addEventListener('click', handelClicks);
rImgEl.addEventListener('click', handelClicks);
rImgEl1.addEventListener('click', handelClicks);

function handelClicks(event) {
    attempts++;
    if (attempts <= maxAttempts) {
      
        if (event.target.id === 'leftImg') {
            bus[leftImgIndex].clicks++;
        } else if (event.target.id === 'rightImg') {
            bus[rightImgIndex].clicks++;
        } else if (event.target.id === 'rightImg2') {
            bus[rightImgIndex2].clicks++;
        }
        renderImg();
        settingItems();
    } 
} 
let viewResult=  document.getElementById('viewResult');
viewResult.addEventListener('click',results);
function results(event) {
    let ulEl = document.getElementById('results');
    let liEl;
    for (let i = 0; i < bus.length; i++) {
        liEl = document.createElement('li');
        ulEl.appendChild(liEl);
        liEl.textContent = `${bus[i].busName} has ${bus[i].views} views and has ${bus[i].clicks} clicks.`
        busClicks.push(bus[i].clicks);
        busViews.push(bus[i].views);

    }
    lImgEl.removeEventListener('click', handelClicks);
    rImgEl.removeEventListener('click', handelClicks);
    rImgEl1.removeEventListener('click', handelClicks);
}
gettingItems();
