"use strict";
let BookId=window.location.hash.split("=")[1]
let ReadMoreBackBtn=document.querySelector("#ReadMoreBackBtn")
let BookYear=document.querySelector("#BookYear")
let BookName=document.querySelector("#BookName")
let DateAdded=document.querySelector("#DateAdded")
let BookAuthor=document.querySelector("#BookAuthor")
let BookDescription=document.querySelector("#BookDescription")
let BookImgUrl=document.querySelector("#BookImgUrl")
let inputComment=document.querySelector("#inputComment")
let commentbtn=document.querySelector("#commentbtn")
let TextEror=document.querySelector("#TextEror")
let commentsDiv=document.querySelector("#commentsDiv")
let full_div=document.querySelector("#full_div")
let part1=document.querySelector("#part1")
let spiner=document.querySelector("#spiner")



ReadMoreBackBtn.addEventListener("click",()=>{
    window.location.href="/LibraryTeamEA/src/assets/pages/catalog.html"
})
  
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push,onValue,get,child, } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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



const dbRef = ref(getDatabase());

async function getDataById(userId) {
  part1.style.display="none"
  spiner.style.display="block"
  try {
    const snapshot = await get(child(dbRef, `Books/${userId}`));

    if (snapshot.exists()) {
      let data=snapshot.val()
      part1.style.display="block"
  spiner.style.display="none"
      
      BookYear.innerHTML=data.Book_Year.slice(0,4)
      
      BookName.innerHTML=data.Book_Name
      if((Date.now()-data.Book_Date)/(1000*60*60)>24){
        DateAdded.innerHTML= `${Math.floor((Date.now()-data.Book_Date)/(1000*60*60*24))} days ago aded`   
        

      }
      else if((Date.now()-data.Book_Date)/(1000*60*60)>1){
        DateAdded.innerHTML= `${Math.floor((Date.now()-data.Book_Date)/(1000*60*60))} hours ago aded`   

      }
      else if((Date.now()-data.Book_Date)/(1000*60*60)<1){
        DateAdded.innerHTML= `${Math.floor((Date.now()-data.Book_Date)/(1000*60))} minutes ago aded`   
        

      }
      let splitArr=data.Book_escription.split(" ")
   
      BookAuthor.innerHTML=data.Book_Author
      if (splitArr.length>100) {
        BookDescription.innerHTML=`${splitArr.slice(0, 100).join(" ")} <span cursor="pointer" style="font-weight:600" id="ReadMore">...Read more</span> `;
        let ReadMore=document.querySelector("#ReadMore")
        ReadMore.style.cursor = "pointer"
        ReadMore.addEventListener("click",()=>{
          BookDescription.innerHTML=data.Book_escription
  
        })

        
      }
      
      else{
        BookDescription.innerHTML=data.Book_escription

      }


      
   
      BookImgUrl.src=`${data.Book_url}`
    

      console.log(data.Book_url);
     
      
    } else {
      console.log("No data available");
    }
  } catch (error) {
    console.error(error);
  }
}

getDataById(BookId)



 async function PostComment(obj){
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify(
  {
    ...obj
  }
);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
let response= await fetch("https://blog-api-t6u0.onrender.com/posts", requestOptions)
let response2=await response.json()


  
 }


 async function getComment(id){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
   

  let response= await fetch(`https://blog-api-t6u0.onrender.com/posts`, requestOptions)
let response2=await response.json()
let filtered = response2.filter(item => item.Postid == id)
let DataMap=filtered.map((item)=>{
    let AdedDate
    if((Date.now()-item.Date)/(1000*60*60)>24){
    AdedDate= `${Math.floor((Date.now()-item.Date)/(1000*60*60*24))} days ago aded`   
        

      }
      else if((Date.now()-item.Date)/(1000*60*60)>1){
        AdedDate= `${Math.floor((Date.now()-item.Date)/(1000*60*60))} hours ago aded`   

      }
      else if((Date.now()-item.Date)/(1000*60*60)<1){
        AdedDate= `${Math.floor((Date.now()-item.Date)/(1000*60))} minutes ago aded`   
        

      }
    
    return `
    <div id class="comment">
    <div class="commentHistory">
        <h1  class="anonimText">anonim</h1>
        <h1 id="postDate" class="anonimHistory">${AdedDate}</h1>



    </div>
    <div class="commentText w-100">
        <h1 id="comment" class="anonimComment">${item.Comment}</h1>

    </div>

  </div>

    `
})
commentsDiv.innerHTML=DataMap.join("")
console.log(DataMap);


 }



 
 commentbtn.addEventListener("click",()=>{
    if(inputComment.value.trim()===""){
        TextEror.style.display="block"
      
        
    }
    else{
        TextEror.style.display="none"
        let obj1={
            "Name":"Anonim",
            "Date":`${Date.now()}`,
            "Comment":`${inputComment.value}`,
            "Postid":`${BookId}`
        }
        PostComment(obj1)
        getComment(BookId)
        inputComment.value=""
        
        


    }
 })
 
 
getComment(BookId)


 
 


 //"Name":"Anonim",
 // "Comment":"Comment",
 // "id":"TYUIO"