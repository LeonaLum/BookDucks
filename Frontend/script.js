
let currentUser;
let mainContent = document.getElementById("mainContent");
const inputUsername = document.getElementById("inputUsername");
const inputPassword = document.getElementById("inputPassword");

let inputRegUsername = document.getElementById("inputRegUsername");
let inputRegPassword = document.getElementById("inputRegPassword");
let inputRegEmail = document.getElementById("inputRegEmail");

const profile = document.getElementById("profile");
let profileBox = document.getElementById("profileBox");
let content = document.getElementById("content");

const upload = document.getElementById("upload");
let uploadBox = document.getElementById("uploadBox");
let uploadContent = document.getElementById("uploadContent");

let bookType = document.getElementById("type");
let lengthField = document.getElementById("lengthField");
let pagesField = document.getElementById("pagesField");

let uploadTitle = document.getElementById("uploadTitle");
let uploadAuthor = document.getElementById("uploadAuthor");
let uploadLength = document.getElementById("uploadLength");
let uploadPubDate = document.getElementById("uploadPubDate");
let uploadPages = document.getElementById("uploadPages");
let uploadRating = document.getElementById("uploadRating");
let selectGenre = document.getElementById("selectGenre");


let buttonUpload = document.getElementById("buttonUpload");

let userWelcome = document.getElementById("userWelcome");
let userNav = document.getElementById("userNav");

let navLinks = document.querySelectorAll(".link");

let registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
})
let loginBox = document.getElementById("loginBox");
let loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
})

let filterGenre = document.getElementById("filterGenre");

let filterAllBooks = document.getElementById("filterAllBooks");
let filterBooks = document.getElementById("filterBooks");
let filterAudioBooks = document.getElementById("filterAudioBooks");


filterAllBooks.addEventListener("click", () => {
  bookListMain.innerHTML = "";
  getBooks();
  getAudioBooks();
})
filterBooks.addEventListener("click", () => {
  bookListMain.innerHTML = "";
  getBooks();
})
filterAudioBooks.addEventListener("click", () => {
  bookListMain.innerHTML = "";
  getAudioBooks();
})



let logIn = document.getElementById("logIn");

let registerBox = document.getElementById("registerBox");

const buttonLogin = document.getElementById("buttonLogin");
const buttonRegister = document.getElementById("buttonRegister");
const linkRegister = document.getElementById("linkRegister");

let buttonLogOut = document.getElementById("logOut");
buttonLogOut.addEventListener("click", logOut);

let bookListMain = document.getElementById("bookListMain");
let bookList = document.getElementById("bookList");


let formatDate = (value, locale = "en-GB") => {
  return new Date(value).toLocaleDateString(locale);
}


