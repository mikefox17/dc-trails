mapboxgl.accessToken =
  "pk.eyJ1IjoibWlrZWZveDE3IiwiYSI6ImNrMHdvdWlmcDAxa3czZXRiajllaG12cHAifQ.p8efkdRmp25SsmgJ5j4jvA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 13,
  center: [-77.0366, 38.895],
  cycling: true
});

new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
});

var marker = new mapboxgl.Marker({
  draggable: true
})
  .setLngLat([-77.0366, 38.895])
  .addTo(map);

function onDragEnd() {
  var lngLat = marker.getLngLat();
  coordinates.style.display = "block";
  coordinates.innerHTML =
    "Longitude: " + lngLat.lng + "<br />Latitude: " + lngLat.lat;
  console.log(lngLat, lngLat);
  let inputLng = lngLat.lng;
  let inputLat = lngLat.lat;
  console.log(inputLng);
  console.log(inputLng, inputLat);
  const input = (document.getElementById("input").value =
    inputLng + " ," + inputLat);
}

marker.on("dragend", onDragEnd);

console.log("hello from map.js");
