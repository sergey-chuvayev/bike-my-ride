import React from 'react';
import Map from './index';
import { connect } from 'react-redux';

import { loadPoints } from '../../actions/geo-actions';

class MapContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.loadPoints(
            {
                gpsTopLatitude: 48.858859657952195,
                gpsTopLongitude: 2.3620031727477913,
                gpsBotLatitude: 48.85497723634969,
                gpsBotLongitude: 2.34655364882201,
                zoomLevel: 17
            }
        );
    }

    render() {
        return <Map points={this.props.points} />
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