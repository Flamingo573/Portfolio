'use strict';

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
