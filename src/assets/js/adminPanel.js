"use strict"

//? -------------------------------------------- Admin Authecation Starts--------------------------------------


import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { set, remove } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const adminCard = document.querySelector("#adminCard");
const adminForm = document.querySelector("#adminForm");
const alertWrong = document.querySelector("#alertWrong");
const inpUsername = document.querySelector("#inpUsername");
const inpPassword = document.querySelector("#inpPassword");
const adminPanel = document.querySelector("#adminPanel");
const adminLogOut = document.querySelector("#adminLogOut");

const firebaseConfig1 = {
    apiKey: "AIzaSyAj8wm_LJMO_RQyZjODELgAZNRcf3wNA58",
    authDomain: "libraryteam-b68e1.firebaseapp.com",
    databaseURL: "https://libraryteam-b68e1-default-rtdb.firebaseio.com",
    projectId: "libraryteam-b68e1",
    storageBucket: "libraryteam-b68e1.appspot.com",
    messagingSenderId: "387899207763",
    appId: "1:387899207763:web:48057601fe5a4efd8a96a6"
};


const app1 = initializeApp(firebaseConfig1);
const auth = getAuth(app1);


adminForm.addEventListener("submit", (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, inpUsername.value, inpPassword.value)
        .then((userCredential) => {
            const user = userCredential.user;
            adminCard.setAttribute("class", "d-none");
            adminPanel.removeAttribute("class", "d-none")
            inpUsername.value = "";
            inpPassword.value = "";
            console.log(user);
            console.log(" user loggined");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alertWrong.innerHTML = `<div class="alert alert-danger col-10 row m-auto mb-3 text-center" role="alert">
                                    You entered wrong login or password!
                                </div>`

            setTimeout(() => {
                alertWrong.innerHTML = "";
            }, 2000)
        });

})


adminLogOut.addEventListener("click", (e) => {
    e.preventDefault();

    signOut(auth).then(() => {
        console.log("logged out");
        adminCard.removeAttribute("class", "d-none")
        adminPanel.setAttribute("class", "d-none");
    }).catch((error) => {
        console.log(error, "error in Sign Out");
    });
})


window.addEventListener("load", (e) => {

    setTimeout(() => {
        adminCard.removeAttribute("class", "d-none")
        onAuthStateChanged(auth, (user) => {
            if (user) {
                adminCard.setAttribute("class", "d-none");
                adminPanel.removeAttribute("class", "d-none")
                const uid = user.uid;
            } else {
            }
        });
    }, 500)

})



//? -------------------------------------------- Admin Authecation Ends-------------------------------------

//? -------------------------------------------- Add Book Starts-------------------------------------

let inptSearch = document.querySelector("#inptSearch")
let SearchIcon = document.querySelector("#SearchIcon")
let BooksUl = document.querySelector("#BooksUl")
let BookName = document.querySelector("#BookName")
let AuthorName = document.querySelector("#AuthorName")
let BookUrl = document.querySelector("#BookUrl")
let Description = document.querySelector("#Description")
let BookType = document.querySelector("#BookType")
let BookYear = document.querySelector("#BookYear")
let select = document.querySelector("#select")
let FormBtnAdd = document.querySelector("#FormBtnAdd")
let textEror = document.querySelector("#textEror")
let checkboxNew = document.querySelector("#checkboxNew")
let checkboxBesteller = document.querySelector("#checkboxBesteller")
let TextSuccessfully = document.querySelector("#TextSuccessfully")


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
const db = getDatabase(app);

function add(gol, objec) {
    const booksRef = ref(db, gol);
    push(booksRef, objec);
}

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

function GetData(gol) {
    const booksRef = ref(db, gol)
    onValue(booksRef, (s) => {
        const data = s.val()
        let convertdata = convert(data)

        let option = convertdata.map((i) => {
            return `
        <option value="saab">${i.Book_categories}</option>
        `
        })

        let arr = [`<option value="" disabled selected hidden>Select an option</option>`, ...option]
        select.innerHTML = arr.join("")

    })

}
GetData("Books")
async function getDateBooks() {
    try {
        let response = await fetch(`https://www.googleapis.com/books/v1/volumes/?q=${inptSearch.value}`);
        let response2 = await response.json()
        let filteredItems = response2.items.filter(item => item.volumeInfo.authors !== undefined && item.volumeInfo.authors.length > 0);
        let map1 = response2.items.map((i, index) => {
            return `
            <li  data-info="${index}"   class="AdminLi" >
            <img data-info="${index}" id="img"   class="adminHistory" src="../images/adminhistory.svg" alt="">
            <h1 data-info="${index}" class="AdminLiText">${i.volumeInfo.title}</h1>
        </li>
            `
        }).join("")
        BooksUl.innerHTML = map1
        BooksUl.style.display = "block";
        BooksUl.addEventListener("click", async (event) => {
            let bb = event.target.dataset.info
            BookName.value = filteredItems[bb].volumeInfo.title
            AuthorName.value = filteredItems[bb].volumeInfo.authors
            BookUrl.value = filteredItems[bb].volumeInfo.imageLinks.smallThumbnail
            filteredItems[bb].volumeInfo.description == undefined ? Description.value = "" : Description.value = filteredItems[bb].volumeInfo.description
            filteredItems[bb].volumeInfo.categories == undefined ? BookType.value = "" : BookType.value = filteredItems[bb].volumeInfo.categories
            BookYear.value = filteredItems[bb].volumeInfo.publishedDate
            inptSearch.value = ""
            inptSearch.removeAttribute('placeholder')
        })

    } catch (error) {
        console.error('Error:', error);
    }

}

