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
