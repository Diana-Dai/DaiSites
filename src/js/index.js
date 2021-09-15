/* eslint-disable no-undef */
/* eslint-disable no-console */
import '../css/style.css';
import '../assets/font/iconfont.css';

const LazyVideosCommand = {
  execute() {
    const intersectionObserver = new IntersectionObserver((entries) => {
      // When the target item is in viewPoint
      entries.forEach((video) => {
        if (video.isIntersecting) {
          const keys = Object.keys(video.target.children);
          keys.forEach((source) => {
            const videoSource = video.target.children[source];
            if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
              videoSource.src = videoSource.dataset.src;
            }
          });

          video.target.load();
          video.target.classList.remove('lazy');
          intersectionObserver.unobserve(video.target);
        }
      });
    });

    // Start observing
    document.querySelectorAll('video.lazy').forEach((item) => {
      intersectionObserver.observe(item);
    });
  },
};

class OnloadCommander {
  constructor() {
    this.stack = [];
  }

  init() {
    window.onload = () => {
      this.stack.forEach((item) => {
        item.execute();
      });
    };
  }

  add(action) {
    this.stack.push(action);
  }
}
const playVideoCommand = {
  execute() {
    document.getElementById('porfolio').addEventListener('mouseover', (e) => {
      console.log(e.target);
      if (typeof e.target.tagName === 'string' && e.target.tagName === 'VIDEO') {
        e.target.play();
      }
    });
    document.getElementById('porfolio').addEventListener('mouseout', (e) => {
      if (typeof e.target.tagName === 'string' && e.target.tagName === 'VIDEO') {
        e.target.pause();
      }
    });
  },
};
const commander = new OnloadCommander();
// commander.add(IsLoadedCommand);
// commander.add(darkModeCommand);
commander.add(LazyVideosCommand);
commander.add(playVideoCommand);
commander.init();
