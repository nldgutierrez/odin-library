// Book Constructor
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
// Save the user's input from the form

// Get the user input values
const form = document.querySelector('#newBook');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(`Form submitted!`);
    const title = form.title.value;
    const author = form.author.value;
    const pages = form.pages.value;
    const read = form.read.checked;

    const book = new Book(title, author, pages, read);
    console.log(book);
});