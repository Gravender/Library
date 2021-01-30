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
    createData();
    updateLibrary();
    bookForm.reset();
}
function updateLibrary(){
    const container = document.getElementById('container');
    while(container.firstChild){
        container.removeChild(container.lastChild);
    }
    myLibrary.forEach((element, index) => {
        createBook(element, index);
    });
}

function createBook(element, index){
    console.log(`book-${index}`);
        let book = document.createElement("div");
        let title = document.createElement("div");
        let author = document.createElement("div");
        let pages = document.createElement("div");
        let choiceDiv = document.createElement("div");
        let readDiv = document.createElement("div");
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
        
        choiceDiv.classList.add('choiceDiv');

        readDiv.classList.add('readDiv');

        readLabel.setAttribute("for", "read");
        readLabel.textContent = 'Read';
        read.setAttribute('type', 'checkbox');
        read.classList.add('read');
        read.classList.add('checkBook');
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
            createData();
            updateLibrary();
        });
        read.addEventListener('change', ()=>{
            element.read = !element.read;
            createData();
            updateLibrary();
        });
        deleteBook.textContent = 'Remove';
        deleteBook.classList.add('deleteBook');
        


        book.appendChild(title);
        book.appendChild(author);
        book.appendChild(pages);
        readDiv.appendChild(readLabel);
        readDiv.appendChild(read);
        choiceDiv.appendChild(readDiv);
        choiceDiv.appendChild(deleteBook);
        book.appendChild(choiceDiv);

        container.appendChild(book).className = "book";
}

function createData(){
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function restore(){
    if(!localStorage.myLibrary){
        updateLibrary();
    }
    else{
        let books = localStorage.getItem('myLibrary');
        books = JSON.parse(books);
        myLibrary = books;
        updateLibrary();
    }
}

/* myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, false));
myLibrary.push(new Book('The Lord Of the Rings', 'J.R.R. Tolkien', 900, true));
myLibrary.push(new Book('The Martian', 'Steven Holmes', 354, false));
myLibrary.push(new Book('Sherlock Holmes', 'David Straight', 5867, true));
myLibrary.push(new Book('The Expanse', 'James C. Correy', 365, false));
myLibrary.push(new Book('Percy Jackson', 'Rick Riordian', 576, true)); */
console.log(myLibrary);
restore();