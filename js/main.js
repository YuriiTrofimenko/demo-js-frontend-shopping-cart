"use strict";

let burgerMenu = document.getElementById("nav-burger");

let sortRatingButton = document.querySelector("#sort-by-rating");

const toTop = document.querySelector(".to-top");
const giftModalWindowOpenButton = document.querySelector(
  ".modal-window__button"
);
const giftModalWindowCard = document.querySelector(".modal-window-hidden");

document.querySelector("#burgerOpen").addEventListener("click", () => {
  burgerMenu.classList.toggle("burger-menu__open");
});

document.querySelector(".burger__icon--close").addEventListener("click", () => {
  burgerMenu.classList.toggle("burger-menu__open");
});
giftModalWindowOpenButton.addEventListener("click", openGiftModalWindow);
giftModalWindowCard.addEventListener("click", closeGiftModalWindow);

//back on top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    toTop.classList.add("to-top__show");
  } else if (window.scrollY < 100) {
    toTop.classList.remove("to-top__show");
  }
});
function openGiftModalWindow() {
  giftModalWindowCard.classList.remove("hide-modal-window");
}

function closeGiftModalWindow(e) {
  console.log(e);
  if (e.target === e.currentTarget) {
    console.log(e);
    console.log(e.target);
    console.log(e.currentTarget);
    giftModalWindowCard.classList.add("hide-modal-window");
  }
}
