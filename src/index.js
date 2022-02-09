import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './js/bike-service.js';

function getElements(response) {
  if (response.bikes) {
    $('#showTitle').text(`Description: ${response.bikes[0].title}`);
  } else {
    console.log(`${response}`);
  }
}

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