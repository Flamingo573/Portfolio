"use strict";

class OpenFile {
    constructor(options) {
        this.wrapper = options.wrapper;
        this.poolFile = options.poolFile;
        this.viewer = options.viewer;
        this.file = options.file;

        this.wrapper.addEventListener('click', bind(this.listenerEvent, this));
    }

    listenerEvent(event) {
        let target = event.target;
        if (target.classList.contains('file')) this.setFile(target)
    }

    setFile(target) {
        this.viewer.classList.add('hideHint')

        let nameFile = target.innerHTML;
        let file = this.searchFile(nameFile);

        this.viewer.innerHTML = file;

        this.setActiveState(target);
    }

    searchFile(name) {
        let file = this.poolFile.getElementsByClassName(name)[0].innerHTML;
        return file;
    }

    setActiveState(elem) {
      for (let i = 0; i < this.file.length; i++) {
        this.file[i].classList.remove('open')
      }
      elem.classList.add('open');
    }
}

let openFile = new OpenFile({
    wrapper: document.body.getElementsByClassName('nav-wrapper')[0],
    poolFile: document.body.getElementsByClassName('poolFile')[0],
    file: document.body.getElementsByClassName('file'),
    viewer: document.body.getElementsByClassName('section-code')[0]
});
