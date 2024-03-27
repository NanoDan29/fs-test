"use strict";
import PhotoSwipeLightbox from "./photoswipe-lightbox.min.js";
import PhotoSwipe from "./photoswipe.min.js";
import PhotoSwipeVideoPlugin from "./bls.photoswipe-video.min.js";
window.theme = window.theme || {};
const options = {
  templateProduct: ".bls__template-product",
  flashSold: ".bls__flash-sold",
  countdownTimer: ".bls__countdown-timer",
  visitors: ".bls__visitors",
  countdowProduct: ".bls__countdow-product",
  paymentButton: ".bls__product-dynamic-checkout",
  navTabs: ".nav-tabs a",
  accorditionTabs: ".data.accordition",
  productInfomationTab: ".bls__product-tabs-content",
  productInfomationTabLayoutSecond: ".bls__products-tabs",
  tabContent: ".tab-content .tab-item",
  tabContentActive: ".tab-content .tab-item.active",
  productAddons: ".bls__product_addons",
  shareCopy: ".bls__share-copy",
  compareColorsBtn: ".bls__compare-color-btn",
  photoZoomImage: ".bls__zoom-image",
  mediaImage: ".bls__media-image",
};
(theme.ProductVideo = (function () {
  var e = {},
    t = { shopify: "shopify", external: "external" },
    r = { productMediaWrapper: "[data-product-single-media-wrapper]" },
    o = { enableVideoLooping: "enable-video-looping", videoId: "video-id" };
  function i(r) {
    r
      ? (function () {
          for (var r in e)
            if (e.hasOwnProperty(r)) {
              var o = e[r];
              if (o.nativeVideo) continue;
              o.host === t.shopify &&
                (o.element.setAttribute("controls", "controls"),
                (o.nativeVideo = !0));
            }
        })()
      : n();
  }
  function a(e) {
    return "VIDEO" === e.tagName ? t.shopify : t.external;
  }
  function n() {
    for (var t in e) {
      if (e.hasOwnProperty(t)) e[t].ready();
    }
  }
  return {
    init: function (t, n) {
      if (t) {
        var c = t.querySelector("iframe, video");
        if (c) {
          var s = t.getAttribute("data-product-media-id");
          (e[s] = {
            mediaId: s,
            sectionId: n,
            host: a(c),
            container: t,
            element: c,
            ready: function () {
              !(function (e) {
                if (e.player) return;
                var t = e.container.closest(r.productMediaWrapper),
                  i = "true" === t.getAttribute("data-" + o.enableVideoLooping);
                e.player = new Shopify.Video(e.element, {
                  loop: { active: i },
                });
                var a = function () {
                  e.player && e.player.pause();
                };
                t.addEventListener("mediaHidden", a),
                  t.addEventListener("xrLaunch", a),
                  t.addEventListener("mediaVisible", function () {
                    theme.Helpers.isTouch() || (e.player && e.player.play());
                  });
              })(this);
            },
          }),
            window.Shopify.loadFeatures([
              { name: "video-ui", version: "2.0", onLoad: i },
            ]),
            theme.LibraryLoader.load("plyrShopifyStyles");
        }
      }
    },
    hosts: t,
    loadVideos: n,
    removeSectionVideos: function (t) {
      for (var r in e)
        if (e.hasOwnProperty(r)) {
          var o = e[r];
          o.sectionId === t && (o.player && o.player.destroy(), delete e[r]);
        }
    },
  };
})()),
  (theme.ProductModel = (function () {
    var e = {},
      t = {},
      r = {},
      o = "[data-product-single-media-group]",
      i = "[data-shopify-xr]";
    function a(t) {
      if (!t)
        if (window.ShopifyXR) {
          for (var r in e)
            if (e.hasOwnProperty(r)) {
              var o = e[r];
              if (o.loaded) continue;
              var i = document.querySelector("#ModelJson-" + r);
              window.ShopifyXR.addModels(JSON.parse(i.innerHTML)),
                (o.loaded = !0);
            }
          window.ShopifyXR.setupXRElements();
        } else
          document.addEventListener("shopify_xr_initialized", function () {
            a();
          });
    }
    function n(e) {
      if (!e)
        for (var r in t)
          if (t.hasOwnProperty(r)) {
            var o = t[r];
            o.modelViewerUi ||
              (o.modelViewerUi = new Shopify.ModelViewerUI(o.element)),
              c(o);
          }
    }
    function c(e) {
      var t = r[e.sectionId];
      e.container.addEventListener("mediaVisible", function () {
        t.element.setAttribute("data-shopify-model3d-id", e.modelId),
          theme.Helpers.isTouch() || e.modelViewerUi.play();
      }),
        e.container.addEventListener("mediaHidden", function () {
          t.element.setAttribute("data-shopify-model3d-id", t.defaultId),
            e.modelViewerUi.pause();
        }),
        e.container.addEventListener("xrLaunch", function () {
          e.modelViewerUi.pause();
        });
    }
    return {
      init: function (c, s) {
        (e[s] = { loaded: !1 }),
          c.forEach(function (e, a) {
            var n = e.getAttribute("data-product-media-id"),
              c = e.querySelector("model-viewer"),
              l = c.getAttribute("data-model-id");
            if (0 === a) {
              var d = e.closest(o).querySelector(i);
              r[s] = { element: d, defaultId: l };
            }
            t[n] = { modelId: l, sectionId: s, container: e, element: c };
          }),
          window.Shopify.loadFeatures([
            { name: "shopify-xr", version: "1.0", onLoad: a },
            { name: "model-viewer-ui", version: "1.0", onLoad: n },
          ]),
          theme.LibraryLoader.load("modelViewerUiStyles");
      },
      removeSectionModels: function (r) {
        for (var o in t) {
          if (t.hasOwnProperty(o))
            t[o].sectionId === r && (t[o].modelViewerUi.destroy(), delete t[o]);
        }
        delete e[r];
      },
    };
  })()),
  (theme.LibraryLoader = (function () {
    var e = "link",
      t = "script",
      r = { requested: "requested", loaded: "loaded" },
      o = "https://cdn.shopify.com/shopifycloud/",
      i = {
        plyrShopifyStyles: {
          tagId: "plyr-shopify-styles",
          src: o + "plyr/v2.0/shopify-plyr.css",
          type: e,
        },
        modelViewerUiStyles: {
          tagId: "shopify-model-viewer-ui-styles",
          src: o + "model-viewer-ui/assets/v1.0/model-viewer-ui.css",
          type: e,
        },
      };
    return {
      load: function (o, a) {
        var n = i[o];
        if (n && n.status !== r.requested)
          if (((a = a || function () {}), n.status !== r.loaded)) {
            var c;
            switch (((n.status = r.requested), n.type)) {
              case t:
                c = (function (e, t) {
                  var o = document.createElement("script");
                  return (
                    (o.src = e.src),
                    o.addEventListener("load", function () {
                      (e.status = r.loaded), t();
                    }),
                    o
                  );
                })(n, a);
                break;
              case e:
                c = (function (e, t) {
                  var o = document.createElement("link");
                  return (
                    (o.href = e.src),
                    (o.rel = "stylesheet"),
                    (o.type = "text/css"),
                    o.addEventListener("load", function () {
                      (e.status = r.loaded), t();
                    }),
                    o
                  );
                })(n, a);
            }
            (c.id = n.tagId), (n.element = c);
            var s = document.getElementsByTagName(n.type)[0];
            s.parentNode.insertBefore(c, s);
          } else a();
      },
    };
  })());
