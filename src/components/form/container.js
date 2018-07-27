import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setDestination, setDeparture } from '../../actions/geo-actions';
import { toggleModal } from '../../actions/ui-actions';
import Form from './index';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      departureLatlng: {},
      destinationLatlng: {}
    }
  }

  static propTypes = {
    setDestination: PropTypes.func,
    setDeparture: PropTypes.func,
    toggleModal: PropTypes.func
  }

  setDepartureState = latLng => {
    this.setState({ departureLatlng: latLng });
  }

  closeModal = () => {
    this.props.setDeparture(this.state.departureLatlng);
    this.props.toggleModal(false);
  }

  render() {
    return (
      <Form
        setDestination={this.props.setDestination}
        setDeparture={this.setDepartureState}
        toggleModal={this.closeModal}
      />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDestination: (latLng) => dispatch(setDestination(latLng)),
    setDeparture: (latLng) => dispatch(setDeparture(latLng)),
    toggleModal: (opened) => dispatch(toggleModal(opened)),
  }
}

export default connect(() => {return {}}, mapDispatchToProps)(FormContainer);