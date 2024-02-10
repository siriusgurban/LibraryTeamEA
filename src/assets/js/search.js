// "use strict";

// console.log("Search js");

// const searchInput = document.querySelector("#search-input");
// const searchBtn = document.querySelector("#search-btn");
// const carouselInner = document.querySelector("#carousel-inner");

"use strict";

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getDatabase, ref, set, onValue, remove } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
    apiKey: "AIzaSyAj8wm_LJMO_RQyZjODELgAZNRcf3wNA58",
    authDomain: "libraryteam-b68e1.firebaseapp.com",
    databaseURL: "https://libraryteam-b68e1-default-rtdb.firebaseio.com",
    projectId: "libraryteam-b68e1",
    storageBucket: "libraryteam-b68e1.appspot.com",
    messagingSenderId: "387899207763",
    appId: "1:387899207763:web:48057601fe5a4efd8a96a6"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const searchBtn = document.querySelector("#searchBtn");
const inp = document.querySelector("#inp");
const swiperWrapper = document.querySelector(".carousel-inner");


function renderFoundBooks() {
    searchBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const books = ref(db, "Books/");

        onValue(books, (snapshot) => {
            const data = snapshot.val();

            let arr = convert(data);
            console.log(arr);

            let filteredBookArr = arr.filter(el => {
                if (el.Book_Name.toLowerCase().includes(inp.value.toLowerCase())) {
                    return el;
                }
            })


            console.log(filteredBookArr, "filteredBookArr");

            if (inp.value.length == 0) {
                console.log("Empty input");
                warningAlert.innerHTML = `<div class="alert alert-warning col-12 row m-auto mb-4 py-4" role="alert">
                                                Fill the input!
                                        </div>`

                setTimeout(() => {
                    warningAlert.innerHTML = "";
                }, 2000)

                return;
            }


            if (filteredBookArr.length > 0) {
                console.log("Found");
                swiperWrapper.innerHTML = filteredBookArr.map((el, index) =>
                (`<div class="carousel-item ${index == 0 ? "active" : ""}">
                     <div class="card" style="max-width: 930px; padding: 48px 30px;">
                       <div class="d-flex justify-content-between gap-3">
        
                         <div class="" >
                            <img style="width: 220px;" src="${el.Book_url == "undefined" ? `../icon/logo_red.svg` : el.Book_url}" class="shadow border" class="img-fluid rounded-start " alt="Book image">
                        </div>

                           <div class="card-body d-flex flex-column ">
                             <h5 class="card-title fs-4 fw-bold mb-3">${el?.Book_Name}</h5>
                             <p class="card-text fs-5 mb-4">${el?.Book_Author}</p>
                             <p class="card-text overflow-y-auto w-100"  style="height: 300px; font-size: 14px; line-height: 196%;" ${el?.Book_escription}>${el?.Book_escription}</p>
                            </div>
                            

                        </div>
                    </div>
                </div>
                `)
                ).join("");

                inp.value = "";
            } else {
                console.log("Not found error");
                swiperWrapper.innerHTML = `
                <div class="carousel-item active">

                <div class="card" style="max-width: 930px; padding: 48px 30px;">
                  <div class="d-flex justify-content-between">

                    <div class="w-100" style="max-width: 220px;">
                      <img src="../images/41bLP6NzvKL.jpg"
                        class="object-fit-contain w-100 border border-danger shadow" alt="default book">
                    </div>

                    <div class="w-100">
                      <div class="card-body d-flex flex-column ">
                        <h5 class="card-title fs-4 fw-bold mb-3 text-danger">Could not</h5>
                        <p class="card-text fs-5 mb-4 text-danger">Find Your Book</p>
                        <p class="card-text overflow-y-auto w-100"
                          style="height: 300px; font-size: 14px; line-height: 196%;">Try to Read Lorem ipsum dolor sit amet consectetur,
                          adipisicing elit. Atque quis deleniti distinctio sequi accusantium labore blanditiis doloremque ex ipsam est,
                           ad ducimus animi, voluptates harum aut consequuntur obcaecati ab vero.</p>
                      </div>
                    </div>

                  </div>
                </div>

              </div>`
                inp.value = "";
            }

        })
    })
}

renderFoundBooks();


function convert(data) {
    let obj = Object.entries(data)
    let ArrData = obj.map((i) => {
        return [
            {
                id: i[0],
                ...i[1]
            }
        ]
    })
    return ArrData.flat()
}
