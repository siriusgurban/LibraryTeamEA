"use strict";

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  autoplay: {
    delay: 2000,
    disableOnInteraction: false, // Continue autoplay even when the user interacts with the slider
  },
  loop: true,
  slidesPerView: 1,
  // arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.5,
    },
    601: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
    1440: {
      slidesPerView: 5,
    },
  },
});
