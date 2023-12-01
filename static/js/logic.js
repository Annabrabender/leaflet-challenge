

//What we want to do 
  //Import the dataset
  //Create a map that plots all the earthquakes from dataset based on their longitude and latitude 
  //Data markers need to reflect the magnitude of the earthquake by their size (higher magnitude should be larger (this is radius))
  //Data markers need to reflect the depth (3rd cooridnate) of the earthquake by their color (greater depth should be darker)
  //Need to include pop ups that provide additional info about the earthquake
  //Create a legend that will provide context for map data 

// Store the URL for the earthquake data
var Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// Perform a GET request to the query URL using D3
d3.json(Url).then(function(data) {
    createFeatures(data.features);
}).catch(function(error) {
    console.log("Error loading data: " + error);
});
// Function to create features (earthquake markers)
function createFeatures(earthquakeData) {
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3><h3>Location: "+ feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        fillOpacity: .6,
        color: "#000",
        stroke: true,
        weight: .8
    })
  }
  });
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}
  
function createMap(earthquakes) {
  // Create the tile layer that will be the background of our map.
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  // Create a baseMaps object to hold the streetmap layer.
  let baseMaps = {
    "Street Map": streetmap
  };
  // Create an overlayMaps object to hold the earthquakes layer.
  let overlayMaps = {
    "Earthquakes": earthquakes
  };
  // Create the map object with options.
  let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 3,
    layers: [streetmap, earthquakes]
  });
  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
 
// Function to determine the color of the marker based on earthquake depth
function getColor(depth) {
  return depth > 5 ? "#a54500":
         depth > 4 ? "#cc5500":
         depth > 3 ? "#ff6f08":
         depth > 2 ? "#ff9143":
         depth > 1 ? "#ffb37e":
                     "#ffcca5";
}
// Function to determine the radius of the marker based on earthquake magnitude
function getRadius(magnitude) {
  return magnitude * 25000;
}