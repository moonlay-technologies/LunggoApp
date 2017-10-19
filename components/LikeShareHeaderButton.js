'use strict';

import React, { Component } from 'react';
import {
  StyleSheet, View, TouchableOpacity,
} from 'react-native';

export default class LikeShareHeaderButton extends Component {
  // goToNotification = () => {
  //   this.props.navigate('Notification');
  // };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Icon name="md-search" style={styles.Icon}/>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.notificationWrapper}
          onPress={() => this.props.navigate('Notification')}>
          {/*onPress={() => this.props.navigate('Notification')}>*/}
          <Icon name="md-notifications" style={styles.Icon}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
thumb: {
});