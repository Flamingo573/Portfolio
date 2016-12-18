"use strict";

class Nav {
    /**
     * Конструктор Nav создает все необходимые методы и свойства для управления картами
     *@constructor
     *@param {options} Объект содержащий обертку и коллекцию карт
     */

    constructor(options) {
        this.wrapper = options.wrapper;
        this.cards = options.cards;

        this.activeCard = 1; //Активная карта
        this.startCoordCard;
        this.dragObj = {};

        this.bindMove = bind(this.eventMove, this),
            this.bindUp = bind(this.eventUp, this);

        this.timeId;
        window.addEventListener('mousedown', bind(this.listenerEvent, this));
        window.addEventListener('touchstart', bind(this.listenerEvent, this));

        window.ondragstart = () => false;
    }

    listenerEvent(event) {
        this.eventDown(event);
    }

    eventDown(event) {
        document.body.classList.add('grabbing');
        let coordY = this.getCoordY(event);

        this.dragObj = {
            startPoint: coordY,
            movePoint: 0,
            scrollForAnim: 0,
            scroll: 0,
            startCoordCard: this.cards[this.activeCard].getBoundingClientRect().top
        };
        this.controlEventListener(event)
        this.animStop();
    }

    eventMove(event) {
      if (document.body.querySelector('.show-image') ) return;
      
        let coordY = this.getCoordY(event)
        this.dragObj.movePoint = coordY;
        
        this.dragObj.scrollForAnim = this.dragObj.startPoint - coordY;
        this.dragObj.scroll = Math.round(this.dragObj.startCoordCard + (coordY - this.dragObj.startPoint));

        if (this.activeCard == 0 && this.dragObj.startPoint < coordY) {this.dragObj.startCoordCard = this.cards[0];return}
      
        if (this.dragObj.scroll < this.objectForPosition[this.activeCard]) {
            this.dragObj.scroll = this.objectForPosition[this.activeCard];
            this.setScroll(this.dragObj.scroll);

            this.setActiveCard('up');
            this.dragObj.startCoordCard = this.cards[this.activeCard].getBoundingClientRect().top;
            this.dragObj.startPoint = coordY;
           
            return;
            
        }

        if (this.dragObj.scroll > this.getMetricElem().forCard.startCoord) {
            
            this.dragObj.scroll = this.getMetricElem().forCard.startCoord;
            this.setScroll(this.dragObj.scroll);

            this.setActiveCard('down');
            this.dragObj.startCoordCard = this.cards[this.activeCard].getBoundingClientRect().top;
            this.dragObj.startPoint = coordY;
            
            return;
        }

        this.setScroll(this.dragObj.scroll);
    }

    eventUp(event) {
        document.body.classList.remove('grabbing');

        this.controlEventListener(event);
        this.startCoordCard = this.dragObj.scroll || this.startCoordCard;

        if (this.dragObj.scrollForAnim == 0) {
            this.animation(300, this.getMetricElem().autoScroll(this.dragObj.startCoordCard));
        }
    
        if (this.activeCard == 1 && this.dragObj.startPoint == this.dragObj.movePoint ) return;

        if (this.objectForPosition[4] == this.dragObj.scroll && this.dragObj.scrollForAnim > 0) return;

        if (this.dragObj.scrollForAnim >= 100 && this.dragObj.scrollForAnim >= 0 && this.activeCard == 4) {
            this.animation(300, this.objectForPosition[this.activeCard]);
            return;
        }

        if (this.dragObj.scrollForAnim <= 100 && this.dragObj.scrollForAnim > 0) this.animation(300, this.getMetricElem().forCard.startCoord);
        if (this.dragObj.scrollForAnim > 100) this.animation(300, this.objectForPosition[this.activeCard]);

        if (this.dragObj.scrollForAnim > -100 && this.dragObj.scrollForAnim < 0) this.animation(300, this.objectForPosition[this.activeCard]);
        if (this.dragObj.scrollForAnim <= -100) this.animation(300, this.getMetricElem().forCard.startCoord);
    }

    getCoordY(e) {
        if (e.type == 'mousedown' || e.type == 'mousemove') {
            return e.pageY;
        }

        if (e.type == 'touchstart' || e.type == 'touchmove') {
            return e.touches[0].pageY
        }
        
    }

