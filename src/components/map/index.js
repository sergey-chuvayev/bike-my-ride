import React from 'react';
import { config } from '../../config';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import style from './style.scss';

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_KEY
})


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: config.map.center
    }
  }

  componentDidMount() {
    console.log(style)
  }

  renderPoints = () =>  {
    return this.props.points.map((point, i) => {
      return <Feature key={i}
              coordinates={
                [point.station.gps.longitude, point.station.gps.latitude]
              }/>
    })
  }
  
  render() {
    return (
      <React.Fragment>
        <Mapbox
          style={config.map.style}
          className={style['map']}
          center={this.state.center}
          onDragEnd={(e) => {
            this.props.getPoints(e.getBounds());
            this.setState({
              center: e.getBounds().getCenter()
            })
          }}
          onStyleLoad={(e) => this.props.getPoints(e.getBounds())}
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


