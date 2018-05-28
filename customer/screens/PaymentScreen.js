'use strict';

import React from 'react';
import { WebView, TouchableOpacity } from 'react-native';
// import {SHA1} from 'crypto-js';
// import Base64 from 'crypto-js/enc-base64';
import { clientId, clientSecret } from '../../constants/env';
import { DOMAIN } from '../../constants/env';
import { Icon } from 'react-native-elements';
import { backToMain } from '../../api/Common';
import { shouldRefreshMyBookingTrxList } from './MyBooking/MyBookingController';
import { backToMyBookings } from './../../api/Common';
import cartCountStore from './Cart/CartCountStorage';

export default class PaymentScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Pembayaran'
    }
  }

  _onMessage = event => {
    if (event.nativeEvent.data == 'ExploreScreen') {
      shouldRefreshMyBookingTrxList();
      return backToMain(this.props.navigation);
    }
    if (event.nativeEvent.data == 'backToMyBookings') {
      shouldRefreshMyBookingTrxList();
      return backToMyBookings(this.props.navigation);
    }
  }

  componentWillUnmount() {
    cartCountStore.setCartCount();
  }

  render() {
    let { rsvNo, cartId } = this.props.navigation.state.params;
    let url = DOMAIN + '/Payment_v2/Payment/Payment?cartId=' + cartId;
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
