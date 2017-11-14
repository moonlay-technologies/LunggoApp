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
import { fetchTravoramaApi, clientId, clientSecret
} from '../components/Common';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { clientId, clientSecret }
  }

  static navigationOptions = {
    header: null,
  }

  _login = () => {
    // //// validation
    //TODO

    //// if validation passed, POST to API
    let request = {
      path: '/v1/login',
      method: 'POST', 
      data: this.state
    }, callback = response => {
      console.log(response)
      if (response.status == 200)
        this.props.navigation.navigate('MainTabNavigator')
    }
    this.setState({isLoading:true})
    fetchTravoramaApi(request, callback);
  }

  // _login = () => {
  //   //// POST to login API
  //   let domain = 'http://travorama-local-api.azurewebsites.net';
  //   // let domain = 'api.travorama.com';
  //   let url = domain + '/v1/login';
  //   console.log(JSON.stringify(this.state))
  //   fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(this.state)
  //   }).then(response => response.json())
  //   .then((response) => {
  //     console.log(response)
  //     if (response.status==200) //TODO: salah
  //       this.props.navigation.navigate('MainTabNavigator')
  //   })
  //   .catch(error => {
  //     console.log("error!!!!")
  //     console.log(error)
  //     // this.setState({
  //     //   isLoading: false,
  //     //   message: 'Something bad happened :\n'+ error
  //     // })
  //   });
  // }

  render() {
    let {isLoading, userName, password} = this.state;
    return (
      <Image blurRadius={10} style={styles.bgimage}
        source={require('../assets/images/bg.jpg')}
      >
        <KeyboardAvoidingView behavior="position">
        <Image style={styles.logo} source={require('../assets/images/logo.png')}/>
        <Text style={styles.normaltext}>
          login or sign up with:
        </Text>

        <TextInput
          style={styles.searchInput}
          placeholder='Email'
          onChangeText={ userName => this.setState({userName}) }
        />
        <TextInput
          style={styles.searchInput}
          placeholder='Password'
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
