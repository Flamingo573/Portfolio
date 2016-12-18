'use strict';

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
