import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { config } from '../../config';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import classnames from 'classnames';
import style from './style.scss';

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_KEY
})

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      zoom: config.map.zoom,
      mapIsHidden: true
    }
    this.map = null;
  }

  static propTypes = {
    points: PropTypes.array,
    getPoints: PropTypes.func
  }

  renderPoints = () => {
    return this.props.points.map((point, i) => {
      return <Feature key={i}
              coordinates={
                [point.station.gps.longitude, point.station.gps.latitude]
              }/>
    })
  }

  unhideMap = () => {
    this.setState({ mapIsHidden: false });
    // this.setState({
    //   zoom: 1
    // })
    
  }
  
  render() {
    return (
      <React.Fragment>
        <Mapbox
          style={config.map.style}
          ref={(node) => this.map = ReactDOM.findDOMNode(node)}
          className={classnames(style['map'], { [style['is-hidden']]: this.state.mapIsHidden })}
          center={this.props.departure}
          onDragEnd={(e) => {this.props.getPoints(e.getBounds())}}
          onStyleLoad={(e) => {
            this.unhideMap();
            // this.props.getPoints(e.getBounds())
          }}
          onZoomEnd={(e) => this.props.getPoints(e.getBounds())}>
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": config.map.icon, "icon-size": 1.2 }}>
              {this.renderPoints()}
            </Layer>
        </Mapbox>
      </React.Fragment>
    );
  }
}

export default Map;


