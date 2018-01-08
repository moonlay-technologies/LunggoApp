'use strict';

import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Button from 'react-native-button';
import { Icon } from 'react-native-elements';
import { fetchWishlist, checkUserLoggedIn } from '../../api/Common';
import Modal from 'react-native-modal';

export default class WishButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isModalVisible: false,
      wishlisted: this.props.wishlisted,
    };
  }

  _onPress = async () => {
    let { wishlisted } = this.state;
    this.setState({wishlisted:!wishlisted})

    let isLoggedIn = await checkUserLoggedIn();
    if (!isLoggedIn) {
      return this.setState({isModalVisible:true, wishlisted});
    } else fetchWishlist(this.props.id, wishlisted);
  };

  _goToLoginScreen = () => {
    this.setState({isModalVisible: false});
    console.log(this.props)
    this.props.navigation.navigate('LoginScreen', {back: true} );
  }

  render() {
  	return (
      <View>
        <TouchableOpacity onPress={this._onPress}
        style={{flex:1, alignItems:'flex-end',}} >
          <Icon type='materialicons' size={this.props.big? 30 : 24}
            name={this.state.wishlisted? 'favorite' : 'favorite-border'}
            color={this.state.wishlisted? 'red' : '#cdcdcd'}
          />
        </TouchableOpacity>

        <Modal
          style={{}}
          // isVisible={true}
          isVisible={this.state.isModalVisible}
        >
          <Text style={{color:'white'}}>
            Login Here
          </Text>
          <View style={{flexDirection:'row'}}>
            <Button onPress={this._goToLoginScreen}>
              OK
            </Button>
          </View>
        </Modal>
      </View>
    );
  }
}