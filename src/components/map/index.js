import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
// import style from './style.scss';

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_KEY
})


class Map extends React.Component {
  componentDidMount() {
    
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
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
          onDragEnd={(e) => this.props.getPoints(e.getBounds())}
          onStyleLoad={(e) => this.props.getPoints(e.getBounds())}
          onZoomEnd={(e) => this.props.getPoints(e.getBounds())}
          >
            <Layer
              type="symbol"
              id="marker"
              layout={{ "icon-image": "harbor-15" }}>
              {this.renderPoints()}
            </Layer>
        </Mapbox>
      </React.Fragment>
    );
  }
}

export default Map;


