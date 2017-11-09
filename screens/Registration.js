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
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';

export default class Registration extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    title: 'Daftarkan Akun',
  };

  fetchTravoramaApi = (request, callback, errCallback) => {
    let domain = 'http://travorama-local-api.azurewebsites.net';
    // let domain = 'api.travorama.com';
    let url = domain + (request.path || request);
    // console.log(request.data)
    fetch(url, {
      method: request.method || 'GET',
      headers: request.headers || {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.data),
    }).then(response => response.json())
    .then(callback)
    .catch( (!!errCallback)? errCallback :
      error => {
        console.log("Fetch error!!")
        console.log(error)
      }
    );
  }

  _register = () => {
    // //// validation
    //TODO

    //// if validation passed, POST to API
    let request = {
      path: '/v1/register',
      method: 'POST', 
      data: this.state
    }, callback = response => {
      // console.log(response)
      if (response.status == 200)
        this.props.navigation.navigate('MainTabNavigator')
    }
    this.fetchTravoramaApi(request, callback);
  }

  render() {
    const registrationTextInput = props => {
      let _onChange = input => {
        let state = {}
        state[props.field] = input;
        this.setState(state);
      }
      return (
        <View>
          <Text style={styles.label}> {props.label} </Text>
          <TextInput
            underlineColorAndroid= 'transparent'
            style={styles.txtInput}
            onChangeText={_onChange}
            value={this.state[props.field]}
            placeholder={props.placeholder}
          />
        </View>
      );
    }

    let { name, email, phone, password, repeatPassword } = this.state;
    
    return (
      <ScrollView style={styles.container}>
        {registrationTextInput({
          field: 'name',
          label: 'Nama',
          placeholder:'contoh: Andi Budi',
        })}
        {registrationTextInput({
          field: 'email',
          label: 'Email',
          placeholder:'contoh@email.com',
        })}
        {registrationTextInput({
          field: 'phone',
          label: 'No. Telepon',
          placeholder:'08123456789',
        })}
        {registrationTextInput({
          field: 'password',
          label: 'Password',
          placeholder:'minimal 6 digit, huruf dan angka',
        })}
        {registrationTextInput({
          field: 'repeatPassword',
          label: 'Ulangi Password',
          placeholder:'minimal 6 digit, huruf dan angka',
        })}
        <View style={{alignItems: 'flex-end',}}>
          <Button
            containerStyle={{
              height: 50,
              width: '100%',
              paddingTop: 15,
              paddingBottom :10,
              overflow: 'hidden',
              borderRadius: 4,
              backgroundColor: '#437ef7',
            }}
            style={{fontSize: 15, color: '#ffffff'}}
            onPress={this._register}
            disabled={ !name || !email || !phone || !password ||
              (password !== repeatPassword) }
            styleDisabled={{color:'#aaa'}}
          >
            Daftarkan
          </Button>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop:25,
          flexDirection: 'row'
        }}>
          <Text>Sudah punya akun ?</Text>
          <Text style={{
            marginLeft:10,
            color:'#437ef7',
            textDecorationLine: 'underline'
          }}>Login</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex:1,
    // paddingBottom: 100
  },
  label: {
    marginBottom: 5,
  },
  txtInput: {
    height: 40, 
    borderColor: '#cdcdcd', 
    borderWidth: 1, 
    paddingRight:10, 
    paddingLeft:10, 
    marginBottom:20, 
  },
});
