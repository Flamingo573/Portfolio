'use strict';

class FixedMenu {
    constructor(options) {
        this.scrollPlay = options.scrollPlay.getBoundingClientRect().height;
        this.menu = options.menu;

        window.addEventListener('scroll', bind(this.listenerScroll, this));
    }

    listenerScroll(event) {
      let scroll = window.pageYOffset || document.documentElement.scrollTop;
      if (scroll > this.scrollPlay) this.menu.classList.add('active');
      else this.menu.classList.remove('active');
      let opacity = 1 - scroll / 300;

      if (opacity < 0.6) opacity = 0.6;
      this.menu.style.cssText = `background:rgba(0, 0, 0, ${opacity});`;
    }
}
