
// Selects page elements
let mainContainer = document.getElementById("myData");
let userContainer = document.getElementById("userinput");

fetch("https://tequila-api.kiwi.com/v2/search?fly_from=LON&fly_to=MAD&date_from=01%2F08%2F2021&date_to=05%2F08%2F2021&return_from=03%2F09%2F2021&return_to=04%2F09%2F2021", {
	"method": "GET",
	"headers": {
        "accept": "application/json",
		"apikey": "-zO-90Pr3GoWEXO-bDHByrZPqReHZOpd"
	}
})
.then(response =>
    response.json()
)
.catch(err => {
	console.error(err);
})
.then(jsonResponse => {
        for (let i = 1; i < 7; i++) {
            let utcDate = jsonResponse.data[i].route[0].local_departure;  // ISO-8601 formatted date returned from server
            let utcDateReturn = jsonResponse.data[i].local_departure;
            let localDate = new Date(utcDate);
            let localDateReturn = new Date(utcDateReturn);
            let div = document.createElement("div");
            div.innerHTML = `From: ${jsonResponse.data[i].cityFrom} To: ${jsonResponse.data[i].cityTo} Price per Adult: ${jsonResponse.data[i].fare.adults} Departure: ${localDate.toString().replace(":00 GMT+0100 (British Summer Time)", "")} Return: ${localDateReturn.toString().replace(":00 GMT+0100 (British Summer Time)", "")}`;
            mainContainer.appendChild(div);
        }
    }
)


let submit = document.querySelector('#submit');
let div = document.createElement("div");   

const getSuggestions = () => { //REDUCE THIS. user input place and gets aggregated airports, prices. DASSIT


    fetch(`https://tequila-api.kiwi.com/locations/topdestinations?term=london_gb&locale=en-US&limit=10&sort=name&active_only=true&source_popularity=searches`, {
        "method": "GET",
        "headers": {
            "accept": "application/json",
            "apikey": "-zO-90Pr3GoWEXO-bDHByrZPqReHZOpd"
        }
    })
    .then(response =>
        response.json()
    )
    .catch(err => {
        console.error(err);
    })
    .then(jsonResponse => {
        for (let i = 0; i < 11; i++) {
            let ul = document.createElement("ul");
            let li = document.createElement("li");
            ul.classList.add("list-group", "list-group-numbered", "capitalize");
            li.classList.add("list-group-item");
            li.innerHTML = `${jsonResponse.locations[i].slug.replace("-", " ").replace("-", " ").replace("-", " ").replace("-", " ").replace("-", " ").replace("-", " ")}`;
            userContainer.appendChild(div);
            userContainer.appendChild(ul);
            ul.appendChild(li);
        }
    })
}

const displaySuggestions = (event) => {
    // event.CLEARTHERESULTS! 
    getSuggestions();
  };

  submit.addEventListener('click', displaySuggestions);

  /*
  .then(jsonResponse => {
    for (let i = 0; i < 7; i++) {
        let div = document.createElement("div");
        div.innerHTML = `Test: ${jsonResponse.locations[i].slug}`;
        userContainer.appendChild(div);
    } */