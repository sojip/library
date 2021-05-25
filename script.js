let myLibrary = [];
let newBook = document.querySelector("#newBook");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector("#closeButton");
let formBook = document.querySelector("#formBook");

function Book(title, author, numPages, readState) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readState = readState;
}

Book.prototype.toggleRead = function() {
    this.readState === "read" ? this.readState = "Not read" : this.readState = "read";
    return this.readState
}

function addBookToLibrary(title, author, numPages, readState) {
    let book = new Book(title, author, numPages, readState);
    myLibrary.push(book);
    return
}

function addToDisplay() {
    //delete previous content
    let books = document.querySelectorAll(".books");
    books.forEach((book) => { book.remove()})
    //add library content
    myLibrary.forEach(function(book) {
        let div = document.createElement('div');
        div.setAttribute("data-index", myLibrary.indexOf(book));
        let container = document.querySelector("#booksContainer");
        
        div.innerHTML = `<h2  class="bookTitle">${book.title}</h2>
                        <h3>${book.author}</h3>
                        <h3>${book.numPages} pages</h3>
                        <button class="readButton">${book.readState}</button>
                        <button class="delete">Delete</button>`
        div.classList.add("books");
        container.appendChild(div);
    })
    return
}

// addBookToLibrary('moi',"foo", 45, 'read')

// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addBookToLibrary('moi',"foo", 45, 'read')
// addToDisplay()

window.addEventListener("click", (e) => {
    if(e.target.classList.value === "readButton") {
        let arrIndex = Number(e.target.parentNode.dataset.index);
        e.target.textContent = myLibrary[arrIndex].toggleRead();
    }
    
    else if(e.target.classList.value === "delete") {
        let arrIndex = Number(e.target.parentNode.dataset.index);
        delete myLibrary[arrIndex];
        addToDisplay();
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
    let readState
    document.querySelector("#readState").checked === true ? readState = "Read" : readState = "Not read";
    addBookToLibrary(title, author, numPages, readState);
    addToDisplay();
    modal.classList.remove("opened");
    formBook.reset();
})





