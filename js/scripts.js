// jshint esversion: 6

console.log('Yup, we are working');


function fetchData(url) {
  return fetch(url)
    // .then(checkStatus)
    .then(resolved => resolved.json());
    // .catch(error => console.log('Looks like a problem', error));
    // .then(data => console.log(data.results[0]));
}

fetchData('https://randomuser.me/api/')
  .then(function(data) {
    var person = data.results[0];
    console.log(`The person is fucking ${person.gender}`);
  });


  // => data.results[0])
  


  // .then(person => console.log(`the person is ${person.gender}`));