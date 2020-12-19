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

//////////////////////////////////////////////////////////////
const states = Array.from(document.getElementsByTagName("path"));
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
for (let i = 0; i < statesData.features.length - 1; i++) {
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
    const country = {
      coutnryName: e.target.id,
      countryVotes: e.target.dataset.votes,
    };
    const indexBiden = originalStates.bidenCountriesWon.findIndex(
      (count) => count.coutnryName === `${e.target.id}`
    );
    const indexTrump = originalStates.trumpCountriesWon.findIndex(
      (count) => count.coutnryName === `${e.target.id}`
    );
    /*
    //added the dataset to the country for which it voted for
    if (e.target.getAttribute("data-candidate") === "trump") {
      originalStates.trumpCountriesWon.push(country);

      originalStates.bidenCountriesWon.splice(indexBiden, 1);
    }

    //najdi vse ki imajo dataset enak trump in seštej

    if (e.target.getAttribute("data-candidate") === "biden") {
      originalStates.bidenCountriesWon.push(country);
      originalStates.trumpCountriesWon.splice(indexTrump, 1);
    }

    //states => vsaka ki
    //izračunaj vse kar je imenovano trump

    console.log("trump countries ", originalStates.trumpCountriesWon);
    console.log("biden countries ", originalStates.bidenCountriesWon);
    const bidenVOOtes = [];
    const trumpVOotes = [];
    for (let i = 0; i < originalStates.bidenCountriesWon.length; i++) {
      const element = originalStates.bidenCountriesWon[i];
      bidenVOOtes.push(+element.countryVotes);
    }
    for (let i = 0; i < originalStates.trumpCountriesWon.length; i++) {
      const element = originalStates.trumpCountriesWon[i];
      trumpVOotes.push(+element.countryVotes);
    }
  */
    //get all the paths = >
    const bidenVOOtes = [4];
    const trumpVOotes = [3];
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
console.log(originalStates);

// reducing the array to one value

//todo
//1.)figure out progress bar logic
//
//ideas : every election result, with colored countries

//ideas for progress bar logic
//when i click on the country => it should be added presidents array that he won and taken off the presidents array that it won, the country can only be red or blue( true or false ? )
