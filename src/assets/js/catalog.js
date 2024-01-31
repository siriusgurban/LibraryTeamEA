"use strict";

console.log("catalog");

const swiper = new Swiper(".swiper-container", {
  // Optional parameters
  //   spaceBetween: 10,
  slidesPerView: 5,
  //   direction: "horizontal",
  loop: true,
  // Navigation arrows
  //   navigation: {
  //     nextEl: ".swiper-button-next",
  //     prevEl: ".swiper-button-prev",
  // },
  breakpoints: {
    0: {
      slidesPerView: 1.5,
      navigation: false,
    },
    575: {
      slidesPerView: 2,
      navigation: false,
    },
    991: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 5,
    },
    // loopAdditionalSlides: 5, // Adjust this based on the number of slides you have
    // loopedSlides: 5,
  },
});
