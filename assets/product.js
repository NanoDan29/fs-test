function fetchConfig(e = "json") {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: `application/${e}` },
  };
}
class QuickBuy extends HTMLElement {
  constructor() {
    super(),
      (this.miniCart =
        document.querySelector("cart-notification") ||
        document.querySelector("cart-drawer")),
      (this.buttonAddToCart = this.querySelector(".bls__js-addtocart")),
      this.buttonAddToCart.addEventListener(
        "click",
        this.actionAddToCart.bind(this)
      ),
      (this.productVariantId = this.dataset.productVariantId);
  }
  updateMasterId(e, t) {
    return t.find((t) => !t.options.map((t, r) => e[r] === t).includes(!1));
  }
  actionAddToCart(e) {
    e.preventDefault(), this.buttonAddToCart.classList.add("btn-loading");
    const t = this.buttonAddToCart.closest(".bls__product-item"),
      r = t.querySelector(".bls__product-addtocart-js").dataset
        .productVariantId;
    if (
      0 === this.buttonAddToCart.querySelectorAll("span.loader-icon").length
    ) {
      if (
        0 === this.buttonAddToCart.querySelectorAll("div.loader-icon").length
      ) {
        const e = document.createElement("div");
        e.classList.add("loader-icon"), this.buttonAddToCart.appendChild(e);
      }
    }
    const i = this.miniCart.getSectionsToRender().map((e) => e.id);
    if (t.querySelector(".productinfo")) {
      const e = JSON.parse(t.querySelector(".productinfo").textContent);
      let r = Array.from(
        t.querySelectorAll(".bls__option-swatch-js.active"),
        (e) => e.getAttribute("data-value")
      );
      if (!this.updateMasterId(r, e))
        return void this.selectOption(t, this.buttonAddToCart);
    }
    this.fetchAddCart(r, 1, i, this.buttonAddToCart);
  }
  selectOption(e, t) {
    const r = e.dataset.productHandle;
    fetch(
      `${window.Shopify.routes.root}products/${r}/?section_id=product-quickview`
    )
      .then((e) => e.text())
      .then((e) => {
        parser
          .parseFromString(e, "text/html")
          .querySelectorAll("#shopify-section-product-quickview")
          .forEach((e) => {
            var t = EasyDialogBox.create(
              "dlg-product-quickview",
              "dlg dlg-disable-heading dlg-multi dlg-disable-footer dlg-disable-drag",
              "",
              e.innerHTML
            );
            (t.onClose = t.destroy),
              t.show(),
              BlsColorSwatchesShopify.init(),
              Shopify.swiperSlideQickview(),
              Shopify.eventFlashSold("dlg"),
              Shopify.eventCountDownTimer("dlg"),
              BlsReloadSpr.init(),
              Shopify.PaymentButton.init(),
              BlsLazyloadImg.init();
          });
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        t.classList.remove("btn-loading"),
          t.querySelectorAll(".loader-icon").forEach((e) => {
            e.remove();
          }),
          Shopify.termsConditionsAction(),
          BlsSubActionProduct.handleActionWishlist(),
          BlsSubActionProduct.handleInitWishlist(),
          BlsSubActionProduct.handleActionCompare(),
          BlsSubActionProduct.handleInitCompare(),
          BlsSubActionProduct.showPopupStockNotify();
      });
  }
  fetchAddCart(e, t, r, i) {
    fetch(`${routes?.cart_add_url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ id: Number(e), quantity: Number(t), sections: r }),
    })
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
        if (t.errors) {
          const e = document.querySelector(".form-infor .add-cart-error");
          if (!e) return;
          var r = EasyDialogBox.create(
            "add_cart_error",
            "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
            "",
            e.innerHTML
          );
          (r.onClose = r.destroy), r.show();
        } else
          this.miniCart.getSectionsToRender().forEach((e) => {
            const r = document.getElementById(e.id),
              i = new DOMParser().parseFromString(
                t.sections[e.id],
                "text/html"
              );
            r && (r.innerHTML = i.querySelector("#form-mini-cart").innerHTML);
            const n = this.miniCart.querySelector(".cart-countdown-time"),
              s = i.querySelector(".cart-countdown-time");
            n &&
              s &&
              ((n.innerHTML = s.innerHTML), this.miniCart.countdownTimer());
            const o = this.miniCart.querySelector(
                ".bls-recommendations-beside"
              ),
              a = i.querySelector(".bls-recommendations-beside"),
              c = this.miniCart.querySelector(".cart-recomment-beside-mobile"),
              l = i.querySelector(".bls-recommendations-beside-selected");
            var d;
            o &&
              a &&
              (l &&
                0 ==
                  (d = Array.from(
                    l.getElementsByClassName("bls-cart-upsell-item")
                  )).length &&
                (o.classList.remove("is-opend"), c.classList.add("d-none")),
              (d && 0 == d.length) ||
                setTimeout(() => {
                  o.classList.add("is-opend");
                }, 1500),
              (o.innerHTML = a.innerHTML));
          }),
            this.miniCart.cartAction(),
            this.miniCart &&
              this.miniCart.classList.contains("is-empty") &&
              this.miniCart.classList.remove("is-empty"),
            this.miniCart.open();
      })
      .catch((e) => {
        throw e;
      })
      .finally(() => {
        i.classList.remove("btn-loading"),
          i.querySelectorAll(".loader-icon").forEach((e) => {
            e.remove();
          }),
          Shopify.termsConditionsAction(),
          BlsLazyloadImg.init(),
          BlsSettingsSwiper.init();
      });
  }
  getSectionsToRender() {
    return [
      { id: "form-mini-cart" },
      {
        id: "main-cart-items",
        section: document.getElementById("main-cart-items").dataset.id,
        selector: ".js-contents",
      },
    ];
  }
}
customElements.define("quick-buy", QuickBuy),
  customElements.get("product-form") ||
    customElements.define(
      "product-form",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.form = this.querySelector("form")),
            (this.form.querySelector("[name=id]").disabled = !1),
            this.form.addEventListener(
              "submit",
              this.onSubmitHandler.bind(this)
            ),
            (this.cart =
              document.querySelector("cart-notification") ||
              document.querySelector("cart-drawer")),
            (this.submitButton = this.querySelector('[type="submit"]')),
            document.querySelector("cart-drawer") &&
              this.submitButton.setAttribute("aria-haspopup", "dialog"),
            (this.hideErrors = "true" === this.dataset.hideErrors);
        }
        onSubmitHandler(e) {
          e.preventDefault(), this.handleErrorMessage();
          const t = fetchConfig("json");
          (t.headers["X-Requested-With"] = "XMLHttpRequest"),
            delete t.headers["Content-Type"];
          const r = new FormData(this.form),
            i = this.form.closest(".bls__product-details-infor");
          i &&
            i.querySelectorAll("product-property").forEach((e) => {
              const t = e.querySelector("input");
              t.classList.contains("file") && t.files[0]
                ? r.append(t.name, t.files[0])
                : t.classList.contains("text") &&
                  t.value &&
                  r.append(t.name, t.value);
            }),
            this.submitButton.setAttribute("disabled", !0),
            this.submitButton.classList.add("btn-loading"),
            this.cart &&
              (r.append(
                "sections",
                this.cart.getSectionsToRender().map((e) => e.id)
              ),
              r.append("sections_url", window.location.pathname),
              this.cart.setActiveElement(document.activeElement)),
            (t.body = r),
            fetch(`${routes?.cart_add_url}`, t)
              .then((e) => e.text())
              .then((e) => {
                this.submitButton.setAttribute("disabled", !0),
                  this.submitButton
                    .querySelector("span")
                    .classList.add("hidden"),
                  fetch("/cart.json")
                    .then((e) => e.json())
                    .then((e) => {
                      if (null != e.item_count) {
                        document
                          .querySelectorAll(".cart-count")
                          .forEach((t) => {
                            t.classList.contains("cart-count-drawer")
                              ? (t.innerHTML = `(${e.item_count})`)
                              : (t.innerHTML = e.item_count);
                          }),
                          document.querySelector("header-total-price") &&
                            document
                              .querySelector("header-total-price")
                              .updateTotal(e);
                        const t = document.querySelector(
                          "free-ship-progress-bar"
                        );
                        t && t.init(e.items_subtotal_price);
                      }
                    })
                    .catch((e) => {
                      throw e;
                    });
                const t = JSON.parse(e),
                  r = document.querySelector(".pswp__button--bls--close");
                if (t.errors) {
                  const e = document.querySelector(
                      ".form-infor .add-cart-error"
                    ),
                    n = document.querySelector(
                      ".form-infor .add-gift-card-error"
                    ),
                    s = document.querySelector(
                      ".form-infor .add-gift-card-day-error"
                    );
                  if (!e || !n || !s) return;
                  let o = EasyDialogBox.getById("qvdialog_0"),
                    a = EasyDialogBox.getById("dlg-product-quickview_0");
                  if (
                    (r && r.click(),
                    o && ((o.onClose = o.destroy), o.hide()),
                    a && (a.onClose = a.destroy),
                    t.description?.email)
                  )
                    ((i = EasyDialogBox.create(
                      "add_gift_card_error",
                      "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
                      "",
                      n.innerHTML
                    )).onClose = i.destroy),
                      i.show();
                  else if (t.description?.send_on) {
                    ((i = EasyDialogBox.create(
                      "add_gift_card_day_error",
                      "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
                      "",
                      s.innerHTML
                    )).onClose = i.destroy),
                      i.show();
                  } else if (t.errors) {
                    var i;
                    ((i = EasyDialogBox.create(
                      "add_cart_error",
                      "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
                      "",
                      e.innerHTML
                    )).onClose = i.destroy),
                      i.show();
                  }
                } else {
                  this.cart.getSectionsToRender().forEach((e) => {
                    const r = document.getElementById(e.id),
                      i = new DOMParser().parseFromString(
                        t.sections[e.id],
                        "text/html"
                      );
                    r.innerHTML = i.querySelector("#form-mini-cart").innerHTML;
                    const n = this.cart.querySelector(".cart-countdown-time"),
                      s = i.querySelector(".cart-countdown-time");
                    n &&
                      s &&
                      ((n.innerHTML = s.innerHTML), this.cart.countdownTimer());
                    const o = this.cart.querySelector(
                        ".bls-recommendations-beside"
                      ),
                      a = i.querySelector(".bls-recommendations-beside"),
                      c = i.querySelector(
                        ".bls-recommendations-beside-selected"
                      );
                    var l;
                    o &&
                      a &&
                      (c &&
                        0 ==
                          (l = Array.from(
                            c.getElementsByClassName("bls-cart-upsell-item")
                          )).length &&
                        o.classList.remove("is-opend"),
                      (l && 0 == l.length) ||
                        setTimeout(() => {
                          o.classList.add("is-opend");
                        }, 1500),
                      (o.innerHTML = a.innerHTML));
                  });
                  const e = t.quantity;
                  document.querySelector(".quantity__label") &&
                    e > 0 &&
                    ((document.querySelector(".quantity-cart").innerHTML = e),
                    document
                      .querySelector(".quantity__label")
                      .classList.remove("hidden")),
                    this.closest(".dlg") &&
                      document.querySelector(".dlg-close-x").click(),
                    this.cart.cartAction(),
                    this.cart.open(),
                    r && r.click();
                }
              })
              .catch((e) => {
                throw e;
              })
              .finally(() => {
                this.submitButton.classList.remove("btn-loading"),
                  this.cart &&
                    this.cart.classList.contains("is-empty") &&
                    this.cart.classList.remove("is-empty"),
                  this.error || this.submitButton.removeAttribute("disabled"),
                  this.submitButton
                    .querySelector("span")
                    .classList.remove("hidden"),
                  Shopify.termsConditionsAction(),
                  BlsLazyloadImg.init(),
                  BlsSettingsSwiper.init();
              });
        }
        handleErrorMessage(e = !1) {
          this.hideErrors ||
            ((this.errorMessageWrapper =
              this.errorMessageWrapper ||
              this.querySelector(".product-form__error-message-wrapper")),
            this.errorMessageWrapper &&
              ((this.errorMessage =
                this.errorMessage ||
                this.errorMessageWrapper.querySelector(
                  ".product-form__error-message"
                )),
              this.errorMessageWrapper.toggleAttribute("hidden", !e),
              e && (this.errorMessage.textContent = e)));
        }
      }
    );
class QuantityInput extends HTMLElement {
  constructor() {
    super(),
      (this.input = this.querySelector("input")),
      (this.changeEvent = new Event("change", { bubbles: !0 })),
      this.querySelectorAll("button").forEach((e) =>
        e.addEventListener("click", this.onButtonClick.bind(this))
      );
  }
  onButtonClick(e) {
    e.preventDefault();
    const t = this.input.value;
    "plus" === e.currentTarget.name
      ? this.input.stepUp()
      : this.input.stepDown(),
      t !== this.input.value && this.input.dispatchEvent(this.changeEvent);
  }
}
customElements.define("quantity-input", QuantityInput);
class LocalizationForm extends HTMLElement {
  constructor() {
    super(),
      (this.elements = {
        input: this.querySelector(
          'input[name="language_code"], input[name="country_code"]'
        ),
        button: this.querySelector(".button-localization"),
        panel: this.querySelector("ul"),
      }),
      this.elements.button.addEventListener(
        "click",
        this.openSelector.bind(this)
      ),
      this.elements.button.addEventListener(
        "focusout",
        this.closeSelector.bind(this)
      ),
      this.addEventListener("keyup", this.onContainerKeyUp.bind(this)),
      this.querySelectorAll("a").forEach((e) =>
        e.addEventListener("click", this.onItemClick.bind(this))
      ),
      (this.onBodyClick = this.handleBodyClick.bind(this)),
      this.initMenuMobile();
  }
  handleBodyClick(e) {
    const t = e.target;
    t == this || t.closest("localization-form") || this.hidePanel();
  }
  hidePanel() {
    document.body.removeEventListener("click", this.onBodyClick),
      this.elements.button.classList.remove("opend"),
      this.elements.panel.classList.add("hidden");
  }
  onContainerKeyUp(e) {
    "ESCAPE" === e.code.toUpperCase() &&
      (this.hidePanel(), this.elements.button.focus());
  }
  onItemClick(e) {
    e.preventDefault();
    const t = this.querySelector("form");
    (this.elements.input.value = e.currentTarget.dataset.value),
      t && t.submit();
  }
  openSelector() {
    if (this.elements.button.classList.contains("opend")) this.hidePanel();
    else {
      for (var e of (document.body.addEventListener("click", this.onBodyClick),
      this.elements.button.focus(),
      document.querySelectorAll(".button-localization")))
        e.classList.remove("opend");
      for (var e of document.querySelectorAll(".disclosure__list"))
        e.classList.add("hidden");
      this.elements.button.classList.add("opend"),
        this.elements.panel.classList.remove("hidden");
    }
  }
  closeSelector(e) {
    const t = e.relatedTarget && "BUTTON" === e.relatedTarget.nodeName;
    (null === e.relatedTarget || t) && this.hidePanel();
  }
  initMenuMobile() {
    let e = window.innerWidth;
    const t = this;
    if (
      (window.addEventListener("resize", function () {
        (e = window.innerWidth),
          (function (e, t) {
            if (e < 1024) {
              const e = 9,
                r = Array.from(
                  t.getElementsByClassName("disclosure__item-mobile")
                );
              if (0 === r.length) return;
              r.length > e
                ? (r.forEach((t, i) => {
                    if (i > e - 1) {
                      const e = r[i];
                      if (e.classList.contains("disclosure-menu-link")) return;
                      e.classList.add("disclosure-link"),
                        (e.style.display = "none");
                    }
                  }),
                  (t.querySelector(".disclosure-menu-link").style.display =
                    "block"),
                  t.querySelector(".disclosure-menu-link a") &&
                    t.querySelector(".disclosure-menu-link a").addEventListener(
                      "click",
                      (e) => {
                        e.preventDefault();
                        const r = e.currentTarget,
                          i = r.parentElement;
                        if (i.classList.contains("expanding")) {
                          for (var n of (i.classList.remove("expanding"),
                          t.querySelectorAll(
                            ".disclosure__item-mobile.disclosure-link"
                          )))
                            hideAnime(n);
                          r.innerText = window.action.show_all;
                        } else {
                          for (var n of (i.classList.add("expanding"),
                          t.querySelectorAll(
                            ".disclosure__item-mobile.disclosure-link"
                          )))
                            showAnime(n);
                          r.innerText = window.action.show_less;
                        }
                      },
                      !1
                    ))
                : (t.querySelector(".disclosure-menu-link").style.display =
                    "none");
            }
          })(e, t);
      }),
      e < 1024)
    ) {
      const e = 9,
        r = Array.from(t.getElementsByClassName("disclosure__item-mobile"));
      if (0 === r.length) return;
      r.length > e
        ? (r.forEach((t, i) => {
            if (i > e - 1) {
              const e = r[i];
              if (e.classList.contains("disclosure-menu-link")) return;
              e.classList.add("disclosure-link"), (e.style.display = "none");
            }
          }),
          (t.querySelector(".disclosure-menu-link").style.display = "block"),
          t.querySelector(".disclosure-menu-link span") &&
            t.querySelector(".disclosure-menu-link span").addEventListener(
              "click",
              (e) => {
                e.preventDefault();
                const r = e.currentTarget,
                  i = r.parentElement;
                if (i.classList.contains("expanding")) {
                  for (var n of (i.classList.remove("expanding"),
                  t.querySelectorAll(
                    ".disclosure__item-mobile.disclosure-link"
                  )))
                    hideAnime(n);
                  r.innerText = window.action.show_all;
                } else {
                  for (var n of (i.classList.add("expanding"),
                  t.querySelectorAll(
                    ".disclosure__item-mobile.disclosure-link"
                  )))
                    showAnime(n);
                  r.innerText = window.action.show_less;
                }
              },
              !1
            ))
        : (t.querySelector(".disclosure-menu-link").style.display = "none");
    }
  }
}
customElements.define("localization-form", LocalizationForm);
class CartNotification extends HTMLElement {
  constructor() {
    super(),
      (this.notification = document.getElementById("bls-header_minicart")),
      (this.giftwrap = document.querySelector(".bls__add-giftwrap")),
      (this.cartCountDown = document.querySelector(".cart-countdown-time")),
      (this.cartUpsellBeside = document.querySelector(
        ".bls-recommendations-beside"
      )),
      (this.startTime = Date.now()),
      this.querySelectorAll(".bls-minicart-wrapper .close-button").forEach(
        (e) => e.addEventListener("click", this.close.bind(this))
      ),
      document
        .querySelectorAll(".bls-minicart-action", ".close-cart")
        .forEach((e) => {
          e.addEventListener(
            "click",
            (e) => {
              e.preventDefault(),
                this.notification.classList.contains("bls__opend-popup-header")
                  ? this.close()
                  : this.open();
            },
            !1
          );
        }),
      (this.currentItemCount = Array.from(
        this.querySelectorAll('[name="updates[]"]')
      ).reduce((e, t) => e + parseInt(t.value), 0)),
      (this.debouncedOnChange = debounce((e) => {
        this.onChange(e);
      }, 300)),
      this.addEventListener("change", this.debouncedOnChange.bind(this)),
      this.cartAction(),
      this.countdownTimer(),
      this.addonsUpdate();
  }
  cartAction() {
    document.querySelectorAll(".close-cart").forEach((e) => {
      e.addEventListener(
        "click",
        (e) => {
          e.preventDefault(),
            this.notification.classList.contains("bls__opend-popup-header") &&
              this.close();
        },
        !1
      );
    }),
      document.querySelectorAll(".bls__cart-addons button").forEach((e) => {
        e.removeEventListener("click", this.cartAddons.bind(this), !1),
          e.addEventListener("click", this.cartAddons.bind(this), !1);
      }),
      document
        .querySelectorAll(".bls__addon-actions .btn-save")
        .forEach((e) => {
          e.removeEventListener("click", this.cartAddonsSave.bind(this), !1),
            e.addEventListener("click", this.cartAddonsSave.bind(this), !1);
        }),
      document.querySelectorAll(".bls__add-giftwrap").forEach((e) => {
        e.removeEventListener("click", this.addGiftwrapClick.bind(this), !1),
          e.addEventListener("click", this.addGiftwrapClick.bind(this), !1);
      }),
      document.querySelectorAll(".bls-minicart-item-edit").forEach((e) => {
        e.removeEventListener("click", this.cartEditItem.bind(this), !1),
          e.addEventListener("click", this.cartEditItem.bind(this), !1);
      });
    const e = document.getElementById("conditions_form_minicart");
    e &&
      e.addEventListener("change", (e) => {
        e.currentTarget.checked
          ? document
              .querySelector(".bls-btn-checkout")
              .removeAttribute("disabled")
          : document
              .querySelector(".bls-btn-checkout")
              .setAttribute("disabled", "disabled");
      }),
      document
        .querySelectorAll(".bls__addon-actions .btn-cancel")
        .forEach((e) => {
          e.addEventListener(
            "click",
            (e) => {
              e.preventDefault();
              const t = e.currentTarget;
              t.closest(".bls__addon").classList.remove("is-open"),
                t
                  .closest(".bls-minicart-wrapper")
                  .classList.remove("addons-open");
            },
            !1
          );
        }),
      document
        .querySelectorAll(".bls__addon-actions .btn-cancel")
        .forEach((e) => {
          e.addEventListener(
            "click",
            (e) => {
              e.preventDefault();
              const t = e.currentTarget;
              t.closest(".bls__addon").classList.remove("is-open"),
                t
                  .closest(".bls-minicart-wrapper")
                  .classList.remove("addons-open");
            },
            !1
          );
        });
  }
  addonsUpdate() {
    const e = document.getElementById("address_country"),
      t = document.getElementById("address_province");
    e &&
      t &&
      new Shopify.CountryProvinceSelector(
        "address_country",
        "address_province",
        { hideElement: "address_province_container" }
      );
    const r = document.querySelector(".bls__discount_code"),
      i = localStorage.getItem("discount_code");
    i && r && (document.querySelector(".bls__discount_code").value = i);
  }
  cartAddons(e) {
    e.preventDefault();
    const t = e.currentTarget,
      r = t.getAttribute("data-open");
    if (document.getElementById("bls__" + r).classList.contains("is-open"))
      document.getElementById("bls__" + r).classList.remove("is-open"),
        t.closest(".bls-minicart-wrapper").classList.remove("addons-open");
    else if (
      (document.getElementById("bls__" + r).classList.add("is-open"),
      t.closest(".bls-minicart-wrapper").classList.add("addons-open"),
      "shipping" == r)
    ) {
      const e = document.getElementById("address_country"),
        t = document.getElementById("address_province");
      e &&
        t &&
        new Shopify.CountryProvinceSelector(
          "address_country",
          "address_province",
          { hideElement: "address_province_container" }
        );
    }
  }
  cartEditItem(e) {
    e.preventDefault();
    const t = e.currentTarget,
      r = t.getAttribute("data-key"),
      i = t.getAttribute("data-quantity"),
      n = t.getAttribute("href"),
      s =
        n.indexOf("?") > -1 ||
        n.indexOf("?variant=") > -1 ||
        n.indexOf("&variant=") > -1
          ? "&"
          : "/?";
    t.closest(".cart-item").classList.add("loadding"),
      fetch(`${window.shopUrl}${n}${s}section_id=cart-quick-edit`)
        .then((e) => {
          if (!e.ok) throw new Error(e.status);
          return e.text();
        })
        .then((e) => {
          const t = new DOMParser()
            .parseFromString(e, "text/html")
            .getElementById("shopify-section-cart-quick-edit");
          var r = EasyDialogBox.create(
            "cart-edit-item",
            "dlg dlg-disable-footer dlg-disable-drag",
            cartStrings?.quick_edit,
            t.innerHTML
          );
          (r.onClose = r.destroy), r.show();
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          document.querySelector("[data-template-quick-cart-edit]") &&
            document
              .querySelector("[data-template-quick-cart-edit]")
              .setAttribute("data-line", r),
            document.querySelector(
              ".product-form-quick-edit quantity-input input"
            ) &&
              (document.querySelector(
                ".product-form-quick-edit quantity-input input"
              ).value = i),
            t.closest(".cart-item").classList.remove("loadding"),
            BlsColorSwatchesShopify.init(),
            BlsLazyloadImg.init();
        });
  }
  cartAddonsSave(e) {
    e.preventDefault();
    const t = e.currentTarget.getAttribute("data-action");
    if ("coupon" == t) {
      const e = document.querySelector(".bls__discount_code").value;
      localStorage.setItem("discount_code", e),
        document.getElementById("bls__" + t).classList.remove("is-open"),
        document
          .querySelector(".bls-minicart-wrapper")
          .closest(".bls-minicart-wrapper")
          .classList.remove("addons-open");
    } else if ("note" == t) {
      const e = JSON.stringify({
        note: document.querySelector(".bls__cart-note").value,
      });
      fetch(`${routes?.cart_update_url}`, { ...fetchConfig(), body: e }),
        document.getElementById("bls__" + t).classList.remove("is-open"),
        document
          .querySelector(".bls-minicart-wrapper")
          .closest(".bls-minicart-wrapper")
          .classList.remove("addons-open");
    } else if ("shipping" == t) {
      var r = {};
      (r.zip = document.querySelector("#AddressZip").value || ""),
        (r.country = document.querySelector("#address_country").value || ""),
        (r.province = document.querySelector("#address_province").value || ""),
        this._getCartShippingRatesForDestination(r);
    }
  }
  _getCartShippingRatesForDestination(e) {
    fetch(
      `${window.Shopify.routes.root}cart/shipping_rates.json?shipping_address%5Bzip%5D=${e.zip}&shipping_address%5Bcountry%5D=${e.country}&shipping_address%5Bprovince%5D=${e.province}`
    )
      .then((e) => e.text())
      .then((t) => {
        const r = document.querySelector(".bls__addon-message");
        for (var i of document.querySelectorAll(".bls__addon-message p"))
          i.remove();
        const {
            showDeliveryDays: n,
            deliveryDayOne: s,
            deliveryDaysOther: o,
          } = r.dataset,
          a = JSON.parse(t);
        if (a && a.shipping_rates)
          if (a.shipping_rates.length > 0) {
            r.classList.remove("error", "warning"), r.classList.add("success");
            const t = document.createElement("p");
            (t.innerText = cartStrings?.shipping_rate.replace(
              "{{address}}",
              e.zip + ", " + e.country + " " + e.province
            )),
              r.appendChild(t),
              a.shipping_rates.map((e) => {
                let t = "";
                if (e.delivery_days.length > 0 && "true" == n) {
                  let r = s;
                  const i = e.delivery_days[0],
                    n = e.delivery_days.at(-1);
                  i > 1 && (r = o),
                    (t = i === n ? `(${i} ${r})` : `(${i} - ${n} ${r})`);
                }
                const i = document.createElement("p");
                (i.innerHTML =
                  e.name +
                  ": " +
                  Shopify.formatMoney(e.price, cartStrings?.money_format) +
                  " " +
                  t),
                  r.appendChild(i);
              });
          } else {
            r.classList.remove("error", "success"), r.classList.add("warning");
            const e = document.createElement("p");
            (e.innerText = cartStrings?.no_shipping), r.appendChild(e);
          }
        else
          r.classList.remove("success", "warning"),
            r.classList.add("error"),
            Object.entries(a).map((e) => {
              const t = `${e[1][0]}`,
                i = document.createElement("p");
              (i.innerText = t), r.appendChild(i);
            });
      })
      .catch((e) => {
        throw e;
      });
  }
  addGiftwrapClick(e) {
    e.preventDefault();
    const t = e.currentTarget,
      r = t.getAttribute("data-variant-id"),
      i = fetchConfig("json");
    (i.body = JSON.stringify({
      id: Number(r),
      quantity: 1,
      sections: this.getSectionsToRender().map((e) => e.id),
      sections_url: window.location.pathname,
    })),
      t.classList.add("loading"),
      fetch(`${routes?.cart_add_url}`, i)
        .then((e) => e.text())
        .then((e) => {
          const t = JSON.parse(e);
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
            }),
            this.getSectionsToRender().forEach((e) => {
              const r = document.getElementById(e.id),
                i = new DOMParser().parseFromString(
                  t.sections[e.id],
                  "text/html"
                );
              r.innerHTML = i.querySelector("#form-mini-cart").innerHTML;
              const n = document.querySelector(".bls-recommendations-beside"),
                s = i.querySelector(".bls-recommendations-beside"),
                o = i.querySelector(".bls-recommendations-beside-selected");
              var a;
              n &&
                s &&
                (o &&
                  0 ==
                    (a = Array.from(
                      o.getElementsByClassName("bls-cart-upsell-item")
                    )).length &&
                  n.classList.remove("is-opend"),
                (a && 0 == a.length) ||
                  setTimeout(() => {
                    n.classList.add("is-opend");
                  }, 1500),
                (n.innerHTML = s.innerHTML));
            }),
            this.cartAction();
        })
        .catch((e) => {
          throw e;
        })
        .finally(() => {
          document
            .querySelector(".bls__add-giftwrap")
            .classList.remove("loading"),
            document.getElementById("bls__gift").classList.remove("is-open"),
            document
              .querySelector(".bls-minicart-wrapper")
              .classList.remove("addons-open"),
            Shopify.termsConditionsAction(),
            BlsLazyloadImg.init(),
            BlsSettingsSwiper.init();
        });
  }
  onChange(e) {
    "updates[]" == e.target.getAttribute("name") &&
      this.updateQuantity(
        e.target.dataset.id,
        e.target.value,
        e.target.dataset.value,
        e.target,
        document.activeElement.getAttribute("name")
      );
  }
  updateQuantity(e, t, r, i, n) {
    t = t || 0;
    const s = JSON.stringify({
      id: e,
      quantity: t,
      sections: this.getSectionsToRender().map((e) => e.id),
      sections_url: window.location.pathname,
    });
    this.notification.classList.add("start", "loading");
    const o = document.querySelector("free-ship-progress-bar");
    fetch(`${routes?.cart_change_url}`, { ...fetchConfig(), body: s })
      .then((e) => e.text())
      .then((e) => {
        const t = JSON.parse(e);
        if (
          (null != t.item_count &&
            (document.querySelectorAll(".cart-count").forEach((e) => {
              e.classList.contains("cart-count-drawer")
                ? (e.innerHTML = `(${t.item_count})`)
                : (e.innerHTML = t.item_count);
            }),
            document.querySelector("header-total-price") &&
              document.querySelector("header-total-price").updateTotal(t)),
          document.querySelector(".quantity__label"))
        ) {
          const e = t.items,
            r = document
              .querySelector(".quantity__label")
              .getAttribute("data-pro-id");
          var n;
          e.forEach(function (e) {
            if (e.variant_id == r)
              return (
                (document.querySelector(".quantity-cart").innerHTML =
                  e.quantity),
                document
                  .querySelector(".quantity__label")
                  .classList.remove("hidden"),
                void (n = r)
              );
          }),
            n ||
              ((document.querySelector(".quantity-cart").innerHTML = 0),
              document
                .querySelector(".quantity__label")
                .classList.add("hidden"));
        }
        if (
          (document.querySelector("header-total-price") &&
            document.querySelector("header-total-price").updateTotal(t),
          0 == t.item_count &&
            this.cartCountDown &&
            this.cartCountDown.querySelector(".countdown-message").remove(),
          0 == t.item_count &&
            this.cartUpsellBeside &&
            this.cartUpsellBeside.classList.contains("is-opend") &&
            this.cartUpsellBeside.classList.remove("is-opend"),
          t.error || null == t.item_count)
        ) {
          const e = document.querySelector(".form-infor .add-cart-error");
          if (!e) return;
          var s = EasyDialogBox.create(
            "add_cart_error",
            "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
            "",
            e.innerHTML
          );
          if (((s.onClose = s.destroy), s.show(), !i)) return;
          i.value = r;
        } else
          this.getSectionsToRender().forEach((e) => {
            const r = document.getElementById(e.id),
              i = new DOMParser().parseFromString(
                t.sections[e.id],
                "text/html"
              );
            (r.innerHTML = i.querySelector("#form-mini-cart").innerHTML),
              o && o.init(t.items_subtotal_price);
          });
        this.cartAction();
      })
      .catch((e) => {
        throw e;
      })
      .finally(() => {
        Shopify.termsConditionsAction(),
          this.notification.classList.add("finish"),
          setTimeout(function () {
            (this.cart = document.querySelector("cart-notification")),
              this.cart
                .querySelector(".header_minicart")
                .classList.remove("start", "loading", "finish");
          }, 500),
          BlsLazyloadImg.init(),
          BlsSettingsSwiper.init();
      });
  }
  countdownTimer() {
    if (!this.cartCountDown) return;
    const e = Number(this.cartCountDown.dataset.countdownTime) || 5,
      t = this.cartCountDown.dataset.timeoutMessage,
      r = this.startTime + 60 * e * 1e3,
      i = setInterval(() => {
        if (document.querySelector(".cart-countdown-time .countdown-message")) {
          if (this.startTime > r)
            (this.cartCountDown.querySelector(".countdown-message").innerHTML =
              t),
              clearInterval(i);
          else {
            var e = r - this.startTime,
              n = Math.floor((e % 36e5) / 6e4),
              s = Math.floor((e % 6e4) / 1e3);
            (document.querySelector(".countdown-timer-minute").innerHTML = n),
              (document.querySelector(".countdown-timer-sec").innerHTML = s);
          }
          this.startTime += 1e3;
        } else clearInterval(i);
      }, 1e3);
  }
  open() {
    this.notification.classList.add("bls__opend-popup-header"),
      document.documentElement.classList.add("hside_opened"),
      this.notification.addEventListener(
        "transitionend",
        () => {
          this.notification.focus();
        },
        { once: !0 }
      ),
      document.body.addEventListener("click", this.onBodyClick);
  }
  closeBeside() {
    document
      .querySelector(".bls-recommendations-beside")
      .classList.remove("is-opend");
  }
  close() {
    for (var e of (this.notification.classList.remove(
      "bls__opend-popup-header"
    ),
    document.documentElement.classList.remove("hside_opened"),
    document.querySelector(".bls-recommendations-beside") &&
      document
        .querySelector(".bls-recommendations-beside")
        .classList.remove("is-opend"),
    document.body.removeEventListener("click", this.onBodyClick),
    document.querySelectorAll(".bls__addon")))
      e.classList.remove("is-open");
    for (var e of document.querySelectorAll(".bls-minicart-wrapper"))
      e.classList.remove("addons-open");
  }
  getSectionsToRender() {
    return [{ id: "form-mini-cart" }];
  }
  getSectionInnerHTML(e, t = ".shopify-section") {
    return new DOMParser().parseFromString(e, "text/html").querySelector(t)
      .innerHTML;
  }
  setActiveElement(e) {
    this.activeElement = e;
  }
}
customElements.define("cart-notification", CartNotification);
class MiniCartRemoveButton extends HTMLElement {
  constructor() {
    super(),
      this.addEventListener("click", (e) => {
        e.preventDefault();
        const t = JSON.parse(localStorage.getItem("bls__wishlist-items")),
          r = this.dataset.productHandle;
        let i = t?.indexOf(r);
        if (this.classList.contains("bls-action-add-wishlist"))
          if (-1 == i || null == i)
            (this.closest(".cart-item").querySelector(
              ".bls-minicart-wishlist"
            ).style.display = "block"),
              (this.closest(".cart-item").querySelector(
                ".bls-minicart-product-info"
              ).style.display = "none");
          else {
            this.closest("cart-notification").updateQuantity(
              this.dataset.index,
              0
            );
          }
        else {
          this.closest("cart-notification").updateQuantity(
            this.dataset.index,
            0
          );
        }
      });
  }
}
customElements.define("mini-cart-remove-button", MiniCartRemoveButton);
class MiniCartWishlistAction extends HTMLElement {
  constructor() {
    super(),
      this.actionRemoveWishlist(),
      this.actionAddWishlist(),
      this.actionClose();
  }
  actionRemoveWishlist() {
    this.querySelector(".btn-minicart-remove-js").addEventListener(
      "click",
      (e) => {
        e.preventDefault();
        const t = e.currentTarget;
        this.eventRemove(t);
      }
    );
  }
  actionAddWishlist() {
    this.querySelector(".btn-minicart-add-wishlist-js").addEventListener(
      "click",
      (e) => {
        e.preventDefault(), BlsSubActionProduct.handleWishlistFunctionClick(e);
        const t = e.currentTarget;
        this.eventRemove(t);
      }
    );
  }
  eventRemove(e) {
    e.closest("cart-notification").updateQuantity(e.dataset.index, 0);
  }
  actionClose() {
    document.querySelectorAll(".cart-close-wishlist").forEach((e) => {
      e.addEventListener("click", (e) => {
        const t = e.currentTarget;
        e.preventDefault(),
          (t
            .closest(".cart-item")
            .querySelector(".bls-minicart-wishlist").style.display = "none"),
          (t
            .closest(".cart-item")
            .querySelector(".bls-minicart-product-info").style.display =
            "block");
      });
    });
  }
}
customElements.define("minicart-wishlist-action", MiniCartWishlistAction);
class VariantSelectsQuickEdit extends HTMLElement {
  constructor() {
    super(),
      this.querySelectorAll(".bls__option-swatch").forEach((e) =>
        e.addEventListener("click", this.onVariantChange.bind(this), !1)
      );
  }
  onVariantChange(e) {
    e.preventDefault();
    const t = e.currentTarget,
      r = t.getAttribute("data-value");
    for (var i of t.closest("fieldset").querySelectorAll(".bls__option-swatch"))
      i.classList.remove("active");
    t.classList.toggle("active"),
      (t
        .closest("fieldset")
        .querySelector(".swatch-selected-value").textContent = r),
      (this.options = Array.from(
        this.querySelectorAll(".bls__option-swatch.active"),
        (e) => e.getAttribute("data-value")
      )),
      this.updateMasterId(),
      this.toggleAddButton(!0, "", !1),
      this.currentVariant
        ? (this.updateMedia(),
          this.updateVariantInput(),
          this.renderProductInfo())
        : (this.toggleAddButton(!0, "", !0), this.setUnavailable());
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (e) => !e.options.map((e, t) => this.options[t] === e).includes(!1)
    );
  }
  updateMedia() {
    if (!this.currentVariant) return;
    if (!this.currentVariant.featured_media) return;
    const e = document.getElementById(
      `product-form-quick-edit-${this.dataset.section}`
    );
    e.querySelector(".product__media img").removeAttribute("srcset"),
      e
        .querySelector(".product__media img")
        .setAttribute(
          "src",
          this.currentVariant.featured_media.preview_image.src
        );
  }
  updateVariantInput() {
    document
      .querySelectorAll(`#product-form-quick-edit-${this.dataset.section}`)
      .forEach((e) => {
        const t = e.querySelector('input[name="id"]');
        (t.value = this.currentVariant.id),
          t.dispatchEvent(new Event("change", { bubbles: !0 }));
      });
  }
  renderProductInfo() {
    if (!this.currentVariant) return;
    const e = this.currentVariant.compare_at_price,
      t = this.currentVariant.price,
      r = Shopify.formatMoney(
        this.currentVariant.price,
        cartStrings?.money_format
      ),
      i = document.getElementById(
        `product-form-quick-edit-${this.dataset.section}`
      );
    i.querySelector(".price__regular .price").innerHTML = r;
    const n = i.querySelector(".bls__price");
    if (
      (n.classList.remove("price--sold-out", "price--on-sale"),
      n
        .querySelector(".price__regular .price")
        .classList.remove("special-price"),
      e && e > t)
    ) {
      const t = Shopify.formatMoney(e, cartStrings?.money_format);
      if (!n.querySelector(".compare-price")) {
        var s = n.querySelector(".price__sale"),
          o = document.createElement("span"),
          a = document.createElement("s");
        a.classList.add("price-item", "compare-price"),
          o.appendChild(a),
          s && s.appendChild(o);
      }
      n.querySelector(".compare-price") &&
        (n.querySelector(".compare-price").innerHTML = t),
        n.classList.add("price--on-sale"),
        n
          .querySelector(".price__regular .price")
          .classList.add("special-price");
    } else this.currentVariant.available || n.classList.add("price--sold-out");
    this.toggleAddButton(
      !this.currentVariant.available,
      window.variantStrings?.soldOut
    );
  }
  toggleAddButton(e = !0, t, r = !0) {
    const i = document.getElementById(
      `product-form-quick-edit-${this.dataset.section}`
    );
    if (!i) return;
    const n = i.querySelector('[name="add"]'),
      s = i.querySelector('[name="add"] > span');
    i.querySelector(".bls__product-dynamic-checkout");
    n &&
      (e
        ? (n.setAttribute("disabled", "disabled"), t && (s.textContent = t))
        : (n.removeAttribute("disabled"),
          (s.textContent = window.variantStrings?.addToCart)));
  }
  setUnavailable() {
    const e = document.getElementById(
        `product-form-quick-edit-${this.dataset.section}`
      ),
      t = e.querySelector('[name="add"]'),
      r = e.querySelector('[name="add"] > span'),
      i = document.getElementById(`price-${this.dataset.section}`);
    t &&
      ((r.textContent = window.variantStrings?.unavailable),
      i && i.classList.add("visibility-hidden"));
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
}
customElements.define("variant-radios-quick-edit", VariantSelectsQuickEdit),
  customElements.get("product-form-quick-edit") ||
    customElements.define(
      "product-form-quick-edit",
      class extends HTMLElement {
        constructor() {
          super(),
            (this.form = this.querySelector("form")),
            (this.form.querySelector("[name=id]").disabled = !1),
            this.form.addEventListener(
              "submit",
              this.onSubmitHandler.bind(this)
            ),
            (this.cart =
              document.querySelector("cart-notification") ||
              document.querySelector("cart-drawer")),
            (this.submitButton = this.querySelector('[type="submit"]')),
            document.querySelector("cart-drawer") &&
              this.submitButton.setAttribute("aria-haspopup", "dialog");
        }
        onSubmitHandler(e) {
          e.preventDefault(),
            this.handleErrorMessage(),
            this.submitButton.setAttribute("disabled", !0),
            this.submitButton.classList.add("btn-loading");
          const t = document
              .getElementById("product-form-quick-edit")
              .getAttribute("data-line"),
            r = fetchConfig("json");
          (r.body = JSON.stringify({ id: t, quantity: 0 })),
            fetch(`${routes?.cart_change_url}`, r)
              .then((e) => e.text())
              .catch((e) => {
                throw e;
              })
              .finally(() => {
                this.addCartAdd();
              });
        }
        addCartAdd() {
          const e = fetchConfig("json");
          (e.headers["X-Requested-With"] = "XMLHttpRequest"),
            delete e.headers["Content-Type"];
          const t = new FormData(this.form);
          this.cart &&
            (t.append(
              "sections",
              this.cart.getSectionsToRender().map((e) => e.id)
            ),
            t.append("sections_url", window.location.pathname),
            this.cart.setActiveElement(document.activeElement)),
            (e.body = t),
            fetch(`${routes?.cart_add_url}`, e)
              .then((e) => e.text())
              .then((e) => {
                this.submitButton.setAttribute("disabled", !0),
                  this.submitButton
                    .querySelector("span")
                    .classList.add("hidden"),
                  fetch("/cart.json")
                    .then((e) => e.json())
                    .then((e) => {
                      if (null != e.item_count) {
                        document
                          .querySelectorAll(".cart-count")
                          .forEach((t) => {
                            t.classList.contains("cart-count-drawer")
                              ? (t.innerHTML = `(${e.item_count})`)
                              : (t.innerHTML = e.item_count);
                          }),
                          document.querySelector("header-total-price") &&
                            document
                              .querySelector("header-total-price")
                              .updateTotal(e);
                        const t = document.querySelector(
                          "free-ship-progress-bar"
                        );
                        t && t.init(e.items_subtotal_price);
                      }
                    })
                    .catch((e) => {
                      throw e;
                    });
                const t = JSON.parse(e);
                if (t.errors) {
                  const e = document.querySelector(
                    ".form-infor .add-cart-error"
                  );
                  if (!e) return;
                  var r = EasyDialogBox.create(
                    "add_cart_error",
                    "dlg dlg-disable-footer dlg-disable-drag dlg-disable-heading",
                    "",
                    e.innerHTML
                  );
                  let t = EasyDialogBox.getById("cart-edit-item_0");
                  t && ((t.onHide = t.destroy), t.hide()),
                    (r.onClose = r.destroy),
                    r.show();
                } else
                  this.cart.getSectionsToRender().forEach((e) => {
                    const r = document.getElementById(e.id),
                      i = new DOMParser().parseFromString(
                        t.sections[e.id],
                        "text/html"
                      );
                    r.innerHTML = i.querySelector("#form-mini-cart").innerHTML;
                    const n = this.cart.querySelector(".cart-countdown-time"),
                      s = i.querySelector(".cart-countdown-time");
                    n &&
                      s &&
                      ((n.innerHTML = s.innerHTML), this.cart.countdownTimer());
                    const o = this.cart.querySelector(
                        ".bls-recommendations-beside"
                      ),
                      a = i.querySelector(".bls-recommendations-beside"),
                      c = i.querySelector(
                        ".bls-recommendations-beside-selected"
                      );
                    var l;
                    o &&
                      a &&
                      (c &&
                        0 ==
                          (l = Array.from(
                            c.getElementsByClassName("bls-cart-upsell-item")
                          )).length &&
                        o.classList.remove("is-opend"),
                      (l && 0 == l.length) ||
                        setTimeout(() => {
                          o.classList.add("is-opend");
                        }, 1500),
                      (o.innerHTML = a.innerHTML));
                  }),
                    this.cart.cartAction(),
                    document.querySelector(".dlg-close-x").click();
              })
              .catch((e) => {
                throw e;
              })
              .finally(() => {
                this.submitButton.classList.remove("btn-loading"),
                  this.cart &&
                    this.cart.classList.contains("is-empty") &&
                    this.cart.classList.remove("is-empty"),
                  this.error || this.submitButton.removeAttribute("disabled"),
                  this.submitButton
                    .querySelector("span")
                    .classList.remove("hidden"),
                  Shopify.termsConditionsAction(),
                  BlsLazyloadImg.init();
              });
        }
        handleErrorMessage(e = !1) {
          (this.errorMessageWrapper =
            this.errorMessageWrapper ||
            this.querySelector(".product-form__error-message-wrapper")),
            this.errorMessageWrapper &&
              ((this.errorMessage =
                this.errorMessage ||
                this.errorMessageWrapper.querySelector(
                  ".product-form__error-message"
                )),
              this.errorMessageWrapper.toggleAttribute("hidden", !e),
              e && (this.errorMessage.textContent = e));
        }
      }
    );
class VariantRadiosQuickview extends HTMLElement {
  constructor() {
    super(),
      this.querySelectorAll(".bls__option-swatch").forEach((e) =>
        e.addEventListener("click", this.onVariantChange.bind(this), !1)
      ),
      this.actionDropdownSwatches();
  }
  onVariantChange(e) {
    e.preventDefault();
    const t = e.currentTarget,
      r = t.getAttribute("data-value");
    for (var i of t.closest("fieldset").querySelectorAll(".bls__option-swatch"))
      i.classList.remove("active");
    t.classList.toggle("active"),
      (t
        .closest("fieldset")
        .querySelector(".swatch-selected-value").textContent = r),
      (this.options = Array.from(
        this.querySelectorAll(".bls__option-swatch.active"),
        (e) => e.getAttribute("data-value")
      )),
      this.updateMasterId(),
      this.toggleAddButton(!0, "", !1),
      this.updateVariantStatuses(),
      this.currentVariant
        ? (this.updateVariantInput(), this.renderProductInfo())
        : (this.toggleAddButton(!0, "", !0), this.setUnavailable());
  }
  updateMasterId() {
    this.currentVariant = this.getVariantData().find(
      (e) => !e.options.map((e, t) => this.options[t] === e).includes(!1)
    );
  }
  updateVariantInput() {
    document
      .querySelectorAll(`#product-form-${this.dataset.section}`)
      .forEach((e) => {
        const t = e.querySelector('input[name="id"]');
        t &&
          ((t.value = this.currentVariant.id),
          t.dispatchEvent(new Event("change", { bubbles: !0 })));
      });
  }
  renderProductInfo() {
    if (!this.currentVariant) return;
    let e = 0,
      t = 0,
      r = !1,
      i = window.variantStrings?.inStock,
      n = window.variantStrings?.soldOut;
    const s = this.currentVariant.compare_at_price,
      o = this.currentVariant.price,
      a = this.currentVariant.unit_price,
      c = this.currentVariant.unit_price_measurement,
      l = document
        .getElementById(`product-form-${this.dataset.section}`)
        .closest(".bls__product-quickview");
    this.getVariantQtyData().find((t) => {
      t.id === this.currentVariant.id && (e = t.qty);
    }),
      s && s > o && ((r = !0), (t = ((s - o) / s) * 100)),
      this.currentVariant.available && e < 1
        ? ((i = window.variantStrings?.preOrder),
          (n = window.variantStrings?.preOrder))
        : this.currentVariant.available
        ? ((i = window.variantStrings?.inStock),
          (n = window.variantStrings?.addToCart))
        : (i = window.variantStrings?.outStock),
      null === this.currentVariant.inventory_management &&
        ((i = window.variantStrings?.inStock),
        (n = window.variantStrings?.addToCart)),
      l.querySelector(".bls__availability-value") &&
        (l.querySelector(".bls__availability-value").textContent = i);
    const d = l.querySelector(".bls__product-label");
    if ((d && d.remove(), r)) {
      var u = document.createElement("div");
      u.classList.add(
        "bls__product-label",
        "mb-5",
        "fs-12",
        "pointer-events-none",
        "inline-block",
        "static"
      ),
        l
          .querySelector(".bls__quickview-content")
          .insertBefore(
            u,
            l.querySelector(".bls__quickview-content").children[0]
          );
      const e = l.querySelector(".bls__product-label");
      var m = document.createElement("div");
      m.classList.add("bls__sale-label"),
        "price" == window.productLabel.saleType
          ? (m.innerText =
              "- " + Shopify.formatMoney(s - o, cartStrings.money_format))
          : "text" == window.productLabel.saleType
          ? (m.innerText = window.productLabel.saleLabel)
          : (m.innerText = -t.toFixed(0) + "%"),
        e && e.appendChild(m);
    }
    l.querySelector(".bls__product-sku-value") &&
      (l.querySelector(".bls__product-sku-value").textContent =
        this.currentVariant.sku);
    const h = Shopify.formatMoney(
      this.currentVariant.price,
      cartStrings?.money_format
    );
    if (a && c) {
      const e = Shopify.formatMoney(a, cartStrings?.money_format),
        t = 1 != c.reference_value ? c.reference_value : c.reference_unit,
        r = l.querySelector(".unit-price .number"),
        i = l.querySelector(".unit-price .unit");
      r && (r.innerHTML = e), i && (i.innerHTML = t);
    }
    const p = l.querySelector(".price__regular .price");
    p && (p.innerHTML = h);
    const y = l.querySelector(".product-notify-stock");
    y &&
      (this.currentVariant.available
        ? ((y.style.display = "none"),
          y.setAttribute("data-product-variant", this.currentVariant.id))
        : ((y.style.display = "block"),
          y.setAttribute("data-product-variant", this.currentVariant.id)));
    const b = l.querySelector(".bls__price");
    if (
      (b.classList.remove("price--sold-out", "price--on-sale"),
      b
        .querySelector(".price__regular .price")
        .classList.remove("special-price"),
      s && s > o)
    ) {
      const e = Shopify.formatMoney(s, cartStrings?.money_format);
      if (!b.querySelector(".compare-price")) {
        var f = b.querySelector(".price__sale"),
          g = document.createElement("span"),
          S = document.createElement("s");
        S.classList.add("price-item", "compare-price"),
          g.appendChild(S),
          f && f.appendChild(g);
      }
      b.querySelector(".compare-price") &&
        (b.querySelector(".compare-price").innerHTML = e),
        b.classList.add("price--on-sale"),
        b
          .querySelector(".price__regular .price")
          .classList.add("special-price");
    } else this.currentVariant.available || b.classList.add("price--sold-out");
    this.toggleAddButton(!this.currentVariant.available, n);
  }
  toggleAddButton(e = !0, t, r = !0) {
    const i = document.getElementById(`product-form-${this.dataset.section}`);
    if (!i) return;
    const n = i.querySelector('.button-add-cart-qv[name="add"]'),
      s = i.querySelector('.button-add-cart-qv[name="add"] > span'),
      o = i.querySelector(".bls__product-dynamic-checkout");
    n &&
      (e
        ? ((o.style.display = "none"), n.setAttribute("disabled", "disabled"))
        : ((o.style.display = "block"), n.removeAttribute("disabled")),
      t && (s.textContent = t));
  }
  setUnavailable() {
    const e = document.getElementById(`product-form-${this.dataset.section}`),
      t = e.querySelector('[name="add"]'),
      r = e.querySelector('[name="add"] > span'),
      i = document.getElementById(`price-${this.dataset.section}`);
    t &&
      ((r.textContent = window.variantStrings?.unavailable),
      i && i.classList.add("visibility-hidden"));
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
  actionDropdownSwatches() {
    this.querySelectorAll("[data-swatches-value]").forEach((e) => {
      e.addEventListener(
        "click",
        (e) => {
          const t = e.currentTarget;
          if (t.closest(".bls__color-dropdown").classList.contains("isClicked"))
            t.closest(".bls__color-dropdown").classList.remove("isClicked");
          else {
            for (var r of this.querySelectorAll(".bls__color-dropdown"))
              r.classList.remove("isClicked");
            t.closest(".bls__color-dropdown").classList.add("isClicked");
          }
        },
        !1
      );
    }),
      this.querySelectorAll(".bls__product-color-swatches-dropdown").forEach(
        (e) => {
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
        }
      );
  }
  setAvailability(e, t) {
    e.forEach((e) => {
      t.includes(e.dataset.value)
        ? e.removeAttribute("data-disabled")
        : e.setAttribute("data-disabled", "disable");
    });
  }
  updateVariantStatuses() {
    const e = this.getVariantData().filter(
        (e) => this.querySelector(".active").dataset.value === e.option1
      ),
      t = [...this.querySelectorAll(".product-form__input")];
    t.forEach((r, i) => {
      if (0 === i) return;
      const n = [...r.querySelectorAll(".bls__option-swatch")],
        s = t[i - 1].querySelector(".active").dataset.value,
        o = e
          .filter((e) => e.available && e[`option${i}`] === s)
          .map((e) => e[`option${i + 1}`]);
      this.setAvailability(n, o);
    });
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
customElements.define("variant-radios-quickview", VariantRadiosQuickview);
class CartUpsell extends HTMLElement {
  constructor() {
    super();
  }
  init() {
    this.connectedCallback();
  }
  connectedCallback() {
    fetch(this.dataset.url)
      .then((e) => e.text())
      .then((e) => {
        const t = document.createElement("div");
        t.innerHTML = e;
        const r = t.querySelector(".swiper-wrapper");
        r &&
          r.innerHTML.trim().length &&
          this.querySelector(".swiper-wrapper") &&
          (this.querySelector(".swiper-wrapper").innerHTML = r.innerHTML);
      })
      .finally(() => {
        BlsSettingsSwiper.init(), BlsLazyloadImg.init();
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
customElements.define("minicart-recommendations", CartUpsell);
class CartUpsellBeside extends HTMLElement {
  constructor() {
    super();
  }
  init() {
    this.connectedCallback();
  }
  connectedCallback() {
    fetch(this.dataset.url)
      .then((e) => e.text())
      .then((e) => {
        const t = document.createElement("div");
        t.innerHTML = e;
        const r = t.querySelector(".swiper-wrapper");
        r &&
          r.innerHTML.trim().length &&
          this.querySelector(".swiper-wrapper") &&
          (this.querySelector(".swiper-wrapper").innerHTML = r.innerHTML);
        const i = t.querySelector(".bls-cart-upsell-wrapper"),
          n = document.querySelector(".bls-recommendations-beside");
        i &&
          i.innerHTML.trim().length &&
          n &&
          this.querySelector(".bls-cart-upsell-wrapper") &&
          (this.querySelector(".bls-cart-upsell-wrapper").innerHTML =
            i.innerHTML);
      })
      .finally(() => {
        BlsSettingsSwiper.init(), BlsLazyloadImg.init();
      })
      .catch((e) => {
        console.error(e);
      });
  }
}
customElements.define("minicart-recommendations-beside", CartUpsellBeside);
class CartUpsellHeading extends HTMLElement {
  constructor() {
    super(),
      this.querySelector(".button-close-beside").addEventListener(
        "click",
        (e) => {
          e.currentTarget
            .closest(".bls-recommendations-beside")
            .classList.remove("is-opend");
        }
      );
  }
}
customElements.define("minicart-recommendations-heading", CartUpsellHeading);
