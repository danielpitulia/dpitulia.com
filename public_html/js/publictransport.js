/* Avgångar Västtrafik - JavaScript.

Programmet hämtar från två API:er: Trafiklabs Stolptidtabeller 2 och Trafiklabs Reseplaneraren.

Stolptidtabeller 2 API-länk: https://api.resrobot.se/v2.1/departureBoard?id=740000002&format=json&accessId=API_KEY
API-nyckel: a7682d4a-5485-4740-ad93-f8e1c79f1d5e 
Hela länken: https://api.resrobot.se/v2.1/departureBoard?id=740000002&format=json&accessId=a7682d4a-5485-4740-ad93-f8e1c79f1d5e

Trafiklabs Reseplaneraren API-länk: https://api.resrobot.se/v2.1/departureBoard?id=740000002&format=json&accessId=API_KEY
API-nyckel: Reseplaneraren:2fd14fc2-2b40-4851-9838-42846560ff7e

Detta program gör följande: 
1. Hämta Trafiklabs ID för Rävekärrsgatan genom fetch().
2. Använd ID för att hämta avgångar från Rävekärrsgatan genom fetch().*/

let numberDepartures = 10;


dep = document.querySelectorAll(".selectDepartureAmount");
  dep.forEach(item => {
    item.addEventListener("click", () => {
      numberDepartures = item.innerHTML;
      document.getElementById("activeDeparture").innerHTML = `Antal avgångar: ${numberDepartures}`; 
      console.log(numberDepartures);
    })
  });

 
  const API_Key1 = "2fd14fc2-2b40-4851-9838-42846560ff7e";
  const API_Key2 = "a7682d4a-5485-4740-ad93-f8e1c79f1d5e";

const searchButton = document.getElementById("myBtn");

searchButton.addEventListener("click", () => {
  
  // fetchRes is the promise to resolve
  // it by using.then() method

  
  let nameInput = document.getElementById("myText").value;
  let fetchRes = fetch(
    "https://api.resrobot.se/v2/location.name?input=" + nameInput + "&format=json&key=" + API_Key1);
  fetchRes.then(res =>
    res.json()).then(data => {
    // Ändra hållplatsen ovanför tabellen:
    //obj.id innehåller hållplatsens ID
    stationId = data.StopLocation[0].id;
    console.log(data);  
    // Ange länken till Trafiklabs andra API.
    let stringFetch2 = "https://api.resrobot.se/v2.1/departureBoard?id=" + stationId + "&format=json&accessId=a7682d4a-5485-4740-ad93-f8e1c79f1d5e";
    let fetchRes2 = fetch(
      stringFetch2);


    // fetchRes is the promise to resolve
    // it by using.then() method
    fetchRes2.then(res2 =>
      res2.json()).then(data2 => {
        console.log(data2);
      let table = document.getElementById("tableDepartures");
      table.innerHTML = `<tr>
      <th style="color: #0080FF;">Linje</th>
      <th style="color: #0080FF;">Tid (min)</th>
      <th style="color: #0080FF;">Riktning</th>
    </tr>` 
    let size = Object.keys(data2.Departure).length; // Spara antalet avgångar i var size.
    for (let k = 1; k <= numberDepartures; k++) {

        table.innerHTML += `<tr>
              <td id="${k}1"></td>
              <td id="${k}2"></td>
              <td id="${k}3"></td>
            </tr>`;

            if (k > size){
              k = numberDepartures;
            }
      }
      
      for (let i = 0, j = 1; j <= numberDepartures; i++) {
        //For loop som skriver ut en rad i tabellen och upprepar för varje avgång som finns i API:n. 
        //"j" används för att ta bort sökningar som redan har avgått. j innehåller "framgångsrika" sökningar.

        //Collect times of departure in data object.

        let yearOfDeparture = data2.Departure[i].date.slice(0, 4);
        let monthOfDeparture = data2.Departure[i].date.slice(5, 7) - 1;
        let dayOfDeparture = data2.Departure[i].date.slice(8, 10);
        let hourOfDeparture = data2.Departure[i].time.slice(0, 2);
        let minuteOfDeparture = data2.Departure[i].time.slice(3, 5);

        let dateDeparture = new Date(yearOfDeparture, monthOfDeparture, dayOfDeparture, hourOfDeparture, minuteOfDeparture);

        let stopName = data2.Departure[i].stop.replace("(Göteborg kn)", "").replace("(Mölndal kn)", "");
        let timeRemaining = Math.ceil((dateDeparture.getTime() - new Date().getTime()) / (1000 * 60));
        let direction = data2.Departure[i].direction.replace("(Göteborg kn)", "").replace("(Mölndal kn)", "");
        let vehicleName = data2.Departure[i].name.replace("Länstrafik - ", "");

        if (timeRemaining > 0) {
          // Sparar informationen från API:n till ett JavaScript-objekt: new Date(year, month, day, hour, seconds). Månad börjar från 0 i JavaScript. Jag la till - 0 på månaden för att göra om från string till "float", d.v.s. siffra.        
          document.getElementById(j + "1").innerHTML = "<p>" + vehicleName + "</p>";
          document.getElementById(j + "2").innerHTML = "<p>" + timeRemaining + "</p>";
          document.getElementById(j + "3").innerHTML = "<p>" + direction + "</p>";
          document.getElementById("stopText").innerHTML = "<p> Hållplats: " + stopName + "</p>";
          j++;
          if (j > size){
            j = numberDepartures +1;
          }
        }
      }
    });
  })
});

// Get the input field
let input = document.getElementById("myText");

// Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("myBtn").click();
  }
});