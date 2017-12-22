'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Swiper from 'react-native-swiper';

export default class LoginScreen extends Component<{}> {
  
  static navigationOptions = {
    header: null
  };

  render() {

    var activeDot = 
      <View style={{
        backgroundColor:'#01aebc',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }} />
      var Dot = 
      <View style={{
        backgroundColor:'rgba(0,0,0,.2)',
        width: 6,
        height: 6,
        borderRadius: 3,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3,
      }} />

    return (
      <View style={{flex:1}}>
        <TouchableOpacity style={styles.containerNav1} onPress={() => this.props.navigation.navigate('MainTabNavigator')}>
          <Text style={{color:'#01aebc', fontFamily:'Hind-Bold'}}>SKIP</Text>
        </TouchableOpacity>
        <Swiper 
          style={styles.wrapper} 
          activeDot={activeDot}
          dot={Dot}
          showsButtons={false}
          loop={false}
        >
          <Image style={styles.slides} source={require('../../assets/images/welcome1.jpg')}>
            {/*<Text style={styles.text}>Hello Swiper</Text>*/}
          </Image>
          <Image style={styles.slides} source={require('../../assets/images/welcome2.jpg')}>
            {/*<Text style={styles.text}>Hello Swiper</Text>*/}
            <View style={styles.containerNav1}>
            </View>
          </Image>
          <Image style={styles.slides} source={require('../../assets/images/welcome3.jpg')}>
            {/*<Text style={styles.text}>Hello Swiper</Text>*/}
            <View style={styles.containerNav1}>
            </View>
          </Image>
          
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slides: {
    flex:1,
    width:'100%'
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#9DD6EB',
  },
  containerNav1: {
    zIndex:200,
    backgroundColor:'transparent',
    position:'absolute', 
    left:20, 
    ...Platform.select({
      ios: {
        bottom:15, 
        left:20,
      },
      android: {
        bottom:20, 
      },
    }),
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
