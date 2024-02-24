"use strict"

//? -------------------------------------------- Admin Authecation Starts--------------------------------------


import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { set, remove, update } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
            alertWrong.innerHTML = `<div class="alert alert-danger col-10 row m-auto mb-3 text-center form_alert_inner" role="alert">
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
import { getDatabase, ref, push, onValue, get, child } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

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
        let convertdata = convert(data);


        let arrSortedCategories = checkForDuplicates(convertdata.map(item => item.Book_categories));//convertdata-nin icinden kategoriyalari gotururem, ve unikallasdiriram checkForDuplicates ile

        let option = arrSortedCategories.map((i) => {
            return `
                    <option value="saab">${i}</option>
                    `
        })









        //Beyler-in kodu
        // let option = convertdata.map((i) => {
        //     return `
        //             <option value="saab">${i.Book_categories}</option>
        //             `
        // })


        let arr = [`<option value="" disabled selected hidden >Select an option</option>`, ...option]
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
            BookName.value = filteredItems[bb]?.volumeInfo?.title
            AuthorName.value = filteredItems[bb]?.volumeInfo?.authors
            BookUrl.value = filteredItems[bb].volumeInfo.imageLinks.smallThumbnail
            filteredItems[bb].volumeInfo.description == undefined ? Description.value = "" : Description.value = filteredItems[bb].volumeInfo.description
            filteredItems[bb].volumeInfo.categories == undefined ? BookType.value = "" : BookType.value = filteredItems[bb].volumeInfo.categories
            BookYear.value = filteredItems[bb].volumeInfo.publishedDate
            inptSearch.value = ""
            inptSearch.removeAttribute('placeholder')
            BooksUl.style.display = "none";
        })

    } catch (error) {
        console.error('Error:', error);
    }

}

const plus = document.querySelector(".plus");