const getBooks = async () => {
  axios.get("http://localhost:1337/api/books?populate=*")
  .then(books => renderBooks(books.data.data))
  let user = JSON.parse(sessionStorage.getItem("currentuser"));
  bookList.classList.remove("hide");
  loginBox.classList.add("hide");
  registerBox.classList.add("hide");
 
 }
 const getAudioBooks = async () => {
   axios.get("http://localhost:1337/api/audio-books?populate=*")
   .then(audioBooks => renderAudioBooks(audioBooks.data.data))
 }
 
 function renderBooks(books){
   books.forEach((book) => {
     let {Title, Author, Type, Pages, Cover, PublishDate, Uploader, Uploader_email, createdAt, genre } = book.attributes;
     let rateContainer = giveRating(book);

     
     let cover = getBookCover(book);

     let bookCard = document.createElement("div");
     bookCard.classList.add("book-card");
     bookCard.innerHTML = 
     `<h3>${Title}<i class="fa-solid fa-book-open"></i></h3>
      <p><span class="info">Upplagd av:</span><span>${Uploader}</span>
      <span class="info">email:</span> ${Uploader_email}</p>
      <p><span class="info">Datum:</span> 
      ${formatDate(createdAt)}</p>
      <p><span class="info">Författare:</span> ${Author}</p>
      <p><span class="info">Genre:</span> ${genre.data.attributes.Genre}</p>
      <p><span class="info">Typ:</span> ${Type}</p>
      <p><span class="info">Antal sidor:</span> ${Pages} st</p>
      <p><span class="info">Publicerad:</span> ${PublishDate}</p>
      `;
      bookCard.insertBefore(rateContainer, bookCard.children[3]);
      bookCard.insertBefore(cover, bookCard.children[4]);

      let firstChild = bookCard.firstElementChild;
      let secondChild = firstChild.nextElementSibling;
      let thirdChild = secondChild.firstElementChild;
      let text = thirdChild.nextElementSibling;
      if(sessionStorage.getItem("currentuser")){
      if(text.innerText !== currentUser.username){
        let loanButton = document.createElement("button");
        loanButton.classList.add("loan-button");
        loanButton.innerHTML = `Låna<i class="fa-solid fa-book"></i>`;
        bookCard.appendChild(loanButton);
      }
      }
 
      bookListMain.appendChild(bookCard);
   })
 }
 
 function renderAudioBooks(books){
   let audioCards = [];
   books.forEach((book) => {
     let {Title, Author, Type, Length, Rating, PublishDate, Uploader, Uploader_email, createdAt, genre } = book.attributes;
     let rateContainer = giveRating(book);
     let cover = getBookCover(book);
     let bookCard = document.createElement("div");
     bookCard.classList.add("book-card");
     bookCard.innerHTML = 
     `<h3>${Title}<i class="fa-solid fa-headphones"></i></h3>
      <p><span class="info">Upplagd av:</span><span>${Uploader}</span> 
      <span class="info">email:</span> ${Uploader_email}</p>
      <p><span class="info">Datum:</span> 
      ${formatDate(createdAt)}</p>
      <p><span class="info">Författare:</span> ${Author}</p>
      <p><span class="info">Genre:</span> ${genre.data.attributes.Genre}</p>
      <p><span class="info">Typ:</span> ${Type}</p>
      <p><span class="info">Längd:</span> ${Length} min</p>
      <p><span class="info">Publicerad:</span> ${PublishDate}</p>
      `;
      bookCard.insertBefore(rateContainer, bookCard.children[3]);
      bookCard.insertBefore(cover, bookCard.children[4]);

      let firstChild = bookCard.firstElementChild;
      let secondChild = firstChild.nextElementSibling;
      let thirdChild = secondChild.firstElementChild;
      let text = thirdChild.nextElementSibling;
      if(sessionStorage.getItem("currentuser")){
      if(text.innerText !== currentUser.username){
        let loanButton = document.createElement("button");
        loanButton.classList.add("loan-button");
        loanButton.innerHTML = `Låna<i class="fa-solid fa-book"></i>`;
        bookCard.appendChild(loanButton);
      }
    }
 
      bookListMain.appendChild(bookCard);
      audioCards.push(bookCard);

      
   })

   
   
 }


 function getBookCover(book){

  let cover = document.createElement("div");
  cover.classList.add("cover");
  cover.style.backgroundImage = `url(http://localhost:1337${book.attributes.Cover.data.attributes.url})`;
  cover.style.backgroundRepeat = "no-repeat";
  cover.style.backgroundSize = "100% 100%";
  return cover;
 }

 function giveRating(book){
  let rateContainer = document.createElement("div");
  rateContainer.innerHTML = `<p>Betyg:</p>`;
  rateContainer.classList.add("rate-container");
  for(i=0; i < book.attributes.Rating; i++){
    let star = document.createElement("div");
    star.classList.add("star");
    star.innerHTML = `<i class="fa-solid fa-star"></i>`;
    rateContainer.appendChild(star);
  }
  return rateContainer;
 }


function logOut(){
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("currentuser");
  checkIfLoggedIn();
}

