'use strict';

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { fetchWishlist } from '../../api/Common';

export default class WishButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      wishlisted: this.props.wishlisted,
    };
  }

  _onPress = () => {
    let { wishlisted } = this.state;
    this.setState({wishlisted:!wishlisted})
    fetchWishlist(this.props.id, wishlisted);
  };

  render() {
  	return (
      <TouchableOpacity onPress={this._onPress}
      style={{flex:1, alignItems:'flex-end',}} >
        <Icon type='materialicons' size={24}
          name={this.state.wishlisted? 'favorite' : 'favorite-border'}
          color={this.state.wishlisted? 'red' : '#cdcdcd'}
        />
      </TouchableOpacity>
    );
  }
}