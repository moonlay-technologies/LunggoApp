'use strict';

import React from 'react';
import Colors from '../../../constants/Colors';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';
import Button from 'react-native-button';
import globalStyles from '../../../commons/globalStyles';
import { Icon } from 'react-native-elements';
import { LinearGradient } from 'expo';

export default class BeforeLoginScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  render() {
    let { navigate, goBack, replace } = this.props.navigation;
    return (
      <ImageBackground style={styles.bgImg} source={require('../../../assets/images/bglogin2.jpg')}>

        {!!this.props.onIntro || (
          <TouchableOpacity style={{ alignItems: 'flex-start', marginTop: 20, marginHorizontal: 20 }}
            onPress={() => goBack()}>
            <Icon name='close' type='evilicons' size={24} color='#ffffff' />
          </TouchableOpacity>
        )}

        {!!this.props.onIntro && (
          <TouchableOpacity style={{ alignItems: 'flex-end', marginTop: 20, marginHorizontal: 20 }}
            onPress={() => replace('Main')}>
            <Text style={{ color: '#ffffff', fontFamily: 'Hind' }}>Lewati</Text>
          </TouchableOpacity>
        )}

        <View style={{ alignItems: 'center' }}>
          <Image style={{ width: 280, height: 280, marginTop: 80, }} source={require('../../../assets/images/logotext-no-bg.png')} />
        </View>
        <View style={{ position: 'absolute', bottom: 40, alignItems: 'center', width: '100%' }}>

          <TouchableOpacity
            onPress={() => navigate('Registration', { thruBeforeLogin: true, resetAfter: this.props.resetAfter })}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '90%' }}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={['#00d3c5', '#35eac6', '#6affc6']}
              start={[0, 0]}
              end={[1, 0]}
              style={{ marginTop: 30, height: 45, paddingTop: 11, alignItems: 'center', borderRadius: 25, width: '100%' }}>
              <Text style={{
                backgroundColor: 'transparent',
                fontSize: 18, color: '#ffffff',
                fontFamily: 'HindSemiBold',
              }}>
                Daftar
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 30, alignItems: 'center' }}
            onPress={() => navigate('LoginScreen', { thruBeforeLogin: true, resetAfter: this.props.resetAfter })}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 16, color: '#fff', fontFamily: 'Hind', backgroundColor: 'transparent' }}>
              Sudah punya akun? Tap di sini
            </Text>
          </TouchableOpacity>


        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 60,
    backgroundColor: '#23d3c3',
  },
  bgImg: {
    // resizeMode:'cover', 
    flex: 1,
    width: null,
    height: null,
  },
});
