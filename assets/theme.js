"use strict";
const global = {
    announcementBar: "announcement-bar",
    overlay: ".bls__overlay",
    header: "header",
    mobile_stickybar: "shopify-section-mobile-stickybar",
  },
  SCROLL_ZOOM_IN_TRIGGER_CLASSNAME = "animate--zoom-in";
function throttle(e, t) {
  let n = 0;
  return function (...o) {
    const i = new Date().getTime();
    if (!(i - n < t)) return (n = i), e(...o);
  };
}
function initializeScrollZoomAnimationTrigger() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const e = Array.from(document.getElementsByClassName("animate--zoom-in"));
  if (0 === e.length) return;
  e.forEach((e) => {
    let t = !1;
    new IntersectionObserver((e) => {
      e.forEach((e) => {
        t = e.isIntersecting;
      });
    }).observe(e),
      e.style.setProperty("--zoom-in-ratio", 1 + 0.002 * percentageSeen(e)),
      window.addEventListener(
        "scroll",
        throttle(() => {
          t &&
            e.style.setProperty(
              "--zoom-in-ratio",
              1 + 0.002 * percentageSeen(e)
            );
        }),
        { passive: !0 }
      );
  });
}
function percentageSeen(e) {
  const t = window.innerHeight,
    n = window.scrollY,
    o = e.getBoundingClientRect().top + n,
    i = e.offsetHeight;
  if (o > n + t) return 0;
  if (o + i < n) return 100;
  let s = (n + t - o) / ((t + i) / 100);
  return Math.round(s);
}
function getCookie(e) {
  let t = e + "=",
    n = decodeURIComponent(document.cookie).split(";");
  for (let e = 0; e < n.length; e++) {
    let o = n[e];
    for (; " " == o.charAt(0); ) o = o.substring(1);
    if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
  }
  return "";
}
function HoverIntent(e, t) {
  const n = { exitDelay: 180, interval: 100, sensitivity: 6 };
  let o,
    i,
    s,
    l,
    r,
    a,
    c,
    d = {};
  const u = function (e) {
      (o = e.pageX), (i = e.pageY);
    },
    m = function (e) {
      const t = s - o,
        n = l - i;
      if (Math.sqrt(t * t + n * n) < d.sensitivity) {
        clearTimeout(c);
        for (let e of r) e.isActive && (d.onExit(e), (e.isActive = !1));
        d.onEnter(e), (e.isActive = !0);
      } else
        (s = o),
          (l = i),
          (a = setTimeout(function () {
            m(e);
          }, d.interval));
    };
  !(function (e, t) {
    if (!t || !t.onEnter || !t.onExit)
      throw "onEnter and onExit callbacks must be provided";
    (d = (function (e, t) {
      for (let n in t) e[n] = t[n];
      return e;
    })(n, t)),
      (r = e);
    for (let e of r) {
      if (!e) return;
      (e.isActive = !1),
        e.addEventListener("mousemove", u),
        e.addEventListener("mouseenter", function (t) {
          (s = t.pageX),
            (l = t.pageY),
            e.isActive
              ? clearTimeout(c)
              : (a = setTimeout(function () {
                  m(e);
                }, d.interval));
        }),
        e.addEventListener("mouseleave", function (t) {
          clearTimeout(a),
            e.isActive &&
              (c = setTimeout(function () {
                d.onExit(e), (e.isActive = !1);
              }, d.exitDelay));
        });
    }
  })(e, t);
}
window.addEventListener("load", function () {
  const e = window.innerWidth - document.body.clientWidth;
  e > 0 &&
    document
      .querySelector("html")
      .setAttribute("style", `--padding-right: ${e}px`);
}),
  window.addEventListener("DOMContentLoaded", () => {
    initializeScrollZoomAnimationTrigger();
  });
var menuItems = document.querySelectorAll(".bls__menu-parent"),
  hi = HoverIntent(menuItems, {
    onEnter: function (e) {
      e.classList.add("visible");
    },
    onExit: function (e) {
      e.classList.remove("visible");
    },
  });
