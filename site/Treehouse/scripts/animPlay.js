'use strict';

class AnimPlay {
  /**
  * Конструктор AnimPlay создает методы, которые необходимы для включения анимации при определённом скролле.  
  * @param {object} options - Объект, содержащий целевой элемент анимации.
  */
  constructor(options) {
    this.justRelax = options.justRelax;

    window.addEventListener('scroll', bind(this.monitoringScroll, this));
  }

  /**
  *  Контролирует текущий скролл и при необходимости включает анимацию.
  * @param {object} event - Объект, событие скролла.
  */
  monitoringScroll(event) {
     console.log( event)
      let coordJustRelax = this.justRelax.getBoundingClientRect();
      let startCoord = (coordJustRelax.top + window.pageYOffset) + coordJustRelax.height;

      if (window.pageYOffset + document.documentElement.clientHeight >= startCoord) this.justRelax.classList.add('active');
  }
}

let animPlay = new AnimPlay({
  justRelax: document.body.querySelector('.just-relax'),
});
