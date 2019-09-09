'use strict';

// put your own value below!
const apiKey = 'tY5Ug3AZCbpT1nSDsOTQyu3xLyjdEVvxmUsoAuCm'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson) {
    console.log(responseJson);
    // if there are previous results, remove them
    $('.results-list').empty();

    for (let i = 0; i < responseJson.data.length; i++) {
    $('.results-list').append(
        `<li><h3>${responseJson.data[i].fullName}</h3>
             <p>${responseJson.data[i].description}</p>
             <h3>${responseJson.data[i].url}</h3>
        </li>`
      );
    }
    // display the results section  
    $('.results-list').removeClass('hidden');
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function getStatePark(states, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: states,
    maxResults
  };
  const queryString = formatQueryParams(params)
  const finalUrl = searchURL + '?' + queryString;

  fetch(finalUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const statesArray = $('#js-search-term').val().split(',');
    const maxResults = $('#js-max-results').val();
    getStatePark(statesArray, maxResults);
  });
}

$(watchForm);