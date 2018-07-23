import React from 'react';
import style from './style.scss';
import MapContainer from '../map/container';
import ModalContainer from '../modal/container';
import FormContainer from '../form/container';

const Root = () => {
  return (
    <React.Fragment>
      <ModalContainer>
        <FormContainer />
      </ModalContainer>
      <div className={style['root-container']}>
        <MapContainer />
      </div>
    </React.Fragment>
  );
}

export default Root;