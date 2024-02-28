"use strict";
const options = {
  collectionsLoadMore: ".collections-load-more",
  blsLinkFilter: ".bls__link-filter",
  openFilter: ".filter-title .open-children-toggle",
  rangeSlider: ".price-range .range-slider",
  rangeSliderMin: ".range-slider-min",
  rangeSliderMax: ".range-slider-max",
  gridMode: ".grid-mode-show-type-products .grid-mode",
  viewMode: ".view-mode",
  sidebarClose: ".sidebar-close",
  collectionSidebar: "#CollectionSidebar",
  collectionFiltersForm: "#CollectionFiltersForm",
  btnFilter: ".collection-filter .btn-filter",
  section: ".section-collection-product",
  toolbarSorter: ".toolbar-sorter .select-selected",
  facetFiltersSort: ".facet-filters__sort li",
  overlay: ".bls__overlay",
  filterSortMb: ".toolbar-sorter-mb .facet-filters__label",
  dataSortMb: ".toolbar-sorter-mb__option",
  closeSortMb: ".close-select",
};
var BlsEventCollectionShopify = {
  init: function () {
    this.setupEventListeners(),
      this.eventLoadMore(),
      this.ionRangeSlider(),
      this.actionDesc();
  },
  actionDesc: function () {
    const e = document.querySelector("[data-view-more]");
    e &&
      e.addEventListener("click", function (e) {
        const t = e.currentTarget;
        t.closest(".heading-description").classList.contains("show-full-desc")
          ? (t
              .closest(".heading-description")
              .classList.remove("show-full-desc"),
            (t.textContent = t.dataset.readMore))
          : (t.closest(".heading-description").classList.add("show-full-desc"),
            (t.textContent = t.dataset.readLess));
      });
  },
  setupEventListeners: function () {
    document.querySelectorAll(options.btnFilter).forEach((e) => {
      e.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          const t = e.currentTarget;
          document
            .querySelector(options.collectionSidebar)
            .classList.contains("bls__opend-popup")
            ? (t.classList.remove("actived"),
              document
                .querySelector(options.collectionSidebar)
                .classList.remove("bls__opend-popup"),
              document
                .querySelector(options.overlay)
                .classList.add("d-none-overlay"),
              document.documentElement.classList.remove("hside_opened"),
              t
                .closest(".collection-filter")
                .classList.contains("dropdonw_sidebar") &&
                window.innerWidth >= 1024 &&
                slideAnime({
                  target: t
                    .closest("#productgridcontainer")
                    .querySelector("#CollectionSidebar"),
                  animeType: "slideToggle",
                }))
            : (t.classList.add("actived"),
              document
                .querySelector(options.collectionSidebar)
                .classList.add("bls__opend-popup"),
              t
                .closest(".collection-filter")
                .classList.contains("dropdonw_sidebar")
                ? window.innerWidth < 1024
                  ? (document
                      .querySelector(options.overlay)
                      .classList.remove("d-none-overlay"),
                    document.documentElement.classList.add("hside_opened"))
                  : slideAnime({
                      target: t
                        .closest("#productgridcontainer")
                        .querySelector("#CollectionSidebar"),
                      animeType: "slideToggle",
                    })
                : (document
                    .querySelector(options.overlay)
                    .classList.remove("d-none-overlay"),
                  document.documentElement.classList.add("hside_opened")));
        },
        !1
      );
    }),
      document.querySelectorAll(options.openFilter).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget;
            slideAnime({
              target: t
                .closest(".filter-item")
                .querySelector(".filter-content"),
              animeType: "slideToggle",
            }),
              t.classList.contains("active")
                ? t.classList.remove("active")
                : t.classList.add("active");
          },
          !1
        );
      }),
      document.querySelectorAll(options.sidebarClose).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault(),
              document
                .querySelector(options.collectionSidebar)
                .classList.remove("bls__opend-popup"),
              document
                .querySelector(options.overlay)
                .classList.add("d-none-overlay"),
              document.documentElement.classList.remove("hside_opened");
          },
          !1
        );
      }),
      document.querySelectorAll(options.viewMode).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget,
              o = t.getAttribute("data-view");
            if (t.classList.contains("actived")) return;
            var r = window.location.search;
            if (((r = this.removeParam("view", r)), "list" == o))
              var n = r.replace("?", "") + "&view=list";
            else n = r.replace("?", "") + "&view=grid";
            const i = this.renderUrl(n);
            this.renderSectionFilter(i, n);
          },
          !1
        );
      }),
      document.querySelectorAll(options.gridMode).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget,
              o = t.getAttribute("data-grid-mode");
            if (t.classList.contains("actived")) return;
            if (1 == o) return;
            for (var r of document.querySelectorAll(options.gridMode))
              r.classList.remove("actived");
            const n = document.querySelector(".container-products-switch");
            t.classList.add("actived");
            const i = n.getAttribute("data-view-mode");
            n.classList.remove("grid-columns-" + i),
              n.setAttribute("data-view-mode", o),
              n.classList.add("grid-columns-" + o);
          },
          !1
        );
      }),
      document.querySelectorAll(options.blsLinkFilter).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget;
            t.querySelector(".bls_tooltip")
              ? t
                  .querySelector(".bls_tooltip")
                  .classList.toggle("current-filter")
              : t.closest("li").classList.toggle("current-filter");
            const o = t.getAttribute("href");
            this.renderSectionFilter(o);
          },
          !1
        );
      }),
      document.body.addEventListener("click", (e) => {
        const t = e.target,
          o = document.querySelector(
            ".collection-filter.dropdonw_sidebar .btn-filter"
          );
        t.closest(".select-custom") ||
          t == document.querySelector(".toolbar-sorter .select-custom") ||
          (document.querySelector(".toolbar-sorter .select-custom") &&
            document
              .querySelector(".toolbar-sorter .select-custom")
              .classList.remove("actived")),
          !t.closest("#CollectionSidebar") &&
            t != document.querySelector("#CollectionSidebar") &&
            o &&
            t != o &&
            window.innerWidth >= 1024 &&
            (o.classList.remove("actived"),
            document
              .querySelector(options.collectionSidebar)
              .classList.remove("bls__opend-popup"),
            document
              .querySelector(options.overlay)
              .classList.add("d-none-overlay"),
            document.documentElement.classList.remove("hside_opened"),
            slideAnime({
              target: o
                .closest("#productgridcontainer")
                .querySelector("#CollectionSidebar"),
              animeType: "slideUp",
            }));
      }),
      document.querySelectorAll(options.toolbarSorter).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget;
            t.closest(".select-custom").classList.contains("actived")
              ? t.closest(".select-custom").classList.remove("actived")
              : t.closest(".select-custom").classList.add("actived");
          },
          !1
        );
      }),
      document.querySelector(options.filterSortMb) &&
        document.querySelector(options.filterSortMb).addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget;
            t.closest(".toolbar-sorter-mb").classList.contains("open-selected")
              ? t
                  .closest(".toolbar-sorter-mb")
                  .classList.remove("open-selected")
              : t.closest(".toolbar-sorter-mb").classList.add("open-selected");
          },
          !1
        ),
      document.querySelector(options.closeSortMb) &&
        document
          .querySelector(options.closeSortMb)
          .addEventListener("click", (e) => {
            e.preventDefault(),
              document
                .querySelector(".toolbar-sorter-mb")
                .classList.remove("open-selected");
          }),
      document.querySelectorAll(options.facetFiltersSort).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget.getAttribute("value");
            var o = window.location.search,
              r =
                (o = this.removeParam("sort_by", o)).replace("?", "") +
                "&sort_by=" +
                t;
            const n = this.renderUrl(r);
            this.renderSectionFilter(n, r);
          },
          !1
        );
      });
  },
  ionRangeSlider: function () {
    const e = document.querySelector(".price-range"),
      t = document.querySelector(options.rangeSliderMax),
      o = document.querySelector(options.rangeSliderMin),
      r = document.querySelector(".min-price-range"),
      n = document.querySelector(".max-price-range");
    var i = 0,
      s = 0;
    e &&
      (document.querySelector(options.rangeSliderMin).addEventListener(
        "input",
        (e) => {
          e.preventDefault();
          const n = e.currentTarget;
          Number(t.value) - Number(n.value) >= 1
            ? ((r.value = Number(n.value)), (i = 100 * Number(n.value)))
            : ((n.value = Number(t.value) - 1),
              (i = 100 * (Number(t.value) - 1)));
          const s = Shopify.formatMoney(i, cartStrings.money_format);
          (document.querySelector(".price-lable .min").innerHTML = s),
            n
              .closest(".price-range")
              .style.setProperty(
                "--range-from",
                (o.value / Number(n.getAttribute("max"))) * 100 + "%"
              );
        },
        !1
      ),
      document.querySelector(options.rangeSliderMax).addEventListener(
        "input",
        (e) => {
          e.preventDefault();
          const r = e.currentTarget;
          r.value - o.value >= 1
            ? ((n.value = r.value), (s = 100 * Number(r.value)))
            : ((r.value = Number(o.value) + Number(1)),
              (s = 100 * (Number(o.value) + Number(1))));
          const i = Shopify.formatMoney(s, cartStrings.money_format);
          (document.querySelector(".price-lable .max").innerHTML = i),
            r
              .closest(".price-range")
              .style.setProperty(
                "--range-to",
                (t.value / Number(r.getAttribute("max"))) * 100 + "%"
              );
        },
        !1
      ),
      document.querySelectorAll(options.rangeSlider).forEach((e) => {
        e.addEventListener(
          "change",
          (e) => {
            e.preventDefault(), e.currentTarget;
            const t = new FormData(
                document.querySelector(options.collectionFiltersForm)
              ),
              o = new URLSearchParams(t).toString(),
              i = r.getAttribute("name"),
              s = n.getAttribute("name");
            var c = window.location.search;
            c = this.removeParam(i, c);
            var l = (c = this.removeParam(s, c)).replace("?", "") + "&" + o;
            const a = this.renderUrl(l);
            this.renderSectionFilter(a, l);
          },
          !1
        );
      }));
  },
  removeParam: function (e, t) {
    var o = t.split("?")[0],
      r = [],
      n = -1 !== t.indexOf("?") ? t.split("?")[1] : "";
    if ("" !== n) {
      for (var i = (r = n.split("&")).length - 1; i >= 0; i -= 1)
        r[i].split("=")[0] === e && r.splice(i, 1);
      r.length && (o = o + "?" + r.join("&"));
    }
    return o;
  },
  renderUrl: function (e) {
    const t = document.querySelector(options.section).dataset.sectionId;
    return `${window.location.pathname}?section_id=${t}&${e}`;
  },
  renderSectionFilter: function (e, t) {
    this.toggleLoading(document.body, !0),
      fetch(`${e}`)
        .then((e) => {
          if (!e.ok) throw new Error(e.status);
          return e.text();
        })
        .then((e) => {
          const t = new DOMParser()
            .parseFromString(e, "text/html")
            .querySelector(options.section);
          document.querySelector(options.section).replaceWith(t),
            document
              .querySelector(options.overlay)
              .classList.add("d-none-overlay"),
            document.documentElement.classList.remove("hside_opened"),
            this.toggleLoading(document.body, !1);
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          BlsReloadSpr.init(),
            BlsEventCollectionShopify.init(),
            BlsColorSwatchesShopify.init(),
            BlsSubActionProduct.init(),
            BlsSectionProductAddCart.updateBtnAdd(),
            setTimeout(function () {
              BlsLazyloadImg.init();
            }, 200);
        }),
      this.updateUrl(e, t);
  },
  eventLoadMore: function () {
    document.querySelectorAll(options.collectionsLoadMore).forEach((e) => {
      var t = this;
      e.classList.contains("infinit-scrolling")
        ? new IntersectionObserver(
            function (o) {
              o.forEach((r) => {
                o.forEach((o) => {
                  1 === o.intersectionRatio && t.loadMoreProducts(e);
                });
              });
            },
            { threshold: 1 }
          ).observe(e)
        : e.addEventListener(
            "click",
            (e) => {
              e.preventDefault();
              const o = e.currentTarget;
              t.loadMoreProducts(o);
            },
            !1
          );
    });
  },
  loadMoreProducts: function (e) {
    const t = e.getAttribute("href");
    this.toggleLoading(e, !0),
      fetch(`${t}`)
        .then((e) => {
          if (!e.ok) throw new Error(e.status);
          return e.text();
        })
        .then((t) => {
          const o = parser.parseFromString(t, "text/html");
          o.querySelectorAll("#bls__product-grid .bls__grid__item").forEach(
            (e) => document.getElementById("bls__product-grid").appendChild(e)
          );
          const r = o.querySelector(".collections-load-more");
          (document.querySelector(".load-more-amount").innerHTML =
            o.querySelector(".load-more-amount").textContent),
            (document.querySelector(".load-more-percent").style.width =
              o.querySelector(".load-more-percent").style.width),
            r ? e.setAttribute("href", r.getAttribute("href")) : e.remove(),
            this.toggleLoading(e, !1);
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          BlsColorSwatchesShopify.init(),
            BlsSubActionProduct.init(),
            BlsSectionProductAddCart.updateBtnAdd(),
            BlsReloadSpr.init(),
            setTimeout(function () {
              BlsLazyloadImg.init();
            }, 200);
        });
  },
  toggleLoading: function (e, t) {
    e &&
      (t
        ? e.classList.add("start", "loading")
        : (e.classList.add("finish"),
          setTimeout(function () {
            e.classList.remove("start", "loading", "finish");
          }, 500)));
  },
  updateUrl: function (e, t = !1) {
    if (t) {
      const e = `${window.location.pathname}?${t}`;
      window.history.pushState({ url: e }, "", e);
    } else window.history.pushState({ url: e }, "", e);
  },
};
BlsEventCollectionShopify.init();
