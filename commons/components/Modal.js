'use strict';

import React from 'react';
import ModalPlugin from 'react-native-modal';

export default class Modal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isVisible: props.isVisible || false,
    }
  }

  componentWillReceiveProps({ isVisible }) {
    this.setState({ isVisible });
  }

  _setModalVisible = vis => this.setState({ isVisible: vis })
  _closeModal = () => this._setModalVisible(false)
  // _openModal = () => this._setModalVisible(true)

  render() {
    return (
      <ModalPlugin
        isVisible={this.state.isVisible}
        onBackdropPress={this._closeModal}
        onBackButtonPress={this._closeModal}
      >
        {this.props.children}
      </ModalPlugin>
    )
  }
}