"use strict"

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu-resp");
const leftMenu = document.querySelector(".left-side-menu");
const body = document.querySelector("body");


hamburger.addEventListener("click",()=>{
    console.log("clikd");
    hamburger.classList.toggle("actived");
    navMenu.classList.toggle("actived");
    body.style.orphans
    console.log("clicked hamburger Menu");

})


console.log("clicked hamburger Menu");
