import React from 'react';
import { connect } from 'react-redux';
import { setDestination } from '../../actions/geo-actions';
import Form from './index';

class FormContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Form setDestination={this.props.setDestination} />
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setDestination: (latLng) => dispatch(setDestination(latLng))
  }
}

export default connect(() => {}, mapDispatchToProps)(FormContainer);