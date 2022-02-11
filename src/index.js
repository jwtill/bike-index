import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './js/bike-service.js';

function clearFields() {
  $("#city").val("");
  $("#showResults").text("");
  $("#showError").text("");
  $("#noResults").text("");
  $("#invalid").text("");
}

function getElements(response) {
  let today = new Date;
  let lastWeek = new Date(today.setDate(today.getDate() - 7));
  if (response.bikes) {
    let stolenCounter = 0;
    for (let i = 0; i < response.bikes.length; i++) {
      const stolenDate = new Date((response.bikes[i].date_stolen) * 1000);
      if (stolenDate >= lastWeek && (response.bikes[i].status === "stolen")) {
        $('#showResults').append(`
        <div class="card text-white bg-danger mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
        <div class="col-md-4">
        <img src="${response.bikes[i].thumb}" class="card-img" alt="">
        </div>
        <div class="col-md-8">
        <div class="card-body">
        <h5 class="card-title">Description: ${response.bikes[i].title}</h5>
        <p class="card-text"> 
          Manufacturer: ${response.bikes[i].manufacturer_name} <br>
          Serial #: ${response.bikes[i].serial} <br>
          Model: ${response.bikes[i].frame_model} <br>
          Color: ${response.bikes[i].frame_colors} <br>
          Reported Stolen: ${stolenDate} <br> 
          Stolen From: ${response.bikes[i].stolen_location} <br> 
        </p></div></div></div></div></div>`);
        stolenCounter++;
      }
    }
    if (stolenCounter === 0) {
      $("#noResults").text("No bikes reported this week.");
    }
  } else {
    $('#showError').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(city) {
  const response = await BikeService.getBikeIndex(city);
  getElements(response, city);
}

$(document).ready(function () {
  $("form#user-input").submit(function () {
    event.preventDefault();
    let city = $("#city").val();
    if (city === "") {
      $("#invalid").text("Please enter a valid city.");
    }
    else {
      clearFields();
      makeApiCall(city);
    }
  });
});