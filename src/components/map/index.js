import React from 'react';
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import style from './style.scss';
import axios from 'axios';

const Mapbox = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_KEY
})


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      points: []
    }
  }
  
  componentDidMount() {
    // axios.get('')
        //  .then((respond) => this.setState({ points: respond.data }))
  }
  
  render() {
    return (
      <React.Fragment>
        <Mapbox
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }
        }>
          <Layer
            type="symbol"
            id="marker"
            layout={{ "icon-image": "marker-15" }}>
            { this.props.points.map((point) => {
              <Feature coordinates={[-0.481747846041145, 51.3233379650232]}/>
            })}
          </Layer>
        </Mapbox>
      </React.Fragment>
    );
  }
}

export default Map;