SearchIcon.addEventListener("click", getDateBooks)
btnType.addEventListener("click", () => {
    if (BookType.classList.contains("d-none")) {
        BookType.classList.remove("d-none")
        select.classList.remove("d-block")
        select.classList.add("d-none")
    }
    else {
        BookType.classList.add("d-none")
        select.classList.remove("d-none")
        select.classList.add("d-block")
    }
})
function myFunction() {
    TextSuccessfully.style.display = "none"
}

FormBtnAdd.addEventListener("click", () => {
    if (BookName.value.trim() !== '' && AuthorName.value.trim() !== '' && BookUrl.value.trim() !== '' && Description.value.trim() !== '' && BookYear.value.trim() !== '' && BookType.value.trim() !== '' || select.value !== '') {

        let type
        if (select.value !== '') {
            type = select.value
        }
        else {
            type = BookType.value
        }
        textEror.style.display = "none"

        let objectData = {
            Book_Name: BookName.value,
            Book_Author: AuthorName.value,
            Book_categories: type,
            Book_url: BookUrl.value,
            Book_escription: Description.value,
            Book_Year: BookYear.value,
            Book_New: checkboxNew.checked,
            Book_Besteller: checkboxBesteller.checked,
            Book_Date: Date.now()
        }
        add("Books", objectData)
        TextSuccessfully.style.display = "block"
        setTimeout(myFunction, 3000);
        BookName.value = ""
        AuthorName.value = ""
        BookUrl.value = ""
        Description.value = ""
        BookYear.value = ""
        BookType.value = ""
        select.value = ""
        checkboxNew.checked = false
        checkboxBesteller.checked = false
        if (BookType.classList.contains("d-none")) {
            BookType.classList.remove("d-none")
            select.classList.remove("d-block")
            select.classList.add("d-none")

        }
        else {
            BookType.classList.add("d-none")
            select.classList.remove("d-none")
            select.classList.add("d-block")

        }
    }
    else {
        textEror.style.display = "block"
    }
})



//? -------------------------------------------- Add Book Ends-------------------------------------


//? -------------------------------------------- About Store Starts-------------------------------------


const aboutTitle = document.querySelector("#aboutTitle");
const aboutImgUrl = document.querySelector("#aboutImgUrl");
const aboutDescription = document.querySelector("#aboutDescription");
const aboutBtnAdd = document.querySelector("#aboutBtnAdd");

aboutBtnAdd.addEventListener("click", () => {

    let obj = {
        title: aboutTitle.value,
        content: aboutDescription.value,
        image: aboutImgUrl.value
    }


    function addAbout(col, object) {
        const aboutRef = ref(db, col);
        set(aboutRef, object);
    }

    addAbout("aboutUs", obj);
})

window.addEventListener("load", (e) => {

    function getData(col) {
        const aboutRef = ref(db, col)
        onValue(aboutRef, async (s) => {
            const data = await s.val()
            aboutTitle.value = data?.title;
            aboutImgUrl.value = data?.image;
            aboutDescription.value = data?.content;
        })

    }

    getData("aboutUs");
})
//? -------------------------------------------- About Store Ends-------------------------------------



//? -------------------------------------------- Join Us Starts-------------------------------------


let joinUstbody = document.querySelector("#joinUstbody");

function renderJoinUsesonTable() {

    const joinUses = ref(db, "joinUs");
    onValue(joinUses, async (snapshot) => {

        const data = await snapshot.val();

        const arr = convert(data);

        joinUstbody.innerHTML = arr.map((el, index) => {
            return `<tr >
            <th scope="row" class="text-center p-3">${index + 1}</th>
            <td class="text-center p-3">${el.fullname}</td>
            <td class="text-center p-3">${el.email}</td>
            </tr>`
        }).join("");

    })
}

