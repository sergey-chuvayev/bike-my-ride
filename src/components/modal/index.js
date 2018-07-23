import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './style.scss';

const Modal = (props) => {
  return (
    <div className={classnames(style['modal-container'], { [style['is-hidden']]: !props.modalOpened })}>
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