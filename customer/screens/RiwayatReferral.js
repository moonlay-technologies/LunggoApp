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
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}}>
            <Text style={styles.h1}>Ali Zainal</Text>
            <Text style={styles.h2}>3/10 Reward</Text>
          </View>
          <View style={{marginVertical:10, flexDirection:'row'}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/check.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah terdaftar di Travorama</Text>
            </View>
          </View>
          <View style={{marginVertical:5, flexDirection:'row', opacity:0.5}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/uncheck.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah melakukan perjalanan 1x</Text>
            </View>
          </View>
          <View style={{marginVertical:10, flexDirection:'row'}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/check.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah terdaftar di Travorama</Text>
            </View>
          </View>
          <View style={{marginVertical:5, flexDirection:'row', opacity:0.5}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/uncheck.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah melakukan perjalanan 1x</Text>
            </View>
          </View>
          <View style={{marginVertical:5, flexDirection:'row', opacity:0.5}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/uncheck.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah melakukan perjalanan 1x</Text>
            </View>
          </View>
          
        </View>
        <View style={styles.containerRiwayat}>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center',}}>
            <Text style={styles.h1}>Indera Aji</Text>
            <Text style={styles.h2}>3/10 Reward</Text>
          </View>
          <View style={{marginVertical:10, flexDirection:'row'}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/check.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah terdaftar di Travorama</Text>
            </View>
          </View>
          <View style={{marginVertical:5, flexDirection:'row',}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/check.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah melakukan perjalanan 1x</Text>
            </View>
          </View>
          <View style={{marginVertical:10, flexDirection:'row'}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/check.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah terdaftar di Travorama</Text>
            </View>
          </View>
          <View style={{marginVertical:5, flexDirection:'row'}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/check.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah melakukan perjalanan 1x</Text>
            </View>
          </View>
          <View style={{marginVertical:5, flexDirection:'row', opacity:0.5}}>
            <View style={{flex:0.8}}>
              <Image 
                style={{width:25, height:25}}
                source={require('../../assets/images/uncheck.png')} 
              />
            </View>
            <View style={{flex:7}}>
              <Text style={styles.activityJudulReward}>Get Rp 50.000 Credits</Text>
              <Text style={styles.activityDesc}>Teman kamu sudah melakukan perjalanan 1x</Text>
            </View>
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
  h1:{
    fontFamily: 'Hind-SemiBold',
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
    fontSize: 13,
    color: '#454545',
    backgroundColor:'transparent',
  },
  containerRiwayat:{
    padding:15,
    borderBottomWidth:1,
    borderBottomColor:'#d7d7d7',
  },
  activityJudulReward: {
    fontSize: 14,
    color: '#454545',
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
