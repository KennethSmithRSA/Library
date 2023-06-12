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
    if (myLibraryArray.length === 0) {
        container.innerHTML = ``;
    }
    let bookCards = ``;
    let length = myLibraryArray.length;
    for (let i = 0; i < length; i ++) {
        bookCards += `<div class="bookCard"  data-index='${i}'>
        <div class="bookInformation">${myLibraryArray[i].info()}</div>
        <button class="removeBookFromLibraryBtn">X</button>
        <button class="changeReadStatusBtn">Read</button>
        </div>`;
        container.innerHTML = bookCards;
    }

    removeBookCard();
    changeReadStatus();
};

renderLibrary();

const newBookInfoBtn = document.getElementById("submitNewBookInfo");
const newBook = document.getElementById("newBook");

function renderNewBookForm() {
    const newBookForm = document.getElementById("newBookForm");
    newBookForm.style.display = "block";
};

function removeBookCard() {
    const removes = document.querySelectorAll('.removeBookFromLibraryBtn');
    const removesArr = [...removes];

    removesArr.forEach((ele) => {
    ele.addEventListener("click", function() {
        let parent = ele.parentNode;
        let index = parent.dataset.index;
        myLibraryArray.splice(index, 1);
        renderLibrary();
    });
});
};

function changeReadStatus() {
    const changeReadState = document.querySelectorAll('.changeReadStatusBtn');
    const changeReadStateArr = [...changeReadState];
    
    changeReadStateArr.forEach((ele) => {
        ele.addEventListener("click", function() {
            let parent = ele.parentNode;
            let index = parent.dataset.index;

            if (myLibraryArray[index].read === true) {
                myLibraryArray[index].read = false;
            } else {
                myLibraryArray[index].read = true;
            }
            renderLibrary();
        });
    });
};

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

newBook.addEventListener('click', renderNewBookForm);