let mapboxAccessToken =
  "pk.eyJ1IjoidG9tYXpvdnNlbmphayIsImEiOiJja2lxYTRhd28wZGoxMnhwamF3MTI1YjA5In0.cCRWR0uclCv1ecYzmJ0Y_w";
let map = L.map("map", {
  maxZoom: 5,
  minZoom: 5,
  dragging: false,
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
L.geoJson().addTo(map);
console.log(statesData.features[0].properties.name);

//TODO
//1. make map clickable
//2. change color of the selected state
