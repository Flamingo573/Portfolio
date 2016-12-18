'use strict';

/**
 * Рассчитывает transform-origin для svg элементов.
 * @param {object} elem - Элемент для которого будет рассчитываться transform-origin.
 * @param {string} type - Тип элемента, один из: прямоугольник, линия, круг, группа.
 * @param {namber} x - Координата x в процентах, относительно которой будет происходить трансформация.
 * @param {namber} y - Координата y в процентах, относительно которой будет происходить трансформация.
 * @return {string} Строка для вставки в css свойство transform-origin;
 */
function getTransOrigin(elem, type, x, y) {
    var objectTypes = {
        rect: function() {
            var elemX = elem.getAttribute('x'),
                elemY = elem.getAttribute('y'),
                elemWidth = elem.getAttribute('width'),
                elemHeight = elem.getAttribute('height');

            return (elemWidth * x / 100 + +elemX) + 'px ' + (elemHeight * y / 100 + +elemY) + 'px';
        },

        line: function() {
            var elemHeight = elem.getAttribute('y2') - elem.getAttribute('y1'),
                elemX = elem.getAttribute('x1');

            return (elem.getAttribute('x1')) + 'px ' + (elemHeight * y / 100 + +elem.getAttribute('y1')) + 'px';
        },

        circle: function() {
            return (elem.getAttribute('cx')) + 'px ' + (elem.getAttribute('cy')) + 'px';
        },

        g: function() {
            return (elem.getBoundingClientRect().width * x / 100 + elem.getBoundingClientRect().left) + 'px ' + (elem.getBoundingClientRect().height * y / 100 + elem.getBoundingClientRect().top) + 'px';
        }
    };

    return objectTypes[type]();
}
