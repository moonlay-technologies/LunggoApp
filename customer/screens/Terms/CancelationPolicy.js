'use strict';

import React from 'react';
import { WebView } from 'react-native';
import { clientId, clientSecret } from '../../../constants/env';
import { WEB_DOMAIN } from '../../../constants/env';

export default class CancelationPolicy extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Ketentuan Pembatalan',
  })

  render() {
    let text = 'Ingin mengubah detail aktivitas kamu';
    return (
      <WebView
        startInLoadingState={true}
        source={{
          uri: WEB_DOMAIN + '/id/webview/cancellationpolicy',
          // uri: WEB_DOMAIN + '/id/payment/cartcheckout',
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
