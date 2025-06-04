// Library array
const library = [];

// Book Constructor
function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error('Need to use the "new" constructor')
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Create book instance and push to library array
function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
}

// DOM Selects
const form = document.querySelector('#newBook');
const table = document.querySelector('tbody');


// Save user's input from the form

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get the user input values

    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;

    addBookToLibrary(title, author, pages, read);
    
    displayBook();
});

// Add Book to Table

function displayBook() {
    table.innerHTML = '';
    for (let i = 0; i < library.length; i++) {
        const row = document.createElement('tr');
        const cellNum = document.createElement('td');
        const cellTitle = document.createElement('td');
        const cellAuthor = document.createElement('td');
        const cellPages = document.createElement('td');
        const cellRead = document.createElement('td');

        cellNum.textContent = i+1;
        cellTitle.textContent = library[i].title;
        cellAuthor.textContent = library[i].author;
        cellPages.textContent = library[i].pages;
        cellRead.textContent = library[i].read;

        table.appendChild(row).appendChild(cellNum);
        table.appendChild(row).appendChild(cellTitle);
        table.appendChild(row).appendChild(cellAuthor);
        table.appendChild(row).appendChild(cellPages);
        table.appendChild(row).appendChild(cellRead);
    }
}