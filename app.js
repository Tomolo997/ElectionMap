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
const originalStates = {
  statesPath: states,
  statesElectoral: [],
  statesNames: [],
  electoralVotes: {},
};

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

const USA = {};
for (let i = 0; i < states.length; i++) {
  const element = states[i];
  element.setAttribute("id", originalStates.statesNames[i]);
  element.setAttribute("fill", "transparent");
  element.setAttribute("data-votes", originalStates.statesElectoral[i]);
}
let clicked = 0;

states.forEach((el) => {
  el.addEventListener("click", function (e) {
    if (e.target.getAttribute("fill") === "#3388ff") {
      e.target.setAttribute("fill", "#ff0000");
    } else {
      e.target.setAttribute("fill", "#3388ff");
    }
    console.log(e.target.dataset.votes);
  });
});

console.log(originalStates);
