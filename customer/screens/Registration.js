'use strict';

import React from 'react';
import { Icon } from 'react-native-elements'
import Button from 'react-native-button';
import { Platform, StyleSheet, TouchableOpacity,
  Text, View, Image, TextInput, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback
} from 'react-native';
import {fetchTravoramaApi, AUTH_LEVEL} from '../../api/Common';
import { KeyboardAwareScrollView }
  from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, validatePassword, validateRequiredField }
  from '../../commons/FormValidation';
  import globalStyles from '../../commons/globalStyles';


export default class Registration extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {countryCode:'+62'}
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
    },
  }

  _onRegisterPressed = () => {
    let {name, password, email, countryCode, phone} = this.state;
    let errorName = validateRequiredField(name);
    let errorEmail = validateEmail(email);
    let errorPassword = validatePassword(password);
    let errorCountryCode = validateRequiredField(countryCode);
    let errorPhone = validateRequiredField(phone);
    if (!errorName && !errorEmail && !errorPassword &&
        !errorCountryCode && !errorPhone) {
      this._register();
    }
    else this.setState({errorName, errorEmail, errorPassword,
      errorCountryCode, errorPhone});
  }

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
      if (response.status == 200) {
        this.props.navigation.navigate('MainTabNavigator');
        this.setState({isLoading:false})
      }
      else {
        this.setState({isLoading:false});
        console.log(request);
        console.log(response);
        let error;
        switch (response.error) {
          case 'ERR_EMAIL_ALREADY_EXIST':
            error = 'Email ' + this.state.email + ' sudah pernah terdaftar';
            break;
		  case 'ERR_PHONENUMBER_ALREADY_EXIST':
            error = 'Nomor ' + this.state.phone + ' sudah pernah terdaftar';
            break;
          case 'ERR_INVALID_REQUEST':
            error = 'Ada kesalahan pengisian data';
            break;
          default:
            error = 'Terjadi kesalahan pada server';
        }
        this.setState({error});
      }
    }).catch(error => console.log(error));
  }

  render() {
    let { name, email, phone, password, countryCode, showPassword,
        isLoading, errorName, errorPassword, errorEmail, errorPhone,
        errorCountryCode, error } = this.state;

    let errorMessageName = errorName ?
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={{color:'#fc2b4e'}}>{errorName}</Text>
      </View> : null;

    let errorMessageEmail = errorEmail ?
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={{color:'#fc2b4e'}}>{errorEmail}</Text>
      </View> : null;

    let errorMessagePassword = errorPassword ?
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={{color:'#fc2b4e'}}>{errorPassword}</Text>
      </View> : null;

    let errorMessageCountryCode = errorCountryCode ?
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={{color:'#fc2b4e'}}>{errorCountryCode}</Text>
      </View> : null;

    let errorMessagePhone = errorPhone ?
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={{color:'#fc2b4e'}}>{errorPhone}</Text>
      </View> : null;

    let errorMessage = error ?
      <View style={{alignItems:'center', marginTop:10}}>
        <Text style={{color:'#fc2b4e'}}>{error}</Text>
      </View> : null;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        {/*<KeyboardAwareScrollView
          style={{ backgroundColor: 'transparent' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >*/}
          <View style={{marginBottom:30}}>
            <Text style={globalStyles.categoryTitle}>Daftar Akun Baru</Text>
          </View>
          
          <View style={{marginBottom:15}}>
            <TextInput
              style={ this.state.errorName ?
                styles.searchInputFalse : styles.searchInput
              }
              underlineColorAndroid='transparent'
              placeholder='Nama Lengkap'
              value={name}
              onChangeText={name => this.setState({
                name, errorName:null, error:null
              })}
              returnKeyType={ "next" }
              onSubmitEditing={() => this.refs.email.focus()}
            />
          </View>
          {errorMessageName}
          <View style={{marginBottom:15}}>
            <TextInput
              style={ this.state.errorEmail ?
                styles.searchInputFalse : styles.searchInput
              }
              ref='email'
              underlineColorAndroid='transparent'
              placeholder='Email'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              value={email}
              onChangeText={email => this.setState({
                email, errorEmail:null, error:null
              })}
              returnKeyType={ "next" }
              onSubmitEditing={() => this.refs.countryCode.focus()}
            />
          </View>
          {errorMessageEmail}
          <View style={{marginBottom:15, flexDirection:'row'}}>
            <View style={{flex:1.4}}>
              <TextInput
                style={ this.state.errorCountryCode ?
                  styles.searchInputFalse : styles.searchInput
                }
                ref='countryCode'
                underlineColorAndroid='transparent'
                placeholder='+ ....'
                keyboardType='phone-pad'
                value={countryCode}
                selectTextOnFocus={true}
                onChangeText={countryCode => this.setState({
                  countryCode, errorCountryCode:null, error:null
                })}
                returnKeyType={ "next" }
                onSubmitEditing={() => this.refs.phone.focus()}
              />
            </View>
            <View style={{flex:4}}>
              <TextInput
                style={ this.state.errorPhone ?
                  styles.searchInputFalse : styles.searchInput
                }
                ref='phone'
                underlineColorAndroid='transparent' 
                placeholder='No. Handphone'
                keyboardType='numeric'
                value={phone}
                onChangeText={phone => this.setState({
                  phone, errorPhone:null, error:null
                })}
                returnKeyType={ "next" }
                onSubmitEditing={() => this.refs.password.focus()}
              />
            </View>
          </View>

          {errorMessageCountryCode}
          {errorMessagePhone}
          <View style={{marginBottom:15}}>
            <TextInput
              style={ this.state.errorPassword ?
                styles.searchInputFalse : styles.searchInput
              }
              ref='password'
              underlineColorAndroid='transparent' 
              placeholder='Password'
              value={password}
              onChangeText={password => this.setState({
                password, errorPassword:null, error:null
              })}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={!showPassword}
              returnKeyType={ "done" }
            />
            {errorMessagePassword}
            {errorMessage}
            <View style={{position:'absolute', right:20, top:11,}}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({showPassword:!showPassword})}
              >
                <View>
                  <Icon
                    name={showPassword ? 'eye' : 'eye-with-line'}
                    type='entypo'
                    size={22}
                    color='#acacac'
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            containerStyle={{
              marginTop:30,
              height:45,
              paddingTop:11,
              paddingBottom:10,
              overflow:'hidden',
              borderRadius:25,
              backgroundColor: '#23d3c3',
            }}
            style={{fontSize: 16, color: '#ffffff', fontFamily:'Hind-Bold'}}
            onPress={this._onRegisterPressed}
            disabled={isLoading}
            styleDisabled={{color:'#fff', opacity:0.7}}
          >
          Daftarkan
          </Button>
          <TouchableOpacity
            style={{
              marginTop:30, alignItems:'center'
            }}
            onPress={() =>
              this.props.navigation.navigate('LoginScreen')
            }
          >
            <Text style={{fontSize:14, color:'#000', fontFamily: 'Hind'}}>
              Sudah punya akun? Login di sini
            </Text>
          </TouchableOpacity>
        {/*</KeyboardAwareScrollView>*/}
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    paddingTop:90,
    backgroundColor: '#fff',
  },
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
  searchInput: {
    height: 45,
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:7,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor:'#f5f5f5',
    fontFamily:'Hind',
  },
  searchInputFalse: {
    height: 45,
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:7,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fc2b4e',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor:'#f5f5f5',
    fontFamily:'Hind',
  },
});
