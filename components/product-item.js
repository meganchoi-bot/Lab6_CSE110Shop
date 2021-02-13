// product-item.js
class ProductItem extends HTMLElement {
  constructor() {
    // call super first
    super();

    // create shadow root
    this.shadow = this.attachShadow({mode: 'open'});
    this.shadow.innerHTML = `
      <li class="product">
        <img src="" alt="" width=200>
        <p class="title"></p>
        <p class="price"></p>
        <button onclick="alert('Added to Cart!')">Add to Cart</button>
      </li>
      <style>
        .price {
          color: green;
          font-size: 1.8em;
          font-weight: bold;
          margin: 0;
        }
        
        .product {
          align-items: center;
          background-color: white;
          border-radius: 5px;
          display: grid;
          grid-template-areas: 
          'image'
          'title'
          'price'
          'add';
          grid-template-rows: 67% 11% 11% 11%;
          height: 450px;
          filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
          margin: 0 30px 30px 0;
          padding: 10px 20px;
          width: 200px;
        }
        
        .product > button {
          background-color: rgb(255, 208, 0);
          border: none;
          border-radius: 5px;
          color: black;
          justify-self: center;
          max-height: 35px;
          padding: 8px 20px;
          transition: 0.1s ease all;
        }
        
        .product > button:hover {
          background-color: rgb(255, 166, 0);
          cursor: pointer;
          transition: 0.1s ease all;
        }
        
        .product > img {
          align-self: center;
          justify-self: center;
          width: 100%;
        }
        
        .title {
          font-size: 1.1em;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        
        .title:hover {
          font-size: 1.1em;
          margin: 0;
          white-space: wrap;
          overflow: auto;
          text-overflow: unset;
      </style>
    `;
  }
  set imageSrc(newVal) {
    this.shadow.querySelector('img').setAttribute('src', newVal);
  }
    
  set imageAlt(newVal) {
    this.shadow.querySelector('img').setAttribute('alt', newVal);
  }
    
  set setTitle(newVal) {
    this.shadow.querySelector(".title").innerHTML = newVal;
  }
    
  set setPrice(newVal) {
    var money = "$";
    this.shadow.querySelector(".price").innerHTML = money.concat(newVal);
  }

  set theButton(func) {
    this.shadow.querySelector('button').onclick = func;
  }

  set theID(newVal) {
    this.shadow.querySelector('li').setAttribute('id', newVal);
  }
}

customElements.define('product-item', ProductItem);

function updateCart() {

  // remove item
  if (this.innerHTML == 'Remove from Cart') {
    var count = parseInt(document.getElementById('cart-count').innerHTML);
    count = count - 1;
    document.getElementById('cart-count').innerHTML = count.toString();
    this.innerHTML = 'Add to Cart';

    var storedList = JSON.parse(localStorage.getItem('cartList'));
    const ind = storedList.indexOf(this.parentElement.id);
    if (ind >= 0) {
      storedList.splice(ind, 1);
      localStorage.setItem('cartList', JSON.stringify(storedList));
    }
    
  } 
  // add item
  else if (this.innerHTML == 'Add to Cart') {
    var count = parseInt(document.getElementById('cart-count').innerHTML);
    count = count + 1;
    document.getElementById('cart-count').innerHTML = count.toString();
    this.innerHTML = 'Remove from Cart';

    // store added cart items
    var storedList = JSON.parse(localStorage.getItem('cartList'));
    var exists = storedList.indexOf(this.parentElement.id);
    if (exists < 0) {
      storedList.push(this.parentElement.id);
      // update array in localStorage
      localStorage.setItem('cartList', JSON.stringify(storedList));
    }
  }

  
}