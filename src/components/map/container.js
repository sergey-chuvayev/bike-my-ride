import React from 'react';
import PropTypes from 'prop-types';
import Map from './index';
import { connect } from 'react-redux';

import { loadPoints } from '../../actions/geo-actions';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        loadPoints: PropTypes.func,
        points: PropTypes.array
    }

    componentDidMount() {
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
                getPoints={this.getPoints}/>
    }
}

const mapStateToProps = (state) => {
    return {
        points: state.geo.points
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadPoints: (boundingBox) => dispatch(loadPoints(boundingBox)) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);