class VariantSelects extends HTMLElement {
  constructor() {
    super(),
      this.querySelectorAll(".bls__option-swatch").forEach((e) =>
        e.addEventListener("click", this.onVariantChange.bind(this), !1)
      ),
      document.querySelector(".sticky-addcart-opstion") &&
        (document.querySelector(".sticky-addcart-opstion").onchange = function (
          e
        ) {
          e.target.selectedOptions[0]
            .getAttribute("data-option")
            .split("/")
            .forEach(function (e, t) {
              var r = e.trim();
              document
                .querySelectorAll(
                  ".bls__template-main-product fieldset.product-form__input"
                )
                .forEach(function (e, o) {
                  o == t &&
                    e.querySelector(
                      ".bls__option-swatch[data-value='" + r + "']"
                    ) &&
                    e
                      .querySelector(
                        ".bls__option-swatch[data-value='" + r + "']"
                      )
                      .click();
                });
            });
        }),
      document.querySelector(".product-bought-together-item.main-product") &&
        (document.querySelector(
          ".product-bought-together-item.main-product .product-variant-option"
        ).onchange = function (e) {
          e.target.selectedOptions[0]
            .getAttribute("data-option")
            .split("/")
            .forEach(function (e, t) {
              var r = e.trim();
              document
                .querySelectorAll(
                  ".bls__template-main-product fieldset.product-form__input"
                )
                .forEach(function (e, o) {
                  o == t &&
                    e.querySelector(
                      ".bls__option-swatch[data-value='" + r + "']"
                    ) &&
                    e
                      .querySelector(
                        ".bls__option-swatch[data-value='" + r + "']"
                      )
                      .click();
                });
            });
        });
  }
  onVariantChange(e) {
    e.preventDefault();
    const t = e.currentTarget,
      r = t.getAttribute("data-value");
    for (var o of t.closest("fieldset").querySelectorAll(".bls__option-swatch"))
      o.classList.remove("active");
    t.classList.toggle("active"),
      (t
        .closest("fieldset")
        .querySelector(".swatch-selected-value").textContent = r),
      this.updateOptions(),
      this.updateMasterId(),
      this.toggleAddButton(!0, "", !1),
      this.updatePickupAvailability(),
      this.removeErrorMessage(),
      this.updateVariantStatuses(),
      this.currentVariant
        ? (this.updateMedia(),
          this.updateURL(),
          this.updateVariantInput(),
          this.renderProductInfo())
        : (this.toggleAddButton(!0, "", !0), this.setUnavailable());
  }
  updateOptions() {
    this.options = Array.from(
      this.querySelectorAll(".bls__option-swatch.active"),
      (e) => e.getAttribute("data-value")
    );
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (e) => !e.options.map((e, t) => this.options[t] === e).includes(!1)
    );
  }
  updateMedia() {
    if (
      this.currentVariant &&
      this.currentVariant.featured_media &&
      (document
        .querySelector(".bls__product-images")
        .classList.contains("bls__product-grid-1") ||
        document
          .querySelector(".bls__product-images")
          .classList.contains("bls__product-grid-2"))
    ) {
      var e = document.querySelector(
          `.bls__media-image[data-media-id="${this.currentVariant.featured_media.id}"]`
        ),
        t = e;
      do {
        if (!(t = t.parentNode)) return;
        t.scrollTop += 1;
      } while (0 == t.scrollTop);
      var r = 0;
      do {
        if (e == t) break;
        r += e.offsetTop;
      } while ((e = e.offsetParent));
      (scroll = function (e, t, r, o) {
        ++o > 30 ||
          ((e.scrollTop = t + ((r - t) / 30) * o),
          setTimeout(function () {
            scroll(e, t, r, o);
          }, 20));
      }),
        scroll(t, t.scrollTop, r, 0);
    }
  }
  updateURL() {
    this.currentVariant &&
      "false" !== this.dataset.updateUrl &&
      window.history.replaceState(
        {},
        "",
        `${this.dataset.url}?variant=${this.currentVariant.id}`
      );
  }
  setAvailability(e, t) {
    e.forEach((e) => {
      t.includes(e.dataset.value)
        ? e.removeAttribute("data-disabled")
        : e.setAttribute("data-disabled", "disable");
    });
  }
  updateVariantInput() {
    document
      .querySelectorAll(
        `#product-form-${this.dataset.section}, #product-form-installment-${this.dataset.section}`
      )
      .forEach((e) => {
        const t = e.querySelector('input[name="id"]');
        (t.value = this.currentVariant.id),
          t.dispatchEvent(new Event("change", { bubbles: !0 }));
      }),
      document.querySelector(".sticky-addcart-opstion") &&
        (document.querySelector(".sticky-addcart-opstion").value =
          this.currentVariant.id),
      document.querySelector(".product-bought-together-item.main-product") &&
        (document.querySelector(
          ".product-bought-together-item.main-product .product-variant-option"
        ).value = this.currentVariant.id),
      document.querySelector(".quantity__label") &&
        (document
          .querySelector(".quantity__label")
          .setAttribute("data-pro-id", this.currentVariant.id),
        fetch("/cart.json")
          .then((e) => e.json())
          .then((e) => {
            const t = e.items,
              r = this.currentVariant.id;
            var o;
            t.forEach(function (e) {
              if (e.variant_id == r)
                return (
                  (document.querySelector(".quantity-cart").innerHTML =
                    e.quantity),
                  document
                    .querySelector(".quantity__label")
                    .classList.remove("hidden"),
                  void (o = r)
                );
            }),
              o ||
                ((document.querySelector(".quantity-cart").innerHTML = 0),
                document
                  .querySelector(".quantity__label")
                  .classList.add("hidden"));
          })
          .catch((e) => {
            throw e;
          }));
  }
  updatePickupAvailability() {
    const e = document.querySelector("pickup-availability");
    e &&
      (this.currentVariant && this.currentVariant.available
        ? e.fetchAvailability(this.currentVariant.id)
        : (e.removeAttribute("available"), (e.innerHTML = "")));
  }
  removeErrorMessage() {
    const e = this.closest("section");
    if (!e) return;
    const t = e.querySelector("product-form");
    t && t.handleErrorMessage();
  }
  renderProductInfo() {
    if (!this.currentVariant) return;
    let e = 0,
      t = 0,
      r = !1,
      o = !1,
      i = window.variantStrings.soldOut,
      a = window.variantStrings.inStock;
    const n = this.currentVariant.compare_at_price,
      c = this.currentVariant.unit_price,
      s = this.currentVariant.unit_price_measurement,
      l = this.currentVariant.price,
      d = document
        .getElementById(`product-form-${this.dataset.section}`)
        .closest(".bls__product-details-infor");
    this.getVariantQtyData().find((t) => {
      t.id === this.currentVariant.id && (e = t.qty);
    }),
      n && n > l && ((r = !0), (t = ((n - l) / n) * 100));
    const u = document.querySelector("stock-countdown");
    if (u) {
      const t = u.dataset.itemsLeft,
        r = u.dataset.message;
      if (t >= e && r && e >= 1) {
        u.classList.remove("d-none");
        const r = u.querySelector("span.bls__count");
        u.querySelector(".progressbar-stock");
        let o;
        (o = (e / t) * 100 > 100 ? 100 : (e / t) * 100), r && (r.innerHTML = e);
      } else u.classList.add("d-none");
    }
    const p = document.querySelector(".product-notify-stock");
    if (
      (p &&
        (this.currentVariant.available
          ? ((p.style.display = "none"),
            p.setAttribute("data-product-variant", this.currentVariant.id))
          : ((p.style.display = "block"),
            p.setAttribute("data-product-variant", this.currentVariant.id))),
      c && s)
    ) {
      const e = Shopify.formatMoney(c, cartStrings.money_format),
        t = 1 != s.reference_value ? s.reference_value : s.reference_unit,
        r = d.querySelector(".unit-price .number"),
        o = d.querySelector(".unit-price .unit");
      r && (r.innerHTML = e), o && (o.innerHTML = t);
    }
    this.currentVariant.available && e < 1
      ? ((a = window.variantStrings.preOrder),
        (i = window.variantStrings.preOrder))
      : this.currentVariant.available
      ? ((a = window.variantStrings.inStock),
        (i = window.variantStrings.addToCart))
      : ((a = window.variantStrings.outStock), (o = !0)),
      null === this.currentVariant.inventory_management &&
        ((o = !1),
        (a = window.variantStrings.inStock),
        (i = window.variantStrings.addToCart));
    const m = d.querySelector(".bls__product-label");
    if ((m && m.remove(), r || o)) {
      var h = document.createElement("div");
      h.classList.add(
        "bls__product-label",
        "mb-5",
        "fs-12",
        "pointer-events-none",
        "inline-block",
        "static"
      ),
        d.querySelector(".bls__product-label-detail") &&
          d
            .querySelector(".bls__product-label-detail")
            .insertBefore(
              h,
              d.querySelector(".bls__product-label-detail").children[0]
            );
      const e = d.querySelector(".bls__product-label");
      var y = document.createElement("div");
      r && 0 == o
        ? (y.classList.add("bls__sale-label"),
          "price" == window.productLabel.saleType
            ? (y.innerText =
                "- " + Shopify.formatMoney(n - l, cartStrings.money_format))
            : "text" == window.productLabel.saleType
            ? (y.innerText = window.productLabel.saleLabel)
            : (y.innerText = -t.toFixed(0) + "%"))
        : (y.classList.add("bls__sold-out-label"),
          (y.innerText = window.variantStrings.soldOut)),
        e && e.appendChild(y);
    }
    d.querySelector(".bls__availability-value") &&
      (d.querySelector(".bls__availability-value").textContent = a),
      d.querySelector(".bls__product-sku-value") &&
        (d.querySelector(".bls__product-sku-value").textContent =
          this.currentVariant.sku && "" != this.currentVariant.sku
            ? this.currentVariant.sku
            : "N/A");
    const b = Shopify.formatMoney(
      this.currentVariant.price,
      cartStrings.money_format
    );
    d.querySelector(".price__regular .price") &&
      (d.querySelector(".price__regular .price").innerHTML = b);
    const v = d.querySelector(".bls__price");
    if (v)
      if (
        (v.classList.remove("price--sold-out", "price--on-sale"),
        v
          .querySelector(".price__regular .price")
          .classList.remove("special-price"),
        n && n > l)
      ) {
        const e = Shopify.formatMoney(n, cartStrings.money_format);
        d.querySelector(".compare-price") &&
          (d.querySelector(".compare-price").innerHTML = e),
          v.classList.add("price--on-sale"),
          d
            .querySelector(".price__regular .price")
            .classList.add("special-price");
      } else
        this.currentVariant.available || v.classList.add("price--sold-out");
    this.toggleAddButton(!this.currentVariant.available, i);
  }
  toggleAddButton(e = !0, t, r = !0) {
    const o = document.getElementById(`product-form-${this.dataset.section}`);
    if (!o) return;
    const i = o.querySelector('.add-cart-button[name="add"]'),
      a = o.querySelector('.add-cart-button[name="add"] > span'),
      n = o.querySelector(options.paymentButton);
    i &&
      (e
        ? (i.setAttribute("disabled", "disabled"),
          n && (n.style.display = "none"))
        : (i.removeAttribute("disabled"), n && (n.style.display = "block")),
      (a.textContent = t || window.variantStrings.addToCart));
  }
  updateVariantStatuses() {
    const e = this.getVariantData().filter(
        (e) => this.querySelector(".active").dataset.value === e.option1
      ),
      t = [...this.querySelectorAll(".product-form__input")];
    t.forEach((r, o) => {
      if (0 === o) return;
      const i = [...r.querySelectorAll(".bls__option-swatch")],
        a = t[o - 1].querySelector(".active").dataset.value,
        n = e
          .filter((e) => e.available && e[`option${o}`] === a)
          .map((e) => e[`option${o + 1}`]);
      this.setAvailability(i, n);
    });
  }
  setUnavailable() {
    const e = document.getElementById(`product-form-${this.dataset.section}`),
      t = e.querySelector('.add-cart-button[name="add"]'),
      r = e.querySelector('.add-cart-button[name="add"] > span'),
      o = document.getElementById(`price-${this.dataset.section}`);
    t &&
      ((r.textContent = window.variantStrings.unavailable),
      o && o.classList.add("visibility-hidden"));
  }
  getVariantData() {
    return (
      (this.variantData =
        this.variantData ||
        JSON.parse(
          this.querySelector('[type="application/json"]').textContent
        )),
      this.variantData
    );
  }
  getVariantQtyData() {
    return (
      (this.variantQtyData = JSON.parse(
        this.querySelector(".productVariantsQty").textContent
      )),
      this.variantQtyData
    );
  }
}
customElements.define("variant-selects", VariantSelects);
var BlsEventMainProductShopify = {
  init: function () {
    this.setupEventListeners(),
      this.eventFlashSold(),
      this.eventVisitors(),
      this.eventCountdowProduct(),
      this.eventProductTabs(),
      this.eventCompareColors(),
      this.stickyAddToCartButton(),
      this.eventMediaGalleryProduct(),
      this.productMedia(),
      this.eventProductBoughTogether(),
      this.eventProductGroup(),
      this.showPopupStockNotify(),
      this.eventSkeleton(),
      this.actionDropdownSwatches();
  },
  setupEventListeners: function () {
    const e = document.querySelector(".product-detail__input"),
      t = document.querySelector(".product-sticky__input");
    e &&
      t &&
      (e.addEventListener("change", (r) => {
        r.preventDefault(), (t.value = e.value);
      }),
      t.addEventListener("change", (r) => {
        r.preventDefault(), (e.value = t.value);
      })),
      document.querySelectorAll(options.productAddons).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget,
              r = t.getAttribute("data-id"),
              o = t.getAttribute("data-text"),
              i = document.getElementById(r);
            let a = "";
            if (("share-popup" == r && (a = " dlg-disable-heading"), i)) {
              var n = EasyDialogBox.create(
                r,
                "dlg" + a + " dlg-disable-footer dlg-disable-drag",
                o,
                i.innerHTML
              );
              (n.onClose = n.destroy), n.show(300);
            }
            "compare-color-popup" == r && this.eventCompareColors(),
              "share-popup" == r && this.eventCopyShare();
          },
          !1
        );
      });
    const r = document.querySelector("[data-product-json]");
    if (null != r) {
      var o = JSON.parse(r.innerHTML),
        i = JSON.parse(localStorage.getItem("bls__recently-viewed-products"));
      i
        ? i.length < 25 && this.addProductEntry(o, i)
        : this.addProductEntry(o, i);
    }
  },
  addProductEntry: function (e, t) {
    null === t && (t = []);
    var r = e.id,
      o = e.handle,
      i = { handle: o, id: r };
    JSON.parse(localStorage.getItem("product")) != o &&
      localStorage.setItem("product", JSON.stringify(i));
    for (var a = t.length; a--; )
      if (t[a].handle === i.handle) {
        t.splice(a, 1);
        break;
      }
    t.push(i),
      localStorage.getItem(t)
        ? localStorage.getItem(
            "bls__recently-viewed-products",
            JSON.stringify(t)
          )
        : localStorage.setItem(
            "bls__recently-viewed-products",
            JSON.stringify(t)
          );
  },
  eventMediaGalleryProduct: function () {
    const e = document.querySelector(".bls__swiper-gallery-thumbnails"),
      t = document.querySelector(".bls__swiper-gallery");
    if (e)
      if (e.classList.contains("bls__swiper-vertical"))
        var r = new Swiper(
          ".bls__swiper-gallery-thumbnails.bls__swiper-vertical",
          {
            spaceBetween: 10,
            slidesPerView: 8,
            freeMode: !0,
            direction: "vertical",
            watchSlidesProgress: !0,
          }
        );
      else
        r = new Swiper(".bls__swiper-gallery-thumbnails", {
          spaceBetween: 10,
          slidesPerView: 5,
          freeMode: !0,
          watchSlidesProgress: !0,
          navigation: { nextEl: ".swiper-next", prevEl: ".swiper-prev" },
        });
    if (t)
      if (r)
        var o = new Swiper(".bls__swiper-gallery", {
          loop: !1,
          speed: 600,
          navigation: { nextEl: ".swiper-next", prevEl: ".swiper-prev" },
          thumbs: { swiper: r },
        });
      else {
        const e = "true" === t.dataset.autoplay,
          r = t?.dataset.mobile,
          i = t?.dataset.spacing,
          a = t?.dataset.sectionId;
        o = new Swiper(".bls__swiper-gallery", {
          slidesPerView: r,
          spaceBetween: Number(i),
          autoplay: e,
          speed: 600,
          loop: !1,
          grid: { rows: a },
          navigation: { nextEl: ".swiper-next", prevEl: ".swiper-prev" },
          pagination: { clickable: !0, el: ".swiper-pagination" },
        });
      }
    const i = document.querySelector(".bls__swiper-gallery-thumbnails-mobile"),
      a = document.querySelector(".bls__swiper-gallery-mobile");
    if (i && a)
      var n = new Swiper(".bls__swiper-gallery-thumbnails-mobile", {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: !0,
        watchSlidesProgress: !0,
        navigation: { nextEl: ".swiper-next", prevEl: ".swiper-prev" },
      });
    if (n)
      var c = new Swiper(".bls__swiper-gallery-mobile", {
        spaceBetween: 0,
        speed: 600,
        loop: !1,
        navigation: { nextEl: ".swiper-next", prevEl: ".swiper-prev" },
        thumbs: { swiper: n },
      });
    else
      c = new Swiper(".bls__swiper-gallery-mobile", {
        slidesPerView: 1,
        longSwipesMs: 600,
        spaceBetween: 0,
        autoplay: !1,
        loop: !1,
        navigation: { nextEl: ".swiper-next", prevEl: ".swiper-prev" },
        pagination: { clickable: !0, el: ".swiper-pagination" },
      });
    var s = [],
      l = [],
      d = [],
      u = [],
      p = [];
    document
      .querySelectorAll(".product__media-desktop [data-group]")
      .forEach((e) => {
        s.push(e);
      }),
      document
        .querySelectorAll(".product__media-desktop [data-group-thumb]")
        .forEach((e) => {
          l.push(e);
        }),
      document
        .querySelectorAll(".product__media-mobile [data-group]")
        .forEach((e) => {
          d.push(e);
        }),
      document
        .querySelectorAll(".product__media-mobile [data-group-thumb]")
        .forEach((e) => {
          u.push(e);
        }),
      document.querySelectorAll(".gallery-img[data-alt]").forEach((e) => {
        p.push(e);
      });
    var m,
      h = document
        .querySelector("[data-variant-selected]")
        ?.getAttribute("data-variant-selected");
    if (
      (document.querySelectorAll("[data-alt]").forEach((e) => {
        var t = e.getAttribute("data-alt");
        h == t &&
          document
            .querySelector("[data-variant-group]")
            ?.setAttribute("data-variant-group", !0),
          (m = document
            .querySelector("[data-variant-group]")
            ?.getAttribute("data-variant-group"));
      }),
      "true" === m)
    ) {
      let e = [],
        t = [],
        i = [],
        a = [];
      l.forEach((t) => {
        t.getAttribute("data-alt") === h && e.push(t);
      }),
        s.forEach((e) => {
          e.getAttribute("data-alt") === h && t.push(e);
        }),
        u.forEach((e) => {
          e.getAttribute("data-alt") === h && i.push(e);
        }),
        d.forEach((e) => {
          e.getAttribute("data-alt") === h && a.push(e);
        }),
        p.forEach((e) => {
          e.getAttribute("data-alt") === h
            ? (e.classList.add("media-active"),
              e.classList.remove("media-hidden"))
            : (e.classList.add("media-hidden"),
              e.classList.remove("media-active"));
        }),
        o &&
          (o.removeAllSlides(),
          o.appendSlide(e),
          o.slideToLoop(0),
          e.forEach((e) => {
            e.classList.add("media-active");
          }),
          o.update()),
        r &&
          (r.removeAllSlides(),
          r.appendSlide(t),
          r.slideToLoop(0),
          t.forEach((e) => {
            e.classList.add("media-active");
          }),
          r.update()),
        c &&
          (c.removeAllSlides(),
          c.appendSlide(i),
          c.slideToLoop(0),
          i.forEach((e) => {
            e.classList.add("media-active");
          }),
          c.update()),
        n &&
          (n.removeAllSlides(),
          n.appendSlide(a),
          n.slideToLoop(0),
          a.forEach((e) => {
            e.classList.add("media-active");
          }),
          n.update());
    }
    document
      .querySelectorAll(".bls__product-details-infor .bls__option-swatch")
      .forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            const t = e.currentTarget;
            var i = t
                .closest("variant-selects")
                .querySelector(".bls__product-color-swatches.active")
                ?.getAttribute("data-filter-color"),
              a = t
                .closest(".bls__template-product")
                .querySelector("[data-variant-group]")
                ?.getAttribute("data-variant-group");
            let m,
              h = [],
              y = [],
              b = [],
              v = [];
            "true" === a &&
              (l.forEach((e) => {
                (m = e.getAttribute("data-alt")), m === i && h.push(e);
              }),
              s.forEach((e) => {
                (m = e.getAttribute("data-alt")),
                  m === i &&
                    ("0" === e.dataset.swiperSlideIndex &&
                      e.classList.add("swiper-slide-thumb-active"),
                    y.push(e));
              }),
              u.forEach((e) => {
                (m = e.getAttribute("data-alt")), m === i && b.push(e);
              }),
              d.forEach((e) => {
                (m = e.getAttribute("data-alt")), m === i && v.push(e);
              }),
              p.forEach((e) => {
                (m = e.getAttribute("data-alt")),
                  m === i
                    ? (e.classList.add("media-active"),
                      e.classList.remove("media-hidden"))
                    : (e.classList.add("media-hidden"),
                      e.classList.remove("media-active"));
              }),
              o &&
                (o.removeAllSlides(),
                o.appendSlide(h),
                o.slideTo(0),
                h.forEach((e) => {
                  e.classList.add("media-active");
                }),
                o.update()),
              r &&
                (r.removeAllSlides(),
                r.appendSlide(y),
                r.slideTo(0),
                y.forEach((e) => {
                  e.classList.add("media-active");
                }),
                r.update()),
              c &&
                (c.removeAllSlides(),
                c.appendSlide(b),
                c.slideTo(0),
                b.forEach((e) => {
                  e.classList.add("media-active");
                }),
                c.update()),
              n &&
                (n.removeAllSlides(),
                n.appendSlide(v),
                n.slideTo(0),
                v.forEach((e) => {
                  e.classList.add("media-active");
                }),
                n.update()),
              BlsZoomThumbsnail.init()),
              "true" != a &&
                setTimeout(function () {
                  var e = Array.from(
                      t
                        .closest("variant-selects")
                        .querySelectorAll(".bls__option-swatch.active"),
                      (e) => e.getAttribute("data-value")
                    ),
                    r = JSON.parse(
                      t
                        .closest("variant-selects")
                        .querySelector('[type="application/json"]').textContent
                    ).find(
                      (t) => !t.options.map((t, r) => e[r] === t).includes(!1)
                    );
                  if (r && r.featured_media) {
                    var i = r.featured_media.id,
                      a = t
                        .closest(".bls__template-product")
                        .querySelector(
                          `.product__media-gallery [data-media-id="${i}"]`
                        )
                        .getAttribute("data-position");
                    o && o.slideTo(a - 1, 600), c && c.slideTo(a - 1, 600);
                  }
                }, 100);
          },
          !1
        );
      }),
      o &&
        o.on("slideChange", function () {
          var e = o.realIndex + 1,
            r = t.querySelector(`.gallery-img[data-position="${e}"]`);
          r?.classList.contains("model")
            ? (o.allowTouchMove = !1)
            : (o.allowTouchMove = !0);
        }),
      c.on("slideChange", function () {
        var e = c.realIndex + 1,
          t = a.querySelector(`.gallery-img[data-position="${e}"]`);
        t?.classList.contains("model")
          ? (c.allowTouchMove = !1)
          : (c.allowTouchMove = !0);
      });
  },
  productMedia: function () {
    var e = 0;
    document.querySelectorAll(options.photoZoomImage).forEach((t) => {
      t.addEventListener(
        "click",
        (r) => {
          var o = this.getProductItems(t);
          r.preventDefault();
          const i = r.currentTarget;
          if (
            i.classList.contains("external_video") ||
            i.classList.contains("video") ||
            i.classList.contains("model")
          )
            return;
          i.getAttribute("data-position")
            ? (e = i.getAttribute("data-position"))
            : i
                .closest(".product__media-list")
                .querySelector(".swiper-slide-active")
            ? (e = i
                .closest(".product__media-list")
                .querySelector(".swiper-slide-active")
                .getAttribute("data-position"))
            : i.closest(".product__media-list").firstChild &&
              (e = i
                .closest(".product__media-list")
                .firstChild?.getAttribute("data-position"));
          const a = new PhotoSwipeLightbox({
            dataSource: o,
            counter: !1,
            zoom: !1,
            preloader: !1,
            arrowPrev: !1,
            arrowNext: !1,
            close: !1,
            loop: !1,
            bgOpacity: 1,
            pswpModule: PhotoSwipe,
          });
          a.on("uiRegister", function () {
            a.pswp.ui.registerElement({
              name: "bls--close",
              isButton: !0,
              tagName: "button",
              html: '<i class="icon-x"></i>',
              onClick: () => {
                a.pswp.close();
              },
            }),
              a.pswp.ui.registerElement({
                name: "bottomBar",
                className: "pswp__bottom-bar",
                appendTo: "wrapper",
                onInit: (e, t) => {
                  let r, o, i, a, n;
                  (r = document.createElement("button")),
                    r.setAttribute("type", "button"),
                    (r.className = "pswp__button pswp__button-next"),
                    (a = document.createElement("i")),
                    (a.className = "icon-chevron-right"),
                    r.appendChild(a),
                    (r.onclick = () => {
                      t.next();
                    }),
                    e.appendChild(r),
                    (i = document.createElement("span")),
                    (i.className = "pswp__counter"),
                    t.on("change", () => {
                      i.innerText =
                        t.currIndex +
                        1 +
                        t.options.indexIndicatorSep +
                        t.getNumItems();
                    }),
                    e.appendChild(i),
                    (o = document.createElement("button")),
                    o.setAttribute("type", "button"),
                    (o.className = "pswp__button pswp__button-prev"),
                    (n = document.createElement("i")),
                    (n.className = "icon-chevron-left"),
                    o.appendChild(n),
                    (o.onclick = () => {
                      t.prev();
                    }),
                    e.appendChild(o);
                },
              });
          }),
            a.loadAndOpen(e - 1),
            new PhotoSwipeVideoPlugin(a, {}),
            a.init();
        },
        !1
      );
    });
    var t = document
      .querySelector(".bls__template-product")
      .getAttribute("data-section");
    document
      .querySelectorAll("[data-product-media-type-video-desktop]")
      .forEach(function (e) {
        theme.ProductVideo.init(e, t);
      }),
      document
        .querySelectorAll("[data-product-media-type-video-mobile]")
        .forEach(function (e) {
          theme.ProductVideo.init(e, t);
        });
    var r = document.querySelectorAll(
      "[data-product-media-type-model-desktop]"
    );
    r.length >= 1 && theme.ProductModel.init(r, t);
    var o = document.querySelectorAll("[data-product-media-type-model-mobile]");
    o.length >= 1 && theme.ProductModel.init(o, t);
  },
  getProductItems: function (e) {
    var t = [];
    return (
      e.closest(".product__media-list").querySelectorAll(".media-active")
        .length > 0
        ? e
            .closest(".product__media-list")
            .querySelectorAll(".media-active " + options.mediaImage)
            .forEach((e) => {
              var r = e,
                o = r.getAttribute("data-width"),
                i = r.getAttribute("data-height");
              if (r.classList.contains("video")) {
                var a = r.getAttribute("data-source-url"),
                  n = r.getAttribute("data-src");
                t.push({
                  videoSrc: a,
                  type: "video",
                  width: o,
                  height: i,
                  msrc: n,
                });
              } else if (r.classList.contains("external_video")) {
                var c = r.getAttribute("data-source"),
                  s = r.getAttribute("data-video-id"),
                  l = ((a = "youtube"), "");
                "youtube" == c
                  ? ((a = "youtube"),
                    (l = "https://www.youtube.com/watch?v=" + s))
                  : ((a = "vimeo"), (l = "https://vimeo.com/" + s)),
                  t.push({ videoSrc: l, type: "video", width: o, height: i });
              } else if (!r.classList.contains("model")) {
                var d = r.getAttribute("data-src");
                t.push({ src: d, width: o, height: i });
              }
            })
        : e
            .closest(".product__media-list")
            .querySelectorAll(options.mediaImage)
            .forEach((e) => {
              var r = e,
                o = r.getAttribute("data-width"),
                i = r.getAttribute("data-height");
              if (r.classList.contains("video")) {
                var a = r.getAttribute("data-source-url"),
                  n = r.getAttribute("data-src");
                t.push({
                  videoSrc: a,
                  type: "video",
                  width: o,
                  height: i,
                  msrc: n,
                });
              } else if (r.classList.contains("external_video")) {
                var c = r.getAttribute("data-source"),
                  s = r.getAttribute("data-video-id"),
                  l = ((a = "youtube"), "");
                "youtube" == c
                  ? ((a = "youtube"),
                    (l = "https://www.youtube.com/watch?v=" + s))
                  : ((a = "vimeo"), (l = "https://vimeo.com/" + s)),
                  t.push({ videoSrc: l, type: "video", width: o, height: i });
              } else if (!r.classList.contains("model")) {
                var d = r.getAttribute("data-src");
                t.push({ src: d, width: o, height: i });
              }
            }),
      t
    );
  },
  eventCopyShare: function () {
    document.querySelectorAll(options.shareCopy).forEach((e) => {
      e.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          const t = e.currentTarget;
          var r = document.getElementById("share-popup-input");
          r.select(),
            r.setSelectionRange(0, 99999),
            navigator.clipboard.writeText(r.value),
            t.classList.add("active");
        },
        !1
      );
    });
  },
  eventCompareColors: function () {
    document.querySelectorAll(options.compareColorsBtn).forEach((e) => {
      e.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          const t = e.currentTarget,
            r = t.getAttribute("data-color"),
            o = t.getAttribute("data-image"),
            i = t.getAttribute("data-ratio"),
            a = (e) =>
              e
                .trim()
                .replace(/[^\w\s-]/g, "")
                .replace(/[\s_-]+/g, "-")
                .replace(/^-+|-+$/g, "");
          if (t.classList.contains("active"))
            t.classList.remove("active"),
              document
                .querySelector(`.dlg .item-compare-color${a(r)}`)
                .remove(),
              setTimeout(function () {
                document.querySelector(".dlg .item-compare-color") ||
                  document
                    .querySelector(".dlg .compare-color-empty")
                    .classList.remove("d-none");
              }, 100);
          else if (
            (document
              .querySelector(".dlg .compare-color-empty")
              .classList.add("d-none"),
            t.classList.add("active"),
            r && o)
          ) {
            const e =
                '<div class="image" style="--aspect-ratio: ' +
                i +
                '"><img src="' +
                o +
                '" alt="' +
                r +
                '"></div><p class="mt-10 heading-color capitalize">' +
                r +
                "</p>",
              t = document.createElement("div");
            t.classList.add(`item-compare-color${a(r)}`),
              (t.innerHTML = e),
              document
                .querySelector(".dlg .bls__compare-colors-list")
                .appendChild(t);
          }
        },
        !1
      );
    });
  },
  eventProductTabs: function () {
    if (
      (document.querySelectorAll(options.navTabs).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget,
              r = t.getAttribute("data-block-id");
            if (!t.closest(".data.item").classList.contains("active")) {
              for (var o of document.querySelectorAll(".data.item"))
                o.classList.remove("active");
              for (var o of document.querySelectorAll(options.tabContent))
                o.classList.remove("active"),
                  (o.querySelector(".tab-panel").style.display = "none");
              const e = document.getElementById(r);
              e.classList.add("active"),
                (e.querySelector(".tab-panel").style.display = "block"),
                t.closest(".data.item").classList.add("active");
            }
          },
          !1
        );
      }),
      document.querySelectorAll(options.accorditionTabs).forEach((e) => {
        e.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            const t = e.currentTarget.getAttribute("data-block-id"),
              r = document.getElementById(t);
            if (r)
              if (r.classList.contains("active"))
                slideAnime({
                  target: r.querySelector(".tab-panel"),
                  animeType: "slideUp",
                }),
                  r.classList.remove("active");
              else {
                for (var o of document.querySelectorAll(
                  options.tabContentActive
                ))
                  o.classList.contains("active") &&
                    (o.classList.remove("active"),
                    slideAnimeHidden({
                      target: o.querySelector(".tab-panel"),
                    }));
                slideAnime({
                  target: r.querySelector(".tab-panel"),
                  animeType: "slideDown",
                }),
                  r.classList.add("active");
              }
          },
          !1
        );
      }),
      document.querySelector(".inside-product-main-infomation"))
    ) {
      const e = document.querySelector(options.productInfomationTab);
      e.classList.remove("hidden"),
        document.querySelector(".bls__template-product-2") &&
          document
            .querySelector(".bls__template-product-2")
            .classList.add("inside-product-main-infomation-layout2"),
        setTimeout(function () {
          e.querySelector(".loading").remove(),
            e.appendChild(
              document.querySelector(
                ".inside-product-main-infomation .product.info.detailed"
              )
            );
        }, 500);
    }
    if (window.innerWidth >= 992) {
      const e = document.querySelector(".inside-product-main-infomation");
      if (document.querySelector(".bls__template-product-2") && !e) {
        const e = document.querySelector(
          options.productInfomationTabLayoutSecond
        );
        e.classList.remove("hidden"),
          document.querySelector(".design-accordition")
            ? e.classList.add("design-accordition")
            : document.querySelector(".design-show_all") &&
              e.classList.add("design-show_all"),
          setTimeout(function () {
            e.querySelector(".loading").remove(),
              e.appendChild(document.querySelector(".product.info.detailed"));
          }, 500);
      }
    }
  },
  eventFlashSold: function () {
    Shopify.eventFlashSold();
  },
  eventVisitors: function () {
    const e = document.querySelector(options.visitors);
    if (!e) return;
    const t = Number(e.getAttribute("data-count-range-max")),
      r = Number(e.getAttribute("data-count-range-min")),
      o = Number(e.getAttribute("data-view-duration"));
    var i = Math.floor(Math.random() * (t - r + 1)) + r;
    (document.querySelector(".bls__visitor-count").innerHTML = i),
      setInterval(function () {
        var e = Math.floor(Math.random() * (t - r + 1)) + r;
        document.querySelector(".bls__visitor-count").innerHTML = e;
      }, 1e3 * o),
      (e.style.display = "block");
  },
  stickyAddToCartButton: function () {
    document.addEventListener("DOMContentLoaded", function () {
      var e = document.querySelector(".product-form__submit"),
        t = document.querySelector("#bls__sticky-addcart"),
        r = 0;
      t && t.classList.contains("only-show-desktop")
        ? window.innerWidth >= 992 &&
          document.body.classList.add("sticky-addtocart-show")
        : document.body.classList.remove("sticky-addtocart-show"),
        "IntersectionObserver" in window &&
          "IntersectionObserverEntry" in window &&
          "intersectionRatio" in window.IntersectionObserverEntry.prototype &&
          t &&
          new IntersectionObserver(
            function (e, o) {
              e.forEach(function (e) {
                e.boundingClientRect.top < r && e.boundingClientRect.top < 0
                  ? (t.classList.add("sticky-addcart-show"),
                    document
                      .querySelector("body")
                      .classList.add("sticky-addcart-show"))
                  : t.classList.remove("sticky-addcart-show"),
                  (r = e.boundingClientRect.top);
              });
            },
            { threshold: 0.5 }
          ).observe(e);
    });
  },
  eventCountdowProduct: function () {
    const e = document.querySelector(options.countdowProduct);
    if (!e) return;
    const t = document
      .querySelector(options.templateProduct)
      .getAttribute("data-product-id");
    fetch("/admin/orders.json")
      .then((e) => e.json())
      .then((r) => {
        var o = 0;
        (r = r.orders).forEach(function (e, r) {
          e.line_items.forEach(function (e, r) {
            if (e.product_id == t) {
              var i = e.quantity;
              o += i || 0;
            }
          });
        });
        var i = parseInt(e.querySelector(".bls__count").innerText),
          a = (i / (i + o)) * 100;
        setTimeout(function () {
          e.querySelector(".progressbar div").style.width = a + "%";
        }, 300);
      })
      .catch((e) => {
        throw e;
      }),
      setInterval(function () {
        fetch("/admin/orders.json")
          .then((e) => e.json())
          .then((r) => {
            var o = 0;
            (r = r.orders).forEach(function (e, r) {
              e.line_items.forEach(function (e, r) {
                if (e.product_id == t) {
                  var i = e.quantity;
                  o += i || 0;
                }
              });
            });
            var i = 0;
            fetch("/admin/products/" + t + "/variants.json")
              .then((e) => e.json())
              .then((t) => {
                t.variants.forEach(function (e, t) {
                  var r = e.inventory_quantity;
                  i += r || 0;
                }),
                  (e.querySelector(".bls__count").innerHTML = i);
              })
              .catch((e) => {
                throw e;
              });
            var a = parseInt(e.querySelector(".bls__count").innerText),
              n = (a / (a + o)) * 100;
            setTimeout(function () {
              e.querySelector(".progressbar div").style.width = n + "%";
            }, 300);
          })
          .catch((e) => {
            throw e;
          });
      }, 1e4);
  },
  eventProductBoughTogether: function () {
    var e = document.querySelector(
      '.productBoughTogether[type="application/json"]'
    );
    if (e) {
      var t = JSON.parse(e.innerText),
        r = "";
      t.forEach((e, t, o) => {
        Object.is(o.length - 1, t) ? (r += e) : (r += e + "%20OR%20id:");
      });
      var o = "?q=id:" + r + "&section_id=product-bough-together";
      fetch(`${window.routes.search_url}${o}`)
        .then((e) => e.text())
        .then(async (e) => {
          const t = new DOMParser().parseFromString(e, "text/html");
          document.getElementById("bls__product-bought-together").innerHTML =
            t.querySelector(".bls__bought-together").innerHTML;
        })
        .catch((e) => {
          throw error;
        })
        .finally(() => {
          this.eventProductBoughTogetherAction(), BlsLazyloadImg.init();
        });
    }
  },
  eventProductBoughTogetherAction: function () {
    var e = this;
    document.querySelectorAll(".bought-together-checkbox").forEach((t) => {
      t.addEventListener(
        "change",
        (t) => {
          var r,
            o,
            i = t.target,
            a = 0,
            n = 0,
            c = 0,
            s = t.target.getAttribute("data-handle"),
            l = i
              .closest("#bls__product-bought-together")
              .querySelector(".product-bought-image-item." + s);
          i.checked
            ? (l.classList.add("select"),
              i
                .closest(".product-bought-together-item")
                .classList.add("select"),
              i
                .closest(".product-bought-together-item")
                .querySelector(".product-variant-option")
                .removeAttribute("disabled"),
              i
                .closest(".product-bought-together-item")
                .querySelector(".quantity")
                .removeAttribute("disabled"))
            : (l.classList.remove("select"),
              i
                .closest(".product-bought-together-item")
                .classList.remove("select"),
              i
                .closest(".product-bought-together-item")
                .querySelector(".product-variant-option")
                .setAttribute("disabled", !0),
              i
                .closest(".product-bought-together-item")
                .querySelector(".quantity")
                .setAttribute("disabled", !0)),
            setTimeout(function () {
              var t = document.querySelectorAll(
                ".product-bought-together-item.select"
              );
              t.forEach((e) => {
                var t = e.querySelector(".product-variant-option");
                (r = t.getAttribute("data-price")),
                  (o = t.getAttribute("data-compare-price")),
                  (a += Number(r)),
                  (n += Number(o));
              }),
                (c = n - a),
                e.eventProductBoughTogetherUpdatePrice(a, n, c),
                t.length <= 1
                  ? document
                      .querySelector(".bought-together-submit")
                      .setAttribute("disabled", !0)
                  : document
                      .querySelector(".bought-together-submit")
                      .removeAttribute("disabled");
            }, 50);
        },
        !1
      );
    }),
      document
        .querySelectorAll(
          "#bls__product-bought-together .product-variant-option"
        )
        .forEach((t) => {
          t.addEventListener(
            "change",
            (t) => {
              var r,
                o = t.target,
                i = 0,
                a = 0,
                n = o.options[o.selectedIndex].getAttribute("data-image"),
                c = o.options[o.selectedIndex].getAttribute("data-price"),
                s = o.getAttribute("data-handle"),
                l =
                  o.options[o.selectedIndex].getAttribute("data-compare-price"),
                d = o
                  .closest("#bls__product-bought-together")
                  .querySelector(".product-bought-image-item." + s)
                  .querySelector("img");
              d && (d.removeAttribute("srcset"), d.setAttribute("src", n));
              var u = o
                .closest(".product-bought-together-item")
                .querySelector(".info-price");
              u.querySelector(".price__regular .price").innerHTML =
                Shopify.formatMoney(c, cartStrings.money_format);
              const p = u.querySelector(".bls__price");
              if (
                (p.classList.remove("price--sold-out", "price--on-sale"),
                p
                  .querySelector(".price__regular .price")
                  .classList.remove("special-price"),
                l && l > c)
              ) {
                const e = Shopify.formatMoney(l, cartStrings.money_format);
                p.querySelector(".compare-price") &&
                  (p.querySelector(".compare-price").innerHTML = e),
                  p.classList.add("price--on-sale"),
                  p
                    .querySelector(".price__regular .price")
                    .classList.add("special-price");
              }
              o.setAttribute("data-price", c),
                o.setAttribute("data-compare-price", l),
                document
                  .querySelectorAll(".product-bought-together-item.select")
                  .forEach((e) => {
                    var t = e.querySelector(".product-variant-option");
                    (c = t.getAttribute("data-price")),
                      (l = t.getAttribute("data-compare-price")),
                      (i += Number(c)),
                      (a += Number(l));
                  }),
                (r = a - i),
                e.eventProductBoughTogetherUpdatePrice(i, a, r);
            },
            !1
          );
        }),
      document.querySelectorAll(".bought-together-submit").forEach((e) => {
        e.addEventListener("click", this.submitBoughtTogether.bind(this), !1);
      });
  },
  submitBoughtTogether: function (e) {
    e.preventDefault();
    const t = e.currentTarget,
      r =
        document.querySelector("cart-notification") ||
        document.querySelector("cart-drawer"),
      o = document.getElementById("bls__bought-together-form"),
      i = fetchConfig("json");
    (i.headers["X-Requested-With"] = "XMLHttpRequest"),
      delete i.headers["Content-Type"];
    const a = new FormData(o);
    r &&
      (a.append(
        "sections",
        r.getSectionsToRender().map((e) => e.id)
      ),
      a.append("sections_url", window.location.pathname)),
      (i.body = a),
      t.classList.add("btn-loading"),
      fetch(`${routes.cart_add_url}.js`, i)
        .then((e) => e.text())
        .then((e) => {
          fetch("/cart.json")
            .then((e) => e.json())
            .then((e) => {
              if (null != e.item_count) {
                document.querySelectorAll(".cart-count").forEach((t) => {
                  t.classList.contains("cart-count-drawer")
                    ? (t.innerHTML = `(${e.item_count})`)
                    : (t.innerHTML = e.item_count);
                }),
                  document.querySelector("header-total-price") &&
                    document.querySelector("header-total-price").updateTotal(e);
                const t = document.querySelector("free-ship-progress-bar");
                t && t.init(e.items_subtotal_price);
              }
            })
            .catch((e) => {
              throw e;
            });
          const t = JSON.parse(e);
          r.getSectionsToRender().forEach((e) => {
            const o = document.getElementById(e.id),
              i = new DOMParser().parseFromString(
                t.sections[e.id],
                "text/html"
              );
            o.innerHTML = i.querySelector("#form-mini-cart").innerHTML;
            const a = r.querySelector(".cart-countdown-time"),
              n = i.querySelector(".cart-countdown-time");
            a && n && ((a.innerHTML = n.innerHTML), r.countdownTimer());
          }),
            r.cartAction();
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          t.classList.remove("btn-loading"), r.open(), BlsLazyloadImg.init();
        });
  },
  eventProductBoughTogetherUpdatePrice: function (e, t, r) {
    var o = document.querySelector(".bought-together-container .total-product");
    o &&
      ((o.querySelector(".saved-price .price").innerHTML = Shopify.formatMoney(
        r,
        cartStrings.money_format
      )),
      (o.querySelector(".bls__total-price .price__sale .price-item").innerHTML =
        Shopify.formatMoney(t, cartStrings.money_format)),
      (o.querySelector(".bls__total-price .price").innerHTML =
        Shopify.formatMoney(e, cartStrings.money_format)),
      t > e
        ? (o.querySelector(".bls__total-price").classList.add("price--on-sale"),
          o
            .querySelector(".bls__total-price .price")
            .classList.add("special-price"))
        : (o
            .querySelector(".bls__total-price")
            .classList.remove("price--on-sale"),
          o
            .querySelector(".bls__total-price .price")
            .classList.remove("special-price")),
      r > 1
        ? (o.querySelector(".saved-price").classList.add("d-block"),
          o.querySelector(".saved-price").classList.remove("d-none"))
        : (o.querySelector(".saved-price").classList.add("d-none"),
          o.querySelector(".saved-price").classList.remove("d-block")));
  },
  eventProductGroup: function () {
    var e = document.querySelector('.productGroup[type="application/json"]');
    if (e) {
      var t = JSON.parse(e.innerText),
        r = "";
      t.forEach((e, t, o) => {
        Object.is(o.length - 1, t) ? (r += e) : (r += e + "%20OR%20id:");
      });
      var o = "?q=id:" + r + "&section_id=product-grouped";
      fetch(`${window.routes.search_url}${o}`)
        .then((e) => e.text())
        .then(async (e) => {
          const t = new DOMParser().parseFromString(e, "text/html");
          document.getElementById("bls__product-group").innerHTML =
            t.querySelector(".bls__product-group").innerHTML;
        })
        .catch((e) => {
          throw error;
        })
        .finally(() => {
          this.eventProductGroupAction(), BlsLazyloadImg.init();
        });
    }
  },
  eventProductGroupAction: function () {
    document
      .querySelectorAll("#bls__product-group .product-variant-option")
      .forEach((e) => {
        e.addEventListener(
          "change",
          (e) => {
            var t = e.target,
              r = t.options[t.selectedIndex].getAttribute("data-image"),
              o = t.options[t.selectedIndex].getAttribute("data-price"),
              i = t.getAttribute("data-handle"),
              a = t.options[t.selectedIndex].getAttribute("data-compare-price"),
              n = t
                .closest("#bls__product-group")
                .querySelector(".product-group-image-item." + i)
                .querySelector("img");
            n && (n.removeAttribute("srcset"), n.setAttribute("src", r));
            var c = t
              .closest(".product-group-item")
              .querySelector(".info-price");
            c.querySelector(".price__regular .price").innerHTML =
              Shopify.formatMoney(o, cartStrings.money_format);
            const s = c.querySelector(".bls__price");
            if (
              (s.classList.remove("price--sold-out", "price--on-sale"),
              s
                .querySelector(".price__regular .price")
                .classList.remove("special-price"),
              a && a > o)
            ) {
              const e = Shopify.formatMoney(a, cartStrings.money_format);
              s.querySelector(".compare-price") &&
                (s.querySelector(".compare-price").innerHTML = e),
                s.classList.add("price--on-sale"),
                s
                  .querySelector(".price__regular .price")
                  .classList.add("special-price");
            }
            t.setAttribute("data-price", o),
              t.setAttribute("data-compare-price", a);
          },
          !1
        );
      });
    let e = 0;
    const t = document.querySelectorAll(".quantity__input-product-group");
    t.forEach((r) => {
      let o = r.value,
        i = parseFloat(o);
      isNaN(i) || (e += i),
        r.addEventListener("change", () => {
          (e = 0),
            t.forEach((t) => {
              let r = t.value,
                o = parseFloat(r);
              isNaN(o) || (e += o);
            });
        });
    }),
      document.querySelectorAll(".product-group-submit").forEach((t) => {
        t.addEventListener(
          "click",
          (r) => {
            if (0 === e) {
              const e = document.querySelector(".form-infor .add-cart-error"),
                r = t.getAttribute("data-add-cart-err-qty");
              if (!e) return;
              var o = EasyDialogBox.create(
                "add_cart_error",
                "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
                "",
                (e.innerHTML = r)
              );
              (o.onClose = o.destroy), o.show();
            } else this.submitProductGroup(r);
          },
          !1
        );
      }),
      document.querySelectorAll(".product-group-buy-now").forEach((t) => {
        t.addEventListener(
          "click",
          (r) => {
            if (0 === e) {
              const e = document.querySelector(".form-infor .add-cart-error"),
                r = t.getAttribute("data-add-cart-err-qty");
              if (!e) return;
              var o = EasyDialogBox.create(
                "add_cart_error",
                "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
                "",
                (e.innerHTML = r)
              );
              (o.onClose = o.destroy), o.show();
            } else this.submitNowProductGroup(r);
          },
          !1
        );
      });
  },
  submitProductGroup: function (e) {
    e.preventDefault();
    const t = e.currentTarget,
      r =
        document.querySelector("cart-notification") ||
        document.querySelector("cart-drawer"),
      o = document.getElementById("form-product-grouped"),
      i = fetchConfig("json");
    (i.headers["X-Requested-With"] = "XMLHttpRequest"),
      delete i.headers["Content-Type"];
    let a = 0;
    const n = new FormData(o);
    r &&
      (n.append(
        "sections",
        r.getSectionsToRender().map((e) => e.id)
      ),
      n.append("sections_url", window.location.pathname)),
      (i.body = n),
      t.classList.add("btn-loading"),
      fetch(`${routes.cart_add_url}.js`, i)
        .then((e) => e.text())
        .then((e) => {
          fetch("/cart.json")
            .then((e) => e.json())
            .then((e) => {
              if (null != e.item_count) {
                document.querySelectorAll(".cart-count").forEach((t) => {
                  t.classList.contains("cart-count-drawer")
                    ? (t.innerHTML = `(${e.item_count})`)
                    : (t.innerHTML = e.item_count);
                }),
                  document.querySelector("header-total-price") &&
                    document.querySelector("header-total-price").updateTotal(e);
                const t = document.querySelector("free-ship-progress-bar");
                t && t.init(e.items_subtotal_price);
              }
            })
            .catch((e) => {
              throw e;
            });
          const t = JSON.parse(e);
          if (t.message) {
            const e = document.querySelector(".form-infor .add-cart-error");
            if (!e) return;
            var o = EasyDialogBox.create(
              "add_cart_error",
              "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
              "",
              (e.innerHTML = t.description)
            );
            (o.onClose = o.destroy), o.show();
          } else
            t.items.forEach((e) => {
              e.quantity > 0 && (a = 1);
            }),
              r.getSectionsToRender().forEach((e) => {
                const o = document.getElementById(e.id),
                  i = new DOMParser().parseFromString(
                    t.sections[e.id],
                    "text/html"
                  );
                o.innerHTML = i.querySelector("#form-mini-cart").innerHTML;
                const a = r.querySelector(".cart-countdown-time"),
                  n = i.querySelector(".cart-countdown-time");
                a && n && ((a.innerHTML = n.innerHTML), r.countdownTimer());
              }),
              r.cartAction();
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          t.classList.remove("btn-loading"),
            1 === a && r.open(),
            BlsLazyloadImg.init();
        });
  },
  submitNowProductGroup: function (e) {
    e.preventDefault();
    const t = document.getElementById("form-product-grouped"),
      r = fetchConfig("json");
    (r.headers["X-Requested-With"] = "XMLHttpRequest"),
      delete r.headers["Content-Type"];
    const o = new FormData(t);
    (r.body = o),
      fetch(`${routes.cart_add_url}.js`, r)
        .then((e) => e.text())
        .then((e) => {
          const t = JSON.parse(e);
          if (t.items) window.location.href = "/checkout";
          else {
            const e = document.querySelector(".form-infor .add-cart-error");
            if (!e) return;
            var r = EasyDialogBox.create(
              "add_cart_error",
              "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
              "",
              (e.innerHTML = t.description)
            );
            (r.onClose = r.destroy), r.show();
          }
        })
        .catch((e) => {
          throw e;
        });
  },
  showPopupStockNotify: function () {
    const e = document.querySelectorAll(".product-notify-stock"),
      t = this;
    e.forEach((e) => {
      e.addEventListener("click", (e) => {
        const r = e.currentTarget.getAttribute("data-product-variant");
        e.preventDefault(), t.fetchDataStockNotifySection(r);
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
          r = t.getAttribute("data-stock-title");
        if (t) {
          var o = EasyDialogBox.create(
            "stockNotify",
            "dlg dlg-disable-footer dlg-disable-drag",
            r,
            t.innerHTML
          );
          (o.onClose = o.destroy), o.show();
        }
      })
      .catch((e) => {
        throw e;
      });
  },
  actionDropdownSwatches: function () {
    document.querySelectorAll("[data-swatches-value]").forEach((e) => {
      e.addEventListener(
        "click",
        (e) => {
          const t = e.currentTarget;
          if (t.closest(".bls__color-dropdown").classList.contains("isClicked"))
            t.closest(".bls__color-dropdown").classList.remove("isClicked");
          else {
            for (var r of document.querySelectorAll(".bls__color-dropdown"))
              r.classList.remove("isClicked");
            t.closest(".bls__color-dropdown").classList.add("isClicked");
          }
        },
        !1
      );
    }),
      document
        .querySelectorAll(".bls__product-color-swatches-dropdown")
        .forEach((e) => {
          e.addEventListener("click", (e) => {
            const t = e.currentTarget,
              r = t.dataset.value;
            (t
              .closest(".bls__color-dropdown")
              .querySelector(
                ".bls__color-dropdown-action .bls__color-dropdown-value"
              ).innerHTML = r),
              t.closest(".bls__color-dropdown").classList.remove("isClicked");
          });
        }),
      document.body.addEventListener(
        "click",
        this.handleBodyClick.bind(this),
        !0
      );
  },
  handleBodyClick: function (e) {
    if (!e.target.closest(".bls__color-dropdown"))
      for (var t of document.querySelectorAll(".bls__color-dropdown"))
        t.classList.remove("isClicked");
  },
  eventSkeleton: function () {
    window.setTimeout(function () {
      this.document
        .getElementById("MainContent")
        .classList.remove("skeleton-product-detail");
    }, 1500);
  },
};
BlsEventMainProductShopify.init();
var BlsEventProductSidebar = {
  init: function () {
    this.initProductSidebar(), this.productSidebarAction();
  },
  initProductSidebar: function () {
    const e = this,
      t = document.querySelector(".bls__product-sidebar"),
      r = t?.getAttribute("data-section-id"),
      o = document.querySelector(".bls-sidebar-content"),
      i = t?.getAttribute("data-view"),
      a = document.querySelector(".bls__template-product-sidebar"),
      n = t?.getAttribute("data-show-side"),
      c = window.location.href,
      s = c.indexOf("view=left-sidebar") >= 1,
      l = c.indexOf("view=right-sidebar") >= 1,
      d = c.indexOf("view=drawer-sidebar") > -1;
    void 0 !== r &&
      void 0 !== i &&
      fetch("?section_id=" + r + "&view=" + i + "-sidebar")
        .then((e) => e.text())
        .then((e) => {
          const t = new DOMParser().parseFromString(e, "text/html"),
            r = t.querySelector("#product-sidebar-content")?.innerHTML;
          s || l || d
            ? (s || l ? (a.innerHTML = r) : d && (o.innerHTML = r),
              (o.innerHTML = r))
            : "true" == n &&
              ("left" == i || "right" == i
                ? (a.innerHTML = r)
                : "drawer" == i &&
                  ((document.querySelector(
                    ".bls__template-main-product"
                  ).style.width = "100%"),
                  document
                    .querySelector(".bls-sidebar-drawer")
                    .removeAttribute("style"),
                  (o.innerHTML = r)),
              (o.innerHTML = r)),
            Shopify.designMode &&
              ("true" == n
                ? ("left" == i || "right" == i
                    ? ((a.innerHTML = r),
                      (document.querySelector(
                        ".bls__template-product-sidebar"
                      ).style.display = "block"),
                      (document.querySelector(
                        ".bls__template-main-product"
                      ).style.width = "75%"))
                    : "drawer" == i &&
                      ((o.innerHTML = r),
                      document
                        .querySelector(".bls-sidebar-drawer")
                        .removeAttribute("style"),
                      (document.querySelector(
                        ".bls__template-main-product"
                      ).style.width = "100%"),
                      (document.querySelector(
                        ".bls__template-product-sidebar"
                      ).style.display = "none")),
                  (o.innerHTML = r))
                : (("left" != i && "right" != i) ||
                    (document.querySelector(
                      ".bls__template-product-sidebar"
                    ).style.display = "none"),
                  (document.querySelector(
                    ".bls__template-main-product"
                  ).style.width = "100%")));
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          const t = document.querySelector(".contain-sidebar");
          t && t.remove(),
            BlsInstagramShopify.init(),
            e.initToggleSidebar(),
            e.productSidebarCheckLayout();
        });
  },
  open: function () {
    const e = document.querySelector(".bls-sidebar-drawer");
    e.classList.add("bls__opend-popup-header"),
      document
        .querySelector(".bls__overlay")
        .classList.remove("d-none-overlay"),
      e.addEventListener(
        "transitionend",
        () => {
          e.focus();
        },
        { once: !0 }
      ),
      document.body.addEventListener("click", this.onBodyClick);
  },
  close: function () {
    document
      .querySelector(".bls-sidebar-drawer")
      .classList.remove("bls__opend-popup-header"),
      document.querySelector(".bls__overlay").classList.add("d-none-overlay"),
      document.documentElement.classList.remove("hside_opened"),
      document.body.removeEventListener("click", this.onBodyClick);
  },
  productSidebarAction: function () {
    const e = document.querySelector(".action-product-sidebar"),
      t = document.querySelector(".bls-sidebar-drawer");
    e?.addEventListener("click", () => {
      t.classList.contains("bls__opend-popup-header")
        ? this.close()
        : this.open();
    }),
      document
        .querySelector(".bls-sidebar-drawer-wrapper .close-button")
        ?.addEventListener("click", () => {
          this.close();
        }),
      document.querySelector(".bls__overlay").addEventListener("click", () => {
        this.close();
      });
  },
  initToggleSidebar: function () {
    document.querySelectorAll(".sidebar-item > .sidebar-title").forEach((e) => {
      e.addEventListener("click", (t) => {
        t.preventDefault();
        const r =
          t.currentTarget.parentElement.querySelector(".sidebar-content");
        slideAnime({ target: r, animeType: "slideToggle" }),
          e.closest(".sidebar-item").classList.contains("active")
            ? e.closest(".sidebar-item").classList.remove("active")
            : e.closest(".sidebar-item").classList.add("active");
      });
    });
  },
  productSidebarCheckLayout: function () {
    const e = window.location.href,
      t = e.indexOf("view=left-sidebar") > -1,
      r = e.indexOf("view=right-sidebar") > -1,
      o = e.indexOf("view=drawer-sidebar") > -1;
    t
      ? (document.querySelector(".bls__template-product-sidebar").style.order =
          "-1")
      : r
      ? (document.querySelector(".bls__template-product-sidebar").style.order =
          "1")
      : o &&
        (document.querySelector(".bls-sidebar-drawer").removeAttribute("style"),
        (document.querySelector(".bls__template-main-product").style.width =
          "100%"));
  },
};
BlsEventProductSidebar.init(),
  document.addEventListener("shopify:section:load", function (e) {
    null != e.target.querySelector(".bls__product-sidebar") &&
      BlsEventProductSidebar.init();
  });
var BlsZoomThumbsnail = {
  init: function () {
    this.initZoomImage();
  },
  initZoomImage: function () {
    const e = document.querySelectorAll(".bls__zoom-hover img");
    if (e) {
      const t = document
        .querySelector("[data-zoom-option]")
        .getAttribute("data-zoom-option");
      e.forEach((e) => {
        const r = e
            .closest(".bls__template-main-product")
            .querySelector(".bls__zoom-external"),
          o = e.closest("[data-pane-container]");
        new Drift(e, {
          sourceAttribute: "data-zoom",
          inlinePane: "inner-2" === t,
          zoomFactor: 2,
          containInline: r,
          paneContainer: "external" === t ? r : o,
          hoverBoundingBox: "external" === t,
          onShow: function () {
            o.classList.add("relative");
          },
          onHide: function () {
            o.classList.remove("relative");
          },
        });
      });
    }
  },
};
BlsZoomThumbsnail.init();
class ScrollReview extends HTMLElement {
  constructor() {
    super(), this.addEventListener("click", this.onButtonClick.bind(this));
  }
  onButtonClick(e) {
    e.preventDefault();
    let t = document.querySelector(".bls__product-tabs");
    if (
      (t.querySelectorAll(".tab-content-all").length &&
        (t =
          document.querySelector("[tab-review]") ||
          document.querySelector("[tab-review-app]")),
      t.classList.contains("inside-product-main-infomation") &&
        (t = document.querySelector(".bls__product-tabs-content")),
      t)
    ) {
      var r = t;
      do {
        if (!(r = r.parentNode)) return;
        r.scrollTop += 1;
      } while (0 == r.scrollTop);
      var o = 0;
      do {
        if (t == r) break;
        o += t.offsetTop;
      } while ((t = t.offsetParent));
      (scroll = function (e, t, r, o) {
        ++o > 30 ||
          ((e.scrollTop = t + ((r - t) / 30) * o),
          setTimeout(function () {
            scroll(e, t, r, o);
          }, 10));
      }),
        scroll(r, r.scrollTop, o, 0),
        setTimeout(() => {
          this.eventProductTabs();
        }, 300);
    }
  }
  eventProductTabs() {
    const e =
      document.querySelector("[tab-review]") ||
      document.querySelector("[tab-review-app]");
    if (e) {
      if (e.classList.contains("accordition")) {
        const r = e.getAttribute("data-block-id"),
          o = document.getElementById(r);
        if (!o) return;
        if (!o.classList.contains("active")) {
          for (var t of document.querySelectorAll(options.tabContent))
            t.classList.remove("active"),
              slideAnime({
                target: t.querySelector(".tab-panel"),
                animeType: "slideUp",
              });
          slideAnime({
            target: o.querySelector(".tab-panel"),
            animeType: "slideDown",
          }),
            o.classList.add("active");
        }
      }
      if (e.classList.contains("is-nav-tabs")) {
        const r = e.getAttribute("data-block-id");
        if (!e.closest(".data.item").classList.contains("active")) {
          for (var t of document.querySelectorAll(".data.item"))
            t.classList.remove("active");
          for (var t of document.querySelectorAll(options.tabContent))
            t.classList.remove("active"),
              (t.querySelector(".tab-panel").style.display = "none");
          const o = document.getElementById(r);
          o.classList.add("active"),
            (o.querySelector(".tab-panel").style.display = "block"),
            e.closest(".data.item").classList.add("active");
        }
      }
    }
  }
}
customElements.define("review-scroll", ScrollReview);