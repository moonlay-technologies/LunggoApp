'use strict';

import React, { Component } from 'react';
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
  AppRegistry,
} from 'react-native';

export default class LoginScreen extends Component<{}> {
  constructor(props, context) {
    super(props, context);
  }
  _handlePress() {
    console.log('Pressed!');
  }
  render() {
    return (
      <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor:'#ffffff'}}>
        <Button
        style={{fontSize: 20, color: 'green'}}
        styleDisabled={{color: 'red'}}
        onPress={() => this._handlePress()}>
        Press Me!
      </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
  },
  containersimiliaractivity: {
    overflow:'hidden',
    marginRight:10,
    width:150,
    // flex:1,
  },
  thumbimgreview: {
    width:60,
    height:50,
    marginRight:5,
    marginTop:10,
  },
  hyperlink: {
    fontSize:11,
    marginTop:8,
    color:'#437ef7',
    textDecorationLine: 'underline'
  },
  isireview: {
    fontSize:11,
    marginTop:10,
  },
  thumbprofile: {
    height: 30,
    width:30,
    borderRadius: 15,
    marginRight: 10,
  },
  ul: {
    flex: 1, 
    flexDirection: 'row',
    marginLeft: 10,
  },
  li: {
    fontSize:11,
    marginRight:8
  },
  icon: {
    width:15,
    height:15,
    marginRight:5,
  },
  containerdescriptionActivity: {
    marginBottom: 18,
  },
  titledescriptionActivity: {
    fontWeight: 'bold',
    fontSize:16,
    marginBottom: 7,
  },
  descriptionActivity: {
    fontSize:11,
    lineHeight: 15,
  },
  lidescriptionActivity: {
    fontSize:11,
    marginBottom: 2,
    lineHeight: 15,
  },
  border: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 15,
    marginBottom: 15,
  },
  titleActivity: {
    fontWeight: 'bold',
    fontSize:20,
    marginBottom: 7,
  },
  locationActivity: {
    fontSize:12,
    marginBottom: 5,
  },
  timeActivity: {
    fontSize:12,
    marginBottom: 5,
  },
  detailimg: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
});
