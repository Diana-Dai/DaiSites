(self.webpackChunkdev_restaurant = self.webpackChunkdev_restaurant || []).push([
  [179],
  {
    604: () => {
      const e = {
        execute() {
          document
            .getElementById("dark-toggler")
            .addEventListener("click", () => {
              document
                .getElementById("dark-toggler")
                .classList.toggle("active"),
                document.documentElement.classList.toggle("dark"),
                document.documentElement.classList.contains("dark")
                  ? (localStorage.theme = "dark")
                  : (localStorage.theme = "light");
            }),
            this.changeStorageData();
        },
        changeStorageData() {
          localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
            ? (document.documentElement.classList.add("dark"),
              document.getElementById("dark-toggler").classList.add("active"))
            : document.documentElement.classList.remove("dark");
        },
      };
      const t = {
        execute() {
          const e = new IntersectionObserver((t) => {
            t.forEach((t) => {
              t.isIntersecting &&
                (t.target.classList.add("active"), e.unobserve(t.target));
            });
          });
          document.querySelectorAll(".highlight").forEach((t) => {
            e.observe(t);
          });
        },
      };
      const a = {
        execute() {
          const e = new IntersectionObserver((t) => {
            t.forEach((t) => {
              t.isIntersecting &&
                (Object.keys(t.target.children).forEach((e) => {
                  const a = t.target.children[e];
                  typeof a.tagName === "string" &&
                    a.tagName === "SOURCE" &&
                    (a.src = a.dataset.src);
                }),
                t.target.load(),
                t.target.classList.remove("lazy"),
                e.unobserve(t.target));
            });
          });
          document.querySelectorAll("video.lazy").forEach((t) => {
            e.observe(t);
          });
        },
      };
      const s = {
        execute() {
          document.getElementById("preload") &&
            (setTimeout(() => {
              document.getElementById("preload").classList.add("close");
            }, 1500),
            setTimeout(() => {
              document.body.classList.remove("is_loading");
            }, 400));
        },
      };
      const c = new (class {
        constructor() {
          this.stack = [];
        }

        init() {
          window.onload = () => {
            this.stack.forEach((e) => {
              e.execute();
            });
          };
        }

        add(e) {
          this.stack.push(e);
        }
      })();
      c.add(t), c.add(s), c.add(e), c.add(a), c.init();
    },
  },
  (e) => {
    e((e.s = 604));
  },
]);
