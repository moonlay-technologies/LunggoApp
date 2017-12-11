'use strict';

import React, { Component } from 'react';
import { WebView } from 'react-native';

export default class WebViewScreen extends Component {
  
  static navigationOptions = {
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
  }

  _onMessage = event => {
    if(event.nativeEvent.data == 'ExploreScreen') {
      this.props.navigation.goBack('SearchResults');
    }
  }

  render() {
    return (
      <WebView
        source={{
          uri: 'http://www.qa.travorama.com/id/Payment/Thankyou?rsvNo=16541081&regId=489730162140681929135436187',
          headers: {
            "X-Client-ID": "V1ZoQ2RXTjZiM2xNYWtGMVRVUnZlVTVFUm14T1JFVTBXbGRWZVU5RWJHcE9WRUY2VGpKYWFsbDZVVFZhYlVVeVQxUk5NVmxxVlhwUFYwcHNXVzFWZUZwcVozbz0=",
            "X-Client-Secret": "V1RKSk1sa3lUWGxOUkdOM1dYcEdhMDB5VW1wT2VrMDFUWHBPYTA5RVNUVlBWRmsxVGtkYWEwMVViRzFhYlVsNVdWUkNhZz09",
          },
        }}
        startInLoadingState={true}
        onMessage={this._onMessage}
      />
    );
  }
}