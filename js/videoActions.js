'use strict';

const currentVideo = document.getElementById('videoEl');

const playVideo = () => currentVideo.play();
const pauseVideo = () => currentVideo.pause();
const changeVolume = (action) => {
  if (action === 'up' && currentVideo.volume < 1) {
    currentVideo.volume += 0.1;
  }
  if (action === 'down' && currentVideo.volume >= 0.1) {
    currentVideo.volume -= 0.1;
  }
};
