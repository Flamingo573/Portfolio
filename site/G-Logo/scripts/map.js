'use strict';

function initialize() {
    var styles = [{
        stylers: [{
            hue: "#ca0000"
        }, {
            saturation: -100
        }]
    }, {
        featureType: "road",
        elementType: "geometry",
        stylers: [{
            lightness: 100
        }, {
            visibility: "simplified"
        }]
    }, {
        featureType: "road",
        elementType: "labels",
        stylers: [{
            visibility: "on"
        }]
    }];

    var myCenter = new google.maps.LatLng(47.227222, 39.706102);
    var styledMap = new google.maps.StyledMapType(styles, {
        name: "Styled Map"
    });

    var mapOptions = {
        zoom: 19,
        center: myCenter,
        disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map'),
        mapOptions);

    var marker = new google.maps.Marker({
        position: myCenter
    });
    marker.setMap(map);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    var infowindow = new google.maps.InfoWindow({
        content: "улица Города Волос, 6"
    });
    infowindow.open(map, marker);
}