function debounce(e, t) {
  let n;
  return (...o) => {
    clearTimeout(n), (n = setTimeout(() => e.apply(this, o), t));
  };
}
class FeatureButton extends HTMLElement {
  constructor() {
    super(), this.init(), this.initButton();
  }
  init() {
    this.querySelectorAll("a.demo").forEach((e) =>
      e.addEventListener("click", this.onButtonClick.bind(this))
    );
  }
  initButton() {
    this.querySelectorAll("button.demo").forEach((e) =>
      e.addEventListener("click", this.onButtonClick.bind(this))
    );
  }
  onButtonClick(e) {
    e.preventDefault();
    const t = document.querySelector("#dlg-demo-feature_0");
    if (e.currentTarget && null === t) {
      var n = EasyDialogBox.create(
        "dlg-demo-feature",
        "dlg dlg-disable-heading dlg-disable-footer dlg-disable-drag",
        "",
        this.htmlRender().outerHTML
      );
      (n.onClose = n.destroy), n.show();
    }
  }
  htmlRender() {
    const e = document.createElement("div"),
      t = document.createElement("div"),
      n = JSON.parse(
        '\n      {\n        "home1": ["main-demo.jpg", "146577129769", "Main Demo", "Popular", "Clothing & Fashion Demo", "v1"],\n        "home4": ["4.jpg", "146577326377", "TikTok Fashion", "Popular", "Clothing & Fashion Demo", "v1"],\n        "home3": ["simple-morden.jpg", "146577359145", "Simple Modern", "Popular", "Clothing & Fashion Demo", "v1"],\n        "home21": ["22.jpg", "151227695401", "Mega Store", "Popular", "Supermarket & Tech Demo", "v2"],\n        "home15": ["home-15.jpg", "148235026729", "Home Decor", "Popular", "Home & Furniture Demo", "v1"],\n        "home23": ["25.jpg", "159199330601", "Swimwear", "New", "Clothing & Fashion Demo", "v2"],\n        "home25": ["29.jpg", "160724058409", "Fashion Elegance", "New", "Clothing and Fashion Demo", "v2"],\n        "home26": ["27.jpg", "160318980393", "Christmas", "New", "Home and Garden Demo", "v2"],\n        "home2": ["skin-care.jpg", "146577522985", "Skincare", "Popular", "Health & Beauty Demo", "v1"],\n        "home24": ["26.jpg", "159413633321", "Organic Foods", "New", "Organic Food and Drink Demo", "v2"],\n        "home27": ["28.jpg", "160540393769", "Halloween", "New", "Home and Garden Demo", "v2"],\n        "home22": ["24.jpg", "154227638569", "Gym Fitness", "", "Sports and Recreation Demo", "v2"],\n        "home13": ["digital-1.jpg", "147055903017", "Smart Digital", "Popular", "Supermarket & Tech Demo", "v1"],\n        "home14": ["digital-2.jpg", "147477037353", "Mega Digital", "", "Supermarket & Tech Demo", "v1"],\n        "home10": ["watches.jpg", "146577457449", "Unique Watches", "Popular", "Modern Watches Demo", "v1"],\n        "home5": ["trendy-style.jpg", "146577490217", "Trendy Style", "", "Clothing & Fashion Demo", "v1"],\n        "home20": ["20.jpg", "149694939433", "Sneaker Store", "", "Clothing & Fashion Demo", "v1"],\n        "home8": ["colthing-store.jpg", "146577228073", "Clothing Store", "Popular", "Clothing & Fashion Demo", "v1"],\n        "home11": ["underwear.jpg", "146577424681", "Underwear", "", "Clothing & Fashion Demo", "v1"],\n        "home16": ["home-16.jpg", "148448837929", "Minimal Furniture", "", "Home & Furniture Demo", "v1"],\n        "home6": ["minimal-colthing.jpg", "146577391913", "Minimal Clothings", "", "Clothing & Fashion Demo", "v1"],\n        "home7": ["men-luxury.jpg", "146577260841", "Men\'s Luxury", "", "Clothing & Fashion Demo", "v1"],\n        "home9": ["categories-men.jpg", "146577195305", "Categories Men\'s", "", "Clothing & Fashion Demo", "v1"],\n        "home18": ["cosmetic.jpg", "149242773801", "Cosmetics", "", "Cosmetic & Beauty Demo", "v1"],\n        "home17": ["home-14.jpg", "147869466921", "Adventure Gear", "", "Outdoor & Camping Demo", "v1"],\n        "home19": ["21.jpg", "150281126185", "Radiant Jewelry", "", "Jewelry & Accessories Demo", "v1"],\n        "home12": ["rtl.jpg", "163055403305", "RTL Demo", "", "Clothing & Fashion Demo", "v1"]\n      }'
      );
    e.setAttribute("class", "preview-demo-home-page"),
      t.setAttribute("class", "uminio-grid row");
    for (let e in n) {
      const o = document.createElement("div");
      o.setAttribute("class", "theme-img");
      const i = document.createElement("a");
      i.setAttribute("target", "_blank"),
        "v1" == n[e][5]
          ? i.setAttribute(
              "href",
              "https://umino-demo.myshopify.com/?preview_theme_id=" + n[e][1]
            )
          : "v2" == n[e][5] &&
            i.setAttribute(
              "href",
              "https://umino-demo-v2.myshopify.com/?preview_theme_id=" + n[e][1]
            ),
        i.setAttribute("title", n[e][2]);
      const s = document.createElement("img");
      if (
        (s.setAttribute("width", "350"),
        s.setAttribute("height", "256"),
        s.setAttribute("loading", "lazy"),
        s.setAttribute(
          "src",
          "https://blueskytechmage.com/shopify/umino-preview-home/" + n[e][0]
        ),
        s.setAttribute("alt", n[e][2]),
        i.appendChild(s),
        "" != n[e][3])
      ) {
        const t = document.createElement("label");
        t.setAttribute(
          "class",
          "label-demo-home-postion " + n[e][3].toLowerCase()
        ),
          t.appendChild(document.createTextNode(n[e][3])),
          o.appendChild(t);
      }
      o.appendChild(i);
      const l = document.createElement("div");
      l.setAttribute("class", "theme-info");
      const r = document.createElement("h3"),
        a = document.createElement("a");
      a.setAttribute("target", "_blank"),
        "v1" == n[e][5]
          ? a.setAttribute(
              "href",
              "https://umino-demo.myshopify.com/?preview_theme_id=" + n[e][1]
            )
          : "v2" == n[e][5] &&
            a.setAttribute(
              "href",
              "https://umino-demo-v2.myshopify.com/?preview_theme_id=" + n[e][1]
            ),
        a.setAttribute("title", n[e][2]),
        a.appendChild(document.createTextNode(n[e][2])),
        r.appendChild(a),
        l.appendChild(r);
      const c = document.createElement("p");
      c.appendChild(document.createTextNode(n[e][4])), l.appendChild(c);
      const d = document.createElement("div");
      d.setAttribute("class", "theme-item col-lg-3 col-sm-6"),
        d.appendChild(o),
        d.appendChild(l),
        t.appendChild(d);
    }
    return e.appendChild(t), e;
  }
}
function backToTop() {
  var e =
    ((document.body.scrollTop || document.documentElement.scrollTop) /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
    100;
  document.getElementById("bls__back-top") &&
    (document.getElementById("bls__back-top").style.height = e + "%");
}
function mobileStickyBar() {
  var e = document.querySelector(".bls__mobile-stickybar");
  if (!e) return;
  var t = window.pageYOffset;
  let n = 0;
  document.getElementById("announcement-bar") &&
    (n = document.getElementById("announcement-bar")?.clientHeight);
  let o = 0;
  document.getElementById("shopify-section-top-bar") &&
    (o = document.getElementById("shopify-section-top-bar").clientHeight);
  let i = document.getElementById("page-header")?.clientHeight;
  t > n + o + i + 50 ? e.classList.remove("d-none") : e.classList.add("d-none");
}
function setCookie(e, t, n) {
  const o = new Date();
  o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
  let i = "expires=" + o.toUTCString();
  document.cookie = e + "=" + t + ";" + i + ";path=/";
}
function initComparisons() {
  var e, t;
  for (
    e = document.getElementsByClassName("img-comp-overlay"), t = 0;
    t < e.length;
    t++
  )
    n(e[t]);
  function n(e) {
    var t,
      n,
      o,
      i = 0;
    (n = e.offsetWidth), (o = e.offsetHeight);
    const s = e.closest(".img-comp-container");
    function l(e) {
      e.preventDefault(),
        (i = 1),
        window.addEventListener("mousemove", a),
        window.addEventListener("touchmove", a);
    }
    function r() {
      i = 0;
    }
    function a(s) {
      var l;
      if (0 == i) return !1;
      (l = (function (t) {
        var n,
          o = 0;
        return (
          (t = t.changedTouches ? t.changedTouches[0] : t),
          (n = e.getBoundingClientRect()),
          (o = t.pageX - n.left),
          (o -= window.pageXOffset),
          o
        );
      })(s)),
        l < 0 && (l = 0),
        l > n && (l = n),
        (function (i) {
          if (t) {
            var s = ((i + t.offsetWidth / 2 + 10) / n) * 100;
            s >= 100 - ((t.offsetWidth / 2 + 10) / n) * 100 &&
              (s = 100 - ((t.offsetWidth / 2 + 10) / n) * 100);
          }
          e.closest(".img-comp-container").setAttribute(
            "style",
            "--percent: " + s.toFixed(4) + "%;--height: " + o + "px "
          );
        })(l);
    }
    s && (t = s.querySelector(".image-comparison__button")),
      t &&
        (t.addEventListener("touchstart", l),
        t.addEventListener("mousedown", l)),
      window.addEventListener("mouseup", r),
      window.addEventListener("touchend", r);
  }
}
function showAnime(e) {
  const t = getComputedStyle(e);
  (e.style.overflow = "hidden"), (e.style.display = "block");
  const n = {
    height: e.getBoundingClientRect().height + "px",
    marginTop: t.marginTop,
    marginBottom: t.marginBottom,
    paddingTop: t.paddingTop,
    paddingBottom: t.paddingBottom,
  };
  if (
    (Object.keys(n).forEach((e) => {
      0 === parseFloat(n[e]) && delete n[e];
    }),
    0 === Object.keys(n).length)
  )
    return !1;
  let o;
  Object.keys(n).forEach((t) => {
    e.style[t] = 0;
  }),
    (o = e.animate(n, { duration: 400, easing: "ease" })),
    o.finished.then(() => {
      (e.style.overflow = ""),
        Object.keys(n).forEach((t) => {
          e.style[t] = "";
        });
    });
}
function hideAnime(e) {
  const t = getComputedStyle(e);
  e.style.overflow = "hidden";
  const n = {
    height: e.getBoundingClientRect().height + "px",
    marginTop: t.marginTop,
    marginBottom: t.marginBottom,
    paddingTop: t.paddingTop,
    paddingBottom: t.paddingBottom,
  };
  if (
    (Object.keys(n).forEach((e) => {
      0 === parseFloat(n[e]) && delete n[e];
    }),
    0 === Object.keys(n).length)
  )
    return !1;
  let o;
  Object.keys(n).forEach((t) => {
    (e.style[t] = n[t]), (n[t] = 0);
  }),
    (o = e.animate(n, { duration: 300, easing: "ease" })),
    o.finished.then(() => {
      (e.style.overflow = ""),
        Object.keys(n).forEach((t) => {
          (e.style[t] = ""), (e.style.display = "none");
        });
    });
}
customElements.define("feature-button", FeatureButton), initComparisons();
const slideAnimeHidden = (() => {
    let e = !1;
    return (t) => {
      const n = Object.assign(
          {},
          { target: !1, duration: 400, easing: "ease" },
          t
        ),
        o = n.target;
      if (!o) return;
      const i = getComputedStyle(o);
      o.style.overflow = "hidden";
      const s = n.duration,
        l = n.easing,
        r = {
          height: o.getBoundingClientRect().height + "px",
          marginTop: i.marginTop,
          marginBottom: i.marginBottom,
          paddingTop: i.paddingTop,
          paddingBottom: i.paddingBottom,
        };
      if (
        (Object.keys(r).forEach((e) => {
          0 === parseFloat(r[e]) && delete r[e];
        }),
        0 === Object.keys(r).length)
      )
        return (e = !1), !1;
      let a;
      Object.keys(r).forEach((e) => {
        (o.style[e] = r[e]), (r[e] = 0);
      }),
        (a = o.animate(r, { duration: s, easing: l })),
        a.finished.then(() => {
          (o.style.overflow = ""),
            Object.keys(r).forEach((e) => {
              o.style[e] = "";
            }),
            (o.style.display = "none"),
            (e = !1);
        });
    };
  })(),
  slideAnime = (() => {
    let e = !1;
    return (t) => {
      const n = Object.assign(
          {},
          {
            target: !1,
            animeType: "slideToggle",
            duration: 400,
            easing: "ease",
            isDisplayStyle: "block",
          },
          t
        ),
        o = n.target;
      if (!o) return;
      if (e) return;
      e = !0;
      let i = n.animeType;
      const s = getComputedStyle(o);
      if (
        ("slideToggle" === i &&
          (i = "none" === s.display ? "slideDown" : "slideUp"),
        ("slideUp" === i && "none" === s.display) ||
          ("slideDown" === i && "none" !== s.display) ||
          ("slideUp" !== i && "slideDown" !== i))
      )
        return (e = !1), !1;
      o.style.overflow = "hidden";
      const l = n.duration,
        r = n.easing,
        a = n.isDisplayStyle;
      "slideDown" === i && (o.style.display = a);
      const c = {
        height: o.getBoundingClientRect().height + "px",
        marginTop: s.marginTop,
        marginBottom: s.marginBottom,
        paddingTop: s.paddingTop,
        paddingBottom: s.paddingBottom,
      };
      if (
        (Object.keys(c).forEach((e) => {
          0 === parseFloat(c[e]) && delete c[e];
        }),
        0 === Object.keys(c).length)
      )
        return (e = !1), !1;
      let d;
      "slideDown" === i
        ? (Object.keys(c).forEach((e) => {
            o.style[e] = 0;
          }),
          (d = o.animate(c, { duration: l, easing: r })))
        : "slideUp" === i &&
          (Object.keys(c).forEach((e) => {
            (o.style[e] = c[e]), (c[e] = 0);
          }),
          (d = o.animate(c, { duration: l, easing: r }))),
        d.finished.then(() => {
          (o.style.overflow = ""),
            Object.keys(c).forEach((e) => {
              o.style[e] = "";
            }),
            "slideUp" === i && (o.style.display = "none"),
            (e = !1);
        });
    };
  })();
var BlsEventShopify = {
  init: function () {
    this.setupEventListeners(),
      Shopify.eventCountDownTimer(),
      Shopify.eventFlashingBrowseTab();
  },
  setupEventListeners: function () {
    window.addEventListener("scroll", () => {
      backToTop(), mobileStickyBar();
    }),
      document
        .querySelectorAll(".collection-infinite-scroll a")
        .forEach((e) => {
          e.addEventListener(
            "click",
            (t) => {
              for (var n of document.querySelectorAll(
                ".collection-list__item.grid__item"
              ))
                n.classList.remove("d-none");
              e.parentElement.remove();
            },
            !1
          );
        }),
      document.querySelectorAll(".bls__footer_block-title").forEach((e) => {
        e.addEventListener("click", (e) => {
          const t = e.currentTarget,
            n = t.parentElement.querySelector(".bls__footer_block-content");
          slideAnime({ target: n, animeType: "slideToggle" });
          const o = t.closest(".bls__footer_block");
          o.classList.contains("active")
            ? o.classList.remove("active")
            : o.classList.add("active");
        });
      });
    const e = document.getElementById(global.mobile_stickybar),
      t = document.querySelector("footer");
    e && t && t.classList.add("enable_menu-bottom");
    const n = document.getElementById("bls_cookie");
    n &&
      (getCookie("cookie_bar") || n.classList.remove("d-none"),
      document.querySelectorAll("#bls_cookie .cookie-dismiss").forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault(),
              e.currentTarget.closest("#bls_cookie").remove(),
              setCookie("cookie_bar", "dismiss", 30);
          },
          !1
        );
      }));
    const o = document.getElementById(global.announcementBar);
    if (o) {
      const e = o.querySelector(".swiper-announcementBar");
      e &&
        ((e.style.maxHeight = o.offsetHeight + "px"),
        new Swiper(".swiper-announcementBar", {
          loop: !0,
          slidesPerView: 1,
          direction: "vertical",
          autoplay: { delay: 3e3 },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        })),
        o.querySelectorAll(".countdown-announcementBar").forEach((e) => {
          const t = e?.dataset.blockDeadline,
            n = t.split("-"),
            o =
              n[2] +
              "-" +
              n[0].padStart(2, "0") +
              "-" +
              n[1].padStart(2, "0") +
              "T00:00:00Z";
          if (t && Date.parse(o)) {
            const t = new Date(o),
              n = () => {
                const e = +t - +new Date();
                let n = {};
                return (
                  e > 0 &&
                    (n = {
                      days_announcementBar: Math.floor(e / 864e5),
                      hours_announcementBar: Math.floor((e / 36e5) % 24),
                      minutes_announcementBar: Math.floor((e / 1e3 / 60) % 60),
                      seconds_announcementBar: Math.floor((e / 1e3) % 60),
                    }),
                  n
                );
              };
            setInterval(() => {
              const t = n();
              Object.entries(t).forEach(([t, n]) => {
                e.querySelector("." + t).innerHTML = n;
              });
            }, 1e3);
          }
        }),
        getCookie("announcement_bar") && o.classList.add("d-none"),
        document
          .querySelectorAll("#announcement-bar .announcement-close")
          .forEach((e) => {
            e.addEventListener(
              "click",
              (e) => {
                e.preventDefault(),
                  e.currentTarget.closest("#announcement-bar").remove(),
                  setCookie("announcement_bar", 1, 1);
              },
              !1
            );
          });
    }
    const i = document.getElementById("product_conditions_form");
    i &&
      i.addEventListener("change", (e) => {
        const t = document.querySelector(".bls__payment-button");
        t &&
          (e.currentTarget.checked
            ? t.classList.remove("disabled")
            : t.classList.add("disabled"));
      }),
      document.querySelectorAll(global.overlay).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            const t = e.currentTarget;
            for (var n of (t.classList.add("d-none-overlay"),
            document.documentElement.classList.remove("hside_opened"),
            document.documentElement.classList.remove("vetical-overlay"),
            document.querySelectorAll(".bls__opend-popup")))
              n.classList.remove("bls__opend-popup");
            const o = document.querySelector(".btn-filter");
            for (var n of (o &&
              o.classList.contains("actived") &&
              o.classList.remove("actived"),
            document.querySelectorAll(".bls__addon")))
              n.classList.remove("is-open");
            for (var n of document.querySelectorAll(".bls-minicart-wrapper"))
              n.classList.remove("addons-open");
            for (var n of document.querySelectorAll(".vertical-menu"))
              n.classList.remove("open");
          },
          !1
        );
      }),
      document.querySelectorAll(".bls__terms-conditions a").forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = document.getElementById("popup-terms-conditions");
            if (!t) return;
            const n = t.getAttribute("data-text");
            var o = EasyDialogBox.create(
              "popup-terms-conditions",
              "dlg dlg-disable-footer dlg-disable-drag",
              n,
              t.innerHTML
            );
            (o.onClose = o.destroy), o.show(300);
          },
          !1
        );
      });
  },
};
BlsEventShopify.init();
var BlsCustomSlideShow = {
  init: function () {
    this.CustomInnerMenu();
  },
  CustomInnerMenu: function () {
    const e = document.querySelector(".verticalmenu-html"),
      t = document.querySelectorAll(".menu-slide");
    if (e) {
      const n = e.innerHTML;
      t &&
        t.forEach((e) => {
          (e.innerHTML = n),
            e
              .closest(".bls-wrapper")
              .querySelector(".bls_vertical_menu .title-menu-dropdown")
              .classList.add("none-pointer");
        });
    }
    if (null !== t && e) {
      let t = screen.width;
      const o = e.dataset.limitshowitem,
        i = document.querySelectorAll(".menu-slide .level0").length;
      if (t > 1199)
        if (i > o) {
          var n = Array.from(document.querySelectorAll(".menu-slide .level0"));
          n.forEach((e, t) => {
            if (t > o - 1) {
              const e = n[t];
              if (e.classList.contains("expand-menu-link")) return;
              e.classList.add("orther-link"), (e.style.display = "none");
            }
          }),
            (document.querySelector(
              ".menu-slide .expand-menu-link"
            ).style.display = "block"),
            document
              .querySelector(".menu-slide .expand-menu-link a")
              .addEventListener(
                "click",
                (e) => {
                  e.preventDefault();
                  const t = e.currentTarget.parentElement;
                  if (t.classList.contains("expanding"))
                    for (var n of (t.classList.remove("expanding"),
                    (t.querySelector("a").innerHTML =
                      window.menuStrings?.moreMenus),
                    document.querySelectorAll(
                      ".menu-slide .level0.orther-link"
                    )))
                      hideAnime(n);
                  else
                    for (var n of (t.classList.add("expanding"),
                    (t.querySelector("a").innerHTML =
                      window.menuStrings?.hideMenus),
                    document.querySelectorAll(
                      ".menu-slide .level0.orther-link"
                    )))
                      showAnime(n);
                },
                !1
              );
        } else
          document.querySelector(".slideshow-custom .expand-menu-link") &&
            (document.querySelector(
              ".slideshow-custom .expand-menu-link"
            ).style.display = "none");
    }
  },
};
BlsCustomSlideShow.init();
let newParser = new DOMParser();
var BlsSettingsSwiper = {
  init: function () {
    this.BlsSettingsCarousel();
  },
  BlsSettingsCarousel: function () {
    document.querySelectorAll(".bls__swiper").forEach((e) => {
      this.BlsCarousel(e);
    });
  },
  BlsCarousel: function (e) {
    var t,
      n = "true" === e?.dataset.autoplay,
      o = "true" === e?.dataset.loop,
      i = e?.dataset.slideshow ? e?.dataset.slideshow : 0,
      s = e?.dataset.arrowCenterimage ? e?.dataset.arrowCenterimage : 0,
      l = e?.dataset.desktop ? e?.dataset.desktop : 4,
      r = e?.dataset.tablet ? e?.dataset.tablet : 2,
      a = e?.dataset.mobile ? e?.dataset.mobile : 1,
      c = e?.dataset.autoplaySpeed ? e?.dataset.autoplaySpeed : 3e3,
      d = e?.dataset.speed ? e?.dataset.speed : 400,
      u = e?.dataset.effect ? e?.dataset.effect : "slide",
      m = e?.dataset.sectionId,
      p = e?.dataset.row ? e?.dataset.row : 1,
      h = e?.dataset.spacing ? e?.dataset.spacing : 0,
      g = "true" === e?.dataset.paginationProgressbar,
      f = "true" === e?.dataset.animationSrcoll,
      v = window.innerWidth,
      b = "true" === e?.dataset.itemMobile;
    (h = Number(h)),
      (c = Number(c)),
      (d = Number(d)),
      n && (n = { delay: c }),
      (t = new Swiper("#bls__swiper-" + m, {
        slidesPerView: b ? "auto" : a,
        spaceBetween: h >= 15 ? 15 : h,
        autoplay: n,
        loop: o,
        effect: u,
        speed: d,
        watchSlidesProgress: !0,
        watchSlidesVisibility: !0,
        grid: { rows: p, fill: "row" },
        navigation: {
          nextEl: e.querySelector(".swiper-button-next"),
          prevEl: e.querySelector(".swiper-button-prev"),
        },
        pagination: {
          clickable: !0,
          el: e.querySelector(".swiper-pagination"),
          type: g ? "progressbar" : "bullets",
        },
        breakpoints: {
          768: { slidesPerView: r, spaceBetween: h >= 30 ? 30 : h },
          1200: { slidesPerView: l, spaceBetween: h },
        },
        on: {
          init: function () {
            if (
              (i &&
                (v > 767
                  ? document.querySelectorAll(".slide-image").forEach((e) => {
                      var t = e?.dataset.imgSlide;
                      e.innerHTML = `<img \n                      src=${t} \n                      alt="slide" \n                      srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                      sizes="100vw"\n                    >`;
                    })
                  : document.querySelector(".slide-image-mobile")
                  ? document
                      .querySelectorAll(".slide-image-mobile")
                      .forEach((e) => {
                        var t = e?.dataset.imgSlideMobile;
                        e.innerHTML = `<img \n                        src=${t} \n                        alt="slide mobile" \n                        srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                        sizes="100vw"\n                      >`;
                      })
                  : document.querySelectorAll(".slide-image").forEach((e) => {
                      var t = e?.dataset.imgSlide;
                      e.innerHTML = `<img \n                        src=${t} \n                        alt="slide" \n                        srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                        sizes="100vw"\n                      >`;
                    }),
                window.addEventListener("resize", function () {
                  window.innerWidth <= 767
                    ? document.querySelector(".slide-image-mobile")
                      ? document
                          .querySelectorAll(".slide-image-mobile")
                          .forEach((e) => {
                            var t = e?.dataset.imgSlideMobile;
                            e.innerHTML = `<img \n                          src=${t} \n                          alt="slide mobile" \n                          srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                          sizes="100vw"\n                        >`;
                          })
                      : document
                          .querySelectorAll(".slide-image")
                          .forEach((e) => {
                            var t = e?.dataset.imgSlide;
                            e.innerHTML = `<img \n                          src=${t} \n                          alt="slide" \n                          srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                          sizes="100vw"\n                        >`;
                          })
                    : document.querySelectorAll(".slide-image").forEach((e) => {
                        var t = e?.dataset.imgSlide;
                        e.innerHTML = `<img \n                        src=${t} \n                        alt="slide" \n                        srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                        sizes="100vw"\n                      >`;
                      });
                }),
                f && initializeScrollZoomAnimationTrigger()),
              s)
            ) {
              var e = document.getElementById("bls__swiper-" + m),
                t = e.querySelectorAll(".bls__responsive-image");
              if (0 != t.length) {
                var n = [];
                t.forEach((e) => {
                  n.push(e.offsetHeight / 2);
                });
                var o = "--arrows-offset-top: " + Math.max(...n) + "px";
                e.querySelectorAll(".swiper-arrow") &&
                  e.querySelectorAll(".swiper-arrow").forEach((e) => {
                    e.setAttribute("style", o);
                  });
              }
            }
          },
        },
      })),
      i &&
        t.on("slideChange", function () {
          document.querySelectorAll(".video-slider").forEach((e) => {
            var t = e.dataset.video,
              n = e.dataset.poster;
            e.innerHTML = `\n              <video playsinline="true" loop="loop" muted="muted" autoplay="autoplay" preload="metadata"\n                poster="${n}">\n                <source\n                  src="${t}"\n                  type="video/mp4">\n              </video>\n              `;
          });
        });
  },
};
BlsSettingsSwiper.init();
var BlsSettingsSwiperCustom = {
  init: function () {
    this.BlsSettingsCarousel();
  },
  BlsSettingsCarousel: function () {
    document.querySelectorAll(".custom-bls__swiper").forEach((e) => {
      this.BlsCarousel(e);
    });
  },
  BlsCarousel: function (e) {
    var t,
      n = "true" === e?.dataset.autoplay,
      o = "true" === e?.dataset.loop,
      s = e?.dataset.slideshow ? e?.dataset.slideshow : 0,
      i = e?.dataset.desktop ? e?.dataset.desktop : 4,
      l = e?.dataset.tablet ? e?.dataset.tablet : 2,
      r = e?.dataset.mobile ? e?.dataset.mobile : 1,
      a = e?.dataset.autoplaySpeed ? e?.dataset.autoplaySpeed : 3e3,
      c = e?.dataset.speed ? e?.dataset.speed : 400,
      d = e?.dataset.effect ? e?.dataset.effect : "slide",
      u = e?.dataset.sectionId,
      m = e?.dataset.row ? e?.dataset.row : 1,
      p = e?.dataset.spacing ? e?.dataset.spacing : 0,
      h = "true" === e?.dataset.paginationProgressbar,
      g = window.innerWidth,
      f = "true" === e?.dataset.itemMobile;
    (p = Number(p)),
      (a = Number(a)),
      (c = Number(c)),
      n && (n = { delay: a }),
      (t = new Swiper("#custom-bls__swiper-" + u, {
        slidesPerView: f ? "auto" : r,
        spaceBetween: p >= 15 ? 15 : p,
        autoplay: n,
        loop: o,
        effect: d,
        speed: c,
        watchSlidesProgress: !0,
        watchSlidesVisibility: !0,
        grid: { rows: m, fill: "row" },
        navigation: {
          nextEl: e.querySelector(".swiper-button-next"),
          prevEl: e.querySelector(".swiper-button-prev"),
        },
        pagination: {
          clickable: !0,
          el: e.querySelector(".swiper-pagination"),
          type: h ? "progressbar" : "bullets",
        },
        breakpoints: {
          768: { slidesPerView: l, spaceBetween: p >= 30 ? 30 : p },
          1200: { slidesPerView: i, spaceBetween: p },
        },
        on: {
          init: function () {
            s &&
              (g > 767 &&
                document.querySelectorAll(".slide-image").forEach((e) => {
                  var t = e?.dataset.imgSlide;
                  e.innerHTML = `<img \n                      src=${t} \n                      alt="slide" \n                      srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                      sizes="100vw"\n                    >`;
                }),
              window.addEventListener("resize", function () {
                window.innerWidth <= 767
                  ? document.querySelector(".slide-image-mobile")
                    ? document
                        .querySelectorAll(".slide-image-mobile")
                        .forEach((e) => {
                          var t = e?.dataset.imgSlideMobile;
                          e.innerHTML = `<img \n                          src=${t} \n                          alt="slide mobile" \n                          srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                          sizes="100vw"\n                        >`;
                        })
                    : document.querySelectorAll(".slide-image").forEach((e) => {
                        var t = e?.dataset.imgSlide;
                        e.innerHTML = `<img \n                          src=${t} \n                          alt="slide" \n                          srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                          sizes="100vw"\n                        >`;
                      })
                  : document.querySelectorAll(".slide-image").forEach((e) => {
                      var t = e?.dataset.imgSlide;
                      e.innerHTML = `<img \n                        src=${t} \n                        alt="slide" \n                        srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n                        sizes="100vw"\n                      >`;
                    });
              }));
          },
        },
      })),
      s &&
        t.on("slideChange", function () {
          document.querySelectorAll(".video-slider").forEach((e) => {
            var t = e.dataset.video,
              n = e.dataset.poster;
            e.innerHTML = `\n              <video playsinline="true" loop="loop" muted="muted" autoplay="autoplay" preload="metadata"\n                poster="${n}">\n                <source\n                  src="${t}"\n                  type="video/mp4">\n              </video>\n              `;
          });
        });
  },
};
BlsSettingsSwiperCustom.init();
var BlsSettingsSwiperTestimonial = {
  init: function () {
    this.BlsSettingsCarouselTestimonial();
  },
  BlsSettingsCarouselTestimonial: function () {
    document.querySelectorAll(".bls__testimonial").forEach((e) => {
      this.BlsCarouselTestimonial(e);
    });
  },
  BlsCarouselTestimonial: function (e) {
    var t = "true" === e?.dataset.autoplay,
      n = "true" === e?.dataset.loop,
      o = e?.dataset.desktop ? e?.dataset.desktop : 4,
      i = e?.dataset.tablet ? e?.dataset.tablet : 2,
      s = e?.dataset.mobile ? e?.dataset.mobile : 1,
      l = e?.dataset.sectionId,
      r = window.innerWidth,
      a = "true" === e?.dataset.thumb,
      c = e?.dataset.spacing ? e?.dataset.spacing : 0,
      d = "true" === e?.dataset.paginationProgressbar;
    (c = Number(c)),
      r <= 767 ? c >= 15 && (c = 15) : r <= 1199 && c >= 30 && (c = 30),
      a
        ? new Swiper("#bls__testimonial-" + l, {
            slidesPerView: s,
            spaceBetween: c,
            autoplay: t,
            loop: n,
            watchSlidesProgress: !0,
            watchSlidesVisibility: !0,
            navigation: {
              nextEl: e.querySelector(".swiper-button-next"),
              prevEl: e.querySelector(".swiper-button-prev"),
            },
            pagination: {
              clickable: !0,
              el: e.querySelector(".swiper-pagination"),
            },
            breakpoints: {
              768: { slidesPerView: i },
              1200: { slidesPerView: o },
            },
            thumbs: {
              swiper: {
                el: `.testimonial-thumb-${l}`,
                multipleActiveThumbs: !0,
                spaceBetween: 10,
                slidesPerView: "auto",
                freeMode: !0,
                centerInsufficientSlides: !0,
                watchSlidesProgress: !0,
              },
            },
          })
        : new Swiper("#bls__testimonial-" + l, {
            slidesPerView: s,
            spaceBetween: c,
            autoplay: t,
            loop: n,
            watchSlidesProgress: !0,
            watchSlidesVisibility: !0,
            navigation: {
              nextEl: e.querySelector(".swiper-button-next"),
              prevEl: e.querySelector(".swiper-button-prev"),
            },
            pagination: {
              clickable: !0,
              el: e.querySelector(".swiper-pagination"),
              type: d ? "progressbar" : "bullets",
            },
            breakpoints: {
              768: { slidesPerView: i },
              1200: { slidesPerView: o },
            },
          });
  },
};
BlsSettingsSwiperTestimonial.init();
var BlsAddMetatagScale = {
  init: function () {
    this.addMeta();
  },
  addMeta: function () {
    const e = document.querySelector("body"),
      t = document.querySelector('meta[name="viewport"]'),
      n = t.getAttribute("content") + ", maximum-scale=1";
    e.addEventListener("touchstart", function () {
      t.setAttribute("content", n);
    });
  },
};
BlsAddMetatagScale.init();
var BlsToggle = {
  init: function () {
    this.initToggle(), this.backToTop(), this.initToggleLookbook();
  },
  initToggle: function () {
    document
      .querySelectorAll(".bls__page-faq-items > .bls__page-faq-title")
      .forEach((e) => {
        e.addEventListener("click", (t) => {
          t.preventDefault();
          const n = t.currentTarget.parentElement.querySelector(
            ".bls__page-faq-content"
          );
          slideAnime({ target: n, animeType: "slideToggle" }),
            e.closest(".bls-toggle").classList.contains("active")
              ? e.closest(".bls-toggle").classList.remove("active")
              : e.closest(".bls-toggle").classList.add("active");
        });
      });
  },
  backToTop: function () {
    const e = document.querySelector(".back-top");
    e &&
      (document.addEventListener("scroll", () => {
        window.scrollY > 400
          ? e.classList.add("show")
          : e.classList.remove("show");
      }),
      e.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }));
  },
  initToggleLookbook: function () {
    document.body.addEventListener("click", (e) => {
      const t = e.target;
      t.closest(".bls__product-item") ||
        t ==
          document.querySelector(
            ".bls__product-item.active .lookbook__popup-items"
          ) ||
        document.querySelectorAll(".bls__product-item").forEach((e) => {
          e.classList.remove(
            "active",
            "top",
            "bottom",
            "left",
            "right",
            "center"
          );
        });
    }),
      document.body.addEventListener("click", this.onBodyClick),
      document.querySelectorAll(".lookbook-action").forEach((e) => {
        e.addEventListener("click", (e) => {
          const t = e.currentTarget.closest(".bls__product-item"),
            n = t.querySelector(".lookbook__popup-items"),
            o = t.getBoundingClientRect(),
            i = n.getBoundingClientRect(),
            s = i.right,
            l = i.left;
          let r = window.innerHeight,
            a = window.innerWidth,
            c = "center";
          const d = o.top,
            u = document.querySelectorAll(".bls__product-item");
          if (t.classList.contains("active"))
            t.classList.remove(
              "active",
              "top",
              "bottom",
              "left",
              "right",
              "center"
            );
          else if (
            (u.forEach((e) => {
              e.classList.remove(
                "active",
                "top",
                "bottom",
                "left",
                "right",
                "center"
              );
            }),
            t.classList.add("active"),
            a > 767)
          )
            s > a ? (c = "left") : l < 0 && (c = "right"),
              d > r / 2
                ? t.classList.add("top", c)
                : t.classList.add("bottom", c);
          else {
            d > r / 2 ? t.classList.add("top") : t.classList.add("bottom");
            let e = 0;
            s > a
              ? ((e = -50 - (s - a)), (n.style.left = e + "px"))
              : l < 0 && ((e = -l), (n.style.left = e + "px"));
          }
        });
      });
  },
};
BlsToggle.init();
var BlsPopup = {
  init: function () {
    this.fetchDataNewletter(),
      this.fetchDataPromotion(),
      this.checkFormInfo(),
      this.checkShowMsgStockNotify();
  },
  setCookie: function (e, t, n) {
    const o = new Date();
    o.setTime(o.getTime() + 24 * t * 60 * 60 * 1e3);
    let i = "expires=" + o.toUTCString();
    document.cookie = e + "=" + n + ";" + i + ";path=/";
  },
  getCookie: function (e) {
    let t = e + "=",
      n = document.cookie.split(";");
    for (let e = 0; e < n.length; e++) {
      let o = n[e];
      for (; " " == o.charAt(0); ) o = o.substring(1);
      if (0 == o.indexOf(t)) return o.substring(t.length, o.length);
    }
    return "";
  },
  deleteCookie: function (e) {
    document.cookie = e + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  },
  fetchDataNewletter: function () {
    const e = `${window.location.pathname}?section_id=newsletter-popup`,
      t = this;
    !1 !== window.popup?.newsletterPopup &&
      fetch(e)
        .then((e) => e.text())
        .then((e) => {
          const n = newParser
            .parseFromString(e, "text/html")
            .querySelector("#bls__newsletter-popup");
          if (n) {
            const e = n?.dataset.show,
              i = "true" === n?.dataset.showMobile;
            if (
              ("show-on-all-pages" === e || "show-on-homepage" === e) &&
              "" === t.getCookie("bls-newsletter-popup")
            ) {
              var o = EasyDialogBox.create(
                "newsletterp",
                "dlg dlg-disable-footer\tdlg-disable-drag " +
                  (i ? "dlg-disable-mobile" : ""),
                "",
                n.innerHTML
              );
              (o.onClose = o.destroy),
                o.show(1e3),
                (o.onShow = function () {
                  t.checkNotShowNewletter();
                });
            }
          }
        })
        .catch((e) => {
          throw e;
        });
  },
  checkNotShowNewletter: function () {
    const e = this,
      t = document.getElementById("doNotShow");
    t &&
      t.addEventListener("change", (t) => {
        t.currentTarget.checked
          ? e.setCookie("bls-newsletter-popup", 99999, "bls")
          : e.deleteCookie("bls-newsletter-popup");
      });
  },
  fetchDataPromotion: function () {
    const e = `${window.location.pathname}?section_id=promotion-popup`,
      t = this;
    !1 !== window.popup?.promotionPopup &&
      fetch(e)
        .then((e) => e.text())
        .then((e) => {
          const n = newParser
              .parseFromString(e, "text/html")
              .querySelector("#bls__promotion-popup"),
            o = "true" === n?.dataset.show,
            i = "true" === n?.dataset.showMb;
          if (!0 === o && "" === t.getCookie("bls-promotion-popup")) {
            var s = EasyDialogBox.create(
              "promotionp",
              `dlg dlg-disable-footer ${
                i ? "" : "dlg-disable-mobile"
              } dlg-disable-drag`,
              "",
              n.innerHTML
            );
            (s.onClose = s.destroy),
              s.show(6e3),
              (s.onShow = function () {
                t.copyPromotion(), t.checkNotShowPromotion();
              });
          }
        })
        .catch((e) => {
          throw e;
        });
  },
  checkNotShowPromotion: function () {
    const e = this,
      t = document.querySelector("#doNotShowPromotion");
    t &&
      t.addEventListener("change", (t) => {
        t.currentTarget.checked
          ? e.setCookie("bls-promotion-popup", 99999, "bls")
          : e.deleteCookie("bls-promotion-popup");
      });
  },
  copyPromotion: function () {
    const e = document.querySelectorAll(".discount");
    null !== e &&
      e.forEach((e) => {
        e.addEventListener("click", (t) => {
          t.preventDefault(),
            navigator.clipboard.writeText(e?.dataset.code),
            e.classList.add("action-copy"),
            setTimeout(() => {
              e.classList.remove("action-copy");
            }, 1500);
        });
      });
  },
  checkFormInfo: function () {
    const e = this,
      t = window.location.href,
      n = document.querySelector(".form-infor"),
      o = document.querySelector(".form-infor-body.noti-error"),
      i = document.querySelector(".form-infor-body.noti-success"),
      s = document.querySelector(".form-infor,.close-form-info");
    if (
      (s &&
        s.addEventListener("click", (e) => {
          const t = e.currentTarget.closest(".form-infor");
          e.preventDefault(),
            t.classList.contains("show-noti-form") &&
              t.classList.remove("show-noti-form");
        }),
      t.indexOf("customer_posted=true#newsletter-form-popup") >= 1)
    ) {
      n.classList.add("show-noti-form"),
        (o.style.display = "none"),
        e.setCookie("bls-newsletter-popup", 99999, "bls");
      const t = location.href.split("?")[0];
      window.history.pushState("object", document.title, t);
    }
    if (t.indexOf("contact%5Btags%5D=newsletter&form_type=customer") >= 1) {
      n.classList.add("show-noti-form"), (i.style.display = "none");
      const e = location.href.split("?")[0];
      window.history.pushState("object", document.title, e);
    }
    if (t.indexOf("customer_posted=true") >= 1) {
      n.classList.add("show-noti-form"), (o.style.display = "none");
      const t = location.href.split("?")[0];
      e.setCookie("bls-newsletter-popup", 99999, "bls"),
        window.history.pushState("object", document.title, t);
    }
  },
  checkShowMsgStockNotify: function () {
    const e = window.location.href,
      t = document.querySelector(".stock-notify"),
      n = document.querySelector(".stock-notify,.close-form-stock-notify");
    if (
      (n &&
        n.addEventListener("click", (e) => {
          const t = e.currentTarget.closest(".stock-notify");
          e.preventDefault(),
            t.classList.contains("show-noti-form") &&
              t.classList.remove("show-noti-form");
        }),
      e.indexOf("contact_posted=true#FormStockNotify") > -1)
    ) {
      t.classList.add("show-noti-form");
      const e = location.href.split("?")[0];
      window.history.pushState("object", document.title, e);
    }
  },
};
BlsPopup.init();
var BlsLoginPopup = {
  init: function () {
    this.showLogin();
  },
  clickTab: function () {
    const e = document.querySelectorAll("[data-login-hidden]"),
      t = document.querySelectorAll("[data-login-show]"),
      n = document.querySelector("#loginp_0 .dlg-heading .popup-title");
    t.forEach((t) => {
      var o = t?.dataset.loginShow;
      t.addEventListener("click", function (t) {
        t.preventDefault(),
          e.forEach((e) => {
            var t = e?.dataset.loginHidden;
            "true" === e.getAttribute("aria-hidden") && o === t
              ? (e.setAttribute("aria-hidden", "false"), n && (n.innerText = o))
              : e.setAttribute("aria-hidden", "true");
          });
      });
    });
  },
  showLogin: function () {
    const e = document.querySelector(".action-login"),
      t = this;
    null !== e &&
      e.addEventListener("click", (e) => {
        e.preventDefault(),
          t.fetchDataLogin(),
          document.body.classList.add("login-popup-show");
      });
  },
  fetchDataLogin: function () {
    const e = `${window.location.pathname}?section_id=login-popup`,
      t = this;
    fetch(e)
      .then((e) => e.text())
      .then((e) => {
        const n = newParser
          .parseFromString(e, "text/html")
          .querySelector("#login-popup");
        if (n) {
          var o = n.querySelector("[data-title-default]").dataset.titleDefault,
            i = EasyDialogBox.create(
              "loginp",
              "dlg dlg-disable-footer dlg-disable-drag",
              `${o}`,
              n.innerHTML
            );
          (i.onClose = i.destroy), i.show();
        }
        t.clickTab();
      })
      .catch((e) => {
        throw e;
      });
  },
};
BlsLoginPopup.init();
var BlsLazyloadImg = {
  init: function () {
    this.lazyReady();
  },
  lazyReady: function () {
    if (window.IntersectionObserver) {
      let e = new IntersectionObserver(
        (e, t) => {
          e.forEach((e) => {
            e.isIntersecting &&
              ((e.target.width = e.boundingClientRect.width),
              (e.target.height = e.boundingClientRect.height),
              (e.target.sizes = `${e.boundingClientRect.width}px`),
              e.target.classList.add("bls-loaded-image"),
              e.target
                .closest(".bls-image-js")
                .classList.remove("bls-loading-image"),
              t.unobserve(e.target));
          });
        },
        { rootMargin: "10px" }
      );
      document.querySelectorAll(".bls-image-js img").forEach((t) => {
        e.observe(t);
      });
    }
  },
};
BlsLazyloadImg.init();
const rdc = {
  mode: "same-origin",
  credentials: "same-origin",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
};
let parser = new DOMParser();
const newMap = new Map();
var BlsReloadEvents = {
  init: function () {
    this.setupEventListeners();
  },
  setupEventListeners: function () {
    document.addEventListener("shopify:section:load", function (e) {
      var t = e.detail.sectionId,
        n = e.target.querySelector('[data-id="' + t + '"]');
      if (null != n) {
        const { type: e } = n?.dataset;
        switch (e) {
          case "instagram":
            BlsInstagramShopify.init();
            break;
          case "product_grid":
          case "product_carousel":
            BlsProductGridEvents.init(),
              BlsProductTabEvents.init(),
              BlsColorSwatchesShopify.init();
            break;
          case "recently_viewed_products":
            BlsRVProductsShopify.init();
            break;
          case "product_recommendations":
            BlsProductRecommendsEvents.init();
            break;
          case "product_single":
            BlsColorSwatchesShopify.init();
            break;
          case "product_deal":
            BlsColorSwatchesShopify.init(), BlsCountdownTimer.init();
        }
      }
    });
  },
};
BlsReloadEvents.init();
var BlsInstagramShopify = {
  init: function () {
    this.loadInstagram();
  },
  loadInstagram: function () {
    document.querySelectorAll(".bls__instagram-api").forEach((e) => {
      if (null != e) {
        const { accessToken: t, images: n, igType: o } = e?.dataset;
        t
          ? this.initInstagram(e, t, n, o)
          : console.warn("Access Token is invalid!");
      }
    });
  },
  initInstagram: async function (e, t, n, o) {
    const i = this;
    let s = void 0 !== n ? n : 4;
    const l = await this.fetchCache(
      `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${t}`,
      { cache: "force-cache" }
    );
    if (l)
      return l.error
        ? console.error("Instagram error: ", l.error?.message)
        : void ("carousel" === o
            ? i.initCarousel(l.data, e, s)
            : i.initGrid(l.data, e, s));
  },
  fetchCache: function (e, t) {
    let n = void 0 !== t ? t : rdc;
    return new Promise((t, o) => {
      if (newMap.get(e)) return t(newMap.get(e));
      fetch(e, n)
        .then((n) => {
          if (n.ok) {
            const o = n.json();
            return t(o), newMap.set(e, o), o;
          }
          o(n);
        })
        .catch(o);
    });
  },
  initCarousel: function (e, t, n) {
    e
      .filter(
        (e) => "IMAGE" === e.media_type || "CAROUSEL_ALBUM" === media_type
      )
      .slice(0, n)
      .forEach((e) => {
        var n = document.createElement("div");
        n.classList.add("swiper-slide");
        var o = document.createElement("div"),
          i = document.createElement("div");
        i.classList.add("bls__instagram-item");
        var s = document.createElement("a"),
          l = document.createElement("span");
        l.classList.add("bls__instagram-icon"),
          o.classList.add("bls__responsive-image"),
          o.classList.add("bls_instagram-image"),
          o.classList.add("bls-image-js"),
          o.setAttribute("style", "--aspect-ratio:1/1"),
          (o.innerHTML += `<img src="${e.media_url}" srcset="${e.media_url}&width=165 165w,${e.media_url}&width=330 330w,${e.media_url}&width=535 535w,${e.media_url}&width=750 750w,${e.media_url}&width=1000 1000w,${e.media_url}&width=1500 1500w,${e.media_url}&width=3000 3000w" sizes="(min-width: 1260px) 282px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)" loading="lazy" alt="instagram">`),
          s.setAttribute("href", e.permalink),
          s.appendChild(o),
          s.appendChild(l),
          i.appendChild(s),
          n.appendChild(i),
          t.querySelector(".swiper-wrapper").appendChild(n);
      }),
      BlsLazyloadImg.init();
  },
  initGrid: function (e, t, n) {
    const o = t.querySelector(".bls__instagram-grid");
    if (o) {
      const { spacing: s } = o?.dataset;
      t.setAttribute("style", "--bs-gutter-x:" + s + "px");
      var i = Number(n);
      e.filter(
        (e) => "IMAGE" === e.media_type || "CAROUSEL_ALBUM" === media_type
      )
        .slice(0, i)
        .forEach((e) => {
          var t = document.createElement("div");
          t.classList.add("bls__instagram-item");
          var n = document.createElement("a"),
            i = document.createElement("span");
          i.classList.add("bls__instagram-icon");
          var s = document.createElement("div");
          s.classList.add("bls__responsive-image"),
            s.classList.add("bls-image-js"),
            s.setAttribute("style", "--aspect-ratio: 1/1"),
            s.classList.add("bls_instagram-image"),
            (s.innerHTML += `<img src="${e.media_url}" srcset="${e.media_url}&width=165 165w,${e.media_url}&width=330 330w,${e.media_url}&width=535 535w,${e.media_url}&width=750 750w,${e.media_url}&width=1000 1000w,${e.media_url}&width=1500 1500w,${e.media_url}&width=3000 3000w" sizes="(min-width: 1260px) 282px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3), calc((100vw - 35px) / 2)" loading="lazy" alt="instagram">`),
            n.setAttribute("href", e.permalink),
            n.appendChild(s),
            n.appendChild(i),
            t.appendChild(n),
            o.querySelector(".row").appendChild(t),
            BlsLazyloadImg.init();
        });
    }
  },
};
BlsInstagramShopify.init();
var BlsProductGridEvents = {
  init: function () {
    this.setupEventListeners();
  },
  setupEventListeners: function () {
    const e = this;
    document.querySelectorAll(".bls__btn-load-more").forEach((t) => {
      t.addEventListener("click", function () {
        const t = this.closest(".bls__grid").dataset.id;
        e.loadButtonLoadMore(t);
      });
    });
  },
  loadButtonLoadMore: function (e) {
    const t = document.querySelector(".bls__load-more_wrap-" + e);
    if (null != t) {
      const { nextUrl: n, currentPage: o, totalPages: i } = t?.dataset;
      this.loadMore(t, e, n, o, i);
    }
  },
  loadMore: function (e, t, n, o, i) {
    const s = document.querySelector("#bls__product-grid-" + t);
    if (null != s) {
      const { id: l, r: r, d: a, to: c } = s?.dataset,
        d = e.querySelector('[type="button"]');
      d.classList.add("btn-loading");
      let u = parseInt(o) + 1;
      fetch(`${n}?page=${u}&section_id=${l}`)
        .then((e) => e.text())
        .then((e) => {
          parser
            .parseFromString(e, "text/html")
            .querySelectorAll(`#bls__product-grid-${t} .bls__product-load`)
            .forEach((e) =>
              document.getElementById(`bls__product-grid-${t}`).appendChild(e)
            );
        })
        .catch((e) => {
          console.error(e);
        })
        .finally(() => {
          d.classList.remove("btn-loading"),
            u == i ? e.remove() : e.setAttribute("data-current-page", u),
            BlsColorSwatchesShopify.init(),
            BlsSubActionProduct.init(),
            BlsReloadSpr.init(),
            BlsLazyloadImg.init();
        });
    }
  },
};
BlsProductGridEvents.init();
var BlsProductTabEvents = {
  init: function () {
    this.setupEventListeners(),
      this.setupDropdownStyle(),
      document.addEventListener("click", this.closeAllSelect);
  },
  setupEventListeners: function (e) {
    document.querySelectorAll(".bls__collection-tab").forEach((t) => {
      const n = t.querySelectorAll(".bls__collection-tab-item");
      if (0 != n.length)
        n.forEach((e) => {
          e.addEventListener("click", function () {
            if (!this.classList.contains("active")) {
              t.querySelectorAll(".bls__collection-tab-item").forEach((e) => {
                e.classList.remove("active");
              }),
                this.classList.add("active");
              const e = this.dataset.id;
              t.querySelectorAll(".bls__cls-tab").forEach((n) => {
                n.id === e &&
                  (n.classList.contains("active") ||
                    (t.querySelectorAll(".bls__cls-tab").forEach((e) => {
                      e.classList.remove("active");
                    }),
                    n.classList.add("active")));
              });
            }
          });
        });
      else {
        const n = e;
        t.querySelectorAll(".bls__cls-tab").forEach((e) => {
          e.id === n &&
            (e.classList.contains("active") ||
              (t.querySelectorAll(".bls__cls-tab").forEach((e) => {
                e.classList.remove("active");
              }),
              e.classList.add("active")));
        });
      }
    });
  },
  setupDropdownStyle: function () {
    const e = this;
    var t, n, o, i, s, l, r, a, c, d, u;
    if ((i = (t = document.getElementsByClassName("custom-select")).length) > 0)
      for (n = 0; n < i; n++) {
        for (
          l = t[n].getElementsByTagName("select")[0],
            t[n].innerHTML = "",
            t[n].appendChild(l),
            s = l.length,
            (r = document.createElement("div")).setAttribute(
              "class",
              "select-selected flex justify-content-between w-full"
            ),
            (d = document.createElement("span")).innerHTML =
              l.options[l.selectedIndex].innerHTML,
            r.appendChild(d),
            (u = document.createElement("span")).setAttribute(
              "class",
              "select-arrow"
            ),
            u.innerHTML =
              '<svg fill="currentColor" width="20px" height="20px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M441.9 167.3l-19.8-19.8c-4.7-4.7-12.3-4.7-17 0L224 328.2 42.9 147.5c-4.7-4.7-12.3-4.7-17 0L6.1 167.3c-4.7 4.7-4.7 12.3 0 17l209.4 209.4c4.7 4.7 12.3 4.7 17 0l209.4-209.4c4.7-4.7 4.7-12.3 0-17z"></path></svg>',
            r.appendChild(u),
            t[n].appendChild(r),
            (a = document.createElement("div")).setAttribute(
              "class",
              "select-items select-hide"
            ),
            o = 0;
          o < s;
          o++
        )
          ((c = document.createElement("div")).innerHTML =
            l.options[o].innerHTML),
            l.options[o].getAttribute("selected") &&
              c.setAttribute("class", "same-as-selected"),
            c.addEventListener("click", function (e) {
              var t, n, o, i, s, l, r;
              for (
                l = (i =
                  this.parentNode.parentNode.getElementsByTagName("select")[0])
                  .length,
                  s = this.parentNode.previousSibling,
                  n = 0;
                n < l;
                n++
              )
                if (i.options[n].innerHTML == this.innerHTML) {
                  for (
                    i.selectedIndex = n,
                      s.childNodes[0].innerHTML = this.innerHTML,
                      r = (t =
                        this.parentNode.getElementsByClassName(
                          "same-as-selected"
                        )).length,
                      o = 0;
                    o < r;
                    o++
                  )
                    t[o].removeAttribute("class");
                  this.setAttribute("class", "same-as-selected");
                  break;
                }
              i.dispatchEvent(new Event("change")),
                i.dispatchEvent(new Event("click")),
                s.click();
            }),
            a.appendChild(c);
        t[n].appendChild(a),
          r.addEventListener("click", function (t) {
            t.stopPropagation(),
              e.closeAllSelect(this),
              this.nextSibling.classList.toggle("select-hide"),
              this.classList.toggle("select-arrow-active"),
              e.setupEventListeners(
                this.closest(".custom-select").querySelector(".select-data")
                  .value
              );
          });
      }
  },
  closeAllSelect: function (e) {
    var t,
      n,
      o,
      i,
      s,
      l = [];
    for (
      t = document.getElementsByClassName("select-items"),
        n = document.getElementsByClassName(
          "select-selected flex justify-content-between w-full"
        ),
        i = t.length,
        s = n.length,
        o = 0;
      o < s;
      o++
    )
      e == n[o] ? l.push(o) : n[o].classList.remove("select-arrow-active");
    for (o = 0; o < i; o++) l.indexOf(o) && t[o].classList.add("select-hide");
  },
};
BlsProductTabEvents.init();
var BlsColorSwatchesShopify = {
  init: function () {
    this.initSwatches();
  },
  initSwatches: function () {
    const e = this;
    var t;
    document.querySelectorAll(".bls__product-color-swatches").forEach((t) => {
      e.checkSwatches(t);
    }),
      document.querySelectorAll(".bls__option-swatch-js").forEach((n) => {
        const o = n.closest(".bls__product-item");
        o &&
          (n.addEventListener(
            "mouseout",
            function () {
              n.closest(".swiper") &&
                (t = setTimeout(() => {
                  n.closest(".swiper").classList.remove("show-tooltip");
                }, 400));
            },
            !1
          ),
          n.addEventListener("mouseover", () => {
            clearTimeout(t),
              e.listenerColor(n, o),
              n.closest(".swiper") &&
                n.closest(".swiper").classList.add("show-tooltip");
          }));
      });
  },
  listenerColor: function (e, t) {
    const n = this;
    setTimeout(() => {
      e.classList.contains("active") ||
        (e
          .closest(".bls__product-option")
          .querySelectorAll(".bls__option-swatch-js")
          .forEach((e) => {
            e.classList.remove("active");
          }),
        e.classList.toggle("active"),
        n.swapProduct(t));
    }, 0);
  },
  updateMasterId: (e, t) =>
    t.find((t) => !t.options.map((t, n) => e[n] === t).includes(!1)),
  updatePrice(e, t) {
    if (!e) return;
    const n = e.compare_at_price,
      o = e.price,
      i = e.unit_price,
      s = e.unit_price_measurement,
      l = Shopify.formatMoney(e.price, cartStrings?.money_format);
    if (i && s) {
      const e = Shopify.formatMoney(i, cartStrings?.money_format),
        n = 1 != s.reference_value ? s.reference_value : s.reference_unit,
        o = t.querySelector(".unit-price .number"),
        l = t.querySelector(".unit-price .unit");
      o && (o.innerHTML = e), l && (l.innerHTML = n);
    }
    const r = t.querySelector(".price__regular .price");
    r && (r.innerHTML = l);
    const a = t.querySelector(".bls__price");
    if (
      (a.classList.remove("price--sold-out", "price--on-sale"),
      a
        .querySelector(".price__regular .price")
        .classList.remove("special-price"),
      n && n > o)
    ) {
      const e = Shopify.formatMoney(n, cartStrings?.money_format);
      if (!a.querySelector(".compare-price")) {
        var c = a.querySelector(".price__sale"),
          d = document.createElement("span"),
          u = document.createElement("s");
        u.classList.add("price-item", "compare-price"),
          d.appendChild(u),
          c && c.appendChild(d);
      }
      a.querySelector(".compare-price") &&
        (a.querySelector(".compare-price").innerHTML = e),
        a.classList.add("price--on-sale"),
        a
          .querySelector(".price__regular .price")
          .classList.add("special-price");
    } else e.available || a.classList.add("price--sold-out");
  },
  updateMedia(e, t) {
    e &&
      e.featured_media &&
      setTimeout(() => {
        t.querySelector(".bls__product-main-img img").removeAttribute("srcset"),
          t
            .querySelector(".bls__product-main-img img")
            .setAttribute("src", e.featured_media.preview_image.src);
      }, 200);
  },
  renderProductInfo(e, t, n, o) {
    let i = 0,
      s = 0,
      l = !1,
      r = !1,
      a = !1,
      c = !1,
      d = !1;
    const u = e.compare_at_price,
      m = e.price;
    t
      .reduce((e, t) => {
        const n = e.find((e) => e.option === t.option);
        return (
          n
            ? ((n.qty += t.qty),
              !0 === t.available && (n.available = !0),
              "" === t.mamagement && (n.mamagement = ""))
            : e.push(t),
          e
        );
      }, [])
      .find((t) => {
        t.option === e.option1 &&
          ((i = t.qty), (c = t.available), (d = t.mamagement));
      }),
      u && u > m && ((l = !0), (s = ((u - m) / u) * 100)),
      "" === d ? ((r = !1), (a = !1)) : c && i < 1 ? (a = !0) : c || (r = !0);
    const p = n.querySelector(".bls__product-label"),
      h = n.querySelector(".bls__product-text-scrolling");
    if ((p && p.remove(), h)) {
      const e = h?.dataset.textProductScrolling;
      if (l) {
        let t;
        (h.style.display = "flex"),
          (t =
            "price" == window.productLabel.saleType
              ? e.replace(
                  "[percent_sale]",
                  "- " + Shopify.formatMoney(u - m, cartStrings.money_format)
                )
              : "percent" == window.productLabel.saleType
              ? e.replace("[percent_sale]", s.toFixed(0) + "%")
              : e.replace("[percent_sale]", "")),
          h.querySelectorAll(".sale-content-product").forEach((e) => {
            e.innerText = t;
          });
      } else h.style.display = "none";
    }
    if (l || a || r) {
      var g = document.createElement("div");
      g.classList.add(
        "bls__product-label",
        "fs-12",
        "pointer-events-none",
        "absolute"
      ),
        n.querySelector(".bls__product-img").appendChild(g);
      const e = n.querySelector(".bls__product-label");
      if (l)
        if (e.querySelector(".bls__sale-label"))
          "price" == window.productLabel.saleType
            ? (e.querySelector(".bls__sale-label").innerText =
                "- " + Shopify.formatMoney(u - m, cartStrings.money_format))
            : "text" == window.productLabel.saleType
            ? (e.querySelector(".bls__sale-label").innerText =
                window.productLabel.saleLabel)
            : (e.querySelector(".bls__sale-label").innerText =
                -s.toFixed(0) + "%");
        else {
          var f = document.createElement("div");
          f.classList.add("bls__sale-label"),
            "price" == window.productLabel.saleType
              ? (f.innerText =
                  "- " + Shopify.formatMoney(u - m, cartStrings.money_format))
              : "text" == window.productLabel.saleType
              ? (f.innerText = window.productLabel.saleLabel)
              : (f.innerText = -s.toFixed(0) + "%"),
            e && e.appendChild(f);
        }
      if (r)
        if (e.querySelector(".bls__sold-out-label"))
          e.querySelector(".bls__sold-out-label").innerText =
            window.variantStrings?.soldOut;
        else {
          var v = document.createElement("div");
          v.classList.add("bls__sold-out-label"),
            (v.innerText = window.variantStrings?.soldOut),
            e && e.appendChild(v);
        }
      if (a) {
        var b = document.createElement("div");
        b.classList.add("bls__pre-order-label"),
          (b.innerText = window.variantStrings?.preOrder),
          e && e.appendChild(b);
      }
    }
    const y = n.querySelector(".bls__product-addtocart-js");
    if (y) {
      const t = y.dataset.productVariantId;
      Number(t) !== e.id && (y.dataset.productVariantId = e.id);
    }
    this.toggleAddButton(!e.available, window.variantStrings?.soldOut, n, a);
  },
  toggleAddButton(e = !0, t, n, o = !1) {
    if (!n) return;
    const i = n.querySelector(".bls__js-addtocart"),
      s = n.querySelector(".bls__js-addtocart .bls__button-content"),
      l = n.querySelector(".bls__js-addtocart .bls_tooltip-content");
    i &&
      (e
        ? (i.setAttribute("disabled", "disabled"),
          t && ((s.textContent = t), l && (l.textContent = t)))
        : (i.removeAttribute("disabled"),
          o
            ? ((s.textContent = window.variantStrings?.preOrder),
              l && (l.textContent = window.variantStrings?.preOrder))
            : ((s.textContent = window.variantStrings?.addToCart),
              l && (l.textContent = window.variantStrings?.addToCart))));
  },
  setUnavailable(e) {
    const t = e.querySelector(".bls__js-addtocart"),
      n = e.querySelector(".bls__js-addtocart .bls__button-content"),
      o = e.querySelector(".bls__js-addtocart .bls_tooltip-content");
    t &&
      ((n.textContent = window.variantStrings?.unavailable),
      (o.textContent = window.variantStrings?.unavailable));
  },
  swapProduct: function (e) {
    const t = e.querySelector(".bls__option-swatch-js.active"),
      n = t.getAttribute("data-position"),
      o = JSON.parse(e.querySelector(".productinfo").textContent),
      i = JSON.parse(e.querySelector(".productVariantsQty").textContent);
    let s = Array.from(
      e.querySelectorAll(".bls__option-swatch-js.active"),
      (e) => e.getAttribute("data-value")
    );
    o.find((e) => {
      1 == s.length &&
        { 1: e.option1, 2: e.option2, 3: e.option3 }[n] === s[0] &&
        (s = e.options);
    });
    const l = this.updateMasterId(s, o);
    this.toggleAddButton(!0, "", e),
      l
        ? (this.updatePrice(l, e),
          this.updateMedia(l, e),
          this.renderProductInfo(l, i, e, t.dataset.color))
        : (this.toggleAddButton(!0, "", e), this.setUnavailable(e));
  },
  checkSwatches: function (e) {
    const { color: t, image: n } = e?.dataset;
    this.checkColor(t)
      ? (e.style.backgroundColor = t)
      : n &&
        ((e.classList.add = "bls__" + t.replace(" ", "-")),
        (e.style.backgroundColor = null),
        (e.style.backgroundImage = "url('" + n + "')"),
        (e.style.backgroundSize = "cover"),
        (e.style.backgroundRepeat = "no-repeat"));
  },
  checkColor: function (e) {
    var t = new Option().style;
    return (t.color = e), t.color == e;
  },
};
BlsColorSwatchesShopify.init();
var BlsCountdownTimer = {
  init: function () {
    this.handleCountdown(), this.eventCountDownTimer();
  },
  eventCountDownTimer: function () {
    const e = document.querySelectorAll(".bls__countdown-timer");
    0 !== e.length &&
      e.forEach((e) => {
        const t = e.getAttribute("data-days"),
          n = e.getAttribute("data-hrs"),
          o = e.getAttribute("data-secs"),
          i = e.getAttribute("data-mins"),
          s = e.getAttribute("data-time");
        var l = new Date(s).getTime(),
          r = setInterval(function () {
            var s = new Date().getTime(),
              a = l - s,
              c = Math.floor(a / 864e5),
              d = Math.floor((a % 864e5) / 36e5),
              u = Math.floor((a % 36e5) / 6e4),
              m = Math.floor((a % 6e4) / 1e3),
              p =
                '<span class="countdown-days"><span class="countdown_ti heading-weight">' +
                c +
                '</span> <span class="countdown_tx">' +
                t +
                '</span></span> <span class="countdown-hours"><span class="countdown_ti heading-weight">' +
                d +
                '</span> <span class="countdown_tx">' +
                n +
                '</span></span> <span class="countdown-min"><span class="countdown_ti heading-weight">' +
                u +
                '</span> <span class="countdown_tx">' +
                i +
                '</span></span> <span class="countdown-sec"><span class="countdown_ti heading-weight">' +
                m +
                '</span> <span class="countdown_tx">' +
                o +
                "</span></span>";
            const h = e.querySelector(".bls__product-countdown");
            h && (h.innerHTML = p), a < 0 && clearInterval(r);
          }, 1e3);
      });
  },
  handleCountdown: function () {
    var e = 1e3,
      t = 6e4,
      n = 36e5,
      o = 24 * n;
    document.querySelectorAll(".bls__timer").forEach((i) => {
      const { timer: s } = i?.dataset,
        l = s.split("-"),
        r =
          l[2] +
          "-" +
          l[0].padStart(2, "0") +
          "-" +
          l[1].padStart(2, "0") +
          "T00:00:00Z";
      if (Date.parse(r)) {
        var a = new Date(r).getTime();
        a &&
          setInterval(function () {
            var s = new Date().getTime(),
              l = a - s;
            a >= s &&
              ((i.querySelector(".js-timer-days").innerText =
                Math.floor(l / o) < 10
                  ? ("0" + Math.floor(l / o)).slice(-2)
                  : Math.floor(l / o)),
              (i.querySelector(".js-timer-hours").innerText = (
                "0" + Math.floor((l % o) / n)
              ).slice(-2)),
              (i.querySelector(".js-timer-minutes").innerText = (
                "0" + Math.floor((l % n) / t)
              ).slice(-2)),
              (i.querySelector(".js-timer-seconds").innerText = (
                "0" + Math.floor((l % t) / e)
              ).slice(-2)));
          }, e);
      }
    });
  },
};
BlsCountdownTimer.init();
var BlsWishlistHeader = {
    init: function () {
      this.handleCount();
    },
    handleCount: function () {
      const e = document.querySelectorAll(".bls-header-wishlist"),
        t = JSON.parse(localStorage.getItem("bls__wishlist-items"));
      e.forEach((e) => {
        e.querySelector(".wishlist-count").innerText =
          null !== t && 0 != t.length ? t.length : 0;
      });
    },
  },
  BlsWishlistLoad = {
    init: function (e, t) {
      const n = document.querySelector(".bls__wishlist-page-section");
      if (e) {
        const o = [];
        if (null === t)
          o.push(e),
            localStorage.setItem("bls__wishlist-items", JSON.stringify(o));
        else {
          let i = t.indexOf(e);
          if ((o.push(...t), -1 === i))
            o.push(e),
              localStorage.setItem("bls__wishlist-items", JSON.stringify(o));
          else if (
            i > -1 &&
            (o.splice(i, 1),
            localStorage.setItem("bls__wishlist-items", JSON.stringify(o)),
            n)
          ) {
            const o = n.querySelector(".bls__wishlist-no-product-js"),
              i = document.querySelector(
                '.bls__wishlist-list[data-product-handle="' + e + '"]'
              );
            i && i.remove();
            const s = n.querySelectorAll(".bls__product-item");
            (t.length <= 1 || s.length < 1) && o.classList.remove("d-none");
          }
        }
        BlsSubActionProduct.handleInitWishlist();
      }
    },
  },
  BlsCompareLoad = {
    init: function (e, t) {
      const n = document.querySelector(".bls__compare-page-section");
      if (e) {
        const o = e.dataset.productHandle,
          i = [];
        if (null === t)
          i.push(o),
            localStorage.setItem("bls__compare-items", JSON.stringify(i));
        else {
          let e = t.indexOf(o);
          if ((i.push(...t), -1 === e))
            i.push(o),
              localStorage.setItem("bls__compare-items", JSON.stringify(i));
          else if (
            e > -1 &&
            (i.splice(e, 1),
            localStorage.setItem("bls__compare-items", JSON.stringify(i)),
            n)
          ) {
            const e = n.querySelector(".bls__compare-no-product-js"),
              i = document.querySelectorAll(
                '.bls__compare-value[data-product-handle="' + o + '"]'
              );
            0 !== i.length &&
              i.forEach((e) => {
                e.remove();
              });
            const s = n.querySelectorAll(".bls__product-item");
            if (t.length <= 1 || s.length < 1) {
              e.classList.remove("d-none");
              const t = document.querySelector(".bls__compare-table");
              t && t.classList.add("d-none");
            }
          }
        }
        BlsSubActionProduct.handleInitCompare();
      }
    },
  },
  BlsSubActionProduct = {
    init: function () {
      this.handleInitQuickviewAction(),
        this.handleActionWishlist(),
        this.handleInitWishlist(),
        this.handleActionCompare(),
        this.handleInitCompare();
    },
    handleInitQuickviewAction: function () {
      const e = this,
        t = document.querySelectorAll(".bls__product-quickview");
      t.length > 0 &&
        t.forEach((t) => {
          t.addEventListener("click", () => {
            if (
              (t.classList.add("btn-loading"),
              0 === t.querySelectorAll("span.loader-icon").length &&
                0 === t.querySelectorAll("div.loader-icon").length)
            ) {
              const e = document.createElement("div");
              e.classList.add("loader-icon"), t.appendChild(e);
            }
            const n = t.closest(".bls__product-item");
            e.handleFetchDataQuickView(t, n.dataset.productHandle);
          });
        });
    },
    handleFetchDataQuickView: function (e, t) {
      const n = this;
      t &&
        fetch(
          `${window.Shopify.routes.root}products/${t}/?section_id=product-quickview`
        )
          .then((e) => e.text())
          .then((e) => {
            parser
              .parseFromString(e, "text/html")
              .querySelectorAll("#shopify-section-product-quickview")
              .forEach((e) => {
                var t = EasyDialogBox.create(
                  "qvdialog",
                  "dlg dlg-disable-heading dlg-multi dlg-disable-footer dlg-disable-drag",
                  "",
                  e.innerHTML
                );
                (t.onClose = t.destroy),
                  t.show(),
                  BlsColorSwatchesShopify.init(),
                  BlsReloadSpr.init(),
                  Shopify.eventFlashSold("dlg"),
                  Shopify.eventCountDownTimer("dlg"),
                  Shopify.swiperSlideQickview(),
                  BlsLazyloadImg.init(),
                  Shopify.PaymentButton.init();
              });
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            n.handleActionWishlist(),
              n.handleInitWishlist(),
              n.handleActionCompare(),
              n.handleInitCompare(),
              n.showPopupStockNotify(),
              Shopify.termsConditionsAction(),
              e.classList.remove("btn-loading"),
              e.querySelectorAll(".loader-icon").forEach((e) => {
                e.remove();
              });
          });
    },
    handleInitWishlist: function () {
      const e = JSON.parse(localStorage.getItem("bls__wishlist-items"));
      document.querySelectorAll(".bls__product-wishlist").forEach((t) => {
        const {
            proAddWishlist: n,
            proRemoveWishlist: o,
            removeWishlist: i,
            action: s,
          } = t?.dataset,
          l = document.querySelector(".bls__wishlist-page-section"),
          r = t.querySelector(".bls_tooltip-content"),
          a = t.dataset.productHandle;
        null !== e &&
          (-1 !== e.indexOf(a)
            ? (t.querySelector(".bls__product-icon").classList.add("active"),
              (r.innerText = l
                ? window.stringsTemplate?.messageRemoveWishlist
                : "remove" === s
                ? i
                : o))
            : (t.querySelector(".bls__product-icon").classList.remove("active"),
              (r.innerText = n))),
          BlsWishlistHeader.init();
      });
    },
    handleActionWishlist: function () {
      const e = document.querySelectorAll(".bls__product-wishlist-js");
      e.length > 0 &&
        e.forEach((e) => {
          e.addEventListener("click", this.handleWishlistFunctionClick);
        });
    },
    handleWishlistFunctionClick: function (e) {
      e.preventDefault();
      const t = e.currentTarget,
        n = JSON.parse(localStorage.getItem("bls__wishlist-items")),
        o = t.dataset.productHandle,
        i = t.dataset.action,
        s = document.querySelector(".bls__wishlist-page-section");
      document.querySelector(".bls-minicart-wrapper"),
        s && BlsWishlistLoad.init(o, n);
      const l = [];
      if (null === n)
        l.push(o),
          localStorage.setItem("bls__wishlist-items", JSON.stringify(l)),
          BlsSubActionProduct.handleInitWishlist();
      else {
        let e = n.indexOf(o);
        l.push(...n),
          -1 === e
            ? (l.push(o),
              localStorage.setItem("bls__wishlist-items", JSON.stringify(l)),
              BlsSubActionProduct.handleInitWishlist())
            : e > -1 &&
              (s
                ? (l.splice(e, 1),
                  localStorage.setItem(
                    "bls__wishlist-items",
                    JSON.stringify(l)
                  ))
                : "remove" === i
                ? BlsWishlistLoad.init(o, n)
                : (window.location.href = `${window.shopUrl}${window.Shopify.routes.root}pages/wishlist`));
      }
    },
    handleCompareFunctionClick: function (e) {
      const t = e.currentTarget,
        n = JSON.parse(localStorage.getItem("bls__compare-items")),
        o = t.dataset.productHandle,
        i = [];
      if (null === n)
        i.push(o),
          localStorage.setItem("bls__compare-items", JSON.stringify(i)),
          BlsSubActionProduct.handleInitCompare();
      else {
        let e = n.indexOf(o);
        i.push(...n),
          -1 === e
            ? (i.push(o),
              localStorage.setItem("bls__compare-items", JSON.stringify(i)),
              BlsSubActionProduct.handleInitCompare())
            : e > -1 &&
              (window.location.href = `${window.shopUrl}${window.Shopify.routes.root}pages/compare`);
      }
    },
    handleInitCompare: function () {
      const e = JSON.parse(localStorage.getItem("bls__compare-items")),
        t = document.querySelectorAll(".bls__product-compare"),
        n = document.querySelector(".bls__compare-page-section");
      t.forEach((t) => {
        const { proAddCompare: o, proRemoveCompare: i } = t?.dataset,
          s = t.querySelector(".bls_tooltip-content"),
          l = t.dataset.productHandle;
        null !== e &&
          (-1 !== e.indexOf(l)
            ? (t.querySelector(".bls__product-icon").classList.add("active"),
              (s.innerText = n
                ? window.stringsTemplate?.messageRemoveCompare
                : i))
            : (t.querySelector(".bls__product-icon").classList.remove("active"),
              (s.innerText = o)));
      });
    },
    handleActionCompare: function () {
      const e = document.querySelectorAll(".bls__product-compare-js");
      e.length > 0 &&
        e.forEach((e) => {
          e.addEventListener("click", this.handleCompareFunctionClick);
        });
    },
    showPopupStockNotify: function () {
      const e = document.querySelectorAll(".product-notify-stock"),
        t = this;
      e.forEach((e) => {
        e.addEventListener("click", (e) => {
          const n = e.currentTarget.getAttribute("data-product-variant");
          e.preventDefault(), t.fetchDataStockNotifySection(n);
        });
      });
    },
    fetchDataStockNotifySection: function (e) {
      fetch("/variants/" + e + "/?section_id=stock-notify")
        .then((e) => e.text())
        .then((e) => {
          const t = newParser
              .parseFromString(e, "text/html")
              .querySelector("#bls-stock-notify"),
            n = t.getAttribute("data-stock-title");
          if (t) {
            var o = EasyDialogBox.create(
              "stockNotify",
              "dlg dlg-multi dlg-disable-footer dlg-disable-drag",
              n,
              t.innerHTML
            );
            o.center(), (o.onClose = o.destroy), o.show();
          }
        })
        .catch((e) => {
          throw e;
        });
    },
  };
