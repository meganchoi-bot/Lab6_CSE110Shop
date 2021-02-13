// Script.js

// local storage object
localStorage = window.localStorage;
var cartList = new Array(); 

window.addEventListener('DOMContentLoaded', async () => {
  // if product array does not exist in local storage, fetch it
  if (localStorage.getItem('prodArr') == null) {
    // fetch product items
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    localStorage.setItem('prodArr', JSON.stringify(data)); // add array to local storage
  }
  // change string array back to json obj
  var products = JSON.parse(localStorage.getItem('prodArr'));
  // get the product-list-container element
  var productList = document.getElementById('product-list');

  // create and store cart list in localStorage
  if (!localStorage.getItem('cartList')) {
    localStorage.setItem('cartList', JSON.stringify(cartList));
  }

  // loop through products
  for (var elem of products) {
    // make product-item
    var prod = document.createElement('product-item');

    // set attributes according to json obj from array
    prod.imageSrc = elem.image;
    prod.imageAlt = elem.title;
    prod.setTitle = elem.title;
    prod.setPrice = elem.price;
    prod.theButton = updateCart;
    prod.theID = JSON.stringify(elem.id);

    var cart = JSON.parse(localStorage.getItem('cartList'));
    if (cart.indexOf(prod.shadow.querySelector('li').id) >= 0) {
      prod.shadow.querySelector('button').innerHTML = 'Remove from Cart';
      var count = parseInt(document.getElementById('cart-count').innerHTML);
      count = cart.length;
      document.getElementById('cart-count').innerHTML = count.toString();
    }

    // append new product to product-list-container
    productList.appendChild(prod);
  }
});