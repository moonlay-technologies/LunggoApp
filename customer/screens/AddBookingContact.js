'use strict';

import React from 'react';
import { Icon } from 'react-native-elements'
import Button from 'react-native-button';
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput,
  ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import {fetchTravoramaApi, AUTH_LEVEL} from '../../api/Common';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validateEmail, validatePassword, validateRequiredField,
} from '../../commons/FormValidation';
import globalStyles from '../../commons/globalStyles';


export default class AddBookingContact extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      countryCallCd:'+62',
      ...props.navigation.state.params.contact,
    }
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

  _onSubmitForm = () => {
    let {name, email, countryCallCd, phone} = this.state;
    let errorName = validateRequiredField(name);
    let errorEmail = validateEmail(email);
    // let errorPassword = validatePassword(password);
    let errorcountryCallCd = validateRequiredField(countryCallCd);
    let errorPhone = validateRequiredField(phone);
    this.setState({errorName, errorEmail,
      errorcountryCallCd, errorPhone});
    if (!errorName && !errorEmail &&
        !errorcountryCallCd && !errorPhone) {
      this.props.navigation.state.params.setContact(this.state);
      this.props.navigation.goBack();
    }
  }


  render() {
    let { name, email, phone, countryCallCd, errorName, errorEmail,
      errorPhone, errorcountryCallCd, error } = this.state;

    let errorMessageName = errorName ?
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={{color:'#fc2b4e'}}>{errorName}</Text>
      </View> : null;

    let errorMessageEmail = errorEmail ?
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={{color:'#fc2b4e'}}>{errorEmail}</Text>
      </View> : null;

    let errorMessagecountryCallCd = errorcountryCallCd ?
      <View style={{alignItems:'center', marginBottom:10}}>
        <Text style={{color:'#fc2b4e'}}>{errorcountryCallCd}</Text>
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
            <Text style={{}}>Kontak yang dapat dihubungi</Text>
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
              onSubmitEditing={() => this.refs.countryCallCd.focus()}
            />
          </View>
          {errorMessageEmail}
          <View style={{marginBottom:15, flexDirection:'row'}}>
            <View style={{flex:1.4}}>
              <TextInput
                style={ this.state.errorcountryCallCd ?
                  styles.searchInputFalse : styles.searchInput
                }
                ref='countryCallCd'
                underlineColorAndroid='transparent'
                placeholder='+ ....'
                keyboardType='phone-pad'
                value={countryCallCd}
                selectTextOnFocus={true}
                onChangeText={countryCallCd => this.setState({
                  countryCallCd, errorcountryCallCd:null, error:null
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
                returnKeyType={ 'done' }
                onSubmitEditing={this._onSubmitForm}
              />
            </View>
          </View>

          {errorMessagecountryCallCd}
          {errorMessagePhone}
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
            onPress={this._onSubmitForm}
            styleDisabled={{color:'#fff', opacity:0.7}}
          >
            OK
          </Button>
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