BlsSubActionProduct.init();
var BlsSubActionProductPreLoad = {
    handleActionPg: function () {
      const e = document.querySelectorAll(".bls__compare-remove-js");
      e.length > 0 &&
        e.forEach((e) => {
          e.addEventListener("click", function () {
            const t = JSON.parse(localStorage.getItem("bls__compare-items")),
              n = e.closest(".bls__product-item");
            n && BlsCompareLoad.init(n, t);
          });
        });
    },
  },
  BlsReloadSpr = {
    init: function () {
      window.SPR &&
        (window.SPR.registerCallbacks(),
        window.SPR.initRatingHandler(),
        window.SPR.initDomEls(),
        window.SPR.loadProducts(),
        window.SPR.loadBadges());
    },
  },
  BlsMainMenuShopify = {
    init: function () {
      this.initMainMenu(), this.initVerticalMenu();
    },
    initMainMenu: function () {
      var e = this;
      const t = document.querySelector(global.header),
        n = t?.getAttribute("data-sticky"),
        o = t?.getAttribute("data-sticky-mobile"),
        i = document.querySelector(".verticalmenu-list"),
        s = document.querySelector(".bls_main_menu");
      if (
        (e.loadMoreMenu(),
        document.querySelectorAll(".nav-toggle").forEach((e) => {
          e.addEventListener("click", (e) => {
            document.documentElement.classList.contains("nav-open")
              ? (document.documentElement.classList.remove("nav-open"),
                s ||
                  document.documentElement.classList.remove("nav-verticalmenu"))
              : (document.documentElement.classList.add("nav-open"),
                s ||
                  document.documentElement.classList.add("nav-verticalmenu"));
          });
        }),
        document.querySelectorAll(".close-menu").forEach((e) => {
          e.addEventListener(
            "click",
            (e) => {
              e.preventDefault(),
                document.documentElement.classList.remove("nav-open"),
                document
                  .querySelectorAll(".submenu,.subchildmenu")
                  .forEach((e) => {
                    e.classList.remove("is--open"),
                      e.classList.contains("is--open-lv2") &&
                        e.classList.remove("is--open-lv2"),
                      e.classList.contains("is--open-lv3") &&
                        e.classList.remove("is--open-lv3");
                  });
            },
            !1
          );
        }),
        i && s)
      ) {
        const h =
            document.querySelector(".verticalmenu-html").dataset.limitshowitem,
          g =
            '<a data-menu="verticalmenu-list" href="#">' +
            window.menuStrings?.verticalTitle +
            "</a>",
          f = document.querySelector(".verticalmenu-list").innerHTML,
          v = document.createElement("ul");
        v.classList.add("verticalmenu-list"),
          v.classList.add("verticalmenu-mobile"),
          (v.style.display = "none"),
          v.setAttribute("data-limitshowitem", h),
          (v.innerHTML = f),
          document
            .querySelector(".bls_main_menu .mobile-menu-content")
            .appendChild(v),
          document
            .querySelector(".bls_main_menu .menu-mobile-title")
            .insertAdjacentHTML("beforeend", g);
      }
      document
        .querySelectorAll(".bls_main_menu .menu-mobile-title a")
        .forEach((e) => {
          e.addEventListener(
            "click",
            (e) => {
              e.preventDefault();
              const t = e.currentTarget,
                n = t.getAttribute("data-menu");
              for (var o of document.querySelectorAll(
                ".bls_main_menu .menu-mobile-title a"
              ))
                o.classList.remove("active");
              for (var i of (t.classList.add("active"),
              document.querySelectorAll(
                ".bls_main_menu .mobile-menu-content > ul"
              )))
                i.style.display = "none";
              document.querySelector(".bls_main_menu ." + n).style.display =
                "block";
            },
            !1
          );
        });
      let l = screen.width;
      document
        .querySelectorAll("li.bls__menu-parent .submenu")
        .forEach((e, t) => {
          l > 1024 &&
            (e.addEventListener("mouseenter", (e) => {
              e.currentTarget
                .closest(".bls__menu-parent")
                .classList.add("bls-item-active-submenu");
            }),
            e.addEventListener("mouseleave", (e) => {
              e.currentTarget
                .closest(".bls__menu-parent")
                .classList.remove("bls-item-active-submenu");
            }));
        }),
        document
          .querySelectorAll(".bls-menu-item.type_banner")
          .forEach((e, t) => {
            e.classList.contains("space-banner") &&
              e.closest(".submenu").classList.add("submenu-space-banner");
          });
      let r = window.innerWidth;
      function a(e) {
        e <= 1024 &&
          (document.querySelector(".show-localization")
            ? (document.querySelector(".lang-curentcy") &&
                document.querySelector(".lang-curentcy")?.remove(),
              document.querySelector(".topbar") &&
                document
                  .querySelectorAll(".topbar localization-form")
                  .forEach((e) => {
                    e && e.remove();
                  }))
            : document.querySelectorAll(".disclosure-mobile").forEach((e) => {
                e && e.remove();
              }));
      }
      function c(e) {
        const t = document.querySelector(".categories-list-menu-mobile"),
          n = document.querySelector('[data-menu="categories-list"]'),
          o = document.querySelector('[data-menu="verticalmenu-list"]'),
          i = document.querySelector(".verticalmenu-mobile"),
          s = document.querySelector(".horizontal-list");
        if (document.querySelectorAll("li.advanced-content > .sub").length)
          if (e <= 1024)
            for (var l of document.querySelectorAll(
              "li.advanced-content > .sub"
            ))
              l.classList.remove("active");
          else
            for (var l of document.querySelectorAll(
              "li.advanced-content > .sub"
            )) {
              l.classList.add("active");
              break;
            }
        e <= 1024
          ? (document.querySelector(".show-localization")
              ? (document.querySelector(".lang-curentcy") &&
                  document.querySelector(".lang-curentcy")?.remove(),
                document.querySelector(".topbar") &&
                  document
                    .querySelectorAll(".topbar localization-form")
                    .forEach((e) => {
                      e && e.remove();
                    }))
              : document.querySelectorAll(".disclosure-mobile").forEach((e) => {
                  e && e.remove();
                }),
            document.querySelector(".verticalmenu-mobile") &&
              (document.querySelector(".categories-list-menu-mobile")?.remove(),
              document
                .querySelector('[data-menu="categories-list"]')
                ?.remove()),
            ((s && n?.classList.contains("active")) ||
              o?.classList.contains("active")) &&
              (s.style.display = "none"),
            t && n.classList.contains("active") && (t.style.display = "block"),
            i && o.classList.contains("active") && (i.style.display = "block"))
          : (t && n.classList.contains("active") && (t.style.display = "none"),
            i && o.classList.contains("active") && (i.style.display = "none"),
            ((s && n?.classList.contains("active")) ||
              o?.classList.contains("active")) &&
              (s.style.display = "block"));
      }
      window.addEventListener("resize", function () {
        (r = window.innerWidth), c(r);
      }),
        window.addEventListener("load", function () {
          (r = screen.width), a(r);
        }),
        c(r),
        a(r),
        document.querySelectorAll("li.advanced-main a").forEach((e) => {
          e.addEventListener(
            "mouseenter",
            (e) => {
              const t = e.currentTarget,
                n = t.getAttribute("data-link");
              if (n) {
                for (var o of document.querySelectorAll(
                  "li.advanced-content > .sub"
                ))
                  o.classList.remove("active");
                for (var i of document.querySelectorAll("li.advanced-main a"))
                  i.classList.remove("active");
                t.classList.add("active"),
                  document.getElementById(n) &&
                    document.getElementById(n).classList.add("active");
              }
            },
            !1
          );
        });
      let d = 0;
      document.getElementById("announcement-bar") &&
        (d = document.getElementById("announcement-bar")?.clientHeight);
      let u = 0;
      document.getElementById("bls__sticky-addcart") &&
        (u = document.getElementById("bls__sticky-addcart")?.clientHeight);
      let m = 0;
      document.getElementById("shopify-section-top-bar") &&
        (m = document.getElementById("shopify-section-top-bar").clientHeight);
      let p = document.getElementById("page-header")?.clientHeight;
      if (
        (document
          .querySelector("body")
          .setAttribute(
            "style",
            "--height-bar: " +
              d +
              "px;--height-header: " +
              p +
              "px;--height-sticky: " +
              u +
              "px "
          ),
        "true" == n)
      ) {
        if ("false" == o && window.innerWidth < 1025) return;
        let b = document.getElementById("sticky-header").offsetHeight,
          y = document.createElement("div"),
          w = d + m + b;
        function _() {
          if (window.pageYOffset > w) {
            if (
              (t.classList.add("header_scroll_down"),
              t.classList.add("header_scroll_up"),
              t.querySelector(".headerSpace").classList.remove("unvisible"),
              document.querySelector(".extent-button-right-bar"))
            ) {
              document
                .querySelector(".extent-button-right-bar")
                .classList.add("d-xxl-block");
              let e = document.querySelector(".extent-button-right-bar");
              if (null === document.querySelector(".btn-fixed")) {
                let t =
                  '<div class="btn-fixed">\n                  <a class="demo content-fixed pointer" role="link" aria-label="Select Demos">\n                    <span class="icon-btn">\n                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2406 0.780116C10.7017 0.346314 11.3492 0.218262 12.0519 0.218262H15.3573C16.06 0.218262 16.7074 0.346314 17.1686 0.780116C17.6389 1.22258 17.7819 1.85492 17.7819 2.53644V8.10008C17.7819 8.7816 17.6389 9.41395 17.1686 9.85641C16.7074 10.2902 16.06 10.4183 15.3573 10.4183H12.0519C11.3492 10.4183 10.7017 10.2902 10.2406 9.85641C9.77031 9.41395 9.62732 8.7816 9.62732 8.10008V2.53644C9.62732 1.85492 9.77031 1.22258 10.2406 0.780116ZM11.0629 1.65413C10.9461 1.76395 10.8273 1.99069 10.8273 2.53644V8.10008C10.8273 8.64583 10.9461 8.87258 11.0629 8.98239C11.1888 9.10086 11.4537 9.21826 12.0519 9.21826H15.3573C15.9555 9.21826 16.2204 9.10086 16.3463 8.98239C16.463 8.87258 16.5819 8.64583 16.5819 8.10008V2.53644C16.5819 1.99069 16.463 1.76395 16.3463 1.65413C16.2204 1.53566 15.9555 1.41826 15.3573 1.41826H12.0519C11.4537 1.41826 11.1888 1.53566 11.0629 1.65413Z" fill="#212529"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2406 12.2345C10.7017 11.8007 11.3492 11.6726 12.0519 11.6726H15.3573C16.06 11.6726 16.7074 11.8007 17.1686 12.2345C17.6389 12.6769 17.7819 13.3093 17.7819 13.9908V15.4635C17.7819 16.145 17.6389 16.7774 17.1686 17.2198C16.7074 17.6536 16.06 17.7817 15.3573 17.7817H12.0519C11.3492 17.7817 10.7017 17.6536 10.2406 17.2198C9.77031 16.7774 9.62732 16.145 9.62732 15.4635V13.9908C9.62732 13.3093 9.77031 12.6769 10.2406 12.2345ZM11.0629 13.1085C10.9461 13.2183 10.8273 13.445 10.8273 13.9908V15.4635C10.8273 16.0093 10.9461 16.236 11.0629 16.3458C11.1888 16.4643 11.4537 16.5817 12.0519 16.5817H15.3573C15.9555 16.5817 16.2204 16.4643 16.3463 16.3458C16.463 16.236 16.5819 16.0093 16.5819 15.4635V13.9908C16.5819 13.445 16.463 13.2183 16.3463 13.1085C16.2204 12.99 15.9555 12.8726 15.3573 12.8726H12.0519C11.4537 12.8726 11.1888 12.99 11.0629 13.1085Z" fill="#212529"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.6537 9.01766C1.53697 9.12747 1.41814 9.35422 1.41814 9.89997V15.4636C1.41814 16.0094 1.53697 16.2361 1.6537 16.3459C1.77962 16.4644 2.04448 16.5818 2.64269 16.5818H5.94814C6.54634 16.5818 6.8112 16.4644 6.93713 16.3459C7.05385 16.2361 7.17269 16.0094 7.17269 15.4636V9.89997C7.17269 9.35422 7.05385 9.12747 6.93713 9.01766C6.8112 8.89919 6.54634 8.78179 5.94814 8.78179H2.64269C2.04448 8.78179 1.77962 8.89919 1.6537 9.01766ZM0.831448 8.14364C1.29256 7.70984 1.93998 7.58179 2.64269 7.58179H5.94814C6.65085 7.58179 7.29826 7.70984 7.75938 8.14364C8.2297 8.5861 8.37269 9.21845 8.37269 9.89997V15.4636C8.37269 16.1451 8.2297 16.7775 7.75938 17.2199C7.29826 17.6537 6.65085 17.7818 5.94814 17.7818H2.64269C1.93998 17.7818 1.29256 17.6537 0.831448 17.2199C0.361128 16.7775 0.21814 16.1451 0.21814 15.4636V9.89997C0.21814 9.21844 0.361128 8.5861 0.831448 8.14364Z" fill="#212529"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.6537 1.65413C1.53697 1.76395 1.41814 1.99069 1.41814 2.53644V4.00917C1.41814 4.55492 1.53697 4.78167 1.6537 4.89148C1.77962 5.00995 2.04448 5.12735 2.64269 5.12735H5.94814C6.54634 5.12735 6.8112 5.00995 6.93713 4.89148C7.05385 4.78167 7.17269 4.55492 7.17269 4.00917V2.53644C7.17269 1.99069 7.05385 1.76395 6.93713 1.65413C6.8112 1.53566 6.54634 1.41826 5.94814 1.41826H2.64269C2.04448 1.41826 1.77962 1.53566 1.6537 1.65413ZM0.831448 0.780116C1.29256 0.346314 1.93998 0.218262 2.64269 0.218262H5.94814C6.65085 0.218262 7.29826 0.346314 7.75938 0.780116C8.2297 1.22258 8.37269 1.85492 8.37269 2.53644V4.00917C8.37269 4.69069 8.2297 5.32304 7.75938 5.7655C7.29826 6.1993 6.65085 6.32735 5.94814 6.32735H2.64269C1.93998 6.32735 1.29256 6.1993 0.831448 5.7655C0.361128 5.32304 0.21814 4.69069 0.21814 4.00917V2.53644C0.21814 1.85492 0.361128 1.22258 0.831448 0.780116Z" fill="#212529"/>\n                      </svg>\n                    </span>\n                    <span class="box-desc tooltip-f"> Select Demos </span>\n                  </a>\n                  <a\n                    href="https://blueskytechmage.com/shopify/uminio-theme/#features"\n                    aria-label="Features"\n                    class="content-fixed"\n                    target="_blank"\n                  >\n                    <span class="icon-btn">\n                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        <rect width="18" height="18" fill="none"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.54404 1.54059C2.65827 0.42709 4.3263 0 6.48283 0H11.5172C13.6737 0 15.3417 0.42709 16.456 1.54059C17.5716 2.65555 18 4.32629 18 6.48447V11.5155C18 13.6737 17.5716 15.3445 16.456 16.4594C15.3417 17.5729 13.6737 18 11.5172 18H6.48283C4.3263 18 2.65827 17.5729 1.54404 16.4594C0.428359 15.3445 0 13.6737 0 11.5155V6.48447C0 4.32629 0.428359 2.65555 1.54404 1.54059ZM2.40174 2.41437C1.62954 3.18607 1.21884 4.45011 1.21884 6.48447V11.5155C1.21884 13.5499 1.62954 14.8139 2.40174 15.5856C3.17539 16.3588 4.44406 16.7702 6.48283 16.7702H11.5172C13.5559 16.7702 14.8246 16.3588 15.5983 15.5856C16.3705 14.8139 16.7812 13.5499 16.7812 11.5155V6.48447C16.7812 4.45011 16.3705 3.18607 15.5983 2.41437C14.8246 1.64123 13.5559 1.22981 11.5172 1.22981H6.48283C4.44406 1.22981 3.17539 1.64123 2.40174 2.41437Z" fill="#212529"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.93317 4.37377C9.63723 3.61699 10.953 4.08433 10.953 5.1047V7.84039H11.8419C12.8317 7.84039 13.3686 8.95684 12.7098 9.67166C12.7097 9.67173 12.7099 9.6716 12.7098 9.67166L9.06683 13.6262C8.36277 14.383 7.047 13.9157 7.047 12.8953V10.1596H6.15811C5.16826 10.1596 4.63139 9.04315 5.2902 8.32833C5.29026 8.32827 5.29014 8.3284 5.2902 8.32833L8.93317 4.37377ZM9.75641 5.21051L6.25047 9.01633H7.6453C7.97572 9.01633 8.24359 9.27226 8.24359 9.58797V12.7895L11.7495 8.98367H10.3547C10.0243 8.98367 9.75641 8.72773 9.75641 8.41203V5.21051Z" fill="#212529"/>\n                      </svg>\n                    </span>\n                    <span class="box-desc tooltip-f"> Features </span>\n                  </a>\n                  <a\n                    href="https://themeforest.net/item/umino-multipurpose-shopify-themes-os-20/42969030"\n                    aria-label="Buy Now"\n                    target="_blank"\n                    class="content-fixed show-mobile"\n                  >\n                    <span class="icon-btn">\n                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.26846 10.156C6.59983 10.156 6.86846 10.4246 6.86846 10.756C6.86846 11.9231 7.83292 12.8875 9 12.8875C10.1671 12.8875 11.1315 11.9231 11.1315 10.756C11.1315 10.4246 11.4002 10.156 11.7315 10.156C12.0629 10.156 12.3315 10.4246 12.3315 10.756C12.3315 12.5858 10.8298 14.0875 9 14.0875C7.17018 14.0875 5.66846 12.5858 5.66846 10.756C5.66846 10.4246 5.93709 10.156 6.26846 10.156Z" fill="#111111"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.93408 0.770732C7.16872 1.00472 7.16924 1.38462 6.93525 1.61926L4.11005 4.45226C3.87606 4.6869 3.49616 4.68742 3.26153 4.45343C3.02689 4.21944 3.02637 3.83954 3.26036 3.6049L6.08555 0.771903C6.31954 0.537265 6.69944 0.536741 6.93408 0.770732Z" fill="#111111"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.066 0.770732C11.3006 0.536741 11.6805 0.537265 11.9145 0.771903L14.7397 3.6049C14.9737 3.83954 14.9732 4.21944 14.7385 4.45343C14.5039 4.68742 14.124 4.6869 13.89 4.45226L11.0648 1.61926C10.8308 1.38462 10.8313 1.00472 11.066 0.770732Z" fill="#111111"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.03579 4.93786C1.9586 4.98956 1.79558 5.1378 1.79558 5.76122C1.79558 6.53405 1.97485 6.63591 2.00045 6.65046C2.00083 6.65067 2.00118 6.65087 2.00149 6.65105C2.04429 6.67571 2.1264 6.7033 2.29644 6.71579C2.42615 6.72532 2.55965 6.72432 2.72619 6.72307C2.7884 6.72261 2.85521 6.72211 2.92816 6.72211H15.0718C15.1448 6.72211 15.2116 6.72261 15.2738 6.72307C15.4403 6.72432 15.5738 6.72532 15.7035 6.71579C15.8736 6.7033 15.9557 6.67571 15.9985 6.65105L15.9995 6.65046C16.0251 6.63591 16.2044 6.53405 16.2044 5.76122C16.2044 5.1378 16.0414 4.98956 15.9642 4.93786C15.8225 4.84293 15.5702 4.80034 15.0718 4.80034H2.92816C2.42976 4.80034 2.17753 4.84293 2.03579 4.93786ZM1.368 3.94084C1.85256 3.61629 2.46661 3.60034 2.92816 3.60034H15.0718C15.5334 3.60034 16.1474 3.61629 16.632 3.94084C17.1811 4.30863 17.4044 4.94083 17.4044 5.76122C17.4044 6.65485 17.2027 7.34205 16.5977 7.69074C16.3273 7.84655 16.0363 7.89458 15.7915 7.91257C15.6088 7.92599 15.4055 7.92438 15.2249 7.92294C15.1715 7.92251 15.1201 7.92211 15.0718 7.92211H2.92816C2.87987 7.92211 2.82847 7.92251 2.7751 7.92294C2.59449 7.92438 2.3912 7.92599 2.2085 7.91257C1.96368 7.89458 1.67265 7.84655 1.40229 7.69074C0.797263 7.34205 0.595581 6.65485 0.595581 5.76122C0.595581 4.94083 0.818881 4.30863 1.368 3.94084Z" fill="#111111"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.7467 6.84984C16.0721 6.91225 16.2854 7.22667 16.223 7.55211L14.9118 14.3886C14.9118 14.3887 14.9119 14.3885 14.9118 14.3886C14.7739 15.1091 14.593 15.9124 14.0279 16.5045C13.437 17.1236 12.5442 17.4044 11.2554 17.4044H6.54937C5.33588 17.4044 4.44854 17.1012 3.83769 16.4826C3.24376 15.8811 3.00535 15.0723 2.87463 14.2798L1.77404 7.53574C1.72067 7.20869 1.94252 6.90031 2.26957 6.84693C2.59661 6.79356 2.905 7.01542 2.95837 7.34246L4.05863 14.0845C4.0586 14.0843 4.05865 14.0846 4.05863 14.0845C4.17764 14.8057 4.36465 15.3084 4.69156 15.6394C5.00163 15.9535 5.5308 16.2044 6.54937 16.2044H11.2554C12.3938 16.2044 12.8941 15.9545 13.1598 15.676C13.4511 15.3707 13.5903 14.9096 13.7333 14.1629L15.0444 7.32609C15.1068 7.00065 15.4213 6.78743 15.7467 6.84984Z" fill="#111111"/>\n                      </svg>\n                    </span>\n                    <span class="box-desc tooltip-f"> Buy Now </span>\n                  </a>\n                  <a\n                    href="https://shopify.pxf.io/c/3722068/1061744/13624"\n                    aria-label="Open Store"\n                    target="_blank"\n                    class="content-fixed"\n                  >\n                    <span class="icon-btn">\n                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.72023 7.79663C2.03319 7.79663 2.2869 8.05183 2.2869 8.36663V12.0126C2.2869 13.7784 2.64417 14.8673 3.30633 15.5295C3.96931 16.1925 5.06039 16.5503 6.8279 16.5503H11.2047C12.9723 16.5503 14.0633 16.1925 14.7263 15.5295C15.3885 14.8673 15.7457 13.7784 15.7457 12.0126V8.36663C15.7457 8.05183 15.9994 7.79663 16.3124 7.79663C16.6254 7.79663 16.8791 8.05183 16.8791 8.36663V12.0126C16.8791 13.8929 16.5055 15.3578 15.5253 16.338C14.546 17.3173 13.0832 17.6903 11.2047 17.6903H6.8279C4.9494 17.6903 3.48665 17.3173 2.50729 16.338C1.52712 15.3578 1.15356 13.8929 1.15356 12.0126V8.36663C1.15356 8.05183 1.40727 7.79663 1.72023 7.79663Z" fill="#111111"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.56445 0.822476C6.59366 0.531308 6.83732 0.309692 7.12826 0.309692H10.9204C11.2117 0.309692 11.4555 0.531786 11.4843 0.823321L12.0203 6.24768C12.1996 8.07135 10.839 9.56999 9.02029 9.56999C7.20157 9.56999 5.84091 8.0716 6.02028 6.24793L6.56445 0.822476ZM7.64063 1.44969L7.14811 6.36017C7.14809 6.36035 7.14813 6.36 7.14811 6.36017C7.03547 7.50828 7.86716 8.42999 9.02029 8.42999C10.1736 8.42999 11.0054 7.50853 10.8925 6.36017L10.4073 1.44969H7.64063Z" fill="#111111"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.4677 0.497312C10.5751 0.377852 10.7278 0.309692 10.888 0.309692H13.3646C14.4858 0.309692 15.3931 0.52107 16.0521 1.12978C16.7043 1.73223 17.0057 2.6263 17.1578 3.72437C17.1587 3.73121 17.1595 3.73806 17.1602 3.74493L17.3877 5.97932C17.5838 7.94953 16.1173 9.56999 14.1442 9.56999C12.5168 9.56999 11.061 8.26389 10.8927 6.63078L10.8925 6.62899L10.3241 0.936659C10.3081 0.77638 10.3603 0.616773 10.4677 0.497312ZM11.5144 1.44969L12.02 6.51326C12.02 6.51298 12.0201 6.51355 12.02 6.51326C12.1283 7.55948 13.0922 8.42999 14.1442 8.42999C15.4515 8.42999 16.3885 7.38735 16.2601 6.09352C16.2601 6.0933 16.2601 6.09375 16.2601 6.09352L16.0339 3.87154C15.8933 2.86465 15.6431 2.29974 15.2855 1.96945C14.9335 1.64433 14.371 1.44969 13.3646 1.44969H11.5144Z" fill="#111111"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.93987 1.12978C2.59887 0.52107 3.50613 0.309692 4.62729 0.309692H7.10398C7.26414 0.309692 7.41681 0.377863 7.52425 0.497342C7.63168 0.616821 7.68383 0.776449 7.6678 0.93674L7.09955 6.62736C7.09952 6.6276 7.09957 6.62711 7.09955 6.62736C6.94048 8.26363 5.48231 9.56999 3.85586 9.56999C1.88289 9.56999 0.41646 7.94975 0.61227 5.9797C0.612257 5.97983 0.612283 5.97958 0.61227 5.9797L0.831483 3.74698C0.832225 3.73943 0.833116 3.73189 0.834157 3.72437C0.986197 2.6263 1.28765 1.73223 1.93987 1.12978ZM1.9582 3.87052L1.74008 6.0921C1.61131 7.38625 2.54836 8.42999 3.85586 8.42999C4.90886 8.42999 5.87042 7.55977 5.97157 6.51669L5.97171 6.51523L6.47745 1.44969H4.62729C3.62092 1.44969 3.05841 1.64433 2.70643 1.96945C2.34898 2.29963 2.09878 2.86427 1.9582 3.87052Z" fill="#111111"/>\n                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.09724 13.1624C7.57954 12.6801 8.25662 12.4901 9.02033 12.4901C9.78403 12.4901 10.4611 12.6801 10.9434 13.1624C11.4263 13.6453 11.6171 14.3243 11.6171 15.0902V17.1203C11.6171 17.4351 11.3634 17.6903 11.0504 17.6903H6.99025C6.67729 17.6903 6.42358 17.4351 6.42358 17.1203V15.0902C6.42358 14.3243 6.61432 13.6453 7.09724 13.1624ZM7.89627 13.9708C7.70317 14.1639 7.55692 14.5 7.55692 15.0902V16.5503H10.4837V15.0902C10.4837 14.5 10.3375 14.1639 10.1444 13.9708C9.95067 13.7771 9.61271 13.6301 9.02033 13.6301C8.42794 13.6301 8.08999 13.7771 7.89627 13.9708Z" fill="#111111"/>\n                      </svg>\n                    </span>\n                    <span class="box-desc tooltip-f"> Open Store </span>\n                  </a>\n                </div>';
                e.insertAdjacentHTML("beforeend", t), e.init();
              }
            }
          } else
            t.classList.remove("header_scroll_down"),
              t.querySelector(".headerSpace").classList.add("unvisible"),
              document.querySelector(".extent-button-right-bar") &&
                document
                  .querySelector(".extent-button-right-bar")
                  .classList.remove("d-xxl-block"),
              document.querySelector(".bls__overlay") &&
                (document.documentElement.classList.remove("vetical-overlay"),
                document
                  .querySelector(".bls__overlay")
                  .classList.add("d-none-overlay")),
              document.querySelector(".vertical-menu") &&
                document
                  .querySelector(".vertical-menu")
                  .classList.contains("open") &&
                document
                  .querySelector(".vertical-menu")
                  .classList.remove("open");
        }
        (y.style.height = b + "px"),
          y.classList.add("headerSpace", "unvisible"),
          document.querySelector("#sticky-header").after(y),
          window.addEventListener("scroll", () => {
            window.pageYOffset <= t.querySelector(".header-middle").offsetTop
              ? t.classList.contains("transparent") &&
                t.classList.add("transparent")
              : t.classList.contains("transparent") &&
                t.classList.remove("transparent");
          }),
          window.addEventListener("scroll", () => {
            _();
          });
      }
      if (s) {
        e.loadImageMenu();
        let S = window.innerWidth;
        S > 1024 && e.addCssSubMenu(),
          window.addEventListener(
            "resize",
            function (t) {
              S > 1024 && e.addCssSubMenu();
            },
            !0
          );
      }
    },
    initVerticalMenu: function () {
      document.querySelectorAll(".close-menu").forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault(),
              document.documentElement.classList.remove("nav-open"),
              document
                .querySelectorAll(".submenu,.subchildmenu")
                .forEach((e) => {
                  e.classList.remove("is--open"),
                    e.classList.contains("is--open-lv2") &&
                      e.classList.remove("is--open-lv2"),
                    e.classList.contains("is--open-lv3") &&
                      e.classList.remove("is--open-lv3");
                });
          },
          !1
        );
      });
      let e = screen.width;
      const t = document.querySelector(".verticalmenu-html");
      if (null === t) return;
      const n = t.dataset.limitshowitem,
        o = document.querySelectorAll(".verticalmenu-html .level0").length;
      if (e > 1024)
        if (o > n) {
          var i = Array.from(
            document.querySelectorAll(".verticalmenu-html .level0")
          );
          i.forEach((e, t) => {
            if (t > n - 1) {
              const e = i[t];
              if (e.classList.contains("expand-menu-link")) return;
              e.classList.add("orther-link"), (e.style.display = "none");
            }
          }),
            (document.querySelector(
              ".verticalmenu-html .expand-menu-link"
            ).style.display = "block"),
            document
              .querySelector(".verticalmenu-html .expand-menu-link a")
              .addEventListener(
                "click",
                (e) => {
                  e.preventDefault();
                  const t = e.currentTarget.parentElement;
                  if (t.classList.contains("expanding"))
                    for (var n of (t.classList.remove("expanding"),
                    (t.querySelector("a").innerHTML =
                      window.menuStrings?.moreMenus),
                    document.querySelectorAll(
                      ".verticalmenu-html .level0.orther-link"
                    )))
                      hideAnime(n);
                  else
                    for (var n of (t.classList.add("expanding"),
                    (t.querySelector("a").innerHTML =
                      window.menuStrings?.hideMenus),
                    document.querySelectorAll(
                      ".verticalmenu-html .level0.orther-link"
                    )))
                      showAnime(n);
                },
                !1
              );
        } else
          document.querySelector(".expand-menu-link").style.display = "none";
      document.querySelector(".bls_vertical_menu .title-menu-dropdown") &&
        document
          .querySelector(".bls_vertical_menu .title-menu-dropdown")
          .addEventListener("click", (e) => {
            e.preventDefault();
            const t = e.currentTarget.closest(".vertical-menu");
            t.classList.contains("open")
              ? (t.classList.remove("open"),
                document.querySelector(".bls__overlay") &&
                  (document.documentElement.classList.remove("vetical-overlay"),
                  document
                    .querySelector(".bls__overlay")
                    .classList.add("d-none-overlay")))
              : (t.classList.add("open"),
                document.querySelector(".bls__overlay") &&
                  (document.documentElement.classList.add("vetical-overlay"),
                  document
                    .querySelector(".bls__overlay")
                    .classList.remove("d-none-overlay")));
          });
    },
    onMenuItemEnter: function (e, t) {
      e.classList.add("bls-item-active");
    },
    onMenuItemLeave: function (e, t) {
      e.classList.remove("bls-item-active");
    },
    onMenuMobileItem: function (e) {
      var t = "li.bls__menu-parent > .open-children-toggle",
        n = "li.bls__menu-parent .submenu .open-children-toggle";
      e &&
        ((t = ".verticalmenu-list li.bls__menu-parent > .open-children-toggle"),
        (n =
          ".verticalmenu-list li.bls__menu-parent .submenu .open-children-toggle")),
        document.querySelectorAll(t).forEach((e) => {
          e.addEventListener(
            "click",
            (e) => {
              e.preventDefault();
              const t = e.currentTarget.parentElement,
                n = t.querySelector(".submenu");
              slideAnime({ target: n, animeType: "slideToggle" }),
                t.querySelector("a").classList.contains("active")
                  ? t.querySelector("a").classList.remove("active")
                  : t.querySelector("a").classList.add("active");
            },
            !1
          );
        }),
        document.querySelectorAll(n).forEach((e) => {
          e.addEventListener("click", (e) => {
            const t = e.currentTarget.parentElement,
              n = t.querySelector(".subchildmenu");
            slideAnime({ target: n, animeType: "slideToggle" }),
              t.querySelector("a").classList.contains("active")
                ? t.querySelector("a").classList.remove("active")
                : t.querySelector("a").classList.add("active");
          });
        });
    },
    addCssSubMenu: function () {
      const e =
          document.documentElement.clientWidth || document.body.clientWidth,
        t = document.querySelector("header"),
        n = document.querySelector(".bls_submenu-center"),
        o = document
          .querySelector("[data-width-sub-center]")
          ?.getAttribute("data-width-sub-center");
      if (t && !(e < 1024)) {
        var i = 30;
        e < 1200 && (i = 15),
          document
            .querySelectorAll(".horizontal-list .menu-width-custom > .submenu")
            .forEach((t) => {
              if (n) {
                var s = t.getBoundingClientRect(),
                  l = s.width,
                  r = s.left,
                  a = s.right;
                if (o <= l) {
                  var c = (r - (a - e)) / 2;
                  t.style.left = c + "px";
                }
              } else {
                const n = t.clientWidth,
                  o = t.offsetLeft;
                e - (n + o) < 0 &&
                  ((r = (r = e - (n + o)) + o - i),
                  o < 0 && (r = 0),
                  (t.style.left = r + "px"));
              }
            });
      }
    },
    loadImageMenu: function () {
      const e = document.querySelectorAll(".bls__menu-parent");
      window.innerWidth,
        e.forEach((e) => {
          e.addEventListener("mouseover", (e) => {
            e.currentTarget
              .querySelectorAll(".menu-banner-loaded")
              .forEach((e) => {
                var t = e?.dataset.imageBanner,
                  n = e?.dataset.width,
                  o = e?.dataset.height;
                null == e.querySelector(".image-banner-loaded") &&
                  null != t &&
                  (e.innerHTML = `<img \n              src=${t} \n              alt="Menu banner" \n              srcset="${t}&amp;width=375 375w, ${t}&amp;width=550 550w, ${t}&amp;width=750 750w, ${t}&amp;width=1100 1100w, ${t}&amp;width=1500 1500w, ${t}&amp;width=1780 1780w, ${t}&amp;width=2000 2000w, ${t}&amp;width=3000 3000w, ${t}&amp;width=3840 3840w" \n              sizes="100vw",\n              class="image-banner-loaded"\n              loading="lazy"\n              width="${n}"\n              height="${o}"\n            >`);
              });
          });
        });
    },
    loadMoreMenu: function () {
      let e = document.querySelector(".horizontal-list")?.firstChild,
        t = e?.querySelector(".submenu"),
        n = t?.querySelector(".extent-loadmore-button");
      if (null == document.querySelector(".loadmore-menu")) {
        let e =
          '<div class="loadmore-menu text-center">\n          <a  class="demo whitespace-nowrap btn-primary" role="link" aria-label="View All Demos">\n            View All Demos\n          </a>\n        </div>';
        n?.insertAdjacentHTML("beforeend", e), n?.init();
      }
    },
  };
