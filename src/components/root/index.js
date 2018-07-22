import React from 'react';
import style from './style.scss';

import MapContainer from '../map/container';

class Root extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      init: '11'
    }
  }

  render() {
    return (
      <React.Fragment>
        
        <div className={style['root-container']}>
          <MapContainer />
        </div>
      </React.Fragment>
    );
  }
}

export default Root;