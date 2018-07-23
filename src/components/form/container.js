import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDestination, setDeparture } from '../../actions/geo-actions';
import { toggleModal } from '../../actions/ui-actions';
import Form from './index';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    setDestination: PropTypes.func,
    setDeparture: PropTypes.func,
    toggleModal: PropTypes.func
  }

  render() {
    return (
      <Form
        setDestination={this.props.setDestination}
        setDeparture={this.props.setDeparture}
        toggleModal={this.props.toggleModal}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDestination: (latLng) => dispatch(setDestination(latLng)),
    setDeparture: (latLng) => dispatch(setDeparture(latLng)),
    toggleModal: (opened) => dispatch(toggleModal(opened))
  }
}

export default connect(() => { return {} }, mapDispatchToProps)(FormContainer);