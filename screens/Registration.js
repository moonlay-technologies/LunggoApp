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
import {fetchTravoramaApi} from '../components/Common';
import {AUTH_LEVEL} from '../constants/env';

export default class Registration extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  static navigationOptions = {
    title: 'Daftarkan Akun',
  };

  _register = () => {
    this.setState({isLoading:true})
    // //// validation
    //TODO

    //// if validation passed, POST to API
    let request = {
      path: '/v1/register',
      method: 'POST', 
      data: this.state,
      requiredAuthLevel: AUTH_LEVEL.Guest,
    }
    fetchTravoramaApi(request).then( response => {
      if (response.status == 200)
        this.props.navigation.navigate('MainTabNavigator');
      else this.setState({isLoading:false});
    }).catch(error => console.log(error));
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

    let { name, email, phone, password,
      repeatPassword, isLoading } = this.state;
    
    return (
      <ScrollView style={styles.container}>
      <View style={{marginBottom:40}}>
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
            disabled={!name || !email || !phone || !password ||
              (password !== repeatPassword) || isLoading}
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