    controlEventListener(event) {
        if (event.type == 'mousedown') {
            window.addEventListener('mousemove', this.bindMove);
            window.addEventListener('mouseup', this.bindUp);
        }
        if (event.type == 'mouseup') {
            window.removeEventListener('mousemove', this.bindMove);
            window.removeEventListener('mouseup', this.bindUp);
        }

        if (event.type == 'touchstart') {
            window.addEventListener('touchmove', this.bindMove);
            window.addEventListener('touchend', this.bindUp);
        }
        if (event.type == 'touchend') {
            window.removeEventListener('touchmove', this.bindMove);
            window.removeEventListener('touchend', this.bindUp);
        }
    }


    setActiveCard(direction) {
        if (direction == 'up') {
            this.activeCard = (this.activeCard + 1 >= this.cards.length - 1) ? this.cards.length - 1 : this.activeCard + 1;
        }

        if (direction == 'down') {
            this.activeCard = (this.activeCard - 1 <= 0) ? 1 : this.activeCard - 1;
        }

        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].dataset.control = 0;
        }
        this.cards[this.activeCard].dataset.control = 1;
    }
    setScroll(scroll) {

        this.cards[this.activeCard].style.top = `${scroll}px`;
    }
    getObjectForPosition() {
        this.objectForPosition = {};
        let firstPosition = Math.round(this.getMetricElem().forCard.y);

        for (let i = 0; i < this.cards.length; i++) {
            this.objectForPosition[i] = firstPosition + (i * 10);
        }
    }

    animation(duration, length, direction) {
        let startTime = performance.now(),
            startCoordCard = this.startCoordCard,
            diff = length - startCoordCard;

        this.timeId = requestAnimationFrame(bind(function moveCard(time) {
            let passedTime = time - startTime;

            if (passedTime > duration) passedTime = duration;
            let timePart = passedTime / duration,
                shift = startCoordCard + (timePart * (2 - timePart)) * diff;

            this.startCoordCard = shift;

            this.cards[this.activeCard].style.top = `${shift}px`

            if (timePart < 1) this.timeId = requestAnimationFrame(bind(moveCard, this))

        }, this));
    }

    animStop() {
        cancelAnimationFrame(this.timeId)
    }

    getMetricElem() {
        let coordBoxWrapper = this.wrapper.getBoundingClientRect(),
            coordBoxCard = this.cards[0].getBoundingClientRect();

        let metric = {
            forCard: {
                x: (coordBoxWrapper.width - coordBoxCard.width) / 2,
                y: (coordBoxWrapper.height - coordBoxCard.height) / 2,
                startCoord: coordBoxWrapper.height + 1,
                height: coordBoxCard.height
            },
            forWrapper: {
                width: coordBoxWrapper.width,
                height: coordBoxWrapper.height
            },
            autoScroll: (start) => {
                let coordBox = this.cards[this.activeCard].getBoundingClientRect();
                let cardCenter = coordBox.top - this.objectForPosition[this.activeCard];
                let areaCenter = (this.getMetricElem().forCard.startCoord - this.objectForPosition[this.activeCard]) / 2;

                return (cardCenter < areaCenter) ? this.objectForPosition[this.activeCard] : this.getMetricElem().forCard.startCoord;
            }
        };
        return metric;
    }

    /**
     * Задает начальные параметры для карт
     *@this {Nav}
     *@return {undefined}
     */
    setInitData() {
        for (let i = 0; i < this.cards.length; i++) {
            if (!i) {
                this.cards[i].style.top = `${this.getMetricElem().forCard.y}px`;
                this.cards[i].style.left = `${this.getMetricElem().forCard.x}px`;
                this.cards[i].setAttribute('data-control', 0);
                continue;
            }
            this.cards[i].style.left = `${this.getMetricElem().forCard.x}px`;
            this.cards[i].style.top = `${this.getMetricElem().forCard.startCoord}px`;
            this.cards[i].style.zIndex = `${i}`;
            this.cards[i].setAttribute('data-control', 0);
        }
    }





    start() {
        this.setInitData();
        this.getObjectForPosition();
    }
}


let nav = new Nav({
    wrapper: document.body,
    cards: document.querySelectorAll('div[class^="card"]')
})

nav.start();
console.dir(nav)
