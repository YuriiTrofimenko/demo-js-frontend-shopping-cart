"use strict"
// view state
const viewState = {
  products: [],
  cartProducts: []
}
// data loaders
function reloadProducts() {
  viewState.products.length = 0
  viewState.products.push(...getProducts())
}
// datastore subscriptions
reactor.addEventListener('stateChanged', function(ev){
  if (ev.propertyName === 'products') {
    reloadProducts()
  }
})
window.addEventListener("DOMContentLoaded", () => {
  loadProductsData();
});
let producstOnCart = document.querySelector(
  ".header__shopping-cart-products-on-cart"
);

let productsList = document.querySelector("#products-list");
const sortByPriceButton = document.querySelector("#sort-by-price");
const sortByRatingButton = document.querySelector("#sort-by-rating");
const sortByResetAllButton = document.querySelector(".sort-by--reset-all");
const sortByPriceChevron = document.querySelector("#by-price-chevron");
const sortByRatingChevron = document.querySelector("#by-rating-chevron");
const loadMoreButton = document.querySelector(".load-more");
let itemsLeftButton = document.querySelector(".load-more__items-left");
let toaster = document.querySelector(".toaster--hidden");

let initialData = [];

let START_SLICE_INDEX = 0;
let END_SLICE_INDEX = 20;
const COUNT_PRODUCTS_ON_PAGE = 20;

//Event listeners
sortByPriceButton.addEventListener("click", sortByPriceClick);
sortByRatingButton.addEventListener("click", sortByRatingClick);
loadMoreButton.addEventListener("click", loadProductsData);
sortByResetAllButton.addEventListener("click", resetFilters);
productsList.addEventListener("click", addRemoveLike);

function hideToaster() {
  toaster.classList.remove("toaster--active");
}
async function loadProductsData () {
  resetFilters()
  await fetchMore()
  renderTottalAmount(viewState.products)
  renderProductsOnPage(viewState.products)
  renderItemsLeft(getSourceProductsTotalCount(), viewState.products.length)
}
function renderTottalAmount(productsData) {
  document.querySelector(
    ".header__tittle"
  ).innerHTML = `<h1>${productsData.length} shoes were found</h1>`;
}
function renderProductsOnPage(productsData) {
  addDataToProducts(productsData);
}
const createProductCartHTML = function (productData) {
  return `<div class="product" data-id="${productData.id}" >
            <div class="product__content">
              <div class="product__photo">
                <img class="product__photo-img"
                  src="${productData.imgSrc}"
                  alt=""/>
                <div class="product__photo-sale ${productData.sellClass}">
                  <span>-40%</span>
                  </div>
                    <div class="product__photo-like"  data-id="${productData.id}"</div>
                  </div>
                </div>
                <div class="product__details">
                  <span class="product__content-title">${productData.shoesName}</span>
                  <div class="product__content-description">
                    <div>
                      <b class="brand">${productData.brand}</b> <br />
                      Brand
                    </div>
                    <div>
                      <b class="product-color"> ${productData.color} </b>
                      <br/>
                      Color
                    </div>
                    <div>
                      <b class="rating">${productData.rating}</b>
                      <br/>
                      Rating
                    </div>
                  </div>
                  <div class="product__content-price">${productData.price}</div>
                </div>
                <div class="product__button ${productData.soldOut}" ${productData.soldOut ? 'disabled' : ''}>
                  <span>${productData.statusText}</span>
                </div>
              </div>
            </div>
          </div>`;
}

function sortByPriceDescending(arrayProducts) {
  console.log("desc");
  let commaToDot = arrayProducts.map((value) => {
    return {
      shoesName: value.shoesName,
      category: value.category,
      imgSrc: value.imgSrc,
      color: value.color,
      brand: value.brand,
      price: value.price.replace(",", "."),
      rating: value.rating,
      soldOut: value.soldOut,
      statusText: value.statusText,
      sellClass: value.sellClass,
    };
  });
  console.log(commaToDot);
  return commaToDot.sort((a, b) => a.price - b.price);
}

