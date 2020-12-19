let mapboxAccessToken =
  "pk.eyJ1IjoidG9tYXpvdnNlbmphayIsImEiOiJja2lxYTRhd28wZGoxMnhwamF3MTI1YjA5In0.cCRWR0uclCv1ecYzmJ0Y_w";
let map = L.map("map", {
  maxZoom: 5,
  minZoom: 5,
  dragging: false,
  doubleClickZoom: false,
}).setView([37.8, -96], 5);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
    mapboxAccessToken,
  {
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(map);
L.geoJson(statesData).addTo(map);
//////////////////////////////////////////////////////////////

let mapa = L.map("mapALaska", {
  maxZoom: 3,
  minZoom: 3,
  dragging: false,
  doubleClickZoom: false,
}).setView([64, -157], 3);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
    mapboxAccessToken,
  {
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(mapa);
L.geoJson(statesData).addTo(mapa);
//havai
let mapH = L.map("mapHawai", {
  dragging: false,
  doubleClickZoom: false,
}).setView([20.761906909670278, -157.5727520449764], 6);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=" +
    mapboxAccessToken,
  {
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1,
  }
).addTo(mapH);
L.geoJson(statesData).addTo(mapH);
//////////////////////////////////////////////////////////////
const USAmap = document.querySelector(".mapOfUSA");
const states = Array.from(USAmap.getElementsByTagName("path"));
const mapOfAlaska = document.querySelector(".mapOfAlaska");
const statesAlaska = Array.from(mapOfAlaska.getElementsByTagName("path"));

const mapOfHawai = document.querySelector(".mapOfHawai");
const statesHawai = Array.from(mapOfHawai.getElementsByTagName("path"));

let controls = document.querySelectorAll(".leaflet-top");
for (let i = 0; i < controls.length; i++) {
  const element = controls[i];
  element.remove();
}

console.log(controls);

states.splice(1, 1, statesAlaska[1]);
states.splice(11, 1, statesHawai[11]);
console.log(states);

const trumpProg = document.querySelector(".progressBar--trump");
const bidenProg = document.querySelector(".progressBar--biden");
const trumpOnScreenVotes = document.querySelector(".electoralPoints-Trump");
const bidenOnScreenVotes = document.querySelector(".electoralPoints-Biden");
const originalStates = {
  statesPath: states,
  statesElectoral: [],
  statesNames: [],
  electoralVotes: {},
  trumpCountriesWon: [],
  bidenCountriesWon: [],
};

//adding the classes and ids and so on
//electoral votes for every country
for (let i = 0; i < statesData.features.length; i++) {
  const element = statesData.features[i];
  originalStates.statesElectoral.push(element.properties.electoralVotes);
  //my key = country
  //my value = electoral votes
  originalStates.electoralVotes[element.properties.name] =
    element.properties.electoralVotes;
}

for (let i = 0; i < statesData.features.length - 1; i++) {
  const element = statesData.features[i];
  originalStates.statesNames.push(element.properties.name);
}

//vsakemu pathu dodati svojo kurčevo državo

for (let i = 0; i < states.length; i++) {
  const element = states[i];
  element.setAttribute("id", originalStates.statesNames[i]);
  element.setAttribute("fill", "transparent");
  element.setAttribute("data-votes", originalStates.statesElectoral[i]);
}

let clicked = 0;
let trumpVotes = 0;
let bidenVotes = 0;
//adding the classes and ids and so on
//
//
//
//clicked events
states.forEach((el) => {
  el.addEventListener("click", function (e) {
    if (e.target.getAttribute("fill") === "#3388ff") {
      e.target.setAttribute("fill", "#ff0000");
      //add to the countries won
    } else {
      e.target.setAttribute("fill", "#3388ff");
      //add to the biden victory
    }
    // id = ime
    // dataset.electoral => electoral votes of the state
    //če ima fill enak moder, dodaj k bidenu
    if (e.target.getAttribute("fill") === "#3388ff") {
      e.target.setAttribute("data-candidate", "biden");
      //vse države soe.target.id že podane k obema kandidatoma
    }
    if (e.target.getAttribute("fill") === "#ff0000") {
      console.log("Trumps Country ");
      e.target.setAttribute("data-candidate", "trump");
    }

    //get all the paths = >
    const bidenVOOtes = [0];
    const trumpVOotes = [0];
    for (let i = 0; i < states.length; i++) {
      const element = states[i];
      if (element.dataset.candidate === "biden") {
        bidenVOOtes.push(+element.dataset.votes);
      } else if (element.dataset.candidate === "trump") {
        trumpVOotes.push(+element.dataset.votes);
      }
    }
    console.log(bidenVOOtes);
    console.log(trumpVOotes);
    let trumpVotesFinal = trumpVOotes.reduce((acc, cur) => acc + cur);
    console.log("trump Votes " + trumpVotesFinal);
    let bidenVotesFinal = bidenVOOtes.reduce((acc, cur) => acc + cur);
    console.log("biden Votes " + bidenVotesFinal);

    // width => je enako votson trumpProg bidenProg
    //novi width je tist , kateri je trenuten votes

    trumpProg.style.width = trumpVotesFinal * 1.86 + "px";
    bidenProg.style.width = bidenVotesFinal * 1.86 + "px";

    trumpOnScreenVotes.textContent = trumpVotesFinal;
    bidenOnScreenVotes.textContent = bidenVotesFinal;
  });
});

//To do :
