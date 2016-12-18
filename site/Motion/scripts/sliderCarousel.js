"use strict";

function SliderCarousel(options) {
    var arrClasses = options.arrClasses;
    var img = options.img;
    var autoPlayTime = options.autoPlayTime;
    var timeId;
    this.buttons = options.buttons;
    this.wrapper = options.wrapper;

    var statusShift = true;

    for (var i = 0; i < img.length; i++) {
        img[i].ondragstart = function() {
            return false;
        };
    }

    this.wrapper.addEventListener('click', bind(listenerClick, this));
    this.wrapper.addEventListener('mousedown', bind(scrollSlider, this));
    img[0].addEventListener('transitionend', bind(limiterForSpeed, this));
    window.addEventListener('keydown', bind(listenerKey, this));
    window.addEventListener('touchstart', bind(listenerTouch, this));

    autoPlay('play');

    function listenerTouch(event) {
        autoPlay('stop');
        if (this.wrapper.contains(event.target)) {
            var startPoint = event.targetTouches[0].clientX;
            var endPoint;

            window.ontouchmove = bind(function(event) {
                endPoint = event.targetTouches[0].clientX - startPoint;
            }, this);

            window.ontouchend = function() {
                if (endPoint > 0) scrollRight();
                if (endPoint < 0) scrollLeft();
                window.ontouchmove = null;
                window.ontouchend = null;
            }
        }
    }

    function scrollSlider(event) {
        autoPlay('stop');
        if (!statusShift) return;
        if (this.wrapper.contains(event.target)) {
            var startPoint = event.pageX;
            var endPoint;

            window.onmousemove = bind(function(event) {
                endPoint = event.pageX - startPoint;
            }, this)

            window.onmouseup = function() {
                if (endPoint > 0) scrollRight();
                if (endPoint < 0) scrollLeft();
                window.onmousemove = null;
                window.onmouseup = null;
            }
        }
    }

    function listenerClick(event) {
        if (!statusShift) return;
        if (event.target == this.buttons[0]) bind(scrollLeft, this)();
        if (event.target == this.buttons[1]) bind(scrollRight, this)();
    }

    function listenerKey(event) {
        if (event.keyCode == 37) bind(scrollLeft, this)();
        if (event.keyCode == 39) bind(scrollRight, this)();
    }

    function scrollLeft() {
        autoPlay('reset');
        statusShift = false;
        var arrIndex = [1, 3, 2];
        arrClasses.unshift(arrClasses.pop());
        for (var i = 0; i < img.length; i++) {
            img[i].setAttribute('class', arrClasses[i]);
            img[i].classList.add('r');
        }
    }

    function scrollRight() {
        autoPlay('reset');
        statusShift = false;
        var arrIndex = [1, 3, 2];
        arrClasses.push(arrClasses.shift());
        for (var i = 0; i < img.length; i++) {
            img[i].setAttribute('class', arrClasses[i]);
            img[i].classList.remove('r');
        }
    }

    function limiterForSpeed() {
        statusShift = true;
    }

    function autoPlay(status) {
        var time = autoPlayTime;
        if (!time) return;

        if (status == 'play') {
            clearInterval(timeId);
            timeId = setInterval(bind(function func() {
                scrollRight();
            }, this), time);
        }

        if (status == 'stop') {
            clearInterval(timeId);
        }

        if (status == 'reset') {
            clearInterval(timeId);
            autoPlay('play');
        }
    }
}
