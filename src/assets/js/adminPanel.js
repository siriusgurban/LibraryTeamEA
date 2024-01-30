"use strict"

//? -------------------------------------------- Admin Authecation Starts--------------------------------------


const adminCard = document.querySelector("#adminCard");
const adminForm = document.querySelector("#adminForm");
const alertWrong = document.querySelector("#alertWrong");
const inpUsername = document.querySelector("#inpUsername");
const inpPassword = document.querySelector("#inpPassword");
const adminPanel = document.querySelector("#adminPanel");
const adminLogOut = document.querySelector("#adminLogOut");

window.addEventListener("load", (e) => {
    if (localStorage.getItem("valid")) {
        adminCard.setAttribute("class", "d-none");
        adminPanel.removeAttribute("class", "d-none")
    } else {
        adminCard.removeAttribute("class", "d-none")
        adminPanel.setAttribute("class", "d-none");
    }
})

adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (inpUsername.value == "admin" && inpPassword.value == "1234") {
        console.log("works");
        adminCard.setAttribute("class", "d-none");
        adminPanel.removeAttribute("class", "d-none")
        localStorage.setItem("valid", true);


        inpUsername.value = "";
        inpPassword.value = "";

    } else {
        alertWrong.innerHTML = `<div class="alert alert-danger col-10 row m-auto mb-3 text-center" role="alert">
                                    You entered wrong login or password!
                                </div>`

        setTimeout(() => {
            alertWrong.innerHTML = "";
        }, 2000)


        console.log("not working");
    }
})

adminLogOut.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("logged out");
    adminCard.removeAttribute("class", "d-none")
    adminPanel.setAttribute("class", "d-none");
    localStorage.setItem("valid", false);
    localStorage.removeItem("valid");
})



//? -------------------------------------------- Admin Authecation Ends-------------------------------------


//? -------------------------------------------- Add Book Starts-------------------------------------



//? -------------------------------------------- Add Book Ends-------------------------------------


//? -------------------------------------------- About Store Starts-------------------------------------



//? -------------------------------------------- About Store Ends-------------------------------------



//? -------------------------------------------- Join Us Starts-------------------------------------



//? -------------------------------------------- Join Us Endss-------------------------------------


//? -------------------------------------------- Books Starts-------------------------------------

//? Show books as table on AdminPanel where you can delete books


//? -------------------------------------------- Books Ends-------------------------------------


//? -------------------------------------------- Contact Us Starts-------------------------------------



//? -------------------------------------------- Contact Us Ends-------------------------------------



console.log("Admin Panel");