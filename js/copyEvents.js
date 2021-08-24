// define variables

window.addEventListener("DOMContentLoaded", () => {
  loadProductsData();
});
let productsData = [];
let productsList = document.querySelector("#products-list");
const sortByPriceButton = document.querySelector("#sort-by-price");
const sortByRatingButton = document.querySelector("#sort-by-rating");
const sortByResetAllButton = document.querySelector(".sort-by--reset-all");
const sortByPriceChevron = document.querySelector("#by-price-chevron");
const sortByRatingChevron = document.querySelector("#by-rating-chevron");
const loadMoreButton = document.querySelector(".load-more");
let starSlicetIndex = 0;
let endSliceIndex = 3;
const CONT_PRODUCTS_ON_PAGE = 4;

//Event listeners
loadMoreButton.addEventListener("click", function () {
  let outputValue = productsData.slice(
    starSlicetIndex + CONT_PRODUCTS_ON_PAGE,
    endSliceIndex + CONT_PRODUCTS_ON_PAGE
  );
  console.log(outputValue);
  initialdataOnPage = initialdataOnPage.concat(outputValue);

  renderProductsOnPage(initialdataOnPage);
  starSlicetIndex += CONT_PRODUCTS_ON_PAGE;
  endSliceIndex += CONT_PRODUCTS_ON_PAGE;
});
const loadProductsData = async function () {
  const response = await fetch("/json/shoes-test.json");
  let productsData = await response.json();
  let initialdataOnPage = productsData.slice(0, 3);

  console.log(initialdataOnPage);
  renderProductsOnPage(initialdataOnPage);
};

function renderProductsOnPage(data) {
  const initialData = JSON.parse(JSON.stringify(data));

  productsData = data;
  let m = productsData.sort((a, b) => b.price - a.price);

  addDataToProducts(productsData);

  rotateChevron(sortByRatingButton, sortByRatingChevron, sortByRatingOnClick);
  resetFilters(initialData);
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

const generateProductsArray = function (productArray) {
  productArray.map((data) => (productsList.innerHTML += data));
};
function sortByRatingAscending(arrayProducts) {
  console.log(arrayProducts);
  return arrayProducts.sort((a, b) => b.rating - a.rating);
}
function sortByRatingDescending(arrayProducts) {
  console.log(arrayProducts);
  return arrayProducts.sort((a, b) => a.rating - b.rating);
}

function addDataToProducts(data) {
  if (data) {
    productsList.innerHTML = null;
    const collectHTMLCardAndData = data.map((data) =>
      createProductCardHTML(data)
    );
    generateProductsArray(collectHTMLCardAndData);
  }
}

function sortByRatingOnClick(sortByF) {
  const data = sortByF(productsData);
  addDataToProducts(data);
}

function rotateChevron(element, chevron, sortBy) {
  element.addEventListener("click", () => {
    element.classList.add("sort-by--color");
    document;
    sortByResetAllButton.classList.add("sort-by--reset-all-active");
    !chevron.classList.contains("chevron--up")
      ? (chevron.classList.toggle("chevron--up"),
        sortBy(sortByRatingAscending),
        console.log("up"))
      : (chevron.classList.toggle("chevron--up"),
        sortBy(sortByRatingDescending),
        console.log("down"));
  });
}
function resetFilters(data) {
  sortByResetAllButton.addEventListener("click", () => {
    console.log("reset");
    sortByResetAllButton.classList.remove("sort-by--reset-all-active");
    sortByPriceButton.classList.remove("sort-by--color");
    sortByRatingButton.classList.remove("sort-by--color");
    sortByPriceChevron.classList.remove("chevron--up");
    sortByRatingChevron.classList.remove("chevron--up");
    addDataToProducts(data);
  });
}
