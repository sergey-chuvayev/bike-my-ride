import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDestination, setDeparture } from '../../actions/geo-actions';
import Form from './index';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    setDestination: PropTypes.func,
    setDeparture: PropTypes.func
  }

  render() {
    return (
      <Form
        setDestination={this.props.setDestination}
        setDeparture={this.props.setDeparture}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDestination: (latLng) => dispatch(setDestination(latLng)),
    setDeparture: (latLng) => dispatch(setDeparture(latLng))
  }
}

export default connect(() => { return {} }, mapDispatchToProps)(FormContainer);