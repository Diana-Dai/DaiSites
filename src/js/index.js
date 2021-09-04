/* eslint-disable no-console */
import "../css/style.css";
import "../assets/font/iconfont.css";

// darkMode
const darkModeCommand = {
  execute: function () {
    document.getElementById("dark-toggler").addEventListener("click", (e) => {
      document.getElementById("dark-toggler").classList.toggle("active");
      document.documentElement.classList.toggle("dark");
      if (document.documentElement.classList.contains("dark")) {
        // Whenever the user explicitly chooses dark mode
        localStorage.theme = "dark";
      } else {
        // Whenever the user explicitly chooses light mode
        localStorage.theme = "light";
      }
    });
    this.changeStorageData();
  },
  changeStorageData() {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      document.getElementById("dark-toggler").classList.add("active");
    } else {
      document.documentElement.classList.remove("dark");
    }
  },
};

const StartTextHighLightCommand = {
  execute: function () {
    const intersectionObserver = new IntersectionObserver(function (entries) {
      // When the target item is in viewPoint
      entries.forEach((item) => {
        if (item.intersectionRatio > 0) {
          // console.log(entries[0].target);
          item.target.classList.add("active");
          return;
        }
        item.target.classList.remove("active");
      });
    });

    // Start observing
    document.querySelectorAll(".highlight").forEach((item) => {
      intersectionObserver.observe(item);
    });
  },
};
const IsLoadedCommand = {
  execute: function () {
    // Hide preloading
    setTimeout(() => {
      document.getElementById("preload").classList.add("close");
    }, 1500);
    // Show main documents
    setTimeout(() => {
      document.body.classList.remove("is_loading");
    }, 400);
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

const commander = new OnloadCommander();
commander.add(StartTextHighLightCommand);
commander.add(IsLoadedCommand);
commander.add(darkModeCommand);
commander.init();

const cloneNodes = {
  execute: function () {
    for (var i = 0; i < 10; i++) {
      const clone = document.getElementById("project_list").cloneNode(true);

      clone.id = "clone" + i;
      document.getElementById("body").appendChild(clone);
    }
  },
};

cloneNodes.execute();