renderJoinUsesonTable();

//? -------------------------------------------- Join Us Endss-------------------------------------


//? -------------------------------------------- Books Starts-------------------------------------

//? Show books as table on AdminPanel where you can delete books


let booktbody = document.querySelector("#booktbody");

function renderBooksonTable() {
    const books = ref(db, "Books/");

    onValue(books, async (snapshot) => {
        const data = await snapshot.val();
        const arr = convert(data);

        booktbody.innerHTML = arr.map((item, index) => {
            return `<tr >
                        <th scope="row" class="text-center p-3">${index + 1}</th>
                        <td col-3 class="text-center p-3">${item?.Book_Name.slice(0, 10)}</td>
                        <td col-3 class="text-center p-3">${item?.Book_Author.slice(0, 10)}</td>
                        <td col-3 class="text-center p-3">${item?.Book_escription.slice(0, 10)}</td>
                        <td col-3 class="text-center p-3">${item?.Book_categories.slice(0, 10)}</td>
                        <td class="text-center"><img role="button" data-id="${item?.id}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="editIcon" style="width: 25%" src="../icons/icons8-edit-24.png" /></td>
                        <td class="text-center"><img role="button" data-id="${item?.id}" data-name="${item?.Book_Name}" data-author="${item?.Book_Author}" data-image="${item?.Book_url}" data-type="${item?.Book_categories}" data-bs-toggle="modal" data-bs-target="#exampleModal" class="deleteIcon" style="width: 20%" src="../icons/icons8-trash-48.png" /></td>
                    </tr>`
        }).join("");

        
        let descHover = document.querySelectorAll(".descHover");
        let editIcon = document.querySelectorAll(".editIcon");
        let deleteIcon = document.querySelectorAll(".deleteIcon");

        editIcon.forEach((icon) => {
            icon.addEventListener("mouseover", (e) => {
                icon.src = "../icons/icons8-edit.gif";
            })
            icon.addEventListener("mouseleave", () => {
                icon.src = "../icons/icons8-edit-24.png";
            })
        })

        deleteIcon.forEach((icon) => {
            icon.addEventListener("mouseover", (e) => {
                icon.src = "../icons/system-solid-39-trash.gif";
            })
            icon.addEventListener("mouseleave", () => {
                icon.src = "../icons/icons8-trash-48.png";
            })
        })

        
        deleteIcon.forEach((icon) => {
            icon.addEventListener("click", (e) => {
                icon.src = "../icons/system-solid-39-trash.gif";
            })
            icon.addEventListener("mouseleave", () => {
                icon.src = "../icons/icons8-trash-48.png";
            })
        })

        // descHover.forEach((btn) => {                      //shows function that shows full description and then hide description
        //     btn.addEventListener("mouseover", (e) => {
        //         btn.style.overflow = "visible";
        //         btn.style.height = "auto";
        //     })
        //     btn.addEventListener("mouseleave", () => {
        //         btn.style.overflow = "hidden";
        //         btn.style.height = "50px";
        //     })
        // })

        const deleteItemBtn = document.querySelector("#deleteItemBtn");
        const deleteModalContent = document.querySelector("#deleteModalContent");

        let delBtn = document.querySelectorAll(".delBtn");

        deleteIcon.forEach(btn => {
            btn.addEventListener("click", () => {
                console.log(btn.dataset.id, "btn.dataset.id");          //delete function called
                deleteModalContent.innerHTML = `<div class="d-flex justify-content-between gap-3"><div class="d-flex flex-column gap-3"><p><span class="fw-bold">Author: </span>${btn.dataset.author}</p><p><span class="fw-bold">Title: </span>${btn.dataset.name}</p><p><span class="fw-bold">Type: </span>${btn.dataset.type}</p></div><div><img  style="width: 100px" src="${btn.dataset.image}"/></div></div>`;
                deleteItemBtn.addEventListener("click", () => {
                    deleteBook(btn.dataset.id);
                })

            })
        })



        function deleteBook(bookId) {                                   //delete function
            let rmv = ref(db, "Books/" + bookId);


            remove(rmv).then(() => console.log("Successfully deleted"));
            // let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
            // const myModalEl = document.querySelector('.modal');
            // myModal.hide()        
        }

    })
}

renderBooksonTable();



//? -------------------------------------------- Books Ends-------------------------------------


//? -------------------------------------------- Contact Us Starts-------------------------------------



//? -------------------------------------------- Contact Us Ends-------------------------------------



console.log("Admin Panel");