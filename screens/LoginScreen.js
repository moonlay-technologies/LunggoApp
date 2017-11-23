'use strict';

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,
  TextInput, Button, KeyboardAvoidingView, } from 'react-native';
import { fetchTravoramaLoginApi } from '../components/Common';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    header: null,
  }

  _login = () => {
    this.setState({isLoading:true})
    // //// validation
    //TODO

    //// if validation passed, POST to API
    fetchTravoramaLoginApi(this.state.userName, this.state.password)
    .then(response => {
      this.setState({isLoading:false});
      if (response.status == 200)
        this.props.navigation.navigate('MainTabNavigator');
      else console.log(response);
    }).catch(error => {
      this.setState({isLoading:false});
      console.log("Login error!!");
      console.log(error);
    })
  }
  
  render() {
    let {isLoading, userName, password} = this.state;
    return (
      <Image blurRadius={10} style={styles.bgimage}
        source={require('../assets/images/bg.jpg')}
      >
        <KeyboardAvoidingView behavior="position">
        <Image
          style={styles.logo}
          source={require('../assets/images/logo.png')}
        />
        <Text style={styles.normaltext}>
          login or sign up with:
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder='Email atau No. Handphone'
          underlineColorAndroid='transparent'
          autoCapitalize={'none'}
          onChangeText={ userName => this.setState({userName}) }
        />
        <TextInput
          style={styles.searchInput}
          placeholder='Password min 6 digit huruf/angka'
          underlineColorAndroid='transparent'
          secureTextEntry={true}
          autoCapitalize={'none'}
          onChangeText={ password => this.setState({password}) }
        />
        
        <Text style={styles.loginemail}>
          or login or sign up via email
        </Text>
        <Button
          containerStyle={{padding:10, height:45, width:200, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          title="Login"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={this._login}
          disabled={isLoading || !userName || !password}
        />
        <View style={{marginBottom:5}}/>
        <Button
          containerStyle={{padding:10, height:45, width:200, overflow:'hidden', borderRadius:4, backgroundColor: 'white'}}
          title="Register"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          onPress={() => this.props.navigation.navigate('Registration')}
        />
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
