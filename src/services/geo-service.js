class GeoService {
  _rad(x) {
    return x*Math.PI/180;
  }
  
  findClosestMarker(departure, points) {
    var lat = departure.lat;
    var lng = departure.lng;
    var R = 6371; // radius of earth in km
    var distances = [];
    var closest = -1;
    for (i = 0; i < points.length; i++) {
      var mlat = points[i].lat;
      var mlng = points[i].lng;
      var dLat  = rad(mlat - lat);
      var dLong = rad(mlng - lng);
      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = R * c;
      distances[i] = d;
      if (closest == -1 || d < distances[closest]) {
        closest = i;
      }
    }
    
    return points[closest]
  }
}

export default GeoService;