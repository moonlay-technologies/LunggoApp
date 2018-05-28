'use strict';

import React from 'react';
import ModalPlugin from 'react-native-modal';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default class Modal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isVisible: props.isVisible || false,
    }
  }

  componentWillReceiveProps({ isVisible, tapX, tapY }) {
    if (isVisible != undefined)
      this.setState({ isVisible });

    let location = {}
    if (tapX != undefined && tapY != undefined) {
      if (tapX > (width / 2))
        location.right = width - tapX;
      else
        location.left = tapX;

      if (tapY > (height / 2))
        location.bottom = height - tapY;
      else
        location.top = tapY;

      this.setState({ position: 'absolute', location });
    } else {
      this.setState({ position: 'relative', location });
    }
  }

  setVisibility = vis => this.setState({ isVisible: vis });
  closeModal = () => this.setVisibility(false);
  openModal = () => this.setVisibility(true);
  toggleVisibility = () => this.setVisibility(!this.state.isVisible);

  render() {
    let { props } = this;
    return (
      <ModalPlugin
        style={[props.style, this.state.location, { position: this.state.position }]}
        animationIn={props.animationIn}
        animationOut={props.animationOut}
        backdropOpacity={props.backdropOpacity}
        isVisible={this.state.isVisible}
        onBackdropPress={props.onBackdropPress || this.closeModal}
        onBackButtonPress={props.onBackButtonPress || this.closeModal}
      >
        {this.props.children}
      </ModalPlugin>
    )
  }
}