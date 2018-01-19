'use strict';

import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import Button from 'react-native-button';
import { Icon } from 'react-native-elements';
import { fetchWishlist, checkUserLoggedIn } from '../../api/Common';
import Modal from 'react-native-modal';
import globalStyles from '../../commons/globalStyles';

export default class WishButton extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isModalVisible: false,
      wishlisted: this.props.wishlisted,
    };
  }

  _onPress = async () => {
    //// negate wishlisted state
    let wishlisted = !this.state.wishlisted;
    this.setState({wishlisted})

    let isLoggedIn = await checkUserLoggedIn();
    if (!isLoggedIn) { //// if guest:
      return this.setState({isModalVisible:true, wishlisted:false});
    } else fetchWishlist(this.props.id, wishlisted);
  }

  _goToLoginScreen = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.navigate('LoginScreen', {back: true} );
  }

  _goToRegisterScreen = () => {
    this.setState({isModalVisible: false});
    this.props.navigation.navigate('Registration', {back: true} );
  }

  _setModalVisible = vis => this.setState({isModalVisible: vis});

  render() {
  	return (
      <View>

        <TouchableOpacity onPress={this._onPress}
        style={{flex:1, alignItems:'flex-end', ...this.props.style}} >
          <Icon type='materialicons' size={this.props.big? 30 : 24}
            name={this.state.wishlisted? 'favorite' : 'favorite-border'}
            color={this.state.wishlisted? 'red' : this.props.unwishlistedColor? this.props.unwishlistedColor : '#cdcdcd'}
          />
        </TouchableOpacity>

        <Modal isVisible={this.state.isModalVisible}
          onBackdropPress={() => this._setModalVisible(false)} >
          <View style={{paddingHorizontal:10,paddingVertical:15, backgroundColor:'#fff'}}>
            <Text style={styles.textCart}>
              Please Login or Register first!
            </Text>
            <View style={{marginVertical:10}}>
              <Button 
              containerStyle={globalStyles.ctaButton2}
              style={{fontSize: 14, color: '#fff', fontFamily:'Hind',}}
              onPress={this._goToLoginScreen}>
                Login
              </Button>
            </View>
            <View style={{marginVertical:5}}>
              <Button 
              containerStyle={globalStyles.ctaButton2}
              style={{fontSize: 14, color: '#fff', fontFamily:'Hind',}}
              onPress={this._goToRegisterScreen}>
                Register
              </Button>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textCart: {
    fontFamily: 'Hind-Light', 
    color:'#454545', 
    fontSize:14,
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop:4,
        marginBottom:-5,
        marginTop:8
      },
      android: {
        marginTop:5

      },
    }),
  }
});
