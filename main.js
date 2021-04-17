
// Selects page elements
let mainContainer = document.getElementById("myData");
let userContainer = document.getElementById("userinput");

fetch("https://tequila-api.kiwi.com/v2/search?fly_from=LON&date_from=15%2F04%2F2021&date_to=25%2F04%2F2021", {
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
            let localDate = new Date(utcDate);

            let divCard = document.createElement("div");
            let divBody = document.createElement("div");
            let h5 = document.createElement("h5");
            let p = document.createElement("p");
            let a = document.createElement("a");

            divCard.classList.add("card");
            divBody.classList.add("card-body", "text-center");
            h5.classList.add("card-title", "text-center");
            p.classList.add("card-text", "text-center");
            a.classList.add("btn", "btn-info");
            a.href = '#';

            h5.innerHTML = `To: ${jsonResponse.data[i].cityTo}`;
            p.innerHTML = `Price per Adult: £${jsonResponse.data[i].fare.adults} Departure: ${localDate.toString().replace(":00 GMT+0100 (British Summer Time)", "")}am`;
            a.innerHTML = `Reserve ticket`;

            mainContainer.appendChild(divCard);
            divCard.appendChild(divBody);
            divBody.appendChild(h5);
            divBody.appendChild(p);
            divBody.appendChild(a);
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