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

        <View style={styles.containerCredits}>
          <View style={{flexDirection:'row'}}>
            <Text style={styles.h2}>Kredit kamu:</Text>
            <View style={{marginLeft:5}}>
              <Text style={styles.h2Credit}>Rp 100.000</Text>
            </View>
          </View>
          <View>
            <Text style={styles.h2}>Lihat Referreal</Text>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{alignItems:'center'}}>
            <Image 
              style={{ width: 220, height: 220, resizeMode: 'contain' }}
              source={require('../../assets/images/referral.png')} 
            />
          </View>
          <View style={{alignItems:'center', marginTop:10}}>
            <Text style={styles.h1}>Undang Teman Kamu</Text>
            <Text style={styles.activityDesc}>Immediately regret falling into bathtub kitten is playing with dead mouse i like</Text>

            <View style={styles.containerKode}>
              <Text style={styles.kodeReferral}>Ali230891</Text>
              <Text style={styles.btnSalin}>Salin</Text>
            </View>

            <TouchableOpacity
              onPress={this._onLoginPressed}
              style={{alignItems: 'center', width:'100%', marginTop:10}}
              activeOpacity={0.6}
              styleDisabled={{ opacity: .8 }}
            >
              <LinearGradient 
                colors={['#00d3c5', '#35eac6']}
                start={[0, 0]}
                end={[1, 0]}
                style={{ height: 45, paddingTop: 11, alignItems: 'center', borderRadius: 3, width: '100%',  }}>
                <Text style={{
                  backgroundColor: 'transparent',
                  fontSize: 18, color: '#ffffff',
                  fontFamily: 'Hind-SemiBold',
                }}>
                  Share
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

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
  containerCredits:{
    backgroundColor:'#f57b76',
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  h1:{
    fontFamily: 'Hind-SemiBold',
    fontSize: 22,
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
  h2: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Hind-SemiBold',
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
  h2Credit: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Hind-Bold',
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
  activityDesc: {
    fontSize: 15.5,
    color: '#454545',
    fontFamily: 'Hind-Light',
    textAlign:'center',
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
  kodeReferral: {
    fontSize: 16,
    color: '#000',
    textAlign:'center',
    fontWeight:'bold'
  },
  btnSalin: {
    fontSize: 16,
    color: '#009389',
    textAlign:'center',
    fontWeight:'bold'
  },
  containerKode: {
    borderColor:'#dcdcdc',
    borderWidth:2,
    paddingHorizontal:15,
    paddingVertical:15,
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    marginTop:25,
  },
});
