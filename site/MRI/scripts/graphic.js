'use strict';

class Graphic {
    constructor(options) {
        this.svg = options.svg;
        this.count = 0;

        window.addEventListener('load', bind(this.listenerLoad, this));
    }

    listenerLoad() {
        this.heightGraphicZero()
        window.addEventListener('scroll', bind(this.setGraphic, this));
    }

    heightGraphicZero() {
        this.graphic = this.svg.contentDocument.querySelectorAll('line[id^="graphic"]');

        for (var i = 0; i < this.graphic.length; i++) {
            this.graphic[i].setAttribute('y1', '174.8');
        }
    }

    setGraphic() {
        var boxCoord = document.body.querySelector('.box-1').getBoundingClientRect(),
            centerY = document.documentElement.clientHeight / 2 + window.pageYOffset,
            arrPosY1 = [114.8, 129.8, 139.8, 148.8, 156.8]

        if (centerY > boxCoord.top + window.pageYOffset && this.count == 0) {
            this.count = 1;

            animate(bind(function(progress) {
                var pos = 174.8;
                if (progress == 1) var progress = 156.8;
                else var progress = pos - progress * 19;
                this.graphic[4].setAttribute('y1', progress);
            }, this), 500, 100);

            animate(bind(function(progress) {
                var pos = 174.8;
                if (progress == 1) var progress = 148.8;
                else var progress = pos - progress * 25;
                this.graphic[3].setAttribute('y1', progress);
            }, this), 500, 600);

            animate(bind(function(progress) {
                var pos = 174.8;
                if (progress == 1) var progress = 139.8;
                else var progress = pos - progress * 35;
                this.graphic[2].setAttribute('y1', progress);
            }, this), 500, 1100);

            animate(bind(function(progress) {
                var pos = 174.8;
                if (progress == 1) var progress = 129.8;
                else var progress = pos - progress * 45;
                this.graphic[1].setAttribute('y1', progress);
            }, this), 500, 1700);

            animate(bind(function(progress) {
                var pos = 174.8;
                if (progress == 1) var progress = 114.8;
                else var progress = pos - progress * 60;
                this.graphic[0].setAttribute('y1', progress);
            }, this), 500, 2300);
        }
    }
}

var graphic = new Graphic({
    svg: document.body.querySelector('.items-box1')
});