BlsMainMenuShopify.init();
var BlsMenuActionMobile = {
  init: function () {
    this.menuTabActions();
  },
  menuTabActions: function () {
    var e = ".subchildmenu";
    window.innerWidth <= 1024 &&
      document.querySelectorAll("li.bls__menu-parent > a").forEach((e) => {
        const t = e.closest(".main-nav")?.getAttribute("data-action-mobile");
        "false" === t &&
          (e.removeAttribute("href"),
          e.classList.add("not-links"),
          e.setAttribute("role", "link"));
      }),
      document
        .querySelectorAll("li.bls__menu-parent > .open-children-toggle")
        .forEach((e) => {
          e.addEventListener("click", (e) => {
            const t = e.currentTarget.parentElement;
            var n = t.querySelectorAll(".submenu [data-menu-level2]");
            if (n) {
              var o = n[n.length - 1];
              o && o.classList.add("last-child");
            }
            t.querySelector(".submenu") &&
              (t.querySelector(".submenu").classList.contains("is--open")
                ? t.querySelector(".submenu").classList.remove("is--open")
                : t.querySelector(".submenu").classList.add("is--open"));
          });
        }),
      document.querySelectorAll(".back-main-menu").forEach((e) => {
        e.addEventListener("click", (e) => {
          const t = e.currentTarget;
          e.preventDefault(),
            t.closest(".submenu").classList.remove("is--open");
        });
      }),
      document.querySelectorAll("[data-menu-level2]").forEach((e) => {
        e.addEventListener("click", (e) => {
          const t = e.currentTarget.parentElement;
          t.querySelector(".subchildmenu")?.classList.contains("is--open")
            ? t.querySelector(".subchildmenu").classList.remove("is--open")
            : t.querySelector(".subchildmenu").classList.add("is--open");
        });
      }),
      document.querySelectorAll(".back-main-menu-lv1").forEach((t) => {
        t.addEventListener("click", (t) => {
          for (var n of (t.preventDefault(), document.querySelectorAll(e)))
            n.classList.remove("is--open");
        });
      }),
      document.querySelectorAll(".back-main-menu-lv2").forEach((t) => {
        t.addEventListener("click", (t) => {
          t.preventDefault(),
            t.currentTarget.closest(e).classList.remove("is--open-lv2");
        });
      }),
      document.querySelectorAll(".back-main-menu-lv3").forEach((t) => {
        t.addEventListener("click", (t) => {
          t.preventDefault(),
            t.currentTarget.closest(e).classList.remove("is--open-lv3");
        });
      }),
      document
        .querySelectorAll(
          ".submenu .dropdown li.level-1 > .open-children-toggle"
        )
        .forEach((e) => {
          e.addEventListener("click", (e) => {
            const t = e.currentTarget.parentElement;
            t
              .querySelector("li .subchildmenu")
              ?.classList.contains("is--open-lv2")
              ? t
                  .querySelector("li .subchildmenu")
                  .classList.remove("is--open-lv2")
              : t
                  .querySelector("li .subchildmenu")
                  .classList.add("is--open-lv2");
          });
        }),
      document
        .querySelectorAll(
          ".submenu .dropdown li.level-2 > .open-children-toggle"
        )
        .forEach((e) => {
          e.addEventListener("click", (e) => {
            const t = e.currentTarget.parentElement;
            t
              .querySelector("li .subchildmenu")
              ?.classList.contains("is--open-lv3")
              ? t
                  .querySelector("li .subchildmenu")
                  .classList.remove("is--open-lv3")
              : t
                  .querySelector("li .subchildmenu")
                  .classList.add("is--open-lv3");
          });
        });
  },
};
BlsMenuActionMobile.init();
var BlsSearchShopify = {
  init: function () {
    document.querySelector("#predictive-search") && this.setupEventListeners();
    const e = document.querySelector("#search-form");
    document.querySelectorAll(".top-search-toggle").forEach((t) => {
      t.addEventListener("click", () => {
        e.classList.contains("bls__opend-popup-header")
          ? (e.classList.remove("bls__opend-popup-header"),
            document.documentElement.classList.remove("hside_opened"),
            document.documentElement.classList.remove("open-search"))
          : (e.classList.add("bls__opend-popup-header"),
            document.documentElement.classList.add("hside_opened"),
            document.documentElement.classList.add("open-search"),
            setTimeout(function () {
              e.querySelector('input[type="search"]').focus();
            }, 100));
      });
    }),
      document
        .querySelectorAll(".mini_search_header .button-close")
        .forEach((t) => {
          t.addEventListener("click", () => {
            e.classList.remove("bls__opend-popup-header"),
              document.documentElement.classList.remove("hside_opened"),
              document.documentElement.classList.remove("open-search");
          });
        });
    const t = document.querySelector(".search-full");
    if (t) {
      const e = t.closest(".header_search");
      document.addEventListener("click", (t) => {
        const n = t.target.closest(".header_search");
        if (n) {
          const e = n.querySelector(".popup-search");
          e.classList.add("popup-search-show"),
            t.target &&
              t.target.classList.contains("popup-search-show") &&
              e.classList.remove("popup-search-show");
        } else
          e &&
            e
              .querySelector(".popup-search")
              .classList.remove("popup-search-show");
      });
    }
  },
  setupEventListeners: function () {
    const e = document.querySelector('input[type="search"]');
    document
      .querySelector("form.search")
      .addEventListener("submit", this.onFormSubmit.bind(this)),
      e.addEventListener(
        "input",
        this.debounce((e) => {
          this.onChange(e);
        }, 300).bind(this)
      ),
      e.addEventListener("focus", this.onFocus.bind(this)),
      document.addEventListener("focusout", this.onFocusOut.bind(this)),
      document.addEventListener("keyup", this.onKeyup.bind(this)),
      document
        .querySelectorAll('.select_cat [data-name="product_type"] li')
        .forEach((e) => {
          e.addEventListener("click", (e) => {
            const t = e.currentTarget;
            if (!t.classList.contains("active")) {
              for (var n of document.querySelectorAll(
                '.select_cat [data-name="product_type"] li'
              ))
                n.classList.remove("active");
              t.classList.add("active"),
                (document
                  .querySelector("#search_mini_form")
                  .querySelector('[name="category"]').value =
                  t.getAttribute("data-value")),
                this.onChange();
            }
          });
        });
  },
  debounce: function (e, t) {
    let n;
    return (...o) => {
      clearTimeout(n), (n = setTimeout(() => e.apply(this, o), t));
    };
  },
  getQuery: function () {
    return document.querySelector('input[type="search"]').value.trim();
  },
  onChange: function () {
    const e = this.getQuery();
    e.length ? this.getSearchResults(e) : this.close(!0);
  },
  onFormSubmit: function (e) {
    (this.getQuery().length &&
      !this.querySelector('[aria-selected="true"] a')) ||
      e.preventDefault();
  },
  onFocus: function () {
    const e = this.getQuery();
    e.length &&
      (document
        .querySelector("#predictive-search")
        .classList.contains("results")
        ? this.open()
        : this.getSearchResults(e));
  },
  onFocusOut: function () {
    setTimeout(() => {
      document.contains(document.activeElement) || this.close();
    });
  },
  onKeyup: function (e) {
    switch (
      (this.getQuery().length || this.close(!0), e.preventDefault(), e.code)
    ) {
      case "ArrowUp":
        this.switchOption("up");
        break;
      case "ArrowDown":
        this.switchOption("down");
        break;
      case "Enter":
        this.selectOption();
    }
  },
  switchOption: function (e) {
    if (!this.getAttribute("open")) return;
    const t = "up" === e,
      n = document.querySelector('[aria-selected="true"]'),
      o = document.querySelectorAll("li");
    let i = document.querySelector("li");
    (t && !n) ||
      ((this.statusElement.textContent = ""),
      !t && n
        ? (i = n.nextElementSibling || o[0])
        : t && (i = n.previousElementSibling || o[o.length - 1]),
      i !== n &&
        (i.setAttribute("aria-selected", !0),
        n && n.setAttribute("aria-selected", !1),
        document
          .querySelector('input[type="search"]')
          .setAttribute("aria-activedescendant", i.id)));
  },
  selectOption: function () {
    const e = document.querySelector(
      '[aria-selected="true"] a, [aria-selected="true"] button'
    );
    e && e.click();
  },
  getSearchResults: function (e) {
    const t = {},
      n = e.replace(" ", "-").toLowerCase();
    if ((this.setLiveRegionLoadingState(), t[n]))
      this.renderSearchResults(t[n]);
    else {
      if (document.querySelector(".search_type_popup"))
        var o = "search-predictive-grid";
      else o = "search-predictive-list";
      if (document.querySelector(".predictive_search_suggest"))
        var i = `${routes?.predictive_search_url}?q=${encodeURIComponent(
          e
        )}&resources[options][fields]=title,tag,vendor,product_type,variants.title,variants.sku&resources[options][prefix]=last&resources[options][unavailable_products]=last&resources[type]=query,product,collection&resources[limit]=6&section_id=${o}`;
      else
        i = `${routes.search_url}?q=${encodeURIComponent(
          e
        )}&options[prefix]=last&options[unavailable_products]=last&type=query,product,collection&limit=6&section_id=${o}`;
      fetch(`${i}`)
        .then((e) => {
          if (!e.ok) {
            var t = new Error(e.status);
            throw (this.close(), t);
          }
          return e.text();
        })
        .then((e) => {
          const i = new DOMParser()
            .parseFromString(e, "text/html")
            .querySelector("#shopify-section-" + o).innerHTML;
          (t[n] = i),
            this.renderSearchResults(i),
            BlsColorSwatchesShopify.init(),
            BlsLazyloadImg.init();
        })
        .catch((e) => {
          throw (this.close(), e);
        });
    }
  },
  setLiveRegionLoadingState: function () {
    document.querySelector("#search_mini_form").classList.add("loading"),
      document.querySelector("#predictive-search").classList.add("loading");
  },
  setLiveRegionResults: function () {
    document.querySelector("#search_mini_form").classList.remove("loading"),
      document.querySelector("#predictive-search").classList.remove("loading");
  },
  renderSearchResults: function (e) {
    (document.querySelector("[data-predictive-search]").innerHTML = e),
      document.querySelector("#predictive-search").classList.add("results");
    const t = document.querySelector("#quick-search");
    t && t.classList.add("d-none"), this.setLiveRegionResults(), this.open();
  },
  open: function () {
    document
      .querySelector('input[type="search"]')
      .setAttribute("aria-expanded", !0),
      (this.isOpen = !0);
  },
  close: function (e = !1) {
    if (e) {
      (document.querySelector('input[type="search"]').value = ""),
        document
          .querySelector("#predictive-search")
          .classList.remove("results");
      const e = document.querySelector("#quick-search");
      e && e.classList.remove("d-none");
    }
    const t = document.querySelector('[aria-selected="true"]');
    t && t.setAttribute("aria-selected", !1),
      document
        .querySelector('input[type="search"]')
        .setAttribute("aria-activedescendant", ""),
      document
        .querySelector('input[type="search"]')
        .setAttribute("aria-expanded", !1),
      (this.resultsMaxHeight = !1),
      document
        .querySelector("[data-predictive-search]")
        .removeAttribute("style"),
      (this.isOpen = !1);
  },
};
BlsSearchShopify.init();
class InstagramShop extends HTMLElement {
  constructor() {
    super(),
      this.querySelectorAll("img").forEach((e) =>
        e.addEventListener("click", this.onButtonClick.bind(this))
      );
  }
  onButtonClick(e) {
    e.preventDefault();
    const t = document.querySelector("#dlg-lookbook_0");
    if (e.currentTarget && null === t) {
      var n = EasyDialogBox.create(
        "dlg-lookbook",
        "dlg dlg-disable-heading dlg-disable-footer dlg-disable-drag",
        "",
        this.htmlRender(e.currentTarget).innerHTML
      );
      (n.onClose = n.destroy), n.show();
    }
  }
  htmlRender(e) {
    const t = e.closest(".bls__lookbook-items"),
      n = e.closest("instagram-shop");
    if (t) {
      const e = t.id;
      if (n) {
        const t = JSON.parse(n.querySelector(".igShopBlock").textContent);
        if (t) {
          const n = t.find((t) => t.id === e),
            o = n.bl_img,
            {
              ot_1: i,
              ol_1: s,
              p_1: l,
              ot_2: r,
              ol_2: a,
              p_2: c,
              ot_3: d,
              ol_3: u,
              p_3: m,
              ot_4: p,
              ol_4: h,
              p_4: g,
              ot_5: f,
              ol_5: v,
              p_5: b,
              cap_1: y,
              cap_2: w,
              cap_3: _,
              cap_4: S,
              p_img_1: C,
              p_img_2: L,
              p_img_3: E,
              p_img_4: q,
              p_img_5: k,
              pn_1: A,
              pn_2: T,
              pn_3: x,
              pn_4: B,
              pn_5: M,
              pp_1: $,
              pp_2: H,
              pp_3: D,
              pp_4: I,
              pp_5: P,
              pcp_1: V,
              pcp_2: N,
              pcp_3: O,
              pcp_4: j,
              pcp_5: R,
              ar: F,
              cr: z,
              pr: W,
            } = n,
            Z = l ? "" : "d-none",
            U = c ? "" : "d-none",
            J = m ? "" : "d-none",
            G = g ? "" : "d-none",
            Q = b ? "" : "d-none",
            Y =
              Number(V.replace(/[^0-9]/g, "")) <
                Number($.replace(/[^0-9]/g, "")) || "" === V
                ? "d-none"
                : "",
            X =
              Number(N.replace(/[^0-9]/g, "")) <
                Number(H.replace(/[^0-9]/g, "")) || "" === N
                ? "d-none"
                : "",
            K =
              Number(O.replace(/[^0-9]/g, "")) <
                Number(D.replace(/[^0-9]/g, "")) || "" === O
                ? "d-none"
                : "",
            ee =
              Number(j.replace(/[^0-9]/g, "")) <
                Number(I.replace(/[^0-9]/g, "")) || "" === j
                ? "d-none"
                : "",
            te =
              Number(R.replace(/[^0-9]/g, "")) <
                Number(P.replace(/[^0-9]/g, "")) || "" === R
                ? "d-none"
                : "",
            ne = document.createElement("div"),
            oe = "custom" === F ? z.replace(":", "/") : F;
          return (
            (ne.innerHTML = `\n            <div class="bls__instagram-shop">\n              <div class="bls__lookbook-items">\n                <div class="bls__lookbook-image">\n                  <div\n                    class="bls__responsive-image bls-image-js"\n                    style="--aspect-ratio: ${oe};"\n                  >\n                    <img\n                      srcset="${o}"\n                    >\n                  </div>\n                </div>\n                <div\n                  class="bls__product-item absolute ${Z}"\n                  style="top: ${i}%; left: ${s}%; transform: translate(-${i}%,-${s}%)"\n                >\n                  <a href="${l}" target="_blank">\n                    <span class="icon-dot icon">\n                      <svg width="10" height="10" viewBox="0 0 10 10" fill="" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" cslip-rule="evenodd" d="M5 0C4.44772 0 4 0.447715 4 1V4L1 4C0.447715 4 0 4.44771 0 5C0 5.55228 0.447715 6 1 6H4V9C4 9.55229 4.44772 10 5 10C5.55228 10 6 9.55228 6 9V6H9C9.55228 6 10 5.55229 10 5C10 4.44772 9.55228 4 9 4L6 4V1C6 0.447715 5.55228 0 5 0Z" fill=""></path>\n                      </svg>\n                    </span>\n                  </a>\n                </div>\n                <div\n                  class="bls__product-item absolute ${U}"\n                  style="top: ${r}%; left: ${a}%; transform: translate(-${r}%,-${a}%)"\n                >\n                  <a href="${c}" target="_blank">\n                    <span class="icon-dot icon">\n                      <svg width="10" height="10" viewBox="0 0 10 10" fill="" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" cslip-rule="evenodd" d="M5 0C4.44772 0 4 0.447715 4 1V4L1 4C0.447715 4 0 4.44771 0 5C0 5.55228 0.447715 6 1 6H4V9C4 9.55229 4.44772 10 5 10C5.55228 10 6 9.55228 6 9V6H9C9.55228 6 10 5.55229 10 5C10 4.44772 9.55228 4 9 4L6 4V1C6 0.447715 5.55228 0 5 0Z" fill=""></path>\n                      </svg>\n                    </span>\n                  </a>\n                </div>\n                <div\n                  class="bls__product-item absolute ${J}"\n                  style="top: ${d}%; left: ${u}%; transform: translate(-${d}%,-${u}%)"\n                >\n                  <a href="${m}" target="_blank">\n                    <span class="icon-dot icon">\n                      <svg width="10" height="10" viewBox="0 0 10 10" fill="" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" cslip-rule="evenodd" d="M5 0C4.44772 0 4 0.447715 4 1V4L1 4C0.447715 4 0 4.44771 0 5C0 5.55228 0.447715 6 1 6H4V9C4 9.55229 4.44772 10 5 10C5.55228 10 6 9.55228 6 9V6H9C9.55228 6 10 5.55229 10 5C10 4.44772 9.55228 4 9 4L6 4V1C6 0.447715 5.55228 0 5 0Z" fill=""></path>\n                      </svg>\n                    </span>\n                  </a>\n                </div>\n                <div\n                  class="bls__product-item absolute ${G}"\n                  style="top: ${p}%; left: ${h}%; transform: translate(-${p}%,-${h}%)"\n                >\n                  <a href="${g}" target="_blank">\n                    <span class="icon-dot icon">\n                      <svg width="10" height="10" viewBox="0 0 10 10" fill="" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" cslip-rule="evenodd" d="M5 0C4.44772 0 4 0.447715 4 1V4L1 4C0.447715 4 0 4.44771 0 5C0 5.55228 0.447715 6 1 6H4V9C4 9.55229 4.44772 10 5 10C5.55228 10 6 9.55228 6 9V6H9C9.55228 6 10 5.55229 10 5C10 4.44772 9.55228 4 9 4L6 4V1C6 0.447715 5.55228 0 5 0Z" fill=""></path>\n                      </svg>\n                    </span>\n                  </a>\n                </div>\n                <div\n                  class="bls__product-item absolute ${Q}"\n                  style="top: ${f}%; left: ${v}%; transform: translate(-${f}%,-${v}%)"\n                >\n                  <a href="${b}" target="_blank">\n                    <span class="icon-dot icon">\n                      <svg width="10" height="10" viewBox="0 0 10 10" fill="" xmlns="http://www.w3.org/2000/svg">\n                        <path fill-rule="evenodd" cslip-rule="evenodd" d="M5 0C4.44772 0 4 0.447715 4 1V4L1 4C0.447715 4 0 4.44771 0 5C0 5.55228 0.447715 6 1 6H4V9C4 9.55229 4.44772 10 5 10C5.55228 10 6 9.55228 6 9V6H9C9.55228 6 10 5.55229 10 5C10 4.44772 9.55228 4 9 4L6 4V1C6 0.447715 5.55228 0 5 0Z" fill=""></path>\n                      </svg>\n                    </span>\n                  </a>\n                </div>\n              </div>\n              <div class="bls__lookbook-content">\n                <div class="bls__lookbook-info custom-scrollbar">\n                  <div class="bls__lookbook-product">\n                    <div class="bls__lookbook-product-items ${Z}">\n                      <a href="${l}" target="_blank">\n                        <div\n                          class="bls__responsive-image bls-image-js"\n                          style="--aspect-ratio: ${W};"\n                        >\n                          <img\n                            srcset="${C}"\n                          >\n                        </div>\n                        <div\n                        class="bls__product-details pt-10"\n                        >\n                          <div class="bls__product-name regular mb-0">${A}</div>\n                          <p class="bls__product-price mb-4" ><span>${$}</span><s class="px-5 ${Y}">${V}</s></p>\n                        </div>\n                      </a>\n                    </div>\n                    <div class="bls__lookbook-product-items ${U}">\n                      <a href="${c}" target="_blank">\n                        <div\n                          class="bls__responsive-image bls-image-js"\n                          style="--aspect-ratio: ${W};"\n                        >\n                          <img\n                            srcset="${L}"\n                          >\n                        </div>\n                        <div\n                        class="bls__product-details pt-10"\n                        >\n                        <div class="bls__product-name regular mb-0">${T}</div>\n                        <p class="bls__product-price mb-4" ><span>${H}</span><s class="px-5 ${X}">${N}</s></p>\n                        </div>\n                      </a>\n                    </div>\n                    <div class="bls__lookbook-product-items ${J}">\n                      <a href="${m}" target="_blank">\n                        <div\n                          class="bls__responsive-image bls-image-js"\n                          style="--aspect-ratio: ${W};"\n                        >\n                          <img\n                            srcset="${E}"\n                          >\n                        </div>\n                        <div\n                        class="bls__product-details pt-10"\n                        >\n                        <div class="bls__product-name regular mb-0">${x}</div>\n                        <p class="bls__product-price mb-4" ><span>${D}</span><s class="px-5 ${K}">${O}</s></p>\n                        </div>\n                      </a>\n                    </div>\n                    <div class="bls__lookbook-product-items ${G}">\n                      <a href="${g}" target="_blank">\n                        <div\n                          class="bls__responsive-image bls-image-js"\n                          style="--aspect-ratio: ${W};"\n                        >\n                          <img\n                            srcset="${q}"\n                          >\n                        </div>\n                        <div\n                        class="bls__product-details pt-10"\n                        >\n                        <div class="bls__product-name regular mb-0">${B}</div>\n                        <p class="bls__product-price mb-4" ><span>${I}</span><s class="px-5 ${ee}">${j}</s></p>\n                        </div>\n                      </a>\n                    </div>\n                    <div class="bls__lookbook-product-items ${Q}">\n                      <a href="${b}" target="_blank">\n                        <div\n                          class="bls__responsive-image bls-image-js"\n                          style="--aspect-ratio: ${W};"\n                        >\n                          <img\n                            srcset="${k}"\n                          >\n                        </div>\n                        <div\n                        class="bls__product-details pt-10"\n                        >\n                        <div class="bls__product-name regular mb-0">${M}</div>\n                        <p class="bls__product-price mb-4" ><span>${P}</span><s class="px-5 ${te}">${R}</s></p>\n                        </div>\n                      </a>\n                    </div>\n                  </div>\n                \n                <div class="bls__lookbook-caption">\n                  <p>\n                  ${y.replaceAll(
              /\n/g,
              "<br>"
            )}\n                  </p>\n                  <p>\n                    ${w}\n                  </p>\n                </div>\n                <a href="${S}" target="_blank">\n                  ${_}\n                </a>\n                </div>\n              </div>\n            </div>\n          `),
            ne
          );
        }
      }
    }
  }
}
customElements.define("instagram-shop", InstagramShop);
class SkeletonPage extends HTMLElement {
  constructor() {
    super();
    fetch(`${window.Shopify.routes.root}?section_id=skeleton-page`)
      .then((e) => e.text())
      .then((e) => {
        const t = newParser
          .parseFromString(e, "text/html")
          .querySelector("#bls__skeleton");
        t && (this.innerHTML = t.innerHTML);
      })
      .catch((e) => {
        throw e;
      });
  }
}
customElements.define("skeleton-page", SkeletonPage);
class VideoYoutube extends HTMLElement {
  constructor() {
    super();
    const e = this.closest(".bls__video-thumb");
    e && e.querySelector(".bls__thmbnail-video").classList.add("d-none");
  }
}
customElements.define("video-youtube", VideoYoutube);
class HeaderTotalPrice extends HTMLElement {
  constructor() {
    super();
  }
  updateTotal(e) {
    if (
      ((this.minicart_total = this.querySelector("[data-cart-subtotal-price]")),
      !this.minicart_total)
    )
      return;
    if (null == e.total_price) return;
    const t = Shopify.formatMoney(e.total_price, cartStrings?.money_format);
    this.minicart_total.innerHTML = t;
  }
}
customElements.define("header-total-price", HeaderTotalPrice);
class ShopTheLook extends HTMLElement {
  constructor() {
    super(),
      (this.items = this.querySelectorAll(".bls__lookbook-dot")),
      (this.ls = this.querySelector(".lookbook-swiper")),
      (this.sl = null),
      this.ls &&
        (this.init(this.ls),
        this.items.length &&
          this.items.forEach((e) => {
            e.addEventListener("click", this.onButtonClick.bind(this), !1);
          })),
      BlsLazyloadImg.init();
  }
  onButtonClick(e) {
    e.preventDefault();
    const t = e.currentTarget.dataset.productPosition;
    t && this.sl.slideToLoop(t - 1, 500),
      this.items.forEach((e) => {
        e.classList.remove("active");
      }),
      e.currentTarget.classList.add("active");
  }
  init(e) {
    var t = "true" === e?.dataset.autoplay,
      n = "true" === e.dataset.loop,
      o = e?.dataset.desktop ? e?.dataset.desktop : 4,
      i = e?.dataset.tablet ? e?.dataset.tablet : 2,
      s = e?.dataset.mobile ? e?.dataset.mobile : 1,
      l = window.innerWidth,
      r = e?.dataset.spacing ? e?.dataset.spacing : 0,
      a = "true" === e?.dataset.paginationProgressbar;
    (r = Number(r)),
      l <= 767 ? r >= 15 && (r = 15) : l <= 1199 && r >= 30 && (r = 30),
      (this.sl = new Swiper("#" + e.id, {
        slidesPerView: s,
        spaceBetween: r,
        autoplay: t,
        delay: 3e3,
        loop: n,
        effect: "slide",
        speed: 400,
        watchSlidesProgress: !0,
        watchSlidesVisibility: !0,
        grid: { rows: 1, fill: "row" },
        navigation: {
          nextEl: e.querySelector(".swiper-button-next"),
          prevEl: e.querySelector(".swiper-button-prev"),
        },
        pagination: {
          clickable: !0,
          el: e.querySelector(".swiper-pagination"),
          type: a ? "progressbar" : "bullets",
        },
        breakpoints: { 768: { slidesPerView: i }, 1200: { slidesPerView: o } },
      }));
  }
}
customElements.define("shop-the-look", ShopTheLook);
class AgeVerifier extends HTMLElement {
  constructor() {
    super(),
      (this.ageVerifyDetail = this.querySelector(".age-verify-detail")),
      (this.declineVerifyDetail = this.querySelector(".decline-verify-detail")),
      this.init(),
      this.mainFunction(),
      Shopify.designMode &&
        (document.addEventListener("shopify:section:load", () => this.init()),
        document.addEventListener("shopify:section:load", () =>
          this.mainFunction()
        ));
  }
  init() {
    const e = this,
      t = e.dataset.enableDesignMode;
    Shopify.designMode
      ? "true" == t
        ? document.addEventListener("shopify:section:select", (t) => {
            var n = document.querySelector(".overlay-age-verifier")?.dataset
              .shopifyEditorSection;
            n && JSON.parse(n).id === t.detail.sectionId
              ? (e.setAttribute("open", ""),
                this.declineVerifyDetail.classList.add("d-none"),
                this.ageVerifyDetail.classList.remove("d-none"))
              : (e.setAttribute("closing", "true"),
                setTimeout(() => {
                  e.removeAttribute("closing"), e.removeAttribute("open");
                }, 150));
          })
        : (e.setAttribute("closing", "true"),
          setTimeout(() => {
            e.removeAttribute("closing"), e.removeAttribute("open");
          }, 150))
      : getCookie("bls_age_verifier")
      ? "false" == getCookie("bls_age_verifier")
        ? setTimeout(() => {
            e.setAttribute("open", ""),
              this.declineVerifyDetail.classList.remove("d-none"),
              this.ageVerifyDetail.classList.add("d-none");
          }, 150)
        : e.removeAttribute("open")
      : setTimeout(() => {
          e.setAttribute("open", ""),
            this.declineVerifyDetail.classList.add("d-none"),
            this.ageVerifyDetail.classList.remove("d-none");
        }, 150);
  }
  mainFunction() {
    const e = this.querySelector(".age-verifier-approve"),
      t = this.querySelector(".age-verifier-decline"),
      n = this.querySelector(".age-verifier-return");
    n && n.addEventListener("click", () => this.handleReturn()),
      e &&
        t &&
        (e.addEventListener("click", () => this.handleApprove()),
        t.addEventListener("click", () => this.handleDecline()));
  }
  handleReturn() {
    Shopify.designMode
      ? (this.setAttribute("open", ""),
        this.declineVerifyDetail.classList.add("d-none"),
        this.ageVerifyDetail.classList.remove("d-none"))
      : (setCookie("bls_age_verifier", "false", "-1"), this.init());
  }
  handleDecline() {
    Shopify.designMode
      ? (this.setAttribute("open", ""),
        this.declineVerifyDetail.classList.remove("d-none"),
        this.ageVerifyDetail.classList.add("d-none"))
      : (setCookie("bls_age_verifier", "false", "365"), this.init());
  }
  handleApprove() {
    Shopify.designMode
      ? (this.setAttribute("closing", "true"),
        setTimeout(() => {
          this.removeAttribute("closing"), this.removeAttribute("open");
        }, 150))
      : (setCookie("bls_age_verifier", "true", "false"),
        this.setAttribute("closing", "true"),
        setTimeout(() => {
          this.removeAttribute("closing"), this.removeAttribute("open");
        }, 150));
  }
}
customElements.define("age-verifier", AgeVerifier);
class ProgressBar extends HTMLElement {
  constructor() {
    super();
    const e = this.dataset.order;
    this.init(e);
  }
  init(e) {
    const t = this.dataset.feUnavaiable,
      n = this.dataset.feAvaiable,
      o = Number(Shopify.currency.rate),
      i = Number(this.dataset.feAmount);
    if (!i || !o) return;
    const s = Number(e) / 100,
      l = i * o;
    null != s &&
      ((s / l) * 100 > 100
        ? this.setProgressBar(100)
        : this.setProgressBar((s / l) * 100),
      this.setProgressBarTitle(s, l, t, n));
  }
  setProgressBarTitle(e, t, n, o) {
    const i = this.querySelector(".free-shipping-message");
    if (i)
      if ((i.classList.remove("opacity-0"), e >= t)) i.innerHTML = o;
      else {
        const o = "{{ amount }}";
        i.innerHTML = n.replace(
          o.trim(),
          Shopify.formatMoney(100 * (t - e), cartStrings.money_format)
        );
      }
  }
  setProgressBar(e) {
    (this.querySelector(".progress").style.width = e + "%"),
      100 === e
        ? this.classList.add("cart_shipping_free")
        : this.classList.remove("cart_shipping_free");
  }
}
customElements.define("free-ship-progress-bar", ProgressBar);
class SlideImageShopable extends HTMLElement {
  constructor() {
    super(), this.init();
  }
  init() {
    this.BlsCarousel();
  }
  BlsCarousel() {
    var e = this.querySelector(".bls__swiper-shopable"),
      t = "true" === e.dataset.autoplay,
      n = "true" === e.dataset.loop,
      o = e.dataset.arrowCenterimage ? e.dataset.arrowCenterimage : 0,
      i = e.dataset.desktop ? e.dataset.desktop : 1,
      s = e.dataset.tablet ? e.dataset.tablet : 1,
      l = e.dataset.mobile ? e.dataset.mobile : 1,
      r = e.dataset.spacing ? e.dataset.spacing : 0;
    (r = Number(r)),
      new Swiper(e, {
        slidesPerView: l,
        spaceBetween: r >= 15 ? 15 : r,
        autoplay: t,
        loop: n,
        watchSlidesProgress: !0,
        watchSlidesVisibility: !0,
        navigation: {
          nextEl: e.querySelector(".swiper-button-next-item"),
          prevEl: e.querySelector(".swiper-button-prev-item"),
        },
        pagination: {
          clickable: !0,
          el: e.querySelector(".swiper-pagination-item"),
          type: "progressbar",
        },
        breakpoints: {
          768: { slidesPerView: s, spaceBetween: r >= 30 ? 30 : r },
          1200: { slidesPerView: i, spaceBetween: r },
        },
        on: {
          init: function () {
            if (o) {
              var t = e.querySelectorAll(".bls__responsive-image");
              if (0 != t.length) {
                var n = [];
                t.forEach((e) => {
                  n.push(e.offsetHeight / 2);
                });
                var i = "--arrows-offset-top: " + Math.max(...n) + "px";
                e.querySelectorAll(".swiper-arrow") &&
                  e.querySelectorAll(".swiper-arrow").forEach((e) => {
                    e.setAttribute("style", i);
                  });
              }
            }
          },
        },
      });
  }
}
customElements.define("slide-image-shopable", SlideImageShopable),
  document.addEventListener("shopify:section:load", function (e) {
    var t = e.detail.sectionId,
      n = e.target.querySelector('[data-id="' + t + '"]');
    if (n) {
      var o = n.querySelector(".bls__swiper"),
        i = n.querySelector(".slideshow-custom"),
        s = n.querySelector(".bls__testimonial"),
        l = n.querySelector(".bls__counter");
      i && BlsCustomSlideShow.init(),
        o && BlsSettingsSwiper.BlsCarousel(o),
        s && BlsSettingsSwiperTestimonial.init(),
        l && BlsCounterEvent.init();
    }
    t && BlsLazyloadImg.init();
  });
