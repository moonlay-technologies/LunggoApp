'use strict';

import React, { Component } from 'react';
import { Icon } from 'react-native-elements'
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import ImageSlider from 'react-native-image-slider';

export default class LoginScreen extends Component<{}> {
  render() {
    return (
      <ImageSlider height={'100%'}
      images={[
        require('../assets/images/welcome1.jpg'),
        require('../assets/images/welcome2.jpg'),
        require('../assets/images/welcome3.jpg')
    ]}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    paddingTop:60,
    backgroundColor: '#fff',
  },
  categoryTitle :{
    fontWeight:'bold',
    fontSize:26,
    color:'#454545'
  },
  mediumText: {
    fontSize:15,
    color:'#454545'
  },
  smallText: {
    fontSize:13,
    color:'#afafaf',
    textAlign:'justify'
  },
  loginemail: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    marginTop: 50,
  },
  description: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 30,
    padding: 40,
    color: '#ffffff'
  },
  searchInput: {
    alignItems:'center',
    textAlign:'center',
    fontWeight:'bold',
    height: 50,
    paddingLeft:0,
    paddingTop:10,
    paddingBottom:10,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor:'#f5f5f5',
  },
});
