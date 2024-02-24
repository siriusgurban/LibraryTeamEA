"use strict";

console.log("index js");

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
const db = getDatabase(app);

// -----------------------------Js For Catalog Section Start-----------------------------//

const catalogCategories = document.querySelector("#catalogCategories");

// function to get the  categories datas
function getCategoriesDatas(collection) {
  const dataBaseRef = ref(db);
  return get(child(dataBaseRef, collection)).then((snapshot) => {
    const categoriesData = snapshot.val();
    let categoriesDataToArray = Object.entries(categoriesData);
    return categoriesDataToArray;
  });
}

//  function to render the categories
function renderCategories(categoriesDat) {
  let arrayDetectingRepetitionCategorie = [];
  const categoriesItem = categoriesDat
    .map((item) => {
      // Checking if the item is already in the array
      if (arrayDetectingRepetitionCategorie.includes(item[1].Book_categories)) {
        return;
      }
      arrayDetectingRepetitionCategorie.push(item[1].Book_categories);

      return `
          <div class="toys-creativity catalog-element-style" role="button" data-cat="${item[1].Book_categories}">
            ${item[1].Book_categories}
          </div>`;
    })
    .join("");

  catalogCategories.innerHTML = categoriesItem;

  let catalogElemntStyle = document.querySelectorAll(".catalog-element-style");
  catalogElemntStyle.forEach(btn => {
    btn.addEventListener("click", () => {
      window.location.href = "../src/assets/pages/catalog.html"
      localStorage.setItem("selectedCategory", btn.dataset.cat);
    })

  })
}

// result
getCategoriesDatas("Books")
  .then((categoriesDat) => {
    renderCategories(categoriesDat);
  })
  .catch((error) => {
    console.error(error);
  });

// -----------------------------Js For Catalog Section End-----------------------------//
