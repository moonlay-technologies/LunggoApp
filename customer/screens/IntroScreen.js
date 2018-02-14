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
import globalStyles from '../../commons/globalStyles';
import Colors from '../../constants/Colors';

export default class IntroScreen extends Component {

  constructor() {
    super();
    this.state = { leftSkip: true, dot: this.Dot, activeDot: this.ActiveDot };
  }

  static navigationOptions = {
    header: null
  };

  ActiveDot =
    <View style={{
      backgroundColor: '#01aebc',
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    }} />
  Dot =
    <View style={{
      backgroundColor: 'rgba(0,0,0,.2)',
      width: 6,
      height: 6,
      borderRadius: 3,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    }} />

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.leftSkip && (
          <TouchableOpacity style={styles.containerNav1} onPress={() => this.props.navigation.replace('MainTabNavigator')}>
            <Text style={{ color: '#01aebc', fontFamily: 'Hind' }}>Lewati</Text>
          </TouchableOpacity>
        )}
        <Swiper
          style={styles.wrapper}
          activeDot={this.state.activeDot}
          dot={this.state.dot}
          showsButtons={false}
          loop={false}
          onIndexChanged={
            index => index == 3 ?
              this.setState({ leftSkip: false, dot: <View />, activeDot: <View /> }) :
              this.setState({ leftSkip: true, dot: this.Dot, activeDot: this.ActiveDot })}
        >
          <Image style={styles.slides} source={require('../../assets/images/welcome1.jpg')} />
          <Image style={styles.slides} source={require('../../assets/images/welcome2.jpg')} />
          <Image style={styles.slides} source={require('../../assets/images/welcome3.jpg')} />
          <BeforeLoginScreen {...this.props} />
        </Swiper>
      </View >
    );
  }
}


class BeforeLoginScreen extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    let { navigate, replace } = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{ marginVertical: 20, }}>
          <Text style={globalStyles.openingText}>
            Mulai liburanmu sekarang
          </Text>
        </View>

        <Button
          containerStyle={{ marginTop: 30, height: 45, paddingTop: 9, overflow: 'hidden', borderRadius: 25, backgroundColor: '#fff', }}
          style={{ fontSize: 20, color: '#01d4cb', fontFamily: 'Hind-Bold', }}
          onPress={() => navigate('Registration')}
        >
          Daftar
        </Button>
        <TouchableOpacity style={{ marginTop: 24, alignItems: 'center' }}
          onPress={() => navigate('LoginScreen')}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Hind-SemiBold' }}>
            Sudah punya akun? Tap Disini
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ position: 'absolute', bottom: 20, alignItems: 'center', width: '111%', }}
          onPress={() => replace('MainTabNavigator', { loggedIn: false })}
        >
          <Text style={{ fontSize: 14, color: '#fff', fontFamily: 'Hind' }}>
            Lewati
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slides: {
    flex: 1,
    width: '100%'
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#9DD6EB',
  },
  containerNav1: {
    zIndex: 200,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 20,
    ...Platform.select({
      ios: {
        bottom: 15,
        left: 20,
      },
      android: {
        bottom: 20,
      },
    }),
  },
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 60,
    backgroundColor: '#23d3c3',
  },
});
