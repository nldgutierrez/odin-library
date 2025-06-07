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
const table = document.querySelector('.table-container');
const tbody = document.querySelector('tbody');
const showFormEmpty = document.querySelector('#empty');
const showFormFilled = document.querySelector('#filled');
const tableButton = document.querySelector('#table-button')
const dialog = document.querySelector('#dialog')
const closeForm = document.querySelector('#closeForm');
const empty = document.querySelector('#empty-state');

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

    // Show table when there is a book in the library
    if (library.length > 0) {
        table.style.removeProperty('display');
        empty.style.display = 'none';
        tableButton.style.removeProperty('display');
    } else {
        table.style.display = 'none';
        empty.style.removeProperty('display');
        tableButton.style.display = 'none';
    }

    tbody.innerHTML = '';
    
    // Display books
    library.forEach((book, index) => {
        const bookRow = document.createElement('tr');
        const row = tbody.appendChild(bookRow);
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
            const span = document.createElement('span');
            cellRead.appendChild(span);
            span.textContent = 'Read';
            span.style.border = '2px solid';
            span.style.borderRadius = '4px';
            span.style.padding = '2px 8px';
            span.style.backgroundColor = '#D4EDBC'
            span.style.color = '#13734B'
        } else {
            const span = document.createElement('span');
            cellRead.appendChild(span);
            span.textContent = 'Unread';
            span.style.border = '2px solid';
            span.style.borderRadius = '4px';
            span.style.padding = '2px 8px';
            span.style.backgroundColor = '#FFCFC9'
            span.style.color = '#B10202'
        }

        row.appendChild(cellNum);
        row.appendChild(cellTitle);
        row.appendChild(cellAuthor);
        row.appendChild(cellPages);
        row.appendChild(cellRead);

        // Mark as Read button
        const cellMark = document.createElement('td');
        const mark = document.createElement('button');
        mark.classList.add('mark');

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
        remove.classList.add('remove')

        remove.innerHTML = `&times;`;
        row.appendChild(cellRemove).appendChild(remove);

        // Remove a book from the array and display
        remove.addEventListener('click', () => {
            library.splice(index, 1);
            displayBook();
        });
    });
}

// Dialog Form
showFormEmpty.addEventListener('click', () => {
    dialog.showModal();
});

showFormFilled.addEventListener('click', () => {
    dialog.showModal();
});

closeForm.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
});