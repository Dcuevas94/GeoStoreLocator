﻿var map;
var infoWindow;
var service;
//THIS WORKS
//initalize the browser
function initialize() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 12,
        styles: [{ stylers: [{ visibility: 'simplified' }] },
            { elementType: 'labels', stylers: [{ visibility: 'on' }] }]
    });

    geolocate(); //find user geolocation using HTML5 geolocation

    // Recenter the map to the user location
    var geolocationDiv = document.createElement('div');
    var geolocationControl = new GeolocationControl(geolocationDiv, map);
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(geolocationDiv);

    // infowindow and services for markers and search functinoality
    infoWindow = new google.maps.InfoWindow();
    service = new google.maps.places.PlacesService(map);
    google.maps.event.addListenerOnce(map, 'bounds_changed', performSearch);
}

function GeolocationControl(controlDiv, map) {
    // Set CSS for the control button
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#444';
    controlUI.style.borderStyle = 'solid';
    controlUI.style.borderWidth = '1px';
    controlUI.style.borderColor = 'white';
    controlUI.style.height = '28px';
    controlUI.style.marginTop = '5px';
    controlUI.style.cursor = 'pointer';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to center map on your location';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control text
    var controlText = document.createElement('div');
    controlText.style.fontFamily = 'Arial,sans-serif';
    controlText.style.fontSize = '10px';
    controlText.style.color = 'white';
    controlText.style.paddingLeft = '10px';
    controlText.style.paddingRight = '10px';
    controlText.style.marginTop = '8px';
    controlText.innerHTML = 'Center map on your location';
    controlUI.appendChild(controlText);

    google.maps.event.addDomListener(controlUI, 'click', geolocate);
}

// Requests the users geolocation
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var infowindow = new google.maps.InfoWindow({
                map: map,
                position: pos,
                animation: google.maps.Animation.DROP,
                content: 'You are here'
            });
            map.setCenter(pos);
        }, function () {
            handleNoGeolocation(true);
        });
    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}

//Handles No geolocation, or the user declined the geolocation
function handleNoGeolocation(errorFlag) {
    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }
    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };
    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);
}

// Does all the search functionality
function performSearch() {
    var request = {
        bounds: map.getBounds(),
        radius: '500',
        keyword: 'store'
    };
    service.radarSearch(request, callback);

    var request2 = {
        bounds: map.getBounds(),
        radius: '500',
        keyword: 'business'
    };
    var service2 = new google.maps.places.PlacesService(map);
    service2.radarSearch(request2, callback);

    var request3 = {
        bounds: map.getBounds(),
        radius: '500',
        keyword: 'shop_store'
    };
    var service3 = new google.maps.places.PlacesService(map);
    service3.radarSearch(request3, callback);

    var request4 = {
        bounds: map.getBounds(),
        radius: '500',
        keyword: 'food'
    };
    var service4 = new google.maps.places.PlacesService(map);
    service4.radarSearch(request4, callback);

    var request5 = {
        bounds: map.getBounds(),
        radius: '500',
        types: ['movie_theater', 'store', 'bank', 'bar', 'cafe',
            'museum', 'restaurant', 'food', 'establishment'],
        rankBy: 'distance'
    };
    var service5 = new google.maps.places.PlacesService(map);
    service5.radarSearch(request5, callback);
}

function callback(results, status) {
    if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
    }
    for (var i = 0, result; result = results[i]; i++) {
        createMarker(result);
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.title,
    });
    google.maps.event.addListener(marker, 'click', function () {
        service.getDetails(place, function (result, status) {
            if (status != google.maps.places.PlacesServiceStatus.OK) {
                alert(status);
                return;
            }
            console.log(result, status);
            infoWindow.setContent('<span style="width: 40%; padding: 0px; text-align:left" align="left"><h3>' + result.name + '</h3><p>'
                + result.formatted_address + '<br />' + result.formatted_phone_number + '<br />' +
                '<a target= "_blank" href=' + result.website + '>' + 'http://' + result.name + '</a></p>');
            infoWindow.open(map, marker);
        });
    });
    service.getDetails(place)
}

google.maps.event.addDomListener(window, 'load', initialize);
