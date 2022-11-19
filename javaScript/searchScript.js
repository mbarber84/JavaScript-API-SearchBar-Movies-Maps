const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];
/*Search bar - This has an event listener to see what the user types in to the input area and changes everything to lowercase*/
searchInput.addEventListener("input", (e) => { /**Fat Arrow function */
  const value = e.target.value.toLowerCase();
  users.forEach((user) => { /** .forEach() method executes a callback function on each of the elements from 'user' */
    /**Nested Fat Arrow function */
    const validUser = user.name.toLowerCase().includes(value);
    const validEmail = user.email.toLowerCase().includes(value);
    const validPhone = user.phone.toLowerCase().includes(value);
    const isVisible = validUser || validEmail || validPhone;
    user.element.classList.toggle("hide", !isVisible);/**If the data doesn't match what is typed in by the user it is NOT visible (!isVisible) */
  });
});

/**This is the long way of coding out the data request before destructuring*/

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

/**This is the code after destructuring */
function request(url, callback) {
  fetch(url)/**Fetch is demonstrating Asynchronous JavaScript And XML*/
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    });
}
request("https://jsonplaceholder.typicode.com/users", handleUserData);

function handleUserData(data) {
  users = data.map((user) => {/**Fat Arrow function */
    const card = userCardTemplate.content.cloneNode(true).children[0];
    const header = card.querySelector("[data-header]");/**As spoke about in the HTML file you can see the card template being used here */
    const body = card.querySelector("[data-body]");
    const body1 = card.querySelector("[data-body1]");
    const { name, email, phone } = user;
    header.textContent = name;
    body.textContent = email;
    body1.textContent = phone;
    userCardContainer.append(card);
    return { name, email, phone, element: card }; /**This is the data returned to the HTML page using the card template occupied with the data requested from the API*/
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

fetch("https://movies-app1.p.rapidapi.com/api/movies", options)/**Again Fetch is demonstrating Asynchronous JavaScript And XML*/
  .then((response) => response.json())
  .then((data) => {
    const list = data.results;

    list.map((results) => {/**.map() method executes a callback function on each element of the results */
      const name = results.titleOriginal;
      const poster = results.image;
      const date = results.release;
      const movie = `<li><img src="${poster}" alt="movie poster"><h2>${name}</h2><h3>${date}</h3></li>`;
      document.querySelector(".movies").innerHTML += movie; // places the HTML above with the data on to the HTML page
    });
  })
  .catch((err) => console.error(err));
