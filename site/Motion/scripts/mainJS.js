var sliderWithDots = new Slider({
    wrapper: document.getElementById("sliderWithDots"),
    carousel: document.getElementsByClassName('carousel')[0],
    limiter: document.getElementsByClassName('limiterForWidth')[0],
    amountImage: {
        4: 960,
        3: 850,
        1: 500
    },
    margin: 50,
    autoPlayTime: 5000 //ms || false
});
sliderWithDots.start();



var sliderForTweets = new Slider({
    wrapper: document.getElementById("sliderForTweets"),
    carousel: document.getElementsByClassName('carousel')[1],
    limiter: document.getElementsByClassName('limiterForWidth')[1],
    amountImage: {
        5: 0,
        3: 0,
        1: 960
    },
    margin: 50,
    autoPlayTime: 5000 //ms || false
});
sliderForTweets.start();



var sliderCarousel = new SliderCarousel({
  img: document.body.querySelectorAll('img[class^="image"]'),
  arrClasses:  ['image-1', 'image-2', 'image-3'],
  buttons: document.body.querySelectorAll('.wrapper-for-slider div[class$="button"]'),
  wrapper: document.body.querySelector('.wrapper-for-slider'),
  autoPlayTime: 5000 //ms || false
});
