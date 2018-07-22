import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

const Modal = (props) => {
  return (
    <div className={style['modal-container']}>
      <div className={style['modal']}>
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
}

export default Modal;