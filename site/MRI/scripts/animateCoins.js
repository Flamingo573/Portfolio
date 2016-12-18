'use strict';

class AnimateCoins {
    constructor(options) {
        this.svg = options.svg;
        this.count = 1;
        window.addEventListener('load', bind(this.listenerLoad, this));
    }

    listenerLoad() {
        window.addEventListener('scroll', bind(this.hideCoins, this));
    }

    animEnd(coins) {
        animate(function(progress) {

            if (progress == 1) var progress = 20;
            else var progress = progress * 15;

            coins[0].style.cssText = 'transform: translateY(' + progress + 'px)';
        }, 200, 500);

        animate(function(progress) {
            if (progress == 1) var progress = 45;
            else var progress = progress * 25;

            coins[2].style.cssText = 'transform: translateY(' + progress + 'px) translateX(-14.4px)';
        }, 100, 1000);

        animate(function(progress) {
            if (progress == 1) var progress = 45;
            else var progress = progress * 45;

            coins[1].style.cssText = 'transform: translateY(' + progress + 'px) translateX(9.2px)';
        }, 200, 1500);
    }

    hideCoins() {
        var boxCoord = document.body.querySelector('.box-1').getBoundingClientRect().top + window.pageYOffset,
            centerY = document.documentElement.clientHeight / 2 + window.pageYOffset,
            self = this,
            coins = this.svg.contentDocument.querySelectorAll('g[id^="coin"]');

        if (centerY > boxCoord && this.count) {
            this.count = 0;
            animate(function(progress) {
                if (progress == 1) var progressX = 9.2;
                else var progressX = progress * 10;

                if (progress == 1) var progressY = -13;
                else var progressY = -progress * 15;

                coins[1].style.cssText = 'transform: translateX(' + progressX + 'px) translateY(' + progressY + 'px)';

                if (progress == 1) self.animEnd(coins);
            }, 200, 3000);

            animate(function(progress) {
                if (progress == 1) var progress = -14.4;
                else var progress = -progress * 15;

                coins[2].style.cssText = 'transform: translateX(' + progress + 'px)';
            }, 200, 3500);
        }
    }
}

var animateCoins = new AnimateCoins({
    svg: document.body.querySelector('.items-box1')
});
