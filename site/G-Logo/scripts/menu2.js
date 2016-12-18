'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Menu = function () {
    function Menu(options) {
        _classCallCheck(this, Menu);

        this.wrapper = options.wrapper;
        this.iconMenu = options.iconMenu;
        this.li = this.wrapper.querySelectorAll('.menu li');

        this.addListenerForLi();
        window.addEventListener('click', bind(this.listenerEvent, this));
        window.addEventListener('touchend', bind(this.listenerEvent, this));
    }

    _createClass(Menu, [{
        key: 'listenerEvent',
        value: function listenerEvent(event) {
            if (this.iconMenu.contains(event.target)) {
                this.hideMenu('toggle');
                event.preventDefault();
            }
            if (!this.wrapper.contains(event.target)) this.hideMenu('close');
        }
    }, {
        key: 'hideMenu',
        value: function hideMenu(prop) {
            if (prop == 'close') this.wrapper.classList.remove('active');
            if (prop == 'toggle') this.wrapper.classList.toggle('active');
        }
    }, {
        key: 'addListenerForLi',
        value: function addListenerForLi() {
            for (var i = 0; i < this.li.length; i++) {
                this.li[i].addEventListener('click', bind(this.listenerEventLi, this));
            }
        }
    }, {
        key: 'listenerEventLi',
        value: function listenerEventLi() {
            this.hideMenu('close');
        }
    }]);

    return Menu;
}();
