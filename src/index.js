import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import BikeService from './js/bike-service.js';

function clearFields() {
  $("#city").val("");
  $("#showResults").text("");
  $("#showError").text("");
  $("#noResults").text("")
}

function getElements(response) {
  let today = new Date;
  let lastWeek = new Date(today.setDate(today.getDate() - 7));
  if (response.bikes[0]) {
    for (let i = 0; i < response.bikes.length; i++) {
      const stolenDate = new Date((response.bikes[i].date_stolen) * 1000);
      if (stolenDate >= lastWeek && (response.bikes[i].status === "stolen")) {
        $('#showResults').append(`Description: ${response.bikes[i].title} <br>  Date Stolen: ${stolenDate}<br> Stolen From: ${response.bikes[i].stolen_location} <br><br><br>`);
      } else {
        $("#noResults").text("No bikes reported stolen in the past week.");   //could add button to expand date search
      }
    }
  } else {
    $('#showError').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(city) {
  const response = await BikeService.getBikeIndex(city);
  getElements(response);
}

$(document).ready(function() {
  $("form#user-input").submit(function() {
    event.preventDefault();
    let city = $("#city").val();
    if (city === "") {
      clearFields();
      $("#showError").text("Please enter a valid city.");
    }
    else {
      clearFields();
      makeApiCall(city);
    }
  });
});