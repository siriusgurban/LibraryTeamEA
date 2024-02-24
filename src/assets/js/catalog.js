"use strict";

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAj8wm_LJMO_RQyZjODELgAZNRcf3wNA58",
  authDomain: "libraryteam-b68e1.firebaseapp.com",
  databaseURL: "https://libraryteam-b68e1-default-rtdb.firebaseio.com",
  projectId: "libraryteam-b68e1",
  storageBucket: "libraryteam-b68e1.appspot.com",
  messagingSenderId: "387899207763",
  appId: "1:387899207763:web:48057601fe5a4efd8a96a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dataBase = getDatabase(app);

const categoriesList = document.querySelector("#categoriesList");

function getCategories(coll) {
  const dbRef = ref(dataBase);
  return get(child(dbRef, coll))
    .then((snapshot) => {
      const categoriesObj = snapshot.val();
      let categoriesObjToArray = Object.entries(categoriesObj);
      return categoriesObjToArray;
    })
    .catch((error) => {
      console.error("Error fetching categories data", error);
      throw error; // Propagate the error to the next .then() block
    });
}

//  function to render the categories
function renderDatas(categorieData) {
  let arrayDetectingRepetitionCat = [];
  const Item = categorieData
    .map((item) => {
      // Checking if the item is already in the array
      if (arrayDetectingRepetitionCat.includes(item[1].Book_categories)) {
        return;
      }
      arrayDetectingRepetitionCat.push(item[1].Book_categories);

      return `
        <ul>
          <li><a class="categorieLink" href="#">${item[1].Book_categories}</a></li>
        </ul>
      `;
    })
    .join("");

  categoriesList.innerHTML = Item;
}

getCategories("Books")
  .then((categorieData) => {
    renderDatas(categorieData);
  })
  .catch((error) => {
    console.error(error);
  });
// ?

function SwiperSlider() {
  const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false
    // },
    // effect: "coverflow",
    // coverflowEffect: {
    //   rotate: 2,
    //   slideShadows: false,
    // },
    loop: true,
    slidesPerView: 1,
    // arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    mousewheel: {
      forceToAxis: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1.4,
      },
      601: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1440: {
        slidesPerView: 5,
      },
    },
  });
}

const slider1 = document.querySelector("#slider1");

function renderBookCards(booksData1) {
  SwiperSlider();
  slider1.innerHTML = booksData1
    .map((item) => {
      console.log(item);
      const newBookIcon = item[1].Book_New
        ? '<div class="newBookIcon position-absolute top-0 end-0"><h3>New</h3></div>'
        : "";
      return `
        <div class="swiper-slide">
          <div class="card-container">
            <div class="card">
              <img src="${item[1].Book_url}" alt="${item[1].Book_Name}" />
              <h2>${
                item[1].Book_Name.length > 16
                  ? item[1].Book_Name.slice(0, 14) + "..."
                  : item[1].Book_Name
              }</h2>
              <p>${
                item[1].Book_Author.length > 16
                  ? item[1].Book_Author.slice(0, 16) + "..."
                  : item[1].Book_Author
              }</p>
              <button class="read-more zoom" data-id="${
                item[0]
              }">Read more</button>
              ${newBookIcon}
            </div>
          </div>
        </div>`;
    })
    .join("");

  const readMoreButtons = document.querySelectorAll(".read-more");
  readMoreButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      renderBooksReadMore(e.target.dataset.id);
    });
  });
}

// Fetch and render book cards
getCategories("Books")
  .then((booksData1) => {
    renderBookCards(booksData1);
  })
  .catch((error) => {
    console.error(error);
  });

// bestseller

const slider2 = document.querySelector("#slider2");

function renderBookCards2(booksData2) {
  SwiperSlider();
  slider2.innerHTML = booksData2
    .filter((item) => item[1].Book_Besteller)
    .map((item) => {
      const newBookIcon = item[1].Book_New
        ? '<div class="newBookIcon position-absolute top-0 end-0"><h3>New</h3></div>'
        : "";
      return `
        <div class="swiper-slide">
          <div class="card-container">
            <div class="card">
              <img src="${item[1].Book_url}" alt="${item[1].Book_Name}" />
              <h2>${
                item[1].Book_Name.length > 16
                  ? item[1].Book_Name.slice(0, 14) + "..."
                  : item[1].Book_Name
              }</h2>
              <p>${
                item[1].Book_Author.length > 16
                  ? item[1].Book_Author.slice(0, 16) + "..."
                  : item[1].Book_Author
              }</p>
              <button class="read-more zoom" data-id="${
                item[0]
              }">Read more</button>
              ${newBookIcon}
            </div>
          </div>
        </div>`;
    })
    .join("");

  const readMoreButtons = slider2.querySelectorAll(".read-more");
  readMoreButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      renderBooksReadMore(e.target.dataset.id);
    });
  });
}

