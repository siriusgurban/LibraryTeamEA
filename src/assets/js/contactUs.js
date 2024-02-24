"use strict";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push,onValue,get,child,set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAj8wm_LJMO_RQyZjODELgAZNRcf3wNA58",
    authDomain: "libraryteam-b68e1.firebaseapp.com",
    databaseURL: "https://libraryteam-b68e1-default-rtdb.firebaseio.com",
    projectId: "libraryteam-b68e1",
    storageBucket: "libraryteam-b68e1.appspot.com",
    messagingSenderId: "387899207763",
    appId: "1:387899207763:web:48057601fe5a4efd8a96a6"

  };
  let db=getDatabase()

 function AddData(obj){
    const booksRef=ref(db,"contactUs");
    push(booksRef,obj)
    


 }
  const app = initializeApp(firebaseConfig);




let Full_Name=document.querySelector("#Full_Name")
let Email=document.querySelector("#Email")
let Address=document.querySelector("#Address")
let Phone=document.querySelector("#Phone")
let ContactTextare=document.querySelector("#ContactTextare")
let Contactbtn=document.querySelector("#Contactbtn")
let TextErorContact=document.querySelector("#TextErorContact")
let successfull=document.querySelector("#successfull")

Contactbtn.addEventListener("click",()=>{
if(Full_Name.value.trim() !== ''&&Address.value.trim()!==""&&Email.value.trim()!==""&&Phone.value.trim()!==""&&ContactTextare.value.trim()!==""){
    TextErorContact.style.display = "none";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  
    

    let testEmail=emailRegex.test(`${Email.value}`)
    let testNumber=numberRegex.test(`${Phone.value}`)
    if(testEmail==true && testNumber==true){
      let obj={
        Full_Name:Full_Name.value,
        Address:Address.value,
        Email:Email.value,
        Phone:Phone.value,
        Description:ContactTextare.value,
    
    

    }
    AddData(obj)
    

    

    
        Full_Name.value="",
        Address.value="",
        Email.value="",
        Phone.value="",
        ContactTextare.value=""
        successfull.style.display="block"
        setTimeout(()=>{
          successfull.style.display="none"

        },3000)
        

    }
    else{
      TextErorContact.textContent="Invalid email or number"
      TextErorContact.style.display = "block";

    }


   

}

else{
  TextErorContact.textContent="Please fill in all input field"
    TextErorContact.style.display = "block";



}
    


})