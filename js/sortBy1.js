"use strict";
window.addEventListener("DOMContentLoaded", () => {
  loadProductsData();
});

let productsData = [];
let productsList = document.querySelector("#products-list");
const sortByPriceButton = document.querySelector("#sort-by-price");
const sortByRatingButton = document.querySelector("#sort-by-rating");
const sortByPriceIcon = document.querySelector("#by-price-icon");
const sortByRatingIcon = document.querySelector("#by-rating-icon");
let productsArr = document.querySelectorAll(".product");

const CONT_PRODUCTS_ON_PAGE = 20;

const loadProductsData = async function () {
  const response = await fetch("/json/shoes.json");
  setShoes(await response.json());
};

function setShoes(data) {
  productsData = data;
  addDataToProduct(productsData);
}

const createProductCardHTML = function (productData) {
  return `<div class="product">
<div class="product__content">
  <div class="product__photo">
    <img class="product__photo-img"
      src="${productData.imgSrc}"
      alt=""/>

<div class="product__photo-sale ${productData.sellClass}">
      <span>-40%</span>
    </div>
    <div class="product__photo-like"></div>
  </div>

  <div class="product__details">
    <span class="product__content-title">${productData.shoesName}</span>
     <div class="product__content-description">
      <div >
        <b class="brand">${productData.brand}</b> <br />
        Brand</div>
        <div >
        <b class="product-color"> ${productData.color} </b>
        <br />Color
       </div>
      <div ><b class="rating">${productData.rating}</b> <br />Rating</div>
    </div>
    <div class="product__content-price">${productData.price}</div>
  </div>
  <div class=" product__button ${productData.soldOut}">
    <span>${productData.statusText}</span>
  </div>
</div>
</div> `;
};

const generateProductsArrayToDom = function (productArray) {
  productArray.map((data) => (productsList.innerHTML += data));
};

function sortByRating(arrayProducts) {
  return arrayProducts.sort((a, b) => b.rating - a.rating);
}

function addDataToProduct(data) {
  if (data) {
    productsList.innerHTML = null;
    const collectArrayHTMLAndData = data.map((data) =>
      createProductCardHTML(data)
    );
    generateProductsArrayToDom(collectArrayHTMLAndData);
  }
}

function sortByPriceOnClick() {
  const data = sortByRating(productsData);
  addDataToProduct(data);
}

sortByPriceButton.addEventListener("click", () => {
  if (sortByPriceIcon.style.transform === "rotate(180deg)") {
    sortByPriceIcon.style.transform = "rotate(0deg)";
  } else {
    sortByPriceIcon.style.transform = "rotate(180deg)";
  }
});
sortByRatingButton.addEventListener("click", () => {
  if (sortByRatingIcon.style.transform === "rotate(0deg)") {
    sortByRatingIcon.classList.toggl("arrow-up");
  } else {
    sortByRatingIcon.classList.toggl("arrow-up");
  }

  sortByPriceOnClick();
});
