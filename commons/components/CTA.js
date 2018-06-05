'use strict';

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform, View } from 'react-native';
import { LinearGradient } from 'expo';
import Colors from '../../constants/Colors';
import Button from 'react-native-button';

export default class CTA extends React.Component {
  render() {
    let typeStyle =
      this.props.typeButton == 'ctaSecondary' ? styles.ctaSecondary :
        this.props.typeButton == 'ctaPrimary' ? styles.ctaPrimary :
          null;
    return (
      <Button
        containerStyle={typeStyle}
        style={styles.ctaTextPrimary}
        onPress={this.props.onPress}
        disabled={this.props.disabled}
        styleDisabled={{ color: '#aaa' }}
      >
        {this.props.label}
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  ctaPrimary: {
    backgroundColor: Colors.primary,
    height: 45,
    borderRadius: 5,
  },
  ctaSecondary: {
    backgroundColor: Colors.secondary,
    height: 45,
    borderRadius: 5,
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#000',
    //     shadowOffset: {
    //       width: 0,
    //       height: 2
    //     },
    //     shadowRadius: 2,
    //     shadowOpacity: 0.2
    //   },
    //   android: {
    //   },
    // }),
  },
  ctaTextPrimary: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Hind-SemiBold',
    marginTop: 12,
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 12,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),
      },
    }),  
  },
})