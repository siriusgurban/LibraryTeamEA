"use strict"

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu-resp");
const leftMenu = document.querySelector(".left-side-menu");
const forminpt = document.querySelector(".forminpt");
const rightMenu = document.querySelector("#right-side-menu");
const AuthorName = document.querySelector("#AuthorName");
const BookForm = document.querySelector(".BookForm");
const body = document.querySelector("body");


hamburger.addEventListener("click",()=>{
    console.log("clikd");
    hamburger.classList.toggle("actived");
    navMenu.classList.toggle("actived");
    rightMenu.classList.toggle("actived");
    BookForm.classList.toggle("actived");
    forminpt.classList.toggle("actived");
    AuthorName.classList.toggle("actived");
    body.style.orphans
    console.log("clicked hamburger Menu");

})


console.log("clicked hamburger Menu");
