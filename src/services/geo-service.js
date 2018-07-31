class GeoService {
  _rad(x) {
    return x*Math.PI/180;
  }
  
  findClosestPoints(departure, points, amount) {
    const lat = departure.lat;
    const lng = departure.lng;
    const R = 6371; // radius of earth in km
    let distances = [];
    let closest = -1;
    for (let i = 0; i < points.length; i++) {
      const mlat = points[i].lat;
      const mlng = points[i].lng;
      const dLat  = this._rad(mlat - lat);
      const dLong = this._rad(mlng - lng);
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this._rad(lat)) * Math.cos(this._rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R * c;
      distances[i] = {
        distance: d,
        point: { lat: points[i].lat, lng: points[i].lng }
      };
      

      // if (closest == -1 || d < distances[closest]) {
      //   closest = i;
      // }
    }
    const closesPoint = points[closest];
    
    const readyObj = distances.sort((a, b) => a.distance - b.distance).slice(0, amount);
    return readyObj.map(item => {return { lat: item.point.lat, lng: item.point.lng }})
  }
}

export default GeoService;