function map() {
  var mapCanvas = document.getElementById('map');
  var contentString = '<div id="description"><p>Contact Us</p><p>7oroof@7oroof.com</p><p>Your address goes here</p></dilv>';
  var center = new google.maps.LatLng(47.23135, 39.72328 );

  var mapOptions = {
    center: center,
    zoom: 11,
    disableDefaultUI: true
  };
var map = new google.maps.Map(mapCanvas, mapOptions);
  var marker = new google.maps.Marker({
    position:center,
    icon: 'favicon/favicon-32x32.png'
  });
marker.setMap(map)
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  infowindow.open(map, marker)




}
