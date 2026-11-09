const myLibrary = [];

class Book{
    #id;
    #title;
    #author;
    #pages;
    #read;

    constructor(id, title, author, pages, read){
        this.#id = id;
        this.#title = title;
        this.#author = author;
        this.#pages = pages;
        this.#read = read;
    }
    
    getID(){
        return this.#id;
    }
    getTitle(){
        return this.#title;
    }
    getAuthor(){
        return this.#author;
    }
    getPages(){
        return this.#pages;
    }
    getRead(){
        return this.#read;
    }
    setRead(){
        console.log(this.read);
        this.#read = true;
    }
    info(){
        return `The ${this.#title} by ${this.#author}, ${String(this.#pages)}, ${String(this.#read)}`;
    }

}

function addBookToLibrary(title, author, pages, read){
    let id = crypto.randomUUID();

    //Create new book
    myLibrary.push(new Book(id, title, author, pages, read));
    console.log("Successfully listed book");
}

function displayBooks(){
    const container = document.querySelector("#book-container");
    container.innerHTML = "";
    for(i = 0 ; i < myLibrary.length ; i++){
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.dataset.bookID = myLibrary[i].getID();
        container.appendChild(bookCard);
        
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("title");
        bookCard.appendChild(titleDiv);
        const titleHeader = document.createElement("h3");
        titleDiv.appendChild(titleHeader);

        const bookInfo = document.createElement("div");
        bookInfo.classList.add("book-info");
        bookCard.appendChild(bookInfo);
        const authorHeader = document.createElement("h5");
        const pagesHeader = document.createElement("h5");
        const readHeader = document.createElement("h5");
        bookInfo.appendChild(authorHeader);
        bookInfo.appendChild(pagesHeader);
        bookInfo.appendChild(readHeader);

        const info = document.createElement("div");
        bookCard.appendChild(info);
        const infoParagraph = document.createElement("p");
        info.appendChild(infoParagraph);

        const bookActions = document.createElement("div");
        bookActions.classList.add("book-actions");
        bookCard.appendChild(bookActions);
        const btnCompleted = document.createElement("button");
        btnCompleted.id = "btn-completed";
        btnCompleted.textContent = "Completed!";
        bookActions.appendChild(btnCompleted);
        const btnDelete = document.createElement("button");
        btnDelete.id = "btn-delete";
        btnDelete.textContent = "Delete";
        bookActions.appendChild(btnDelete);

        titleHeader.textContent = `Title: ${myLibrary[i].getTitle()}`;
        authorHeader.textContent = `Author: ${myLibrary[i].getAuthor()}`;
        pagesHeader.textContent = `Pages: ${myLibrary[i].getPages()}`;
        readHeader.textContent = `Read: ${myLibrary[i].getRead()}`;
        infoParagraph.textContent = myLibrary[i].info();
    }
    completedButtons()
    deleteButtons();
}

const btnSubmit = document.querySelector("#btn-submit");
btnSubmit.addEventListener("click", () => {
    event.preventDefault();
    const title = document.querySelector("#titleInput");
    let titleText = title.value;
    const author = document.querySelector("#authorInput");
    let authorText = author.value;
    const pages = document.querySelector("#pagesInput");
    let pagesText = pages.value;
    const readCheckbox = document.querySelector("#readInput");
    let checkBox = readCheckbox.checked;
    let read = false;
    if(checkBox){
        read = true;
    } else {
        read = false;
    }

    console.log("Title: " + titleText);
    addBookToLibrary(titleText, authorText, pagesText, read);
    console.log(myLibrary);
    displayBooks();
});

myLibrary.push(new Book(crypto.randomUUID(), "Adam", "God", 500, true));
myLibrary.push(new Book(crypto.randomUUID(), "And", "God", 500, false));
myLibrary.push(new Book(crypto.randomUUID(), "Eve", "God", 500, true));

displayBooks();

function completedButtons(){
    const btnCompleted = document.querySelectorAll("#btn-completed");
    btnCompleted.forEach(button => {
        button.addEventListener("click", () => {
            const bookCard = button.closest(".book-card");
            const bookID = bookCard.dataset.bookID;

            let i = 0;
            for(i = 0 ; i < myLibrary.length ; i++){
                if(myLibrary[i].getID() == bookID){
                    if(myLibrary[i].getRead() == true){
                        alert(`You have already read this book`);
                        console.log("BookID" + bookID);
                        break;
                    }
                    alert(`Congratulations on finishing ${myLibrary[i].getTitle()}, on to the next one!`);
                    console.log(`Congratulations on completing ${myLibrary[i].getTitle()}`);
                    myLibrary[i].setRead();
                    break;
                }
            }
            displayBooks();
        })
    });
}

function deleteButtons(){
    const btnDelete = document.querySelectorAll("#btn-delete");
    btnDelete.forEach(button => {
        button.addEventListener("click", () => {
            const bookCard = button.closest(".book-card");
            const bookID = bookCard.dataset.bookID;
            for(let i = 0 ; i < myLibrary.length ; i++){
                if(myLibrary[i].getID() == bookID){
                    myLibrary.splice(i, 1);
                    bookCard.remove();
                    console.log(`Book of ID ${bookID} deleted`);
                    break;
                }
            }
        })
    });
}

console.log(myLibrary);