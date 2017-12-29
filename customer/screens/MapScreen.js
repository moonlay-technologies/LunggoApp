'use strict';

import React from 'react';
import MapView, { Marker } from 'react-native-maps';

export default class MapScreen extends React.Component {

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
  }

  render() {
    return (
      <MapView
        style={{width:"100%", height:"100%"}}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        />
      </MapView>
    );
  }
}
