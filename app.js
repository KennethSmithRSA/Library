const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", "295", true);
const theHobbi1t = new Book("The Hobbit1", "J.R.R. Tolkien", "295", false);

let myLibraryArray = [theHobbit, theHobbi1t];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = () => {
        return (`${this.title} by ${this.author}, ${this.pages} pages, ${this.read}.`);
    }
}

Book.prototype.removeBook = function(index) {
    myLibraryArray.splice(index, 1);
    renderLibrary();
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);

    myLibraryArray.push(book);
}

function renderLibrary() {
    const container = document.querySelector('#libraryContainer');
    let bookCards = ``;
    let length = myLibraryArray.length;
    for (let i = 0; i < length; i ++) {
        bookCards += `<div class="bookCard"  data-index='${i}'>
        <div class="bookInformation">${myLibraryArray[i].info()}</div>
        <button class="removeBookFromLibrary">X</button>
        <button class="changeReadStatus">Read</button>
    </div>`;
        container.innerHTML = bookCards;
    }
};

renderLibrary();

const newBookInfoBtn = document.getElementById("submitNewBookInfo");
const newBook = document.getElementById("newBook");

function renderNewBookForm() {
    const main = document.querySelector('body');
    console.log(main)
};

// function removeBookCard() {

// };

// function changeReadStatus() {

// };

newBookInfoBtn.addEventListener('click', () => {
    event.preventDefault();
    const newTitle = document.querySelector('#title').value;
    const newAuthor = document.querySelector('#author').value;
    const newPages = document.querySelector('#pages').value;
    const newRead = document.querySelector('#read').checked;
    
    addBookToLibrary(newTitle, newAuthor, newPages, newRead);
    renderLibrary();
    const newBookForm = document.getElementById("newBookForm");
    newBookForm.style.display = "none";
});

newBook.addEventListener('click', () => {
    const newBookForm = document.getElementById("newBookForm");
    newBookForm.style.display = "block";
    renderNewBookForm();
});

const removes = document.querySelectorAll('.removeBookFromLibrary');

removes.forEach((remove) => {
    remove.addEventListener('click', () => {
        let parent = remove.parentNode;
        let index = parent.dataset.index;
        myLibraryArray[index].removeBook();        
    });
});

const changeReadStatus = document.querySelectorAll('.changeReadStatus');

changeReadStatus.forEach((readStatus) => {
    readStatus.addEventListener('click', () => {
        let parent = readStatus.parentNode;
        let index = parent.dataset.index;
        if (myLibraryArray[index].read === true) {
            myLibraryArray[index].read = false;
        } else {
            myLibraryArray[index].read = true;
        }
        renderLibrary();
    });
})