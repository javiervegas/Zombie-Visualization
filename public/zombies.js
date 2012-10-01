function initialize() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: new google.maps.LatLng(37.806, -122.446),
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  var markers = new Array();
  for (var i = 0, crime; crime = incidents[i]; ++i) {
    var lnglat = crime.lnglat;
    markers[i] = marker(lnglat[1], lnglat[0], crime.type, map);
  }
  var crossers = [marker(bridge[0][0], bridge[0][1], "human", map), marker(bridge[0][0], bridge[0][1], "zombi", map)];
  var counter = 0;
  setInterval(function(){
    counter = (counter+1) % 10; 
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
  return (type == 'human' || type =='THEFT') ? "human.svg" : "zombie.svg";
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
  if (counter <= 10 || index ==1 ) { 
    return bridge[0][latlong]+counter*(bridge[1][latlong]-bridge[0][latlong])/10;
  } else {
    return bridge[0][latlong]+counter*(bridge[0][latlong]-bridge[1][latlong])/10;
  }
}
bridge=[[37.81096,-122.47754],[37.82578,-122.47922]]
