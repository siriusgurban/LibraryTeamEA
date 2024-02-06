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

let inptSearch=document.querySelector("#inptSearch")
let SearchIcon=document.querySelector("#SearchIcon")
let BooksUl=document.querySelector("#BooksUl")
let BookName=document.querySelector("#BookName")
let AuthorName=document.querySelector("#AuthorName")
let BookUrl=document.querySelector("#BookUrl")
let Description=document.querySelector("#Description")
let BookType=document.querySelector("#BookType")
let BookYear=document.querySelector("#BookYear")
let select=document.querySelector("#select")
let FormBtnAdd=document.querySelector("#FormBtnAdd")
let textEror=document.querySelector("#textEror")
let checkboxNew=document.querySelector("#checkboxNew")
let checkboxBesteller=document.querySelector("#checkboxBesteller")
let TextSuccessfully=document.querySelector("#TextSuccessfully")


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push,onValue,get, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
const db = getDatabase(app);

function add(gol, objec) {
    const booksRef = ref(db, gol);
    push(booksRef, objec);
}

function convert(data){
    let obj=Object.entries(data)
    let ArrData= obj.map((i)=>{
           return [
               {
                   id:i[0],
                   ...i[1]
               }
           ]
       })
       return ArrData.flat()
}

function GetData(gol){
    const booksRef = ref(db, gol)
    onValue(booksRef,(s)=>{
        const data=s.val()
       let convertdata=  convert(data)
       
      let option=convertdata.map((i)=>{
        return `
        <option value="saab">${i.Book_categories}</option>
        `
      })
     
      let arr=[`<option value="" disabled selected hidden>Select an option</option>`,...option]
      select.innerHTML=arr.join("")

    })
   
  }
  GetData("Books")
async function getDateBooks() {
    try {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes/?q=${inptSearch.value}`);
        let response2=await response.json()
        let filteredItems = response2.items.filter(item => item.volumeInfo.authors !== undefined && item.volumeInfo.authors.length > 0);
        let map1=response2.items.map((i,index)=>{
            return`
            <li  data-info="${index}"   class="AdminLi" >
            <img data-info="${index}" id="img"   class="adminHistory" src="../images/adminhistory.svg" alt="">
            <h1 data-info="${index}" class="AdminLiText">${ i.volumeInfo.title}</h1>
        </li>
            `
        }).join("")
        BooksUl.innerHTML=map1
        BooksUl.style.display = "block";
        BooksUl.addEventListener("click",async (event)=>{
            let bb=event.target.dataset.info   
            BookName.value=filteredItems[bb].volumeInfo.title
            AuthorName.value=filteredItems[bb].volumeInfo.authors
            BookUrl.value=filteredItems[bb].volumeInfo.imageLinks.smallThumbnail
            filteredItems[bb].volumeInfo.description==undefined?Description.value="":  Description.value=filteredItems[bb].volumeInfo.description
            filteredItems[bb].volumeInfo.categories==undefined?  BookType.value="":   BookType.value=filteredItems[bb].volumeInfo.categories
            BookYear.value=filteredItems[bb].volumeInfo.publishedDate
            inptSearch.value=""
            inptSearch.removeAttribute('placeholder')
        })
        
    } catch (error) {
        console.error('Error:', error);
    }
   
}

SearchIcon.addEventListener("click",getDateBooks)
btnType.addEventListener("click",()=>{
    if(BookType.classList.contains("d-none")){
        BookType.classList.remove("d-none")
        select.classList.remove("d-block")
        select.classList.add("d-none")
    }
    else{
        BookType.classList.add("d-none")
        select.classList.remove("d-none")
        select.classList.add("d-block")
    }
})
function myFunction(){
    TextSuccessfully.style.display="none"
}

FormBtnAdd.addEventListener("click",()=>{
    if(BookName.value.trim()!==''&&AuthorName.value.trim()!==''&&BookUrl.value.trim()!==''&&Description.value.trim()!==''&&BookYear.value.trim()!==''&&BookType.value.trim()!==''||select.value!==''){
        
        let type
        if(select.value!==''){
           type=select.value
        }
        else{
            type=BookType.value
        }
        textEror.style.display="none"

        let objectData={
            Book_Name:BookName.value,
            Book_Author:AuthorName.value,
            Book_categories:type,
            Book_url:BookUrl.value,
            Book_escription:Description.value,
            Book_Year:BookYear.value,
            Book_New:checkboxNew.checked,
            Book_Besteller:checkboxBesteller.checked,
            Book_Date:Date.now()
        }
        add("Books",objectData)
        TextSuccessfully.style.display="block"
        setTimeout(myFunction, 3000);
        BookName.value=""
        AuthorName.value=""
        BookUrl.value=""
        Description.value=""
        BookYear.value=""
        BookType.value=""
        select.value=""
        checkboxNew.checked=false
        checkboxBesteller.checked=false
        if(BookType.classList.contains("d-none")){
            BookType.classList.remove("d-none")
            select.classList.remove("d-block")
            select.classList.add("d-none")
    
        }
        else{
            BookType.classList.add("d-none")
            select.classList.remove("d-none")
            select.classList.add("d-block")
    
        }
    }
    else{
        textEror.style.display="block"
    }
})



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