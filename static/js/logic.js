

//What we want to do 
  //Import the dataset
  //Create a map that plots all the earthquakes from dataset based on their longitude and latitude 
  //Data markers need to reflect the magnitude of the earthquake by their size (higher magnitude should be larger (this is radius))
  //Data markers need to reflect the depth (3rd cooridnate) of the earthquake by their color (greater depth should be darker)
  //Need to include pop ups that provide additional info about the earthquake
  //Create a legend that will provide context for map data 



//Store the URL
var Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL using D3
d3.json(Url, function(data) {
    createFeatures(data.features);
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
        fillColor: getColor(feature.properties.geometry[2]),
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
  
  
  
  
  
  