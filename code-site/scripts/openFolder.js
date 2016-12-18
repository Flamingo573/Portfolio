"use strict";

class OpenFolder {
  constructor() {
    window.addEventListener('click', bind(this.listenerEvent, this) )
  }
  listenerEvent(event) {
    if (event.target.classList.contains('folder')) event.target.classList.toggle('open');
  }
}

let openFolder = new OpenFolder();
