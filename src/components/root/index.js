import React from 'react';
import style from './style.scss';
import MapContainer from '../map/container';
import Modal from '../modal';
import FormContainer from '../form/container';

const Root = () => {
  return (
    <React.Fragment>
      <Modal>
        <FormContainer />
      </Modal>
      <div className={style['root-container']}>
        <MapContainer />
      </div>
    </React.Fragment>
  );
}

export default Root;