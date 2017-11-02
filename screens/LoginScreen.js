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
      <Image blurRadius={10} style={styles.bgimage}
        source={require('../assets/images/bg.jpg')}
      >
        <KeyboardAvoidingView behavior="position">
      {/*<ScrollView style={styles.container}>*/}
        <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
        <Text style={styles.normaltext}>
          login or sign up with:
        </Text>

        <TextInput style={styles.searchInput} placeholder='Email'/>
        <TextInput style={styles.searchInput} placeholder='Password'/>
        
        <Text style={styles.loginemail}>
          or login or sign up via email
        </Text>
        <Button
          containerStyle={{padding:10, height:45, width:200, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={this._handlePress}
        />
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
  bgimage: {
    backgroundColor: '#ccc',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingTop:150,
    alignItems: 'center',
  },
  logo: {
    marginBottom: 40,
  },
  searchInput: {
    height: 40,
    // width: 300,
    alignSelf: 'stretch',
    padding: 5,
    marginHorizontal: 0,
    marginTop:10,
    fontSize: 14,
    borderWidth: 3,
    borderColor: '#48BBEC',
    borderRadius: 3,
    color: '#48BBEC',
    backgroundColor: '#ffffff',
  },
});
