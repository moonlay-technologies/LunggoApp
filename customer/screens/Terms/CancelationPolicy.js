'use strict';

import React, { Component } from 'react';
import { WebView, TouchableOpacity } from 'react-native';
import { clientId, clientSecret } from '../../../constants/env';
import { NavigationActions } from 'react-navigation';
import { DOMAIN } from '../../../constants/env';
import { Icon } from 'react-native-elements';

export default class CancelationPolicy extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Ketentuan Pembatalan',
  })

  render() {
    let text = 'Ingin mengubah detail aktivitas kamu';
    return (
      <WebView
        startInLoadingState={true}
        source={{
          uri: DOMAIN + '/id/terms/cancelationpolicy',
          // uri: DOMAIN + '/id/payment/cartcheckout',
          // '/id/payment/payment?rsvno=' + rsvNo +
          // '&regid=' + encodeURIComponent(Base64.stringify( SHA1(rsvNo) )),
          headers: {
            "X-Client-ID": clientId,
            "X-Client-Secret": clientSecret
          }
        }}
      />
    );
  }
}
