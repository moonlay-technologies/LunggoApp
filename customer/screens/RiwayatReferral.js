'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import { LinearGradient } from 'expo';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';

export default class LoginScreen extends Component<{}> {
  render() {
    return (
      <ScrollView style={{flex:1, backgroundColor:'#fff', height:'100%'}}>
        <View style={styles.containerRiwayat}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={styles.h1}>Ali Zainal</Text>
            <Text style={styles.h2}>Sudah Bergabung</Text>
          </View>
          <Text style={styles.activityDesc}>Immediately regret falling into bathtub kitten is playing with dead mouse i like</Text>
        </View>
        <View style={styles.containerRiwayat}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={styles.h1}>Ali Zainal</Text>
            <Text style={styles.h2}>Sudah Bergabung</Text>
          </View>
          <Text style={styles.activityDesc}>Immediately regret falling into bathtub kitten is playing with dead mouse i like</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1,
    padding:20,
  },
  h1:{
    fontFamily: 'Hind',
    fontSize: 20,
    color: '#454545',
    backgroundColor:'transparent',
    ...Platform.select({
      ios: {
        lineHeight: 19,
        paddingTop:15 ,
        marginBottom: -10,
      },
      android: {
        lineHeight: 30,
        marginBottom:5,
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  h2:{
    fontSize: 14,
    fontWeight:'bold',
    color: '#454545',
    backgroundColor:'transparent',
  },
  containerRiwayat:{
    padding:15,
    borderBottomWidth:1,
    borderBottomColor:'#d7d7d7',
  },
  activityDesc: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind-Light',
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 9,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
});