function sortByRatingAscending(arrayProducts) {
  return arrayProducts.sort((a, b) => b.rating - a.rating);
}
function sortByRatingDescending(arrayProducts) {
  return arrayProducts.sort((a, b) => a.rating - b.rating);
}
function addDataToProducts(data) {
  if (data) {
    const collectHTMLCardAndData = data.map((data) =>
      createProductCartHTML(data)
    ).reduce((result, current) => result += current, '')
    productsList.innerHTML = collectHTMLCardAndData
  }
}
function sortByPriceOnClickDescending() {
  let commaToDot = viewState.products.map((value) => {
    return {
      shoesName: value.shoesName,
      category: value.category,
      imgSrc: value.imgSrc,
      color: value.color,
      brand: value.brand,
      price: value.price.replace(",", "."),
      rating: value.rating,
      soldOut: value.soldOut,
      statusText: value.statusText,
      sellClass: value.sellClass,
      id: value.id,
      isLike: value.isLike,
    };
  });

  commaToDot.sort((a, b) => a.price - b.price);
  let dotToComma = commaToDot.map((value) => {
    return {
      shoesName: value.shoesName,
      brand: value.brand,
      category: value.category,
      imgSrc: value.imgSrc,
      color: value.color,
      price: value.price.replace(".", ","),
      rating: value.rating,
      soldOut: value.soldOut,
      statusText: value.statusText,
      sellClass: value.sellClass,
      id: value.id,
      isLike: value.isLike,
    };
  });

  addDataToProducts(dotToComma);
}
function sortByPriceOnClickAscending() {
  let commaToDot = viewState.products.map((value) => {
    return {
      shoesName: value.shoesName,
      category: value.category,
      imgSrc: value.imgSrc,
      color: value.color,
      brand: value.brand,
      price: value.price.replace(",", "."),
      rating: value.rating,
      soldOut: value.soldOut,
      statusText: value.statusText,
      sellClass: value.sellClass,
      id: value.id,
      isLike: value.isLike,
    };
  });

  commaToDot.sort((a, b) => b.price - a.price);
  let dotToComma = commaToDot.map((value) => {
    return {
      shoesName: value.shoesName,
      brand: value.brand,
      category: value.category,
      imgSrc: value.imgSrc,
      color: value.color,
      price: value.price.replace(".", ","),
      rating: value.rating,
      soldOut: value.soldOut,
      statusText: value.statusText,
      sellClass: value.sellClass,
      id: value.id,
      isLike: value.isLike,
    };
  });

  addDataToProducts(dotToComma);
}
function sortByRatingOnClick(sortByF) {
  sortByF(viewState.products);
  addDataToProducts(viewState.products);
}
function sortByRatingClick() {
  sortByRatingButton.classList.add("sort-by--color");
  sortByResetAllButton.classList.add("sort-by--reset-all-active");
  sortByPriceButton.classList.remove("sort-by--color");
  sortByPriceChevron.classList.remove("chevron--up");
  !sortByRatingChevron.classList.contains("chevron--up")
    ? (sortByRatingChevron.classList.toggle("chevron--up"),
      sortByRatingOnClick(sortByRatingAscending))
    : (sortByRatingChevron.classList.toggle("chevron--up"),
      sortByRatingOnClick(sortByRatingDescending));
}

function sortByPriceClick() {
  sortByPriceButton.classList.add("sort-by--color");
  sortByResetAllButton.classList.add("sort-by--reset-all-active");
  sortByRatingButton.classList.remove("sort-by--color");
  sortByRatingChevron.classList.remove("chevron--up");
  !sortByPriceChevron.classList.contains("chevron--up")
    ? (sortByPriceChevron.classList.toggle("chevron--up"),
      sortByPriceOnClickAscending())
    : (sortByPriceChevron.classList.toggle("chevron--up"),
      sortByPriceOnClickDescending());
}
function resetFilters() {
  sortByResetAllButton.classList.remove("sort-by--reset-all-active");
  sortByPriceButton.classList.remove("sort-by--color");
  sortByRatingButton.classList.remove("sort-by--color");
  sortByPriceChevron.classList.remove("chevron--up");
  sortByRatingChevron.classList.remove("chevron--up");
  reloadProducts()
  addDataToProducts(viewState.products);
}
function renderItemsLeft(totalItemsCount, itemsOnpageCount) {
  let itemLeft = totalItemsCount - itemsOnpageCount;
  itemsLeftButton.innerHTML = `(${itemLeft} items left )`;
  if (itemLeft === 0) {
    loadMoreButton.style.display = 'none'
  }
}

function addRemoveLike(e) {
  // let productToCart = [];
  const productId = Number(e.target.closest(".product").getAttribute("data-id"))
  // console.log(typeof productId)
  // Like
  if (e.target.className.includes("product__photo-like")) {
    const likeChangedProduct = viewState.products.find(p => p.id === productId)
    likeChangedProduct.isLike = !likeChangedProduct.isLike
    console.log(likeChangedProduct)
    if (likeChangedProduct.isLike) {
      e.target.classList.add("product__photo-like--active")
    } else {
      e.target.classList.remove("product__photo-like--active")
    }
  } else if (e.target.className.includes("product__button") || e.target.parentElement.className.includes("product__button")) {
    // Add to Cart
    const productToCart = viewState.products.find(p => p.id === productId)
    viewState.cartProducts.push(productToCart)
    viewState.cartProducts.length === 0
      ? (producstOnCart.style.display = "none")
      : (producstOnCart.style.display = "block");
    producstOnCart.innerHTML = viewState.cartProducts.length
    toaster.classList.add("toaster--active");
    setTimeout(hideToaster, 2000);
  }
}

let m = {
  first: true,
  second: "",
  third: false,
};
console.log(m?.first === true);
