var menu = new Menu({
    wrapper: document.getElementsByTagName('header')[0],
    iconMenu: document.getElementsByClassName('wrapper-nav')[0]
});

var fixedMenu = new FixedMenu({
  scrollPlay: document.body.getElementsByClassName('section-logo')[0],
  menu: document.body.getElementsByClassName('js-nav')[0]
});

var slider = new Slider({
    wrapper: document.getElementById("js-slider"),
    carousel: document.getElementsByClassName('js-carousel')[0],
    limiter: document.getElementsByClassName('js-limiterForWidth')[0],
    amountImage: {
        4: 1200,
        3: 800,
        2: 450,
        1: 300
    },
    margin: 80,
    autoPlayTime: 5000 //ms || false
});

slider.start();
