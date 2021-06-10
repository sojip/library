let myLibrary = [];
let newBook = document.querySelector("#newBook");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector("#closeButton");
let formBook = document.querySelector("#formBook");
let nav = document.querySelector("nav");

class Book {
    constructor(title, author, numPages, readState) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.readState = readState;
    }

}

function addBookToLibrary(title, author, numPages, readState) {
    let book = new Book(title, author, numPages, readState);
    myLibrary.unshift(book);
    return
}

function addToDisplay() {
    //delete previous content
    let books = document.querySelectorAll(".books");
    books.forEach((book) => { book.remove()})
    //add library content
    myLibrary.forEach(function(book) {
        let container = document.querySelector("#booksContainer");
        let div = document.createElement('div');
        div.setAttribute("data-index", myLibrary.indexOf(book)); 
        div.innerHTML = `<h2  class="bookTitle">${book.title}</h2>
                        <h3>${book.author}</h3>
                        <h3>${book.numPages} Pages</h3>
                        <h3>${book.readState}</h3>
                        <button class="modifyButton">Edit</button><br>
                       <button class="delete">Delete</button>`
        div.classList.add("books");
        container.appendChild(div);
        requestAnimationFrame(() =>{
            div.classList.add("created")
        });
    })
    return
}

window.addEventListener("click", (e) => {
    if(e.target.classList.value === "modifyButton") {
        //modify created Books
        let arrIndex = Number(e.target.parentNode.dataset.index);
        let book = myLibrary[arrIndex];
        modal.classList.add("opened");
        let title = document.querySelector("#title");
        let author = document.querySelector("#author");
        let numPages = document.querySelector("#numPages");
        let readState = document.querySelector("#readState");
        let index = document.querySelector("#index");
        title.value = book.title;
        author.value = book.author;
        numPages.value = book.numPages;
        index.value =  arrIndex;
        book.readState === "Read" ? readState.checked = true : readState.checked = false;
    }
    
    else if(e.target.classList.value === "delete") {
        let arrIndex = Number(e.target.parentNode.dataset.index);
        delete myLibrary[arrIndex]; 
        requestAnimationFrame( () => {
            e.target.parentNode.classList.add("removed");   
        });
        e.target.parentNode.addEventListener("animationend", () => {
            e.target.parentNode.remove()
        });
    }

    else if(e.target == modal) {
        let index = document.querySelector("#index").value;
        if(index) document.querySelector("#index").value = ""; 
        formBook.reset();
        modal.classList.remove("opened");
    }
})

newBook.addEventListener("click", () => {
    modal.classList.add("opened");
})

closeModal.addEventListener("click", () => {
    modal.classList.remove("opened");

})

formBook.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let numPages = document.querySelector("#numPages").value;
    let index = document.querySelector("#index").value;
    let readState
    document.querySelector("#readState").checked === true ? readState = "Read" : readState = "Not read";
    formBook.reset();
    modal.classList.remove("opened");

    if(index) {
        myLibrary[index].title = title;
        myLibrary[index].author = author;
        myLibrary[index].numPages = numPages;
        myLibrary[index].readState = readState;
        document.querySelector("#index").value = "";
    }
    else {
        addBookToLibrary(title, author, numPages, readState);
    }   
    addToDisplay();  
})

window.addEventListener('wheel', function(e) {
  if (e.deltaY > 0) booksContainer.scrollLeft += 150;
  else booksContainer.scrollLeft -= 150;
});