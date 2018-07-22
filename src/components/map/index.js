import React from 'react';
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
      center: config.map.center,
      mapIsHidden: true
    }
  }

  static propTypes = {
    points: PropTypes.array,
    getPoints: PropTypes.func
  }

  componentDidMount() {
    
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
  }
  
  render() {
    return (
      <React.Fragment>
        <Mapbox
          style={config.map.style}
          className={classnames(style['map'], { [style['is-hidden']]: this.state.mapIsHidden })}
          center={this.state.center}
          zoom={this.state.zoom}
          onDragEnd={(e) => this.props.getPoints(e.getBounds())}
          onStyleLoad={(e) => {
            this.unhideMap();
            // this.props.getPoints(e.getBounds())
          }}
          onZoomEnd={(e) => this.props.getPoints(e.getBounds())}>
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": config.map.icon }}>
              {this.renderPoints()}
            </Layer>
        </Mapbox>
      </React.Fragment>
    );
  }
}

export default Map;


