'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpenImg = function () {
    function OpenImg(options) {
        _classCallCheck(this, OpenImg);

        this.state = false;
        document.body.addEventListener("click", bind(this.listenerClick, this));
    }

    _createClass(OpenImg, [{
        key: 'listenerClick',
        value: function listenerClick(event) {
            var target = event.target;
            if (target.classList.contains('js-min-image')) {
                this.createElem(target);
                this.open();
                event.preventDefault();
            }
            if (target.classList.contains('show-image-wrapper')) this.close();
        }
    }, {
        key: 'createElem',
        value: function createElem(img) {
            this.wrapper = document.createElement('div');
            this.wrapper.classList.add('show-image-wrapper');

            this.image = document.createElement('img');
            this.image.classList.add('show-image');
            this.image.src = img.src;
        }
    }, {
        key: 'open',
        value: function open() {
            this.state = true;

            document.body.appendChild(this.wrapper);
            document.body.appendChild(this.image);
        }
    }, {
        key: 'close',
        value: function close() {
            this.state = false;

            document.body.removeChild(this.wrapper);
            document.body.removeChild(this.image);
        }
    }]);

    return OpenImg;
}();

var openImg = new OpenImg({
    image: document.body.querySelectorAll('.wrapper-img img')
});