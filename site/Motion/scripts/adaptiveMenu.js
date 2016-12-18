'use strict';

class Menu {
    /**
     * Конструктор Menu создает все необходимое для работы адаптивного меню.
     * @param {object} options - Содержит обёртку и иконку меню.
     */
    constructor(options) {
        this.wrapper = options.wrapper;
        this.iconMenu = options.iconMenu;
        this.li = this.wrapper.querySelectorAll('nav li');

        this.addListenerForLi();
        window.addEventListener('click', bind(this.listenerEvent, this));
        window.addEventListener('touchend', bind(this.listenerEvent, this));
    }

    /**
     * Обрабатывает события click и touchend.
     * При нажатии на иконку меню, переключает активный класс.
     * При нажатии вне меню, закрывает его.
     */
    listenerEvent(event) {
        if (this.iconMenu.contains(event.target)) {
            this.hideMenu('toggle');
            event.preventDefault();
        }
        if (!this.wrapper.contains(event.target)) this.hideMenu('close');
    }

    /**
     * Переключает состояния меню.
     * @param {string} action - Действие которое необходимо выполнить.
     */
    hideMenu(action) {
        if (action == 'close') this.wrapper.classList.remove('open');
        if (action == 'toggle') this.wrapper.classList.toggle('open');
    }

    /**
     * Назначает обработчик на каждый li.
     */
    addListenerForLi() {
        for (var i = 0; i < this.li.length; i++) {
            this.li[i].addEventListener('click', bind(this.listenerEventLi, this));
        }
    }

    /**
     * Обрабатывает click на li, прячет меню.
     */
    listenerEventLi() {
        this.hideMenu('close');
    }
}

var menu = new Menu({
    wrapper: document.getElementsByTagName('header')[0],
    iconMenu: document.getElementsByClassName('wrapper-icon-menu')[0]
});
