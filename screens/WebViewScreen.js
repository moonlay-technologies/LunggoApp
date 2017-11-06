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

  render() {
    return (
      <WebView
        source={{
          uri: 'http://www.qa.travorama.com/id/Payment/Payment?rsvNo=16541079&regId=21001406722946777171319638716',
          headers: {
            "X-Client-ID": "V1ZoQ2RXTjZiM2xNYWtGMVRVUnZlVTVFUm14T1JFVTBXbGRWZVU5RWJHcE9WRUY2VGpKYWFsbDZVVFZhYlVVeVQxUk5NVmxxVlhwUFYwcHNXVzFWZUZwcVozbz0=",
            "X-Client-Secret": "V1RKSk1sa3lUWGxOUkdOM1dYcEdhMDB5VW1wT2VrMDFUWHBPYTA5RVNUVlBWRmsxVGtkYWEwMVViRzFhYlVsNVdWUkNhZz09",
          },
        }}
        startInLoadingState={true}
        onMessage={ event => {
          console.log('get data from WebView')
          console.log(event.nativeEvent.data)
          //// please make sure that typeof data === 'string'
          if(event.nativeEvent.data == 'ExploreScreen')
            this.props.navigation.goBack('id-1509940013147-2');
            //// go back to ExploreScreen
        }}
      />
    );
  }
}