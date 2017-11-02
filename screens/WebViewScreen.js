'use strict';

import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebViewScreen extends Component {
  
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      height: 42,
      top: 0,
      left: 0,
      right: 0,
      shadowColor: 'transparent',
      shadowOpacity: 0,
      borderColor: 'transparent',
      // elevation: -1
      borderBottomWidth: 0
      // borderBottomWidth: 'transparent'
    },
  }

  render() {
    return (
      <WebView
        // source={{uri: 'http://www.facebook.com'}}
        source={{uri: 'http://www.qa.travorama.com/id/Payment/Payment?rsvNo=16541079&regId=21001406722946777171319638716'}}
        // style={{marginTop: 20}}
      />
    );
  }
}