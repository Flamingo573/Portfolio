'use strict';

class Slider {
    /**
    * Конструктор Slider создает все необходимое для установки точек в нужных места и контроля красной точки.
    * @param {object} options - Объект, который содержит обёртку, секции возле которых устанавливаются точки и svg элемент.
    */

    constructor(options) {
        this.largeBox = options.largeBox;
        this.boxes = options.boxes;
        this.svg = options.svg;

        window.addEventListener('load', bind(this.listenerEvent, this));
        window.addEventListener('resize', bind(this.listenerEvent, this));
    }

    /**
     * При возникновении событий: "load", "resize" вызывает методы, рассчитывающие координаты точек и линии.
     */
    listenerEvent() {
        this.getCoords();
        this.settingSlider();

        window.addEventListener('scroll', bind(this.redDot, this));
    }

    /**
     * Создает свойство содержащие массив с координатами элементов, относительно которых будут установлены точки.
     */
    getCoords() {
        this.coordBoxes = [];
        for (let i = 0; i < this.boxes.length; i++) {
            let coord = this.boxes[i].getBoundingClientRect().top + window.pageYOffset;
            this.coordBoxes.push(coord);
        }
    }

    /**
     * Устанавливает точки и линию на нужные координаты.
     */
    settingSlider() {
        this.svg.style.height = this.largeBox.offsetHeight + 'px';

        let svg = this.svg.contentDocument.firstChild,
            points = svg.querySelectorAll('circle[id^="circle"]'),
            line = svg.querySelector('#line');
        this.redPoint = svg.querySelector('#redCircle');
        this.coordLarge = [this.largeBox.getBoundingClientRect().top + window.pageYOffset, this.largeBox.getBoundingClientRect().botom + window.pageYOffset];

        let pointsArr = [this.coordBoxes[2] - this.coordLarge[0] + 16, this.coordBoxes[1] - this.coordLarge[0] + 16, this.coordBoxes[0] - this.coordBoxes[0] + 17];

        for (let i = 0; i < pointsArr.length; i++) {
            points[i].setAttribute('cy', pointsArr[i]);
        }

        line.setAttribute('y2', this.coordBoxes[2] - this.coordLarge[0]);
    }

    /**
     * Контролирует положение красной точки.
     */
    redDot(event) {
        let centerY = document.documentElement.clientHeight / 2 + window.pageYOffset;

        if (centerY > this.coordLarge[0]) {
            let percentScrollLarge = (centerY - this.coordLarge[0]) * 100 / large.offsetHeight;

            if (percentScrollLarge < 33) this.redPoint.setAttribute('cy', this.coordBoxes[0] - this.coordBoxes[0] + 17);

            if (percentScrollLarge > 33 && percentScrollLarge < 66) this.redPoint.setAttribute('cy', this.coordBoxes[1] - this.coordLarge[0] + 16);

            if (percentScrollLarge > 66) this.redPoint.setAttribute('cy', this.coordBoxes[2] - this.coordLarge[0] + 16);
        }
    }
}

var slider = new Slider({
    largeBox: document.body.querySelector('.large-box-SVG'),
    boxes: document.body.querySelectorAll('.large-box-SVG div[class^="box"]'),
    svg: document.body.querySelector('.slider')
});
