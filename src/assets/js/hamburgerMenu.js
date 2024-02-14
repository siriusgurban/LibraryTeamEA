"use strict"

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const leftMenu = document.querySelector(".left-side-menu");
const body = document.querySelector("body");

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("actived");
    navMenu.classList.toggle("actived");
    body.style.orphans

})

// hamburger.addEventListener("click",()=>{
//     hamburger.classList.toggle("actived");
//     leftMenu.classList.toggle("actived");
//     body.style.orphans

// })


console.log("clicked");
