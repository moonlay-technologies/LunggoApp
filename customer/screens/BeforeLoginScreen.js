'use strict';

import React, { Component } from 'react';
import Colors from '../../constants/Colors';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Button from 'react-native-button';
import globalStyles from '../../commons/globalStyles';

export default class BeforeLoginScreen extends Component {

  static navigationOptions = {
    header: null
  };

  render() {
    let {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={{marginVertical:20,}}>
          <Text style={globalStyles.openingText}>
            Mulai liburanmu sekarang
          </Text>
        </View>

        <Button
          containerStyle={{marginTop:30, height:45, paddingTop:9,overflow:'hidden', borderRadius:25, backgroundColor: '#fff',}}
          style={{fontSize: 20, color: '#01d4cb', fontFamily: 'Hind-Bold',}}
          onPress={() => navigate('Registration')}
        >
          Daftar
        </Button>
        <TouchableOpacity style={{marginTop:24, alignItems:'center'}}
          onPress={() => navigate('LoginScreen')}
          activeOpacity={0.7}
        >
          <Text style={{fontSize:16, color:'#fff', fontFamily: 'Hind-SemiBold'}}>
            Sudah punya akun? Tap Disini
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{position:'absolute', bottom:20, alignItems:'center', width:'111%',}}
          onPress={() => navigate('MainTabNavigator')}
        >
          <Text style={{fontSize:14, color:'#fff', fontFamily: 'Hind'}}>
            Lewati
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    paddingTop:60,
    backgroundColor:'#23d3c3',
  },
});
