'use strict';

class Menu {
    constructor(options) {
        this.wrapper = options.wrapper;
        this.iconMenu = options.iconMenu;
        this.li = this.wrapper.querySelectorAll('.menu li');

        this.addListenerForLi();
        window.addEventListener('click', bind(this.listenerEvent, this));
        window.addEventListener('touchend', bind(this.listenerEvent, this));
    }

      listenerEvent(event) {
        if (this.iconMenu.contains(event.target)) {
            this.hideMenu('toggle');
            event.preventDefault();
        }
        if (!this.wrapper.contains(event.target)) this.hideMenu('close');
      }

      hideMenu(prop) {
        if (prop == 'close') this.wrapper.classList.remove('active');
        if (prop == 'toggle') this.wrapper.classList.toggle('active');
      }

      addListenerForLi() {
        for (var i = 0; i < this.li.length; i++) {
            this.li[i].addEventListener('click', bind(this.listenerEventLi, this));
        }
      }

      listenerEventLi() {
        this.hideMenu('close');
      }
}
