/* eslint-disable no-console */
import "../css/style.css";
import "../assets/font/iconfont.css";

// darkMode
function darkMode() {
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
}
darkMode();

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

commander.init();
