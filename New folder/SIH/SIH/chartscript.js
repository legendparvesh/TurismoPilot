
lat = 14.071278336863656;
lng = 80.1505848467655;

var map;
var mark;
var lineCoords = [];
  
var initialize = function() {
  map  = new google.maps.Map(document.getElementById('map-canvas'), {center:{lat:lat,lng:lng},zoom:12});
  mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});
};

    const firebaseConfig = {

        apiKey: "AIzaSyB0VlnWMJkcEHaM3gpqfhqw-2GbI3BTgHg",
authDomain: "web-auth-b6801.firebaseapp.com",
databaseURL: "https://web-auth-b6801-default-rtdb.firebaseio.com",
projectId: "web-auth-b6801",
storageBucket: "web-auth-b6801.appspot.com",
messagingSenderId: "24475082151",
appId: "1:24475082151:web:2fa02b8f91a56d86de6a82",
measurementId: "G-TWSN2HDR5C"

};

window.initialize = initialize;

firebase.initializeApp(firebaseConfig );

var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
    var gps = snapshot.val();
  console.log(gps.LAT);
  console.log(gps.LNG);
  lat = gps.LAT;
  lng = gps.LNG;

  map.setCenter({lat:lat, lng:lng, alt:0});
  mark.setPosition({lat:lat, lng:lng, alt:0});
  
  lineCoords.push(new google.maps.LatLng(lat, lng));

  var lineCoordinatesPath = new google.maps.Polyline({
    path: lineCoords,
    geodesic: true,
    strokeColor: '#2E10FF'
  });
  
  lineCoordinatesPath.setMap(map);
}, function (error) {
  console.log("Error: " + error.code);
});
setInterval(function() {
        window.location.reload();
    }, 5000);

