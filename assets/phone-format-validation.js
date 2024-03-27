$(document).ready(() => {
  const toggleValidationLabel = (show, labelElement, inputElement) => {
    if (show) {
      if ($(".phone-validation-label", inputElement.parent()).length === 0) {
        $(
          '<span class="phone-validation-label" style="color: red;">Number must be 10 digits</span>'
        ).insertAfter(inputElement);
      }
    } else {
      labelElement.remove();
    }
  };

  const phoneNumberValidation = (inputElement, isSubmitting) => {
    let phoneFieldVal = inputElement.val();
    if (typeof phoneFieldVal !== "undefined" && phoneFieldVal !== null) {
      let formattedPhoneValue = phoneFieldVal.replace(/[^0-9+]/g, "");
      inputElement.val(formattedPhoneValue);

      const allowPlus = formattedPhoneValue.startsWith("+");
      const limitLength = allowPlus ? 14 : 10;
      const reachLimit = allowPlus ? 12 : 10;
      inputElement.attr("maxlength", limitLength);

      const labelElement = $(".phone-validation-label", inputElement.parent());
      if (formattedPhoneValue.length >= reachLimit) {
        toggleValidationLabel(false, labelElement, inputElement);
      } else if (formattedPhoneValue.length > 0 || isSubmitting) {
        toggleValidationLabel(true, labelElement, inputElement);
      }
      return phoneFieldVal.length >= reachLimit;
    }
  };

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        const billingPhoneNumberInput = $("#checkout_billing_address_phone");
        if (billingPhoneNumberInput.length > 0) {
          billingPhoneNumberInput.removeAttr(
            "data-phone-formatter data-phone-formatter-country-select"
          );
          if (billingPhoneNumberInput.val() !== "") {
            phoneNumberValidation(billingPhoneNumberInput, false);
          }
          billingPhoneNumberInput.on("input blur", () =>
            phoneNumberValidation(billingPhoneNumberInput, false)
          );
          observer.disconnect();
        }
      }
    }
  });

  const shippingPhoneNumberInput = $("#checkout_shipping_address_phone");
  shippingPhoneNumberInput.removeAttr("data-phone-formatter");
  shippingPhoneNumberInput.removeAttr("data-phone-formatter-country-select");
  if (shippingPhoneNumberInput.length > 0) {
    if (shippingPhoneNumberInput.val() !== "") {
      phoneNumberValidation(shippingPhoneNumberInput, false);
    }
    shippingPhoneNumberInput.on("input blur", () =>
      phoneNumberValidation(shippingPhoneNumberInput, false)
    );
  }

  const billingPhoneNumberInput = $("#checkout_billing_address_phone");
  billingPhoneNumberInput.removeAttr(
    "data-phone-formatter data-phone-formatter-country-select"
  );
  if (billingPhoneNumberInput.length > 0) {
    if (billingPhoneNumberInput.val() !== "") {
      phoneNumberValidation(billingPhoneNumberInput, false);
    }
    billingPhoneNumberInput.on("input blur", () =>
      phoneNumberValidation(billingPhoneNumberInput, false)
    );
  }

  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: true,
  });

  $(".step__footer__continue-btn").click((e) => {
    if (shippingPhoneNumberInput.length > 0) {
      if (!phoneNumberValidation(shippingPhoneNumberInput, true)) {
        e.preventDefault();
      }
    }
    if (billingPhoneNumberInput.length > 0) {
      if (!phoneNumberValidation(billingPhoneNumberInput, true)) {
        e.preventDefault();
      }
    }
  });
});
