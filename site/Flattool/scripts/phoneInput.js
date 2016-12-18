"use strict";

class Audio {
  constructor(options) {
    this.elem = options.elem;
    this.sounds = options.sounds;
    this.linkStr = options.link.innerHTML;
    this.end = options.endAudio;
    document.addEventListener('mouseover', bind(this.mouseOverPhone, this) );

  }


  mouseOverPhone(event) {
    if (event.target != this.elem) return;

    var elem = event.target;
    var count = 1;

    var timeId = setInterval( bind(function()  {
      if (count == this.parseStr(this.linkStr)) {
        clearInterval(timeId);
        this.end.play();
      }

      this.sounds[ this.randomNamber() ].play();
      count++;
    }, this), 700)

    elem.onmouseout = function() {
      clearInterval(timeId);
      audio.end.pause();
      audio.end.currentTime = '0';
    }
    }

  playEndAudio() {
    this.end.play();
  }

  playAudio() {
    this.sounds[ this.randomNamber() ].play();
  }

  parseStr(str) {
    return str.split('-').join('').length;
  }

  randomNamber() {
    return Math.floor(Math.random() * 10)
  }

}


var audio = new Audio({
  elem: document.body.querySelector('i[class*="fa-phone"]'),
  link: document.body.querySelector('a[href^="tel"]'),
  sounds: document.body.querySelectorAll('audio'),
  endAudio: document.getElementById('endAudio')
})
