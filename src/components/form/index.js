import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import LocationAutocomplete from '../location-autocomplete';

const Form = ({ setDeparture, setDestination, toggleModal }) => {  
  return (
    <div className={style['form-container']}>
      <div>
        <h1>Where are you now?</h1>
        <LocationAutocomplete setLatlng={setDeparture} />
      </div>

      <div style={{ marginTop: '40px' }}>
        <h1>Where to go?</h1>
        <LocationAutocomplete setLatlng={setDestination} />
      </div>

      <div style={{ marginTop: '40px' }}>
        <button onClick={() => toggleModal(false)}>Bike my ride</button>
      </div>
    </div>
  );
}

Form.propTypes = {
  setDestination: PropTypes.func,
  setDeparture: PropTypes.func,
  toggleModal: PropTypes.func,
}

export default Form;