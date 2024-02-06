"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, get, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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

// ---------------------------------Join Us Starts--------------------------------------------------

const inpFullname = document.querySelector("#inpFullname");
const inpEmail = document.querySelector("#inpEmail");
const joinUsFormBtn = document.querySelector("#joinUsFormBtn");
const successAlert = document.querySelector("#successAlert");



joinUsFormBtn.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log("cliked form");

    let joinUsUsObj = {
        fullname: inpFullname.value,
        email: inpEmail.value,
    }

    writeUserData(joinUsUsObj);    //adding jointUsObj to joinUs called
    console.log("Joined");

    inpFullname.value = "";
    inpEmail.value = "";

    successAlert.innerHTML = `<div class="alert alert-success col-11 row m-auto mb-3" role="alert">
                                    You successfully joined!
                                </div>`

    setTimeout(() => {
        successAlert.innerHTML = "";
    }, 2000)

})

function writeUserData(joinUsUsObj) {

    const reference = ref(db, "joinUs/");//adding jointUsObj to joinUs

    push(reference,
        joinUsUsObj
    );
}

// ---------------------------------Join Us Ends--------------------------------------------------

console.log("Join Us js");