const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");
const albumCardTemplate = document.querySelector("[data-album-template]");
const albumCardContainer = document.querySelector("[data-album-cards-container]");

// IIFE
// (function() {
//     console.log('This is immediately invoked')
// })()


let users = []
let albums = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const validUser = user.name.toLowerCase().includes(value);
        const validEmail = user.email.toLowerCase().includes(value);
        const validPhone = user.phone.toLowerCase().includes(value);
        const isVisible = validUser || validEmail || validPhone;
        user.element.classList.toggle("hide", !isVisible);
    })
    //For if a search bar is added to albums ****
    
    /*albums.forEach(albums => {
        const validUserId = albums.userId.toLowerCase().includes(value);
        const validTitle = albums.title.toLowerCase().includes(value);
        const isVisible = validUserId || validTitle;
        albums.element.classList.toggle("hide", !isVisible);
    })*/
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

/*fetch("https://jsonplaceholder.typicode.com/albums")
    .then(res => res.json())
    .then(data => {
        albums = data.map(albums => {
            const card = albumCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const body1 = card.querySelector("[data-body1]")
            header.textContent = albums.userId
            body1.textContent = albums.title
            albumCardContainer.append(card)
            return { userId: albums.userId, title: albums.title, element: card }
        })
    })*/


function request(url, callback) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            callback(data)
        })
};
request("https://jsonplaceholder.typicode.com/users",handleUserData);
request("https://jsonplaceholder.typicode.com/albums",handleAlbumData);

function handleUserData(data) {
    
    users = data.map(user => {
        const card = userCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body = card.querySelector("[data-body]")
        const body1 = card.querySelector("[data-body1]")
        header.textContent = user.name
        body.textContent = user.email
        body1.textContent = user.phone
        userCardContainer.append(card)
        return { name: user.name, email: user.email, phone: user.phone, element: card }
    })
};
    function handleAlbumData(data){

        albums = data.map(albums => {
        const card = albumCardTemplate.content.cloneNode(true).children[0]
        const header = card.querySelector("[data-header]")
        const body1 = card.querySelector("[data-body1]")
        header.textContent = albums.userId
        body1.textContent = albums.title
        albumCardContainer.append(card)
        return { userId: albums.userId, title: albums.title, element: card }
    })
};
