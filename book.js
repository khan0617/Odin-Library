// book object constructor
function Book(title, author, pages, readYet){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readYet = readYet;
    this.info = function () {
        let readString = this.readYet ? 'already read' : 'not read yet'; 
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readString}`;
    }
}

function createBook() {
    let title = document.getElementById('title');
    let author = document.getElementById('author');
    let pages = document.getElementById('pages');
    let checkbox = document.getElementById('readAlready');

    let blankCounter = 0;

    [title, author, pages].forEach((item) => {
        if(item.value == ""){
            blankCounter++;
            item.classList.add('required');
            document.getElementById('hiddenMsg').style.visibility = 'visible';
        }
        else{
            item.classList.remove('required');
            document.getElementById('hiddenMsg').style.visibility = 'hidden';
        }
    });

    // if all fields are filled out, create a new book and show it on the page
    // also clear out all the old tinput data
    if(blankCounter == 0){
        var book = new Book(title.value, author.value, pages.value, checkbox.checked);
        createBookDOMNode(book);
        title.value = '';
        author.value = '';
        pages.value = '';
        checkbox.checked = false;
    }


    // console.log(`title:${title.value}, author:${author.value}, pages:${pages.value}, read?:${checkbox.checked}`);
}


// given a book, create a card for it and append it to the "library" on the HTML page.
function createBookDOMNode(book){
    let cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    if(book.readYet){
        cardDiv.classList.add('readAlready');
    }
    else{
        cardDiv.classList.add('notRead');
    }

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('title');
    titleDiv.textContent = book.title;

    let authorDiv = document.createElement('div');
    authorDiv.classList.add('author');
    authorDiv.textContent = book.author;

    let pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages');
    pagesDiv.textContent = book.pages;

    let toggleBtn = document.createElement('button');
    toggleBtn.classList.add('readButton');
    toggleBtn.setAttribute('type', 'button');
    toggleBtn.textContent = "Toggle Read Status";
    toggleBtn.setAttribute('onclick', 'toggleReadStatus(this)');

    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.textContent = "Delete From Library";
    deleteBtn.setAttribute('onclick', 'deleteBook(this)');

    // append all children to this card in appropriate order
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(pagesDiv);
    cardDiv.appendChild(toggleBtn);
    cardDiv.appendChild(deleteBtn);

    document.querySelector('.library').appendChild(cardDiv);
}

function deleteBook(elem){
    // get the parent card div of this button, and delete it from the DOM.
    let card = elem.parentNode;
    card.parentNode.removeChild(card);
}

// change the "read already" status of this card, where the button was clicked.
function toggleReadStatus(elem) {
    let card = elem.parentNode;
    if(card.classList.contains('notRead')){
        card.classList.remove('notRead');
        card.classList.add('readAlready');
    }
    else if(card.classList.contains('readAlready')){
        card.classList.remove('readAlready');
        card.classList.add('notRead');
    }

}

let hobbit = new Book('The Hobbit','J.R.R Tolkien', 295);
// console.log(hobbit.info());