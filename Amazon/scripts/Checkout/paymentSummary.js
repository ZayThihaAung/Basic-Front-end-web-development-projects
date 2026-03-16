import {deliveryOptions, getDeliveryOptions} from "../../data/deliveryOptions.js";
import { getProduct, products } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { cart, clearCart } from "../../data/cart.js";
import { renderCheckoutHeader } from "./checkHeader.js";

let html = ``;

const clearHTML = () => {
  let elements = document.querySelectorAll('.payment-summary-row');
  elements.forEach(element => {
    element.innerHTML = '';
  });
  document.querySelector('.js-payment-summary').innerHTML = '<h2>Your cart is empty</h2>';
  document.querySelector(".js-order-summary").innerHTML = '<h2>Order completed.</h2>';
  document.querySelector(".return-to-home-link").innerHTML = "0 item";
  return;
}

const placeOrderButton = () => {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    clearHTML();
  }
  else {
    alert('Your order has been placed!');
    clearCart();
    renderPaymentSummary();
    renderCheckoutHeader();
  }
}
export default function renderPaymentSummary() {
  let cartQuantity = 0;
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  let totalBeforeTax = 0;
  let taxCents = 0;
  let totalCost = 0;
  html = ``;  
  if (cart.length === 0) {
    clearHTML();
  }
  cart.forEach(cartItem => {
    // To get products
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    // For the quantites of items
    cartQuantity += cartItem.quantity;

    // To get delivery options that users selected
    const deliveryOption = getDeliveryOptions(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
    totalBeforeTax = shippingPriceCents + productPriceCents;
    // the tax is 10%
    taxCents = totalBeforeTax * 0.1;
    totalCost = totalBeforeTax + taxCents;
    // Generate HTML
    html = `
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div>Items (${cartQuantity}):</div>
        <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${formatCurrency(totalCost)}</div>
      </div>

      <button class="place-order-button button-primary">
        Place your order
      </button>
    `;
  });
  document.querySelector('.js-payment-summary')
    .innerHTML = html;
  document.querySelector('.place-order-button').addEventListener('click', placeOrderButton);
  cartQuantity = 0;
}