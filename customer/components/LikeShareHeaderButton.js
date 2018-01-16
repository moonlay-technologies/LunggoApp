'use strict';

import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class LikeShareHeaderButton extends Component {

  render() {
    return (
      <View 
      // style={styles.container}
      style={{flexDirection:'row'}}
      >
        <TouchableOpacity>
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-share-outline' : 'md-share'}
            size={28}
            style={{ marginBottom: 0, marginRight:10,color:'white'}}
          />
        </TouchableOpacity>
        <TouchableOpacity 
          // style={styles.notificationWrapper}
          //onPress={() => this.props.navigate('Notification')}
          >
          <Ionicons
            name={Platform.OS === 'ios' ? 'ios-heart-outline' : 'md-heart'}
            size={28}
            style={{ marginBottom: 0,marginRight:15,color:'white'}}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  // thumb: {
  // },
});