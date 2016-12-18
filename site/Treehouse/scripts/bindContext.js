"use strict";

/**
* Привязывает контекст вызова к переданной функции.
* @param {function} - Функция, к которой будет привязан контекст.
* @param {object} - Контекст, с которым необходимо вызвать функцию.
* @return {function} - Функция, использующая замыкание.
*/
function bind(func, context) {
  return function(event) {
    return func.call(context, event);
  };
}
