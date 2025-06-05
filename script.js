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
    
    // Display books

    library.forEach((book, index) => {
        const bookRow = document.createElement('tr');
        const row = table.appendChild(bookRow);
        const cellNum = document.createElement('td');
        const cellTitle = document.createElement('td');
        const cellAuthor = document.createElement('td');
        const cellPages = document.createElement('td');
        const cellRead = document.createElement('td');

        cellNum.textContent = index+1;
        cellTitle.textContent = book.title;
        cellAuthor.textContent = book.author;
        cellPages.textContent = book.pages;
        cellRead.textContent = book.read;

        row.appendChild(cellNum);
        row.appendChild(cellTitle);
        row.appendChild(cellAuthor);
        row.appendChild(cellPages);
        row.appendChild(cellRead);

        // Remove button
        const cellRemove = document.createElement('td');
        const remove = document.createElement('button');

        remove.textContent = 'Remove';
        row.appendChild(cellRemove).appendChild(remove);

        // Remove a book from the array and display
        remove.addEventListener('click', () => {
            library.splice(index, 1);
            displayBook();
        });
    });
}