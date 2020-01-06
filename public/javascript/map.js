mapboxgl.accessToken =
  "pk.eyJ1IjoibWlrZWZveDE3IiwiYSI6ImNrMHdvdWlmcDAxa3czZXRiajllaG12cHAifQ.p8efkdRmp25SsmgJ5j4jvA";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 13,
  center: [-77.0366, 38.895],
  cycling: true
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

async function getTrails() {
  const res = await fetch("http://localhost:5000/api/v1/trails");
  const data = await res.json();

  const trails = data.data.map(trail => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          trail.location.coordinates[0],
          trail.location.coordinates[1]
        ]
      },
      properties: {
        trailId: trail.trailId,
        issueDetail: trail.issueDetail,
        icon: "../images/iconfinder_map-marker_299087.png"
      }
    };
  });

  loadMap(trails);

  function loadMap(trails) {
    map.on("load", function() {
      map.addLayer({
        id: "points",
        type: "symbol",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: trails
          }
        },
        layout: {
          "icon-image": "../images/iconfinder_map-marker_299087.png",
          "icon-size": 1.5,
          "text-field": "{trailId}",
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 0.9],
          "text-anchor": "top",
          "text-field": "{issueDetail}"
        }
      });
    });
  }
}
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

getTrails();
