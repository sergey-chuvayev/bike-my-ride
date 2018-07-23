import React from 'react';
import { connect } from 'react-redux';
import Modal from './index';

class ModalContainer extends React.Component {
    render() {
        return <Modal
                children={this.props.children}
                modalOpened={this.props.modalOpened} />
    }
}

const mapStateToProps = (state) => {
    return {
        modalOpened: state.ui.modalOpened
    }
}

export default connect(mapStateToProps)(ModalContainer);