const getUserBooks = async () => {
  let usersBooks = [];
  axios.get("http://localhost:1337/api/audio-books?populate=*")
  .then(res => getOut(res.data.data))
  axios.get("http://localhost:1337/api/books?populate=*")
  .then(res => getOut(res.data.data))

  function getOut(book){
    book.forEach((book) => {
      if(book.attributes.Uploader == currentUser.username){
        usersBooks.push(book.attributes);
      }
    })
    sessionStorage.setItem("userbooks", JSON.stringify(usersBooks));
  }
 }

 let genres = [];

 const getGenres = async () => {
  axios.get("http://localhost:1337/api/categories?populate=*")
  .then(categories => populateSelect(categories.data.data))
}
function populateSelect(category){
  category.forEach((cat) => {
    genres.push(cat);
    let genreOption = document.createElement("option");
    genreOption.innerText = cat.attributes.Genre;
    genreOption.value = cat.attributes.Genre;
    filterGenre.appendChild(genreOption);
  })
  let genresCopy = [...genres];
  genresCopy.forEach((genre) => {
    let genreOption = document.createElement("option");
    genreOption.innerText = genre.attributes.Genre;
    genreOption.value = genre.attributes.Genre;
    selectGenre.appendChild(genreOption);
  })
  console.log(genres)
}



checkIfLoggedIn();


function checkIfLoggedIn() {
  currentUser = JSON.parse(sessionStorage.getItem("currentuser"));
  if(sessionStorage.getItem("token")){
   loginBox.classList.add("hide");
   registerBox.classList.add("hide");
   logIn.classList.add("hide");
   navLinks.forEach((link) => {
     link.classList.remove("hide");
   })
   getUserBooks();
   userWelcome.innerHTML = `<p><i class="fa-solid fa-user"></i> ${currentUser.username}
   <i class="fa-solid fa-caret-down"></i>
   </p>`;
     switch(location.search){
       case "?booklist=true":
       case "":
         getBooks();
         getAudioBooks();
         break;
       case "?profile=true":
         showProfile();
         break;
       case "?upload=true":
         showUpload();
         break;
     }
    }
  else{
    switch(location.search){
      case "?booklist=true":
      case "":
        getBooks();
        getAudioBooks();
        break;
      case "?login=true":
        loginBox.classList.remove("hide");
        break;
      case "?register=true":
        loginBox.classList.add("hide");
        registerBox.classList.remove("hide");
        break;
    }
    navLinks.forEach((link) => {
      link.classList.add("hide");
    })
  }
}



const login = async () => {
  let response = await axios.post("http://localhost:1337/api/auth/local",
  {
    identifier: inputUsername.value,
    password: inputPassword.value
  }
  );
  let currentUser = JSON.stringify(response.data.user);
  sessionStorage.setItem("token", response.data.jwt);
  sessionStorage.setItem("currentuser", currentUser);
  checkIfLoggedIn();
  location.search = "";
}

buttonLogin.addEventListener("click", login);

userWelcome.addEventListener("click", () => {
  userNav.classList.toggle("hide");
})


linkRegister.addEventListener("click", () => {
  loginBox.classList.add("hide");
  registerBox.classList.remove("hide");
})



const register = async() => {
  let response = await axios.post(
    "http://localhost:1337/api/auth/local/register",
    {
      username: inputRegUsername.value,
      password: inputRegPassword.value,
      email: inputRegEmail.value
    }
  );
  sessionStorage.setItem("token", response.data.jwt);
  let currentUser = JSON.stringify(response.data.user);
  sessionStorage.setItem("currentuser", currentUser);
  location.search = "";
  checkIfLoggedIn();
}

buttonRegister.addEventListener("click", register);


profile.addEventListener("click", showProfile);