// Fetch and render book cards for Slider 2
getCategories("Books")
  .then((booksData2) => {
    renderBookCards2(booksData2);
  })
  .catch((error) => {
    console.error(error);
  });

// new releases
const slider3 = document.querySelector("#slider3");

function renderBookCards3(booksData3) {
  SwiperSlider();
  slider3.innerHTML = booksData3
    .filter((item) => item[1].Book_New)
    .map((item) => {
      return `
        <div class="swiper-slide">
          <div class="card-container">
            <div class="card">
              <img src="${item[1].Book_url}" alt="${item[1].Book_Name}" />
              <h2>${
                item[1].Book_Name.length > 16
                  ? item[1].Book_Name.slice(0, 14) + "..."
                  : item[1].Book_Name
              }</h2>
              <p>${
                item[1].Book_Author.length > 16
                  ? item[1].Book_Author.slice(0, 16) + "..."
                  : item[1].Book_Author
              }</p>
              <button class="read-more zoom" data-id="${
                item[0]
              }">Read more</button>
              <div class="newBookIcon position-absolute top-0 end-0">
                <h3>New</h3>
              </div>
            </div>
          </div>
        </div>`;
    })
    .join("");

  const readMoreButtons = slider3.querySelectorAll(".read-more");
  readMoreButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      renderBooksReadMore(e.target.dataset.id);
    });
  });
}

// Fetch and render book cards for Slider 3
getCategories("Books")
  .then((booksData3) => {
    renderBookCards3(booksData3);
  })
  .catch((error) => {
    console.error(error);
  });

// function for read more button
function renderBooksReadMore(id) {
  window.location.href = `../pages/readMore.html#id=${id}`;
}

categoriesList.addEventListener("click", async function (event) {
  SwiperSlider();
  const categoryLink = event.target.closest(".categorieLink");
  if (categoryLink) {
    document.querySelectorAll(".categorieLink").forEach((link) => {
      link.style.color = "";
      allBooksLink.style.color = "var(--color-orange)";
    });
    const selectedCategory = categoryLink.textContent;
    categoryLink.style.color = "var(--color-orange)";
    allBooksLink.style.color = "";

    try {
      // Fetch all books initially
      const booksData = await getCategories("Books");

      // Filter books based on the selected category
      const filteredBooks = booksData.filter(
        (item) => item[1].Book_categories === selectedCategory
      );

      // Update each slider with the filtered books
      renderBookCards(filteredBooks);
      // renderBookCards2(filteredBooks);
      // renderBookCards3(filteredBooks);

      localStorage.setItem("selectedCategory", selectedCategory);
    } catch (error) {
      console.error(error);
    }
  }
});

// local storage
document.addEventListener("DOMContentLoaded", async function () {
  SwiperSlider();
  const selectedCategory = localStorage.getItem("selectedCategory");

  if (selectedCategory) {
    try {
      const booksData = await getCategories("Books");

      if (selectedCategory === "All") {
        renderBookCards(booksData);
        renderBookCards2(booksData);
        renderBookCards3(booksData);
        allBooksLink.style.color = "var(--color-orange)";
      } else {
        const filteredBooks = booksData.filter(
          (item) => item[1].Book_categories === selectedCategory
        );
        renderBookCards(filteredBooks);
        renderBookCards2(filteredBooks);
        renderBookCards3(filteredBooks);
        document.querySelectorAll(".categorieLink").forEach((link) => {
          if (link.textContent === selectedCategory) {
            link.style.color = "var(--color-orange)";
          } else {
            link.style.color = "";
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
});

const allBooksLink = document.querySelector("#all-books-link");
allBooksLink.addEventListener("click", async function () {
  SwiperSlider();
  try {
    const booksData = await getCategories("Books");
    renderBookCards(booksData);
    renderBookCards2(booksData);
    renderBookCards3(booksData);
    document.querySelectorAll(".categorieLink").forEach((link) => {
      link.style.color = "";
    });
    allBooksLink.style.color = "var(--color-orange)";
    localStorage.setItem("selectedCategory", "All");
  } catch (error) {
    console.error(error);
  }
});