SearchIcon.addEventListener("click", getDateBooks)
btnType.addEventListener("click", () => {
    if (BookType.classList.contains("d-none")) {
        BookType.classList.remove("d-none")
        select.classList.remove("d-block")
        select.classList.add("d-none")
        plus.src = "../icons/plusorangepngwing.com.png"
    }
    else {
        BookType.classList.add("d-none")
        select.classList.remove("d-none")
        select.classList.add("d-block")
        plus.src = "../icons/pluspngwing.com.png"

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

function checkForDuplicates(arr) {    //function checks For Duplicates in categories
    return [...new Set(arr)];
}

//? -------------------------------------------- Add Book Ends-------------------------------------


//? -------------------------------------------- About Store Starts-------------------------------------


const aboutTitle = document.querySelector("#aboutTitle");
const aboutImgUrl = document.querySelector("#aboutImgUrl");
const aboutDescription = document.querySelector("#aboutDescription");
const aboutBtnAdd = document.querySelector("#aboutBtnAdd");
const aboutAlert = document.querySelector("#aboutAlert");

aboutBtnAdd.addEventListener("click", () => {

    let obj = {
        title: aboutTitle.value,
        content: aboutDescription.value,
        image: aboutImgUrl.value
    }


    function addAbout(col, object) {
        const aboutRef = ref(db, col);
        set(aboutRef, object);
        alertFn();
    }

    addAbout("aboutUs", obj);

    function alertFn() {
        aboutAlert.innerHTML = `<div class="alert alert-success p-2 text-center" role="alert">
                                    Successfully changed!
                                </div>`

        setTimeout(() => {
            aboutAlert.innerHTML = "";
        }, 1000)
    }
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
                        <td col-3 class="text-center p-3"><a class="tooltip-test text-decoration-none text-dark" title="${item?.Book_Name}">${item?.Book_Name.length > 25 ? item?.Book_Name.slice(0, 25) + "..." : item?.Book_Name}</a></td>
                        <td col-3 class="text-center p-3"><a class="tooltip-test text-decoration-none text-dark" title="${item?.Book_Author}">${item?.Book_Author.length > 25 ? item?.Book_Author.slice(0, 25) + "..." : item?.Book_Author}</a></td>
                        <td col-3 class="text-center p-3"><a class="tooltip-test text-decoration-none text-dark" title="${item?.Book_escription}">${item?.Book_escription.length > 10 ? item?.Book_escription.slice(0, 10) + "..." : item?.Book_escription}</a></td>
                        <td col-3 class="text-center p-3"><a class="tooltip-test text-decoration-none text-dark" title="${item?.Book_categories}">${item?.Book_categories.length > 10 ? item?.Book_categories.slice(0, 10) + "..." : item?.Book_categories}</a></td>
                        <td class="text-center"><img role="button" 
                            data-id="${item?.id}" data-name="${item?.Book_Name}" 
                            data-author="${item?.Book_Author}" data-image="${item?.Book_url}" 
                            data-type="${item?.Book_categories}" data-desc="${item?.Book_escription}" 
                            data-new="${item?.Book_New}" data-best="${item?.Book_Besteller}" 
                             data-year="${item?.Book_Year}" data-date="${item?.Book_Date}"
                            data-bs-toggle="modal" data-bs-target="#modalEdit" class="editIcon" style="width: 30%" src="../icons/icons8-edit-24.png" /></td>
                        <td class="text-center"><img role="button" data-id="${item?.id}" data-name="${item?.Book_Name}" data-author="${item?.Book_Author}" data-image="${item?.Book_url}" data-type="${item?.Book_categories}" data-bs-toggle="modal" data-bs-target="#modalDelete" class="deleteIcon" style="width: 26%" src="../icons/icons8-trash-48.png" /></td>
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



        const editItemBtn = document.querySelector("#editItemBtn");
        const deleteItemBtn = document.querySelector("#deleteItemBtn");
        const editModalContent = document.querySelector("#editModalContent");
        const deleteModalContent = document.querySelector("#deleteModalContent");
        const alertEdit = document.querySelector("#alertEdit");

        let delBtn = document.querySelectorAll(".delBtn");

        editIcon.forEach(btn => {
            btn.addEventListener("click", () => {
                console.log(btn.dataset.id, "Edit button"); //edit function called
                editModalContent.innerHTML = `<div class="d-flex justify-content-between gap-3">
                                                <div class="d-flex flex-column gap-3 w-75">
                                                    <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Author</span><input id="inpAuthor" class="form-control shadow" style="font-size: 14px" value="${btn.dataset.author}" /></p>
                                                    <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Title</span><input id="inpName" class="form-control shadow" style="font-size: 14px" value="${btn.dataset.name}" /></p>
                                                    <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Type</span><input id="inpType" class="form-control shadow" style="font-size: 14px" value="${btn.dataset.type}" /></p>
                                                    <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Description</span><textarea id="inpDesc" class="form-control shadow" style="font-size: 14px" value="${btn.dataset.desc}">${btn.dataset.desc}</textarea></p>
                                                    <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Image Url</span><input id="inpImage" class="form-control shadow" style="font-size: 14px" value="${btn.dataset.image}"/></p>
                                                </div>
                                                <div class="w-25 d-flex align-items-center">
                                                    <img class="w-100 border border-secondary shadow rounded" style="" src="${btn.dataset.image}"/>
                                                 
                                                </div>
                                            </div>`;


                const inpAuthor = document.querySelector("#inpAuthor");
                const inpName = document.querySelector("#inpName");
                const inpType = document.querySelector("#inpType");
                const inpDesc = document.querySelector("#inpDesc");
                const inpImage = document.querySelector("#inpImage");
                const year = btn.dataset.year;
                const newC = btn.dataset.new;
                const best = btn.dataset.best;
                const date = btn.dataset.date;

                editItemBtn.addEventListener("click", () => {
                    const obj = {

                        Book_Name: inpName.value,
                        Book_Author: inpAuthor.value,
                        Book_categories: inpType.value,
                        Book_url: inpImage.value,
                        Book_escription: inpDesc.value,
                        Book_Year: year,
                        Book_New: newC,
                        Book_Besteller: best,
                        Book_Date: date

                    }
                    uptData(btn.dataset.id, "Books/", obj)
                    console.log(obj, "edited");
                    alertEditFn();
                })

            })
        })

        function uptData(id, col, data) {
            const dataRef = ref(db, col + "/" + id);
            update(dataRef, data);

        }

        function alertEditFn() {
            alertEdit.innerHTML = `<div class="alert alert-success p-2 m-0 text-center" role="alert">
                                        Successfully edited!
                                    </div>`

            setTimeout(() => {
                alertEdit.innerHTML = "";
            }, 1500)
        }

        deleteIcon.forEach(btn => {
            btn.addEventListener("click", () => {
                console.log(btn.dataset.id, "Delete button");          //delete function called
                deleteModalContent.innerHTML = `<div class="d-flex justify-content-between gap-3">
                                                    <div class="d-flex flex-column gap-2 w-75">
                                                        <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Author</span><p style="font-size:14px" class="text-center shadow">${btn.dataset.author}</p></p>
                                                        <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Title</span><p style="font-size:14px" class="text-center shadow">${btn.dataset.name}</p></p>
                                                        <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Type</span><p style="font-size:14px" class="text-center shadow">${btn.dataset.type}</p></p>
                                                    </div>
                                                    <div class="w-25"><img class="w-100 border border-secondary shadow rounded" style="" src="${btn.dataset.image}"/></div>
                                                </div>`;

                deleteItemBtn.addEventListener("click", () => {
                    deleteBook(btn.dataset.id);
                })

            })
        })



        function deleteBook(bookId) {                                   //delete function
            let rmv = ref(db, "Books/" + bookId);
            remove(rmv).then(() => console.log("Successfully deleted"));
        }

    })
}

renderBooksonTable();

const tableTitle = document.querySelector("#tableTitle");


function sortByName() {
    const books = ref(db, "Books/");

    onValue(books, async (snapshot) => {
        const data = await snapshot.val();
        const arr = convert(data);
        console.log(arr.map(item => item.Book_Name).sort(), "cliked on sort");

        tableTitle.addEventListener("click", () => {
            console.log("cliked on sort");
            tdName.innerHTML = arr.map(item => item.Book_Name).sort().map((item, index) => {
                return `<a class="tooltip-test text-decoration-none text-dark" title="${item}">${item.length > 25 ? item.slice(0, 25) + "..." : item}</a>`
            }).join("");
        })
    })
}

// sortByName()



//? -------------------------------------------- Books Ends-------------------------------------


//? -------------------------------------------- Contact Us Starts-------------------------------------
let ContactTable = document.querySelector("#ContactTable")
async function getDataContact() {

    let dbRefC = ref(getDatabase())
    let snapshotC = await get(child(dbRefC, "contactUs"))
    let covertData = convert(snapshotC.val())

    let ContactMap = covertData.map((item, id) => {

        return `<tr>
                    <th class="text-center p-3">${id + 1}
                    </th>
                    <th scope="col-3" scope="row" class="text-center p-3">${item.Full_Name
            }
                    
                    </th>
                    <th scope="col-3" scope="row" class="text-center p-3">${item.Address}
                        
                    </th>
                    <th scope="col-3" scope="row" class="text-center p-3">
                        ${item.Email}</th>
                    <th scope="col-2" scope="row" class="text-center p-3">
                    ${item.Phone}
                    </th>
                    <th class=" text-center p-3"><img role="button" 
                        data-id="${item?.id}" data-fullname="${item?.Full_Name}" 
                        data-address="${item?.Address}" data-email="${item?.Email}" 
                        data-phone="${item?.Phone}" data-desc="${item?.Description}"
                        data-bs-toggle="modal" data-bs-target="#modalEye" class="eyeIcon" style="width: 18%" src="../icons/iconmonstr-eye-9.svg" /></th>
                 </tr>`

    })

    ContactTable.innerHTML = ContactMap.join("")

    const eyeIcon = document.querySelectorAll(".eyeIcon");
    const eyeModalContent = document.querySelector("#eyeModalContent");

    eyeIcon.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log(btn.dataset.id, "Edit button"); //edit function called
            eyeModalContent.innerHTML = `<div class="d-flex justify-content-between gap-3">
                                            <div class="d-flex flex-column gap-3 w-100">

                                                <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Full Name</span><p id="inpName" class="form-control shadow" style="font-size: 14px" value="">${btn.dataset.fullname} </p></p>
                                                <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Email</span><p id="inpType" class="form-control shadow" style="font-size: 14px" value=""> ${btn.dataset.email}</p></p>
                                                <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Address</span><p id="inpAuthor" class="form-control shadow" style="font-size: 14px" value="">${btn.dataset.address}</p></p>
                                                <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Phone Number</span><p id="inpType" class="form-control shadow" style="font-size: 14px" value="">${btn.dataset.phone} </p></p>
                                                <p class="d-flex flex-column gap-1 fw-bold"><span class="text-center">Desscription</span><p id="inpType" class="form-control shadow" style="font-size: 14px" value=""> ${btn.dataset.desc}</p></p>

                                            </div>
                                        </div>`;


        })
    })


}

getDataContact()




//? -------------------------------------------- Contact Us Ends-------------------------------------



console.log("Admin Panel");