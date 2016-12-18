'use strict';

class AnimationBox2 {
    /**
     * Конструктор AnimationBox2 создает методы необходимые для запуска анимации при определённом скролле.
     * @param {object} options - Объект, содержащий svg элемент.
     */
    constructor(options) {
        this.svg = options.svg;
        window.addEventListener('load', bind(this.listenerLoad, this));
    }

    /**
     * Обрабатывает событие "load", чтобы быть уверенным в полной загрузке DOM дерева svg элемента.
     * Устанавливает обработчик скролла.
     */
    listenerLoad() {
        this.svg = this.svg.contentDocument;
        window.addEventListener('scroll', bind(this.listenerScroll, this));
    }

    /**
     *  Запускает анимацию при определённом скролле.
     */
    listenerScroll() {
        let itemsBox = this.svg.querySelector('#items-box-2');
        let centerY = document.documentElement.clientHeight / 2 + window.pageYOffset,
            percentScrollLarge = (centerY - (large.getBoundingClientRect().top + window.pageYOffset)) * 100 / large.offsetHeight;

        if (percentScrollLarge > 33 && percentScrollLarge < 66) {
            setTimeout(bind(function() {
                itemsBox.classList.add('active');
            }, this), 300);
        }
    }
}

let animationBox2 = new AnimationBox2({
    svg: document.body.querySelectorAll('object')[1]
});

class AnimationBox3 {
    /**
     * Конструктор AnimationBox3 создает методы необходимые для запуска анимации при определённом скролле.
     * @param {object} options - Объект, содержащий svg элемент.
     */
    constructor(options) {
        this.svg = options.svg;
        window.addEventListener('load', bind(this.listenerLoad, this));
    }

    /**
     * Обрабатывает событие "load", чтобы быть уверенным в полной загрузке DOM дерева svg элемента.
     * Устанавливает обработчик скролла.
     */
    listenerLoad() {
        this.svg = this.svg.contentDocument;
        window.addEventListener('scroll', bind(this.listenerScroll, this));
    }

    /**
     *  Запускает анимацию при определённом скролле.
     */
    listenerScroll() {
        let itemsBox = this.svg.querySelector('#items-box-3'),
            centerY = document.documentElement.clientHeight / 2 + window.pageYOffset,
            percentScrollPage = (centerY - (large.getBoundingClientRect().top + window.pageYOffset)) * 100 / large.offsetHeight;

        if (percentScrollPage > 66) itemsBox.classList.add('active');
    }
}

let animateItemBox3 = new AnimationBox3({
    svg: document.body.querySelectorAll('object')[2]
});

function animate(draw, duration, delay) {
    setTimeout(bind(animateDelay, this), delay);

    function animateDelay() {
        var start = performance.now();

        requestAnimationFrame(function animate(time) {

            var timePassed = time - start;

            if (timePassed > duration) timePassed = duration;

            draw(timePassed / duration);

            if (timePassed / duration != 1) {
                requestAnimationFrame(animate);
            }
        })
    }
};

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

function bind(func, context) {
  return function(event) {
    return func.call(context, event);
  };
}

class Clock {
    /**
     * Конструктор Clock создает методы для работы часов.
     * @param {object} options - Объект, содержащий svg элемент.
     */
    constructor(options) {
        this.svg = options.svg;

        window.addEventListener('load', bind(this.listenerLoad, this));
    }

    /**
     * Обрабатывает событие "load", чтобы быть уверенным в полной загрузке DOM дерева svg элемента.
     * Запускает обновление часов.
     */
    listenerLoad() {
        setInterval(bind(this.setTime, this), 1000);
    }

    /**
     * Рассчитывает и устанавливает положение стрелок.
     */
    setTime() {
        var time = new Date();

        var hour = this.svg.contentDocument.querySelector('#hour'),
            minute = this.svg.contentDocument.querySelector('#minute_1_'),
            second = this.svg.contentDocument.querySelector('#second');

        hour.style.cssText = `transform-origin: ${getTransOrigin(hour, "rect", 50, 100)}; transform: rotate( ${(time.getHours() * 60 + time.getMinutes()) / 2}deg)`;
        minute.style.cssText = `transform-origin: ${ getTransOrigin(minute, "rect", 50, 100)}; transform: rotate(${(time.getMinutes() * 6)}deg)`;
        second.style.cssText = `transform-origin: ${getTransOrigin(second, "rect", 50, 100)}; transform: rotate( ${(time.getSeconds() * 6)}deg)`;
    }
}

var clock = new Clock({
    svg: document.body.querySelector('.items-box1')
});

/**
 * Рассчитывает transform-origin для svg элементов.
 * @param {object} elem - Элемент для которого будет рассчитываться transform-origin.
 * @param {string} type - Тип элемента, один из: прямоугольник, линия, круг, группа.
 * @param {namber} x - Координата x в процентах, относительно которой будет происходить трансформация.
 * @param {namber} y - Координата y в процентах, относительно которой будет происходить трансформация.
 * @return {string} Строка для вставки в css свойство transform-origin;
 */
function getTransOrigin(elem, type, x, y) {
    var objectTypes = {
        rect: function() {
            var elemX = elem.getAttribute('x'),
                elemY = elem.getAttribute('y'),
                elemWidth = elem.getAttribute('width'),
                elemHeight = elem.getAttribute('height');

            return (elemWidth * x / 100 + +elemX) + 'px ' + (elemHeight * y / 100 + +elemY) + 'px';
        },

        line: function() {
            var elemHeight = elem.getAttribute('y2') - elem.getAttribute('y1'),
                elemX = elem.getAttribute('x1');

            return (elem.getAttribute('x1')) + 'px ' + (elemHeight * y / 100 + +elem.getAttribute('y1')) + 'px';
        },

        circle: function() {
            return (elem.getAttribute('cx')) + 'px ' + (elem.getAttribute('cy')) + 'px';
        },

        g: function() {
            return (elem.getBoundingClientRect().width * x / 100 + elem.getBoundingClientRect().left) + 'px ' + (elem.getBoundingClientRect().height * y / 100 + elem.getBoundingClientRect().top) + 'px';
        }
    };

    return objectTypes[type]();
}

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

class SectionHeight {
  constructor(options) {
    this.header = options.firstElem;
    this.section = options.lastElem;
    this.setHeight();
    window.addEventListener('resize', bind(this.setHeight, this) );
  }

  setHeight() {
    this.section.style.height = 100 - (this.header.offsetHeight * 100 / document.documentElement.clientHeight) + '%';
  }
}

var sectionHeght = new SectionHeight({
  firstElem: document.body.querySelector('.main-section header'),
  lastElem: document.body.querySelector('.main-section section')
});

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

let slider = new Slider({
    largeBox: document.body.querySelector('.large-box-SVG'),
    boxes: document.body.querySelectorAll('.large-box-SVG div[class^="box"]'),
    svg: document.body.querySelector('.slider')
});
