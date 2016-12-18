'use strict';

class Video {
    /**
     * Конструктор Video создает методы необходимые для воспроизведения и остановки видео.
     * @param {object} optons - Объект, в котором содержится тег video и секция с экраном.
     */
    constructor(options) {
        this.video = options.video;
        this.firstBlockBottom = options.firstBlock.getBoundingClientRect().bottom + window.pageYOffset;

        this.setStateVideo(false);

        document.addEventListener('click', bind(this.clickPlayVideo, this));
        this.video.addEventListener('ended', bind(this.endedVideo, this));
        document.addEventListener('scroll', bind(this.controlScroll, this));
    }

    /**
     * Обработчик клика, для запуска видео.
     */
    clickPlayVideo(event) {
        if (event.target.value == 'Try Demo') this.playVideo();
    }

    /**
     * Метод запуска видео.
     */
    playVideo() {
        this.setStateVideo(true);
        this.video.play();
    }

    /**
     * После окончания видео, ставит его на начало.
     */
    endedVideo() {
        this.setStateVideo(false);
    }

    /**
     * Устанавливает статус проигрывания видео и задает стартовое время.
     * @param {boolean} state - Состояние проигрывания видео, true || false.
     */
    setStateVideo(state) {
        this.statePlay = state;
        this.video.currentTime = 4;
    }

    /**
     * Контролирует скролл, включает или выключает видео.
     */
    controlScroll(event) {
        if (this.statePlay == false) return;

        if (window.pageYOffset > this.firstBlockBottom) this.video.pause();

        if (window.pageYOffset < this.firstBlockBottom) this.video.play();
    }
}

document.getElementById('video').onloadedmetadata = function() {
    var video = new Video({
        video: document.getElementById('video'),
        firstBlock: document.getElementsByClassName('mac-background')
    });
};

var video = new Video({
    video: document.getElementById('video'),
    firstBlock: document.getElementsByClassName('mac-background')[0]
});
