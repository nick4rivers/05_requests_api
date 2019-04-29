// jshint esversion: 6

// -------------------------------
// GLOBAL CONSTANTS
// -------------------------------
const gallery = document.getElementById('gallery');
let employeeData = [];


// -------------------------------
// FETCH FUNCTIONS
// -------------------------------

function fetchData(url) {
  return fetch(url)
    // .then(checkStatus)
    .then(resolved => resolved.json());
    // .catch(error => console.log('Looks like a problem', error));
    // .then(data => console.log(data.results[0]));
}


fetchData('https://randomuser.me/api/?results=12')
  .then(data => data.results)
  .then(data => employeeData = data)
  .then(data => generateGalleryItems(data));


// -------------------------------
// HELPER FUNCTIONS
// -------------------------------

// generates and adds the gallery HTML from the request, and then adds the event listener
function generateGalleryItems(data) {
  let galleryHTML = '';
  for (let item of data) {
    let itemHTML = `
      <div class="card ${item.login.uuid}">
        <div class="card-img-container">
            <img class="card-img" src="${item.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
        </div>
      </div>`;
      galleryHTML += itemHTML;
  }
  gallery.innerHTML = galleryHTML;
  
  const cards = document.getElementsByClassName('card');
  setListener(cards);
}


// gets card information, matches to the json data, builds and display html
function displayItem(card) {
  // get the uuid from the div class list
  itemUUID = this.classList[1];
  console.log(itemUUID);

  // match data with card clicked
  let itemData = {};
    // let's use reduce method here instead of a loop

  // build and insert HTML with data


  // set the close button

}





// -------------------------------
// LISTENER FUNCTIONS
// -------------------------------

// sets a click listener on each card div, runs after fetch promise resolved
function setListener(cards) {
  for (let card of cards) {
    card.addEventListener('click', displayItem);
  }
}


