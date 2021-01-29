let myLibrary = [];
const insertBtn = document.querySelector('#InsertBook');
const submit = document.querySelector('#submitBtn');
const containerForm = document.getElementById('containerForm');
const closePopUp = document.getElementsByTagName('span')[0];

submit.addEventListener('click', addBookToLibrary);
insertBtn.addEventListener('click', ()=> containerForm.style.display = 'block');
closePopUp.addEventListener('click', () => containerForm.style.display = 'none');

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
function addBookToLibrary(){
    event.preventDefault();
    containerForm.style.display = 'none';

    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let read = document.getElementById("read");

    myLibrary.push(new Book(title.value, author.value, Number(pages.value), read.checked));
    updateLibrary();
    bookForm.reset();
}
function updateLibrary(){
    while(container.firstChild){
        container.removeChild(container.lastChild);
    }
    myLibrary.forEach((element, index) => {
        console.log(`book-${index}`);
        let book = document.createElement("div");
        let title = document.createElement("div");
        let author = document.createElement("div");
        let pages = document.createElement("div");
        let read = document.createElement("input");
        let readLabel = document.createElement("LABEL");
        let deleteBook = document.createElement("button");

        book.classList.add(`book`);
        book.setAttribute("id", `book-${index}`);

        title.innerText = element.title;
        title.classList.add('title');
        
        author.innerText = element.author;
        author.classList.add('author');

        pages.innerText = `${Number(element.pages)} pages`;
        pages.classList.add('pages');
        
        readLabel.setAttribute("for", "read");
        readLabel.textContent = 'Read';
        read.setAttribute('type', 'checkbox');
        read.classList.add('read');
        if(element.read){
            read.setAttribute('checked', '');
            book.style.border = "3px solid teal";
        }
        else{
            book.style.border = "3px solid maroon";
        }
        //book.innerText = element.info();

        deleteBook.addEventListener('click',    ()=>{
            myLibrary.splice(index, 1);
            console.log(myLibrary);
            updateLibrary();
        });
        read.addEventListener('change', ()=>{
            element.read = !element.read;
            updateLibrary();
        });
        deleteBook.textContent = 'Remove';
        deleteBook.classList.add('deleteBook');
        


        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        book.appendChild(readLabel);
        book.appendChild(read);
        book.appendChild(deleteBook);

        container.appendChild(book).className = "book";
    });
}
myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));
myLibrary.push(new Book('The Lord Of the Rings', 'J.R.R. Tolkien', 900, true));
myLibrary.push(new Book('The Martian', 'Steven Holmes', 354, false));
myLibrary.push(new Book('Sherlock Holmes', 'David Straight', 5867, true));
myLibrary.push(new Book('The Expanse', 'James C. Correy', 365, false));
myLibrary.push(new Book('Percy Jackson', 'Rick Riordian', 576, true));
const container = document.getElementById('container');
console.log(myLibrary);
updateLibrary();