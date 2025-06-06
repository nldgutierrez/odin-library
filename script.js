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
const showForm = document.querySelector('#showForm');
const dialog = document.querySelector('#dialog')
const closeForm = document.querySelector('#closeForm');


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

    form.reset();
    dialog.close();
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
        
        if (book.read === true) {
            cellRead.innerHTML = `<span id="status">Read</span>`;
        } else {
            cellRead.innerHTML = `<span id="status">Unread</span>`;
        }

        row.appendChild(cellNum);
        row.appendChild(cellTitle);
        row.appendChild(cellAuthor);
        row.appendChild(cellPages);
        row.appendChild(cellRead);

        // Mark as Read button
        const cellMark = document.createElement('td');
        const mark = document.createElement('button');

        if (book.read === true) {
            mark.textContent = 'Mark as unread';
        } else {
            mark.textContent = 'Mark as read';
        }

        row.appendChild(cellMark).appendChild(mark);

        // Mark books as read or unread
        mark.addEventListener('click', () => {
            if (book.read === true) {
                book.read = false;
                mark.textContent = 'Mark as read';
            } else {
                book.read = true;
                mark.textContent = 'Mark as unread';
            }
            displayBook();
        })


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

// Dialog Form
showForm.addEventListener('click', () => {
    dialog.showModal();
});

closeForm.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
})