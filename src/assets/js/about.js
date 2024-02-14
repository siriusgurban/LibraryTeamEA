"use strict"

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, get, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig1 = {
    apiKey: "AIzaSyAj8wm_LJMO_RQyZjODELgAZNRcf3wNA58",
    authDomain: "libraryteam-b68e1.firebaseapp.com",
    databaseURL: "https://libraryteam-b68e1-default-rtdb.firebaseio.com",
    projectId: "libraryteam-b68e1",
    storageBucket: "libraryteam-b68e1.appspot.com",
    messagingSenderId: "387899207763",
    appId: "1:387899207763:web:48057601fe5a4efd8a96a6"
};

const app = initializeApp(firebaseConfig1);
const db = getDatabase();


const main_section = document.querySelector("#main_section");

 async function getData(col) {
    const aboutUsRef = ref(db, col)
    onValue(aboutUsRef, async (s) => {
        const data = await s.val();

        main_section.innerHTML = ` 
                                    <div class="d-flex about-container" style="gap: 50px">
                                    
                                        <div class="w-50 about_text">
                                            <h1 class="about">${data?.title}</h1>
                                            <p class="parag">${data?.content}</p>
                                        </div>

                                        <div class="w-50 about_img" style="margin-top: 120px">
                                            <img class=" w-100" style="object-fit: contain" src="${data?.image}" alt="aboutStore" />
                                        </div>
                                        
                                    </div>`
    })

}

getData("aboutUs");

