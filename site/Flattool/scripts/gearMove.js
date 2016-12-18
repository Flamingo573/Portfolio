"use strict";

class GearMove {
  constructor(options) {
    this.elem = options.elem;
    document.addEventListener('mouseover', bind(this.listenerGear, this));

  }

  gearMovePlay() {

    this.elem.classList.add('rotateGear');
  }

  gearMoveStop() {
    this.elem.classList.remove('rotateGear');
  }

  listenerGear(event) {

    if ( !event.target.classList.contains('gear-move') ) return;

    this.gearMovePlay();

    this.elem.onmouseout = bind(function() {
      this.gearMoveStop();
    }, this)
  }
}

var gearMove = new GearMove({
  elem: document.querySelector('.gear-move')
})
