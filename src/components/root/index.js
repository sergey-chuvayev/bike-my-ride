import React from 'react';
import style from './style.scss';
import MapContainer from '../map/container';
import Modal from '../modal';
import Form from '../form';

const Root = () => {
  return (
    <React.Fragment>
      <Modal>
        <Form />
      </Modal>
      <div className={style['root-container']}>
        <MapContainer />
      </div>
    </React.Fragment>
  );
}

export default Root;