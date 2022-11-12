const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const validUser = user.name.toLowerCase().includes(value);
    const validEmail = user.email.toLowerCase().includes(value);
    const validPhone = user.phone.toLowerCase().includes(value);
    const isVisible = validUser || validEmail || validPhone;
    user.element.classList.toggle("hide", !isVisible);
  });
});

// fetch("https://jsonplaceholder.typicode.com/users")
//     .then(res => res.json())
//     .then(data => {
//         users = data.map(user => {
//             const card = userCardTemplate.content.cloneNode(true).children[0]
//             const header = card.querySelector("[data-header]")
//             const body = card.querySelector("[data-body]")
//             const body1 = card.querySelector("[data-body1]")
//             header.textContent = user.name
//             body.textContent = user.email
//             body1.textContent = user.phone
//             userCardContainer.append(card)
//             return { name: user.name, email: user.email, phone: user.phone, element: card }
//         })
//     })

function request(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    });
}
request("https://jsonplaceholder.typicode.com/users", handleUserData);

function handleUserData(data) {
  users = data.map((user) => {
    //Arrow function
    const card = userCardTemplate.content.cloneNode(true).children[0];
    const header = card.querySelector("[data-header]");
    const body = card.querySelector("[data-body]");
    const body1 = card.querySelector("[data-body1]");
    const { name, email, phone } = user; //destructured from .user code
    header.textContent = name;
    body.textContent = email;
    body1.textContent = phone;
    userCardContainer.append(card);
    return { name, email, phone, element: card };
  });
}

//Movies API

const options = {
  method: "GET", //CORS-safelisted method is a method that is `GET`
  headers: {
    "X-RapidAPI-Key": "9098a78762msh9bacd7cc59cbbb9p1094c1jsncc142a8ed6fb",
    "X-RapidAPI-Host": "movies-app1.p.rapidapi.com",
  },
};

fetch("https://movies-app1.p.rapidapi.com/api/movies", options)
  .then((response) => response.json())
  .then((data) => {
    const list = data.results;

    list.map((results) => {
      //Arrow function
      const name = results.titleOriginal;
      const poster = results.image;
      const date = results.release;
      const movie = `<li><img src="${poster}" alt="movie poster"><h2>${name}</h2><h3>${date}</h3></li>`;
      document.querySelector(".movies").innerHTML += movie; // places the HTML above with the data on to the HTML page
    });
  })
  .catch((err) => console.error(err));
