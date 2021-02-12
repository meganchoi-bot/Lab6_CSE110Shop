// Script.js

// local storage object
localStorage = window.localStorage;

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
  // loop through products
  for (var elem of products) {
    console.log(elem);
    // make product-item
    var prod = document.createElement('product-item');

    // set attributes according to json obj from array
    prod.imageSrc = elem.image;
    prod.imageAlt = elem.title;
    prod.setTitle = elem.title;
    prod.setPrice = elem.price;

    // append new product to product-list-container
    productList.appendChild(prod);
  }

  
  // increment cart count
  var count = parseInt(document.getElementById('cart-count').innerHTML);
  count = count + 1;
});



