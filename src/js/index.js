/* eslint-disable prefer-const */
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
            if (
              typeof videoSource.tagName === 'string'
              && videoSource.tagName === 'SOURCE'
            ) {
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
      if (
        typeof e.target.tagName === 'string'
        && e.target.tagName === 'VIDEO'
      ) {
        e.target.play();
      }
    });
    document.getElementById('porfolio').addEventListener('mouseout', (e) => {
      if (
        typeof e.target.tagName === 'string'
        && e.target.tagName === 'VIDEO'
      ) {
        e.target.pause();
      }
    });
  },
};
const addImgSource = {
  execute() {
    const pictureTags = document.querySelectorAll('.img-wrapper picture');
    pictureTags.forEach((pictureTag) => {
      const imgTag = pictureTag.querySelector('img');
      const dataSrc = imgTag.getAttribute('data-src');

      // Generate the source of jpeg and webp
      const res = this.getSrcSet(dataSrc, 'https://res.cloudinary.com/dis84wmjl/image/upload/v1632219688/DaiSites/');
      const nodes = this.createSourceTag(res);

      nodes.forEach((item) => {
        pictureTag.insertBefore(item, imgTag);
      });
    });
  },
  getSrcSet(dataSrc, link) {
    let res1 = ''; let res2 = '';
    const widthList = ['320', '640', '750', '1280', '1920'];
    let [link1, link2] = link.split('upload');
    link1 += 'upload/q_auto,';
    widthList.forEach((item) => {
      res1 += `${link1}w_${item}${link2}${dataSrc} ${item}w,
      `;
      res2 += `${link1}f_webp,w_${item}${link2}${dataSrc} ${item}w,
      `;
    });
    console.log(res1);
    return {
      'image/webp': res2,
      'image/jpeg': res1,
    };
  },
  createSourceTag(object) {
    const node1 = document.createElement('source');
    const node2 = document.createElement('source');
    if (typeof object === 'object') {
      const types = Object.keys(object);
      node1.srcset = object[types[0]];
      [node1.type, node2.type] = types;
      node2.srcset = object[types[1]];
    }
    return [node1, node2];
  },
};
const commander = new OnloadCommander();
commander.add(LazyVideosCommand);
commander.add(playVideoCommand);
commander.add(addImgSource);

commander.init();
