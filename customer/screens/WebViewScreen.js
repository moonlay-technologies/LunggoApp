'use strict';

import React, { Component } from 'react';
import { WebView, TouchableOpacity } from 'react-native';
import {SHA1} from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
import {clientId, clientSecret} from '../../constants/env';
import { NavigationActions } from 'react-navigation';
import { DOMAIN } from '../../constants/env';
import { Icon } from 'react-native-elements';

export default class WebViewScreen extends Component {
  
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //   };
  // }

  static navigationOptions = ({navigation}) => ({
	title: 'Pembayaran',
	headerLeft: 
		<TouchableOpacity  style={{paddingLeft:10}}
			onPress={() => navigation.dispatch(NavigationActions.reset(
			{
			  index: 0,
			  actions: [NavigationActions.navigate({ routeName: 'MainTabNavigator'})]
			}))}>
			<Icon name='close' type='evilicons' size={20}/>
		</TouchableOpacity>,
    headerStyle: {
      // backgroundColor: 'transparent',
      // position: 'absolute',
      // zIndex: 100,
      // height: 42,
      // top: 0,
      // left: 0,
      // right: 0,
      // shadowColor: 'transparent',
      // shadowOpacity: 0,
      // borderColor: 'transparent',
      // // elevation: -1
      // borderBottomWidth: 0
      // // borderBottomWidth: 'transparent'
    },
  })

  _onMessage = event => {
    if(event.nativeEvent.data == 'ExploreScreen') {
      return this.props.navigation.dispatch(NavigationActions.reset(
        {
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'MainTabNavigator'})]
        }
      ));
    }
  }

  render() {
    let {rsvNo, cartId} = this.props.navigation.state.params;
    return (
      <WebView
        startInLoadingState={true}
        source={{
          uri: DOMAIN + '/id/Payment/Payment?cartId=' + cartId,
          // uri: DOMAIN + '/id/payment/cartcheckout',
               // '/id/payment/payment?rsvno=' + rsvNo +
               // '&regid=' + encodeURIComponent(Base64.stringify( SHA1(rsvNo) )),
          headers: {
            "X-Client-ID": clientId,
            "X-Client-Secret": clientSecret
          }
        }}
        onMessage={this._onMessage}
      />
    );
  }
}
