import React from 'react';
import PropTypes from 'prop-types';
import Map from './index';
import { connect } from 'react-redux';
import GeoServise from '../../services/geo-service';
import { config } from '../../config';
import KDTree from 'k-d-tree';

import { loadPoints, loadAllPoints } from '../../actions/geo-actions';
import { toggleModal } from '../../actions/ui-actions';

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      departure: this.props.departure,
      destination: {},
      distances: [],
      points: this.props.points
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

    const points = this.props.points.map(point => { // convert to geojson (need for the lib)
      return { coordinates: [point.lat, point.lng] }
    })

    const tree = new KDTree(points, (a, b) => {
      return Math.pow(a.lat - b.lat, 2) +  Math.pow(a.lng - b.lng, 2); // simple euclidean distance
    });

    const nearest = tree.nearest({
      coordinates: [
        this.props.departure.lat, this.props.departure.lng
      ]
    }, config.amountOfClosestPoints);

    this.setState({
      points: nearest.map(nearestPoint => {
        return { lat: nearestPoint[0].coordinates[0], lng: nearestPoint[0].coordinates[1] }
      })
    });

    // const service = new GeoServise();
    // const closest = service.findClosestPoints(
    //   this.props.departure, 
    //   this.props.points.map(point => { return {
    //     lat: point.lat,
    //     lng: point.lng
    //   } }),
    //   config.amountOfClosestPoints
    // );
    // this.setState({
    //   points: closest
    // })
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
    points={this.state.points}
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