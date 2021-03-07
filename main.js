
// Selects page elements
let mainContainer = document.getElementById("myData");
let userContainer = document.getElementById("userinput");

fetch("https://tequila-api.kiwi.com/v2/search?fly_from=LON&fly_to=PRG&date_from=01%2F04%2F2021&date_to=05%2F04%2F2021&return_from=03%2F04%2F2021&return_to=04%2F04%2F2021", {
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
            div.innerHTML = `From: ${jsonResponse.data[i].cityFrom} To: ${jsonResponse.data[i].cityTo} Price per Adult: ${jsonResponse.data[i].fare.adults} Departure: ${localDate.toString()} Return: ${localDateReturn.toString()}`;
            mainContainer.appendChild(div);
        }
    }
)


let userFromInput = document.querySelector('#from');
let userToInput = document.querySelector('#to');
let userDateDepart = document.getElementsByClassName('#datedepart');
let userDateReturn = document.getElementsByClassName('#datereturn');
let submit = document.querySelector('#submit');

    const fromQuery = userFromInput.value;
    const toQuery = userToInput.value;
    const dateDepart = userDateDepart.value;
    const dateReturn = userDateReturn.value;

const getSuggestions = () => { //REDUCE THIS. user input place and gets aggregated airports, prices. DASSIT

    const fromQuery = userFromInput.value;
    const toQuery = userToInput.value;
    const dateDepart = userDateDepart.value;
    const dateReturn = userDateReturn.value;

    fetch(`https://tequila-api.kiwi.com/v2/search?fly_from=${fromQuery}&fly_to=${toQuery}&date_from=${dateDepart}&date_to=${dateReturn}`, {
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
        let div = document.createElement("div");
        div.innerHTML = `Test: ${jsonResponse.data[1].cityFrom}`;
        userContainer.appendChild(div);
    })
}

const displaySuggestions = (event) => {
    event.preventDefault();    
    getSuggestions();
  };

  submit.addEventListener('click', displaySuggestions);