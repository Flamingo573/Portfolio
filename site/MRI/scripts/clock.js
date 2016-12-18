'use strict';

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
