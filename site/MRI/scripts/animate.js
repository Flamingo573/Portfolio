'use strict';

function animate(draw, duration, delay) {
    setTimeout(bind(animateDelay, this), delay);

    function animateDelay() {
        var start = performance.now();

        requestAnimationFrame(function animate(time) {

            var timePassed = time - start;

            if (timePassed > duration) timePassed = duration;

            draw(timePassed / duration);

            if (timePassed / duration != 1) {
                requestAnimationFrame(animate);
            }
        })
    }
};
