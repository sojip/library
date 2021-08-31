// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  deleteDoc,
} from "firebase/firestore";
import { collection, setDoc } from "firebase/firestore";
import "./reset.css";
import "./style.css";
import logo from "./img/books.png";

let newBook = document.querySelector("#newBook");
let modal = document.querySelector(".modal");
let closeModal = document.querySelector("#closeButton");
let formBook = document.querySelector("#formBook");
document.querySelector("#logo").src = logo;

class Book {
  constructor(title, author, numPages, readState) {
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readState = readState;
  }
}

function addToDisplay(books) {
  //delete previous content
  try {
    let books_ = document.querySelectorAll(".books");
    books_.forEach((book) => {
      book.remove();
    });
  } finally {
    // add library content
    books.forEach(function (book) {
      let container = document.querySelector("#booksContainer");
      let div = document.createElement("div");
      div.setAttribute("data-id", book.title);
      div.innerHTML = `<h2  class="bookTitle">${book.title}</h2>
                        <h3>${book.author}</h3>
                        <h3>${book.numPages} Pages</h3>
                        <h3>${book.readState}</h3>
                        <button class="modifyButton">Edit</button><br>
                       <button class="delete">Delete</button>`;
      div.classList.add("books");
      container.appendChild(div);
      requestAnimationFrame(() => {
        div.classList.add("created");
      });
    });
  }
  return;
}

window.addEventListener("click", (e) => {
  if (e.target.classList.value === "modifyButton") showBookDetails(e);
  else if (e.target.classList.value === "delete") deleteBook(e);
  else if (e.target == modal) {
    formBook.reset();
    modal.classList.remove("opened");
  }
});

newBook.addEventListener("click", () => {
  modal.classList.add("opened");
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("opened");
  formBook.reset();
});

formBook.addEventListener("submit", (e) => {
  e.preventDefault();
  let title = document.querySelector("#title").value;
  let author = document.querySelector("#author").value;
  let numPages = document.querySelector("#numPages").value;
  let readState;
  document.querySelector("#readState").checked === true
    ? (readState = "Read")
    : (readState = "Not read");
  formBook.reset();
  modal.classList.remove("opened");
  addBookToLibrary(title, author, numPages, readState);
});

window.addEventListener("wheel", function (e) {
  if (e.deltaY > 0) booksContainer.scrollLeft += 150;
  else booksContainer.scrollLeft -= 150;
});

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHfaphxdnoxA6tN6Ue02a6iqhEKCJuT5k",
  authDomain: "library-2cf5c.firebaseapp.com",
  projectId: "library-2cf5c",
  storageBucket: "library-2cf5c.appspot.com",
  messagingSenderId: "174395971322",
  appId: "1:174395971322:web:94ed35c0632e1fda969b43",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

// Firestore data converter
const bookConverter = {
  toFirestore: (book) => {
    return {
      title: book.title,
      author: book.author,
      numPages: book.numPages,
      readState: book.readState,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new Book(data.title, data.author, data.numPages, data.readState);
  },
};

async function addBookToLibrary(title, author, numPages, readState) {
  const book = new Book(title, author, numPages, readState);
  const ref = doc(db, "books", book.title).withConverter(bookConverter);
  await setDoc(ref, book, { merge: true });
  return;
}

//query to get all the books and listen on change
const q = query(collection(db, "books"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const books = [];
  querySnapshot.forEach((doc) => {
    books.push(doc.data());
  });
  addToDisplay(books);
});

async function showBookDetails(e) {
  //modify created Books
  let id = e.target.parentNode.dataset.id;
  const docRef = doc(db, "books", id);
  let docSnap = await getDoc(docRef);
  let book = docSnap.data();
  modal.classList.add("opened");
  let title = document.querySelector("#title");
  let author = document.querySelector("#author");
  let numPages = document.querySelector("#numPages");
  let readState = document.querySelector("#readState");
  title.value = await book.title;
  author.value = await book.author;
  numPages.value = await book.numPages;
  (await book.readState) === "Read"
    ? (readState.checked = true)
    : (readState.checked = false);
  return;
}

async function deleteBook(e) {
  let id = e.target.parentNode.dataset.id;
  await deleteDoc(doc(db, "books", id));
  return;
}
