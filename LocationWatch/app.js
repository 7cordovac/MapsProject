// initialize location jquery
$(document).ready(function() {
    initLocationProcedure();
});

var map,
    currentPositionMarker,
    mapCenter = new google.maps.LatLng(33.3471108,-112.0849717),
    map;


function initializeMap()
{
    map = new google.maps.Map(document.getElementById('map_canvas'), {
       zoom: 18,
       center: mapCenter,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     });
}

function locError(error) {
    // tell the user if the current position could not be located
    alert("The current position could not be found!");
}

// current position of the user
function setCurrentPosition(pos) {
    currentPositionMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
        ),
        title: "Current Position"
    });
    map.panTo(new google.maps.LatLng(
            pos.coords.latitude,
            pos.coords.longitude
        ));
}

function displayAndWatch(position) {

    // set current position
    setCurrentPosition(position);

    // watch position
    watchCurrentPosition();
}

function watchCurrentPosition() {
        var positionTimer = navigator.geolocation.watchPosition(
            function (position) {
              console.log("ticking...");
              var currentdate = new Date();
              var datetime = "Last Sync: " + currentdate.getDate() + "/"
              + (currentdate.getMonth()+1)  + "/"
              + currentdate.getFullYear() + " @ "
              + currentdate.getHours() + ":"
              + currentdate.getMinutes() + ":"
              + currentdate.getSeconds();

              $("#time").html(datetime);
              $("#lat").html(position.coords.latitude);
              $("#long").html(position.coords.longitude);
                setMarkerPosition(
                    currentPositionMarker,
                    position
                );
            });
    }
function setMarkerPosition(marker, position) {
    marker.setPosition(
        new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude)
    );
}

function initLocationProcedure() {
    initializeMap();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayAndWatch, locError);
    } else {
        // tell the user if a browser doesn't support this amazing API
        alert("Your browser does not support the Geolocation API!");
    }
}