function showProfile() {

  let userbooks = JSON.parse(sessionStorage.getItem("userbooks"));

  let listUploadedBooks = document.createElement("ul");
  listUploadedBooks.innerHTML = ` <h3>Uppladdade böcker:</h3>`
  listUploadedBooks.classList.add("list-uploaded-books");
  userbooks.forEach((book) => {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
    <p>${book.Title}</p>`;
    listUploadedBooks.appendChild(listItem);
  })

  content.innerHTML = `
  <h2>Profil</h2>
  <p><span>Användarnamn:</span> ${currentUser.username}</p>
  <p><span>Email-address:</span> ${currentUser.email}</p>
  <p><span>Id:</span> ${currentUser.id}</p>
  <p><span>Blev medlem:</span> ${currentUser.createdAt}</p>
  
  <button class="button-submit" onclick="removeAccount()">Ta bort detta konto</button>`;
  
  content.insertBefore(listUploadedBooks, content.children[5]);
  profileBox.classList.remove("hide");

  
}

function removeAccount(){
  axios.delete(`http://localhost:1337/api/users/${currentUser.id}`);
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("currentuser");
  let message = document.createElement("div");
  message.classList.add("message");
  message.innerHTML = `
  <p>Ditt konto har tagits bort.<br />
  Klicka på knappen nedan för att återgå till startsidan</p>`
  let returnButton = document.createElement("button");
  returnButton.innerText = "Återgå till startsidan";
  returnButton.classList.add("button-submit");
  content.innerHTML = "";
  content.appendChild(message);
  content.appendChild(returnButton);
  returnButton.addEventListener("click" , () => {
    location.search = "";
  })
}





function showUpload() {
  uploadBox.classList.remove("hide");
}

getGenres();


bookType.addEventListener("click" , () => {
  if(bookType.value == "audio"){
    lengthField.classList.remove("hide");
    pagesField.classList.add("hide");
   }
   else if(bookType.value == "book"){
     pagesField.classList.remove("hide");
     lengthField.classList.add("hide");
   }
})


const uploadBook = async ()  => {

  let image = document.getElementById("uploadBookCover").files;
  let imgData = new FormData();
  imgData.append("files", image[0]);

  axios.post("http://localhost:1337/api/upload" , imgData, {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
    }
  })
  .then(res => {
   let imageId = res.data[0];

  if(bookType.value == "audio"){

    let chosenGenre;
    genres.forEach((genre) => {
      if(genre.attributes.Genre == selectGenre.value){
       chosenGenre = genre;
      }
    })

    axios.post("http://localhost:1337/api/audio-books", {
    data: 
      {
      Title: uploadTitle.value,
      Author: uploadAuthor.value,
      Length: parseInt(uploadLength.value),
      PublishDate: uploadPubDate.value,
      Rating: parseInt(uploadRating.value),
      Cover: imageId,
      genre: chosenGenre,
      Type: "Ljudbok",
      Uploader: currentUser.username,
      Uploader_email: currentUser.email
      }
    },
    {
    headers: 
      {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`
      }
    })
  }
  else if(bookType.value == "book"){

    let chosenGenre;
    genres.forEach((genre) => {
      if(genre.attributes.Genre == selectGenre.value){
       chosenGenre = genre;
      }
    })
    console.log(chosenGenre);
    axios.post("http://localhost:1337/api/books",{
      data: 
        {
        Title: uploadTitle.value,
        Author: uploadAuthor.value,
        Pages: parseInt(uploadPages.value),
        PublishDate: uploadPubDate.value,
        Rating: parseInt(uploadRating.value),
        Cover: imageId,
        genre: chosenGenre,
        Type: "Bok",
        Uploader: currentUser.username,
        Uploader_email: currentUser.email
        }
      },
      {
      headers: 
        {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    })
  } 
})
}

buttonUpload.addEventListener("click" , uploadBook);




let auBooks = [];
let boBooks = [];
let allBooks = [];

const getAudio = async () => {
  axios.get("http://localhost:1337/api/audio-books?populate=*")
  .then( resp => auBooks.push(resp.data.data))
  
}
const getBook = async () => {
  axios.get("http://localhost:1337/api/books?populate=*")
  .then(resp => boBooks.push(resp.data.data))
}



filterGenre.addEventListener("click", () => {
  allBooks = [];
  getAudio();
  getBook();
  auBooks.forEach((bo) => {
    bo.forEach((b) => {
      allBooks.push(b)
    })
  })
  boBooks.forEach((bo) => {
    bo.forEach((b) => {
      allBooks.push(b)
    })
  })

  filterByGenre(allBooks)
  console.log(allBooks)
})



function filterByGenre(books){
  bookListMain.innerHTML = "";
  let audio = [];
  let boo = [];

  books.forEach((book) => {
    let bookGenre = book.attributes.genre.data.attributes.Genre;
    let bookType = book.attributes.Type;

    if(bookGenre == filterGenre.value && bookType == "Ljudbok"){
      audio.push(book);
    }
    else if(bookGenre == filterGenre.value && bookType == "Bok"){
      boo.push(book);
    }
  })
  renderAudioBooks(audio);
  renderBooks(boo);
  auBooks = [];
  boBooks = [];
}
  

