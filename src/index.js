import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './js/bike-service.js';

function getElements(response) {
  if (response.bikes[0]) {
    for (let i = 0; i < response.bikes.length; i++) {
      $('#showTitle').append(`Description: ${response.bikes[i].title} <br>`);
    }
  }
  else {
    $('#showError').text(`There was an error ${response}`);
  }
}

// function parseDate(milSecDate) {
//   return milSecDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}); 
// }

async function makeApiCall(city) {
  const response = await BikeService.getBikeIndex(city);
  getElements(response);
}

$(document).ready(function () {
  $("form#user-input").submit(function () {
    event.preventDefault();
    let city = $("#city").val();
    makeApiCall(city);
  });
});


// response.bikes[0].title
