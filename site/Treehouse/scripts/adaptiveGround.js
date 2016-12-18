'use strict';

class AdaptiveGround {
  /**
  * Конструктор AdaptiveGround создаёт метод для контроля и установки позиций фона в секции "Just Relax".
  * @param {object} options - Объект, содержащий HTML элементы.
  */
    constructor(options) {
        this.elem = options.elem;
        this.centering = options.centering;
        this.gear = options.gear;

        this.updatePos();

        window.addEventListener('resize', bind(this.updatePos, this));
    }

    /**
    * Устанавливает координаты и ширину элементов секции.
    */
    updatePos() {
        if (document.documentElement.clientWidth < 700) {
            this.elem.style = '';
            this.gear.style = '';
            return;
        }

        this.posCentering = this.centering.getBoundingClientRect();

        this.elem.style.left = `${this.posCentering.left}px`;
        this.elem.style.width = `${100 - (this.posCentering.left * 100 / document.documentElement.clientWidth)}%`;
        this.gear.style.left = `${ this.posCentering.left - 200}px`;
    }
}

let adaptiveGround = new AdaptiveGround({
    elem: document.querySelector('.right-background'),
    centering: document.body.querySelector('.centering.change-position'),
    gear: document.body.querySelector('.gear')
});
