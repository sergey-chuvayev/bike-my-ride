import React from 'react';
import Map from './index';
import { connect } from 'react-redux';

import { loadPoints } from '../../actions/geo-actions';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
    }

    getPoints = (bounds) => {
        console.log(bounds);
        // console.log(bounds.getNorth());
        // console.log(bounds.getNorthEast());
        // console.log(bounds.getNorthWest());
        // console.log(bounds.getSouthEast());
        // console.log(bounds.getSouthWest());
        // // this.props.loadPoints({
        // //     gpsTopLatitude: 48.87071313273786,
        // //     gpsTopLongitude: 2.4163762852549557,
        // //     gpsBotLatitude: 48.83965268444643,
        // //     gpsBotLongitude: 2.2927800938487057,
        // //     zoomLevel: 14
        // // });
        this.props.loadPoints({
            gpsTopLatitude: bounds.getNorthEast().lat,
            gpsTopLongitude: bounds.getNorthEast().lng,
            gpsBotLatitude: bounds.getSouthWest().lat,
            gpsBotLongitude: bounds.getSouthWest().lng,
            zoomLevel: 14
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