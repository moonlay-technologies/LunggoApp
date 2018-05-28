'use strict';

import React from 'react';
import { WebView, TouchableOpacity } from 'react-native';
// import {SHA1} from 'crypto-js';
// import Base64 from 'crypto-js/enc-base64';
import { clientId, clientSecret } from '../../constants/env';
import { DOMAIN } from '../../constants/env';
import { Icon } from 'react-native-elements';
import { backToMain } from '../../api/Common';

export default class HelpScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Bantuan',
    }
  }

  render() {
    let text = 'Butuh bantuan';
    let url = DOMAIN + '/id/webview/redirectcontact?text=' + text;
    console.log(url);
    return (
      <WebView
        startInLoadingState={true}
        source={{
          uri: url,
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
