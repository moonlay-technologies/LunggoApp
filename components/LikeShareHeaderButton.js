'use strict';

import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class LikeShareHeaderButton extends Component {
  // goToNotification = () => {
  //   this.props.navigate('Notification');
  // };

  render() {
    return (
      <View 
      // style={styles.container}
      style={{flexDirection:'row'}}
      >
        <TouchableOpacity>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
            size={28}
            style={{ marginBottom: -3 }}
            // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          // style={styles.notificationWrapper}
          onPress={() => this.props.navigate('Notification')}
          //onPress={() => this.props.navigate('Notification')}
          >
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
            size={28}
            style={{ marginBottom: -3 }}
            // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
// thumb: {
});