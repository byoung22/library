const title = document.getElementById('title');
const author = document.getElementById('author');
const page = document.getElementById('page');
const read = document.getElementById('read');
const submit = document.getElementById('submit');
const container = document.getElementById('container');
const card = document.getElementsByClassName('card');
const addBook = document.getElementById('add-book');
const form = document.getElementById('form');
const overlay = document.getElementById('overlay');

let myLibrary = [];

addBook.addEventListener('click', function() {
    form.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
});
overlay.addEventListener('click', function() {
    form.classList.toggle('hidden');
    overlay.classList.toggle('hidden');
    resetVal();
})
form.addEventListener('submit', function(event) {
    event.preventDefault();
    submitForm();
});

container.addEventListener('click', function(event) {
    if(event.target.classList.contains('remove')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        myLibrary.splice(index, 1);
        createCard();
    };
    if(event.target.classList.contains('read')) {
        const index = parseInt(event.target.getAttribute('data-index'));
        myLibrary[index].read ? myLibrary[index].read = false : myLibrary[index].read = true;
        createCard();
    };
})

// do stuff here
function submitForm() {
    let titleVal = title.value;
    let authorVal = author.value;
    let pageVal = page.value;
    let readVal = read.checked;
    let newObj = { title: titleVal, author: authorVal, page: pageVal, read: readVal};
    myLibrary.push(newObj);
    // console.log(myLibrary); just for testing
    
    createCard();
    resetVal();
    form.classList.add('hidden');
    overlay.classList.add('hidden');
}
function createCard() {
    reloadContainer()

    for (let i = myLibrary.length - 1; i >= 0; i--) {
        let myObj = myLibrary[i];
        
        let newCard = document.createElement('div');
        newCard.setAttribute('class', 'card');
        container.appendChild(newCard);

        let newTitle = document.createElement('div');
        newTitle.setAttribute('class', 'book-info title');
        newCard.appendChild(newTitle);
        newTitle.textContent = myObj.title;

        let newAuthor = document.createElement('div');
        newAuthor.setAttribute('class', 'book-info');
        newCard.appendChild(newAuthor);
        newAuthor.textContent = `By: ${myObj.author}`;

        let newPage = document.createElement('div');
        newPage.setAttribute('class', 'book-info');
        newCard.appendChild(newPage);
        newPage.textContent = `${myObj.page} pages`;

        let buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('class', 'button-container');
        newCard.appendChild(buttonContainer);

        let newRead = document.createElement('button');
        newRead.setAttribute('class', 'read button left');
        newRead.setAttribute('data-index', i);
        buttonContainer.appendChild(newRead);
        newRead.textContent = myObj.read ? 'Read' : 'Not Read';

        let remove = document.createElement('button');
        remove.setAttribute('class', 'remove button right');
        remove.setAttribute('data-index', i);
        buttonContainer.appendChild(remove);
        remove.textContent = 'Remove';

        if (myObj.read) {
            newRead.style.setProperty('background-color', 'rgb(227, 255, 191)');
            remove.style.setProperty('background-color', 'rgb(227, 255, 191)');
        } else {
            newRead.style.setProperty('background-color', 'rgb(255, 191, 191)');
            remove.style.setProperty('background-color', 'rgb(255, 191, 191)');
        }
    }
}

function resetVal() {
    title.value = '';
    author.value = '';
    page.value = '';
    read.checked = false;
}

function reloadContainer() {
    container.textContent = '';
}
