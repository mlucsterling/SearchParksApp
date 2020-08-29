'use strict';

/*obtain text input from form*/
function getStates() {
    console.log('getStates activated');
    let stateParam = document.getElementById('stateInput').value;
    makeRequest(stateParam);
}

/*handles requests and responses to GitHub API*/
function makeRequest(stateParam) {
    console.log(`makeRequest activated`);
    const APIKey = '&api_key=Lv9ibCPJUkl5miprpeF6HhBsy6vTHn3OwutWceqi'
    let requestAPI = 'https://developer.nps.gov/api/v1/parks?stateCode='+stateParam+APIKey
    fetch(requestAPI)
        .then(response => response.json())
        .then(responseJson => createList(responseJson))
        .catch(error => {
            console.log(error)
            alert(`don't worry, the parks are there, my code just sucks`)
         });
};

/*handles form submission*/
function submitForm() {
    $('form').submit(event => {
        event.preventDefault();
        console.log(`submitForm activated`)
        getStates();
    });
};

/*creates list items for each search result*/
function createList(responseJson) {
    console.log(responseJson);
    console.log(`createList activated`);
    $(`.results-list`).empty();
    let resultsLimit = $('#maxResults').val();
    console.log(resultsLimit);
        for (let i=0; i < resultsLimit; i++) {
            console.log('creating list item');
            let parkName = responseJson.data[i].fullName
            let parkURL = responseJson.data[i].url
            let parkDesc = responseJson.data[i].description
            $(`.results-list`).append(`<li>
            <h4>${parkName}</h4>
            <a href="${parkURL}">Click here for ${parkName}'s website</a>
            <p>${parkDesc}</p>
            </li>`);
    };
};

/*handles the app*/
function handleApp() {
    console.log(`SearchNatlParks App is ready to rock`);
    $(submitForm);
}

$(handleApp);