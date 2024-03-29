var bridge=[[37.81066,-122.47754],[37.82578,-122.47922]];
function initialize() {
  var parks=[[[37.8064,-122.4797],[37.7887,-122.4472]],[[37.841,-122.5350],[37.8266,-122.4798]]];
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(37.806, -122.446),
    zoom: 13,
    mapTypeControl: false,
    streetViewControl: false,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  var markers = new Array();
  var crossers = new Array();
  for (var i = 0, crime; crime = incidents[i]; ++i) {
    var lnglat = crime.lnglat;
    markers.push(marker(lnglat[1], lnglat[0], crime.type, map));
  }
  for (var i = 0, park; park = parks[i]; ++i) {
    for (var j = 0; j < 100; j++) {
      markers.push(marker(park[0][0]+Math.random()*(park[1][0]-park[0][0]), park[0][1]+Math.random()*(park[1][1]-park[0][1]), "human", map));
    }
  }
  for (var i = 0; i < 2; i++) {
    crossers.push(marker(bridge[0][0], bridge[0][1], "human", map));
  }
  var counter = 0;
  setInterval(function(){
    counter = (counter+1) % 20; 
    for (var i = 0, marker; marker = markers[i]; i++) {
      var pos = marker.getPosition();
      marker.setPosition(new google.maps.LatLng(0.0005*(0.5-Math.random()) + pos.lat(), 0.001*(0.5-Math.random()) + pos.lng()));
    }
    for (var i = 0, crosser; crosser = crossers[i]; i++) {
      crosser.setPosition(new google.maps.LatLng(move(i, 0, counter), move(i, 1, counter)));
    }
    document.getElementById('time').innerHTML = (new Date()).toUTCString().replace (/.*[a-z]+\s+\d+\s+/g, "");
  },1000);
  var legend = document.getElementById('legend');
  var legendHTML = [];
  legendHTML.push('<div><img src="zombie.svg">Zombies</div>');
  legendHTML.push('<div><img src="human.svg">Humans</div>');
  legend.innerHTML = legendHTML.join(''); 
}
function icon(type) {
  return (type == 'human' || type =='VANDALISM') ? "human.svg" : "zombie.svg";
}
function marker(lat, long, type, map) {
  return new google.maps.Marker({
    position: new google.maps.LatLng(lat, long),
    icon: icon(type),
    flat: true,
    //clickable: false,
    map: map
  });
}
function move(index, latlong, counter) {
  if (counter <= 10) { 
    //north together
    return bridge[0][latlong]-index*0.0005+counter*(bridge[1][latlong]-bridge[0][latlong])/10;
  } else if (index == 0) {
    //return back south
    return bridge[1][latlong]+(10-counter)*(bridge[1][latlong]-bridge[0][latlong])/10;
  } else if (latlong == 0) {
    //keep going north
    return bridge[1][latlong]-(10-counter)*0.0005;
  } else {
    //keep going west
    return bridge[1][latlong]+(10-counter)*0.001;
  }
}
