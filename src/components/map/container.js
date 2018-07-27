import React from 'react';
import PropTypes from 'prop-types';
import Map from './index';
import { connect } from 'react-redux';
import matrixService from '@mapbox/mapbox-sdk/services/matrix';

import { loadPoints, loadAllPoints } from '../../actions/geo-actions';
import { toggleModal } from '../../actions/ui-actions';


const matrixClient = matrixService({ accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN });

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      departure: this.props.departure,
      destination: {},
      distances: []
    }
  }
  
  static propTypes = {
    loadPoints: PropTypes.func,
    points: PropTypes.array,
    openModal: PropTypes.func
  }

  componentDidMount() {
    this.props.loadAllPoints();
  }
  
  componentDidUpdate(props) {
    if (props.departure !== this.props.departure) {
      this.findNearestPoints();
    }
  }
  
  findNearestPoints = () => {
    let distances = [];

    const points = this.props.points;
    const step = 24; // restriction of mapbox api

    for (let i = 0; i < points.length; i+=step) {
      let filteredPoints = [{
        coordinates: [this.props.departure.lat, this.props.departure.lng]
      }]; // with [0] point as a departure

      for (let j = i; j < i+step; j++) {
        if (points[j]) {
          filteredPoints.push({
            coordinates: [points[j].station.gps.longitude, points[j].station.gps.latitude]
          });
        }
      }

      matrixClient.getMatrix({
        points: filteredPoints,
        profile: 'walking',
        sources: [0],
        destinations: Array.from({length: step}, (v, k) => k+1), // this api is really weird
        annotations: ['distance']
      })
        .send()
        .then(response => {
          const matrix = response.body;
          this.setState({
            distances: [...this.state.distances, ...matrix.distances[0]]
          });
          console.log(i);
      });
    }

  }
  
  getPoints = (bounds) => {
    this.props.loadPoints({
      gpsTopLatitude: bounds.getNorthEast().lat,
      gpsTopLongitude: bounds.getNorthEast().lng,
      gpsBotLatitude: bounds.getSouthWest().lat,
      gpsBotLongitude: bounds.getSouthWest().lng,
      zoomLevel: 14 // todo
    });
  }
  
  render() {
    return <Map
    points={this.props.points}
    getPoints={this.getPoints}
    departure={this.props.departure}
    openModal={this.props.openModal}/>
  }
}


const mapStateToProps = (state) => {
  return {
    points: state.geo.points,
    departure: state.geo.departure
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadPoints: (boundingBox) => dispatch(loadPoints(boundingBox)),
    openModal: () => dispatch(toggleModal(true)),
    loadAllPoints: () => dispatch(loadAllPoints())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);