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
window.onload = function () {

  var API_Key1 = "a7682d4a-5485-4740-ad93-f8e1c79f1d5e";
  var API_Key2 = "2fd14fc2-2b40-4851-9838-42846560ff7e";
  var nameInput = document.getElementById("myText").value;
  var stationId;
  var obj;
  let fetchRes = fetch(
    "https://api.resrobot.se/v2/location.name?input=" + nameInput + "&format=json&key=" + API_Key2);
  console.log(nameInput);

  // fetchRes is the promise to resolve
  // it by using.then() method
  fetchRes.then(res =>
    res.json()).then(data => {
    obj = data;
    // Ändra hållplatsen ovanför tabellen:
    //obj.id innehåller hållplatsens ID
    stationId = obj.StopLocation[0].id;
    console.log(stationId);
    var obj2;
    // Ange länken till Trafiklabs andra API.
    var stringFetch2 = "https://api.resrobot.se/v2.1/departureBoard?id=" + stationId + "&format=json&accessId=" + API_Key1;
    console.log(stringFetch2);
    let fetchRes2 = fetch(
      stringFetch2);

    // fetchRes is the promise to resolve
    // it by using.then() method
    fetchRes2.then(res =>
      res.json()).then(data =>
      obj2 = data).then(() => {
      var size = Object.keys(obj2.Departure).length; // Spara antalet avgångar i var size.
      console.log(obj2);
      for (let i = 0; i <= 8 + 1; i++) {

        //For loop som skriver ut en rad i tabellen och upprepar operationen för varje avgång som finns i API:n. 
        let dateDeparture = new Date(obj2.Departure[i].date.slice(0, 4), obj2.Departure[i].date.slice(5, 7) - 0 - 1, obj2.Departure[i].date.slice(8, 10), obj2.Departure[i].time.slice(0, 2), obj2.Departure[i].time.slice(3, 5));
        // Sparar informationen från API:n till ett JavaScript-objekt: new Date(year, month, day, hour, seconds). Månad börjar från 0 i JavaScript. Jag la till - 0 på månaden för att göra om från string till "float", d.v.s. siffra.        
        document.getElementById(i + 1 + "1").innerHTML = obj2.Departure[i].name.replace("Länstrafik - ", "");
        document.getElementById(i + 1 + "2").innerHTML = Math.ceil((dateDeparture.getTime() - new Date().getTime()) / (1000 * 60));
        document.getElementById(i + 1 + "3").innerHTML = obj2.Departure[i].direction.replace("(Göteborg kn)", "").replace("(Mölndal kn)", "");
        document.getElementById("stopText").innerHTML = "Hållplats: " + obj2.Departure[i].stop.replace("(Göteborg kn)", "").replace("(Mölndal kn)", "");

      }
    });
  });

  // Get the input field
  var input = document.getElementById("myText");

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
}