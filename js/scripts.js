// jshint esversion: 6

// -------------------------------
// GLOBAL CONSTANTS
// -------------------------------
const gallery = document.getElementById('gallery');
let employeeData = [];


// -------------------------------
// FETCHY FUNCTIONS
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

// gets card information, matches to the json data, builds and display html, sets the close button
function generateModal(card) {
  // get the uuid from the div class list
  itemUUID = this.classList[1];
  
  // filter for just id clicked
  let itemData = employeeData.filter(item => item.login.uuid === itemUUID);

  // format date of birth string
  let dobDate = new Date(Date.parse(itemData[0].dob.date));
  let itemDob = `${dobDate.getMonth() + 1}/${dobDate.getDate()}/${dobDate.getFullYear().toString().substr(-2)}`;

  // build and insert HTML with data

  // create the model div element and give it a class
  let modalDiv = document.createElement('div');
  modalDiv.classList.add('modal-container');

  // insert it into the document
  gallery.insertAdjacentElement('afterend', modalDiv);

  // create the html with data
  let modalHTML = `
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src="${itemData[0].picture.large}">
          <h3 id="name" class="modal-name cap">${itemData[0].name.first} ${itemData[0].name.last}</h3>
          <p class="modal-text">${itemData[0].email}</p>
          <p class="modal-text cap">city</p>
          <hr>
          <p class="modal-text">${itemData[0].phone}</p>
          <p class="modal-text">${itemData[0].location.street}, ${itemData[0].location.city}, ${itemData[0].location.state} ${itemData[0].location.postcode}</p>
          <p class="modal-text">Birthday: ${itemDob}</p>
        </div>
      </div>
  `;

  // insert the html into the div
  modalDiv.innerHTML = modalHTML;

  // set the close button
  let closeButton = document.querySelector('#modal-close-btn');
  closeButton.addEventListener('click', function(){
    modalDiv.parentNode.removeChild(modalDiv);
  });

}

// -------------------------------
// LISTENER FUNCTIONS
// -------------------------------

// sets a click listener on each card div, runs after fetch promise resolved
function setListener(cards) {
  for (let card of cards) {
    card.addEventListener('click', generateModal);
  }
}

