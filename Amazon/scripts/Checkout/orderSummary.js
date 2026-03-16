// Main Idea of JS
// 1) Save the data
// 2) Generate the HTML
// 3) Make it interactive
import { cart, removeCartItem, updateQuantity, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import { deliveryOptions, getDeliveryOptions } from "../../data/deliveryOptions.js";
import renderPaymentSummary from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkHeader.js";
import { calculateDeliveryDate } from "../../data/deliveryOptions.js";

export default function renderOrderSummary() {
  let cartSummaryHTML = ``;
  cart.forEach(cartItem => {
    // This couple of code do same purpose 
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptions(deliveryOptionId);

    const formatDate = calculateDeliveryDate(deliveryOption);

    cartSummaryHTML += `
      <div class="cart-item-container 
      js-cart-item-container
      js-cart-item-container${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${formatDate}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src='${matchingProduct.image}'>

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="js-product-quantity${matchingProduct.id} product-quantity">
            <span>
              Quantity: <span class="quantity-label${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="js-update-quantity-link${matchingProduct.id} update-quantity-link link-primary"
            data-product-id='${matchingProduct.id}'>
              Update
            </span>
            <input class='quantity-input input${matchingProduct.id}'>
            <span class='save-quantity-link link-primary save-link${matchingProduct.id}'
            data-product-id='${matchingProduct.id}'>Save</span>
            <span class="delete-quantity-link link-primary js-delete-quantity-link 
            js-delete-link-${matchingProduct.id}"
            data-product-id='${matchingProduct.id}'>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct.id, cartItem)}
        </div>
      </div>
    </div>
    `;
  })

  document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

  // Delete Button
  document.querySelectorAll('.js-delete-quantity-link')
      .forEach(link => {
        link.addEventListener('click', () => {
          const productId = link.dataset.productId;
          removeCartItem(productId);
          const container = document.querySelector(`.js-cart-item-container${productId}`);
          container.remove();
          renderOrderSummary();
          renderCheckoutHeader();
          
          // To regenerate all of the payment section
          renderPaymentSummary();
        })
      });

      // Update button
      // -> To update items quantity
  document.querySelectorAll(`.update-quantity-link`)
    .forEach(btn => {
      btn.addEventListener('click', () => {
        const productId = btn.dataset.productId;
        // Display CSS style
        document.querySelector(`.save-link${productId}`)
          .style.display = 'inline';
        document.querySelector(`.input${productId}`)
          .style.display = 'inline';
        document.querySelector(`.js-update-quantity-link${productId}`)
          .style.display = 'none';
      })
  })
      
  // Save button
  // Appear when the update button is clicked
  document.querySelectorAll('.save-quantity-link')
    .forEach(link => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        // Display CSS style
        document.querySelector(`.save-link${productId}`)
          .style.display = 'none';
        const inputTag = document.querySelector(`.input${productId}`);
        inputTag.style.display = 'none';
        document.querySelector(`.js-update-quantity-link${productId}`)
          .style.display = 'inline';
        const newQuantity = Number(inputTag.value);
        inputTag.value = '';

        // set limit
        if (newQuantity <= 0 || newQuantity >= 1000) {
          alert('Quantity must be at least 0 and less than 1000');
          return;
        }
      // Update cart quantity and add to local storage
        updateQuantity(productId, newQuantity);
      // Update items from the page
        const quantityLabel = document.querySelector(
          `.quantity-label${productId}`
        );
        quantityLabel.innerHTML = newQuantity;
        renderCheckoutHeader();

        // To regenerate all of the payment section
        renderPaymentSummary();
      })
  })

  function deliveryOptionsHTML(matchingId, cartItem) {
    let HTML = ``; 
    deliveryOptions.forEach(deliveryOptions => {
      const deliveryOptionId = deliveryOptions.id;
      
      const formatDate = calculateDeliveryDate(deliveryOptions)

      const formatPrice = (deliveryOptionId === '1') 
      ? 'FREE ' 
      : `$${formatCurrency(deliveryOptions.priceCents)} - `;

      const isChecked = cartItem.deliveryOptionId === deliveryOptionId;

      HTML += `
    <div class="delivery-option js-delivery-option"
    data-product-id=${matchingId}
    data-delivery-option-id=${deliveryOptionId}>
      <input type="radio"
      ${(isChecked)? 'checked' : ''}
        class="delivery-option-input js-delivery-option-input"
        name="delivery-option-${matchingId}">
      <div>
        <div class="delivery-option-date">
          ${formatDate}
        </div>
        <div class="delivery-option-price">
          ${formatPrice}Shipping
        </div>
      </div>
    </div>`;
    })
    return HTML;
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach(element => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset; // shorthand property
        updateDeliveryOption(productId, deliveryOptionId);
        renderCheckoutHeader();
        // To regenerate all of the order section
        renderOrderSummary();
        // To regenerate all of the payment section
        renderPaymentSummary();
      })
  })
}