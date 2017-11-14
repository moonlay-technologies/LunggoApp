'use strict';

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

export default class LoginScreen extends Component<{}> {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = {
    header: null,
  }

  _handlePress = () => {
    this.props.navigation.navigate('MainTabNavigator')
  }
  render() {
    return (
      <Image blurRadius={6} style={styles.bgimage}
        source={require('../assets/images/bg.jpg')}
      >
        <KeyboardAvoidingView behavior="position">
      {/*<ScrollView style={styles.container}>*/}
        <View style={{alignItems:'center',}}>
          <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
        </View>

        <TextInput style={styles.searchInput} placeholder='Email / Phone Number' underlineColorAndroid='transparent' placeholderTextColor="white" />
        <TextInput style={styles.searchInput} placeholder='Password' underlineColorAndroid='transparent' placeholderTextColor="white" />
        
        <View style={{marginTop:30}}>
          <Button
            containerStyle={{padding:10, height:45, width:200, overflow:'hidden', borderRadius:4,}}
            title="Login"
            accessibilityLabel="Learn more about this purple button"
            onPress={this._handlePress}
          />
        </View>
        <View style={{marginTop:15}}>
          <Button
            containerStyle={{padding:10, height:45, width:200, overflow:'hidden', borderRadius:4,}}
            title="Login with Facebook"
            accessibilityLabel="Learn more about this purple button"
            onPress={this._handlePress}
          />
        </View>
        <View style={{marginTop: 20, alignItems:'center'}}>
          <Text style={styles.loginemail}>
            Forgot Password or Signup
          </Text>
        </View>
      {/*</ScrollView>*/}
        </KeyboardAvoidingView>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  // },
  normaltext: {
    backgroundColor: 'transparent',
    color: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginemail: {
    backgroundColor: 'transparent',
    color: '#ffffff',
  },
  description: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 30,
    padding: 40,
    color: '#ffffff'
  },
  bgimage: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingTop:100,
    paddingLeft:40,
    paddingRight:40,
  },
  logo: {
    marginBottom: 40,
  },
  searchInput: {
    height: 40,
    //width: 250,
    alignSelf: 'stretch',
    padding: 5,
    marginHorizontal: 0,
    marginTop:20,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
    color: '#ffffff',
    backgroundColor: 'transparent',

  },
});
