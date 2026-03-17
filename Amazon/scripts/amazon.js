// Main Idea of JS
// 1) Save the data
// 2) Generate the HTML
// 3) Make it interactive
import { cart, addToCart } from "../data/cart.js";  
import { products } from "../data/products.js"; 
import { formatCurrency } from "./utils/money.js";
let productsHtml = '';
const cartQuantityTag = document.querySelector('.js-cart-quantity');
const inputSearch = document.querySelector('.search-bar');

products.forEach(product => {
  productsHtml += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price"> 
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
})
document.querySelector('.js-products-grid').innerHTML = productsHtml;

// Organizing code
// Just split with multiple function if the code getting massive
function updateCartQuantity(addedCartQuantity) {
    let cartQuantity = 0;
      cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
      });

      localStorage.setItem('cartQuantity', cartQuantity);      

      cartQuantityTag.innerHTML = localStorage.getItem('cartQuantity') || cartQuantity;      

     addedCartQuantity.classList.add('showImg'); 

      setTimeout(() => {
        addedCartQuantity.classList.remove('showImg');
      }, 2000);
}

document.querySelectorAll('.js-add-to-cart')
  .forEach(buttons => {
    buttons.addEventListener('click', () => { // this is the name converted from HTML product-id
      const productId = buttons.dataset.productId; // get data attribute from HTML
      const selectedProduct = document.querySelector(`.js-quantity-selector-${productId}`).value;
      const addedCartQuantity = document.querySelector(`.js-added-to-cart-${productId}`);

      addToCart(productId, selectedProduct);

      updateCartQuantity(addedCartQuantity);
    })
  })

// For Searching the product
inputSearch.addEventListener('input', (event) => {
  const searchText = event.target.value.toLowerCase();
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchText);
  })
  productsHtml = '';
  filteredProducts.forEach(product => {
    productsHtml += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price"> 
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
  })
  document.querySelector('.js-products-grid').innerHTML = productsHtml;
})
