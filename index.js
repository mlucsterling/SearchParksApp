'use strict';

/*obtain checked States from form*/
function checkStates() {
    let stateArray = [];
    $(".check-form:checked").each(function() {
        stateArray.push(this.value);
    });
    let statesURL = '?stateCode='+stateArray.join('%2C');
    console.log(statesURL);
}

/*obtain text input from form*/
function getStates() {
    console.log('getStates activated');
    let stateParam = document.getElementById('stateInput').val();
    makeRequest(stateParam);
}

/*handles requests and responses to GitHub API*/
function makeRequest(stateParam) {
    console.log(`makeRequest activated`);
    const APIKey = '&api_key=Lv9ibCPJUkl5miprpeF6HhBsy6vTHn3OwutWceqi'
    let requestAPI = 'https://developer.nps.gov/api/v1/parks'+stateParam+APIKey
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
        for (let i=0; i < responseJson.length; i++) {
            console.log('creating list item');
            let repoURL = responseJson[i].html_url
            let repoName = responseJson[i].name
            $(`.results-list`).append(`<li>
            <h4>${repoName}</h4>
            <a href="${repoURL}">Click here for repository</a>
            </li>`);
    };
};

/*handles the app*/
function handleApp() {
    console.log(`SearchNatlParks App is ready to rock`);
    $(submitForm);
}

$(handleApp);