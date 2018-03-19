'use strict';

import React from 'react';
import { Icon } from 'react-native-elements'
import Button from 'react-native-button';
import {
  Platform, StyleSheet, TouchableOpacity, Text, View, Image,
  TextInput, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { validateEmail, validatePassword, validateRequiredField }
  from '../../commons/FormValidation';
import globalStyles from '../../commons/globalStyles';
import {phoneWithoutCountryCode_Indonesia} from '../components/Formatter';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../api/Common';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default class AddBookingContact extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      countryCallCd: '+62',
      ...props.navigation.state.params.contact,
    }
  }

  _onSubmitForm = () => {
    let { name, email, countryCallCd, phone } = this.state;
    let errorName = validateRequiredField(name);
    let errorEmail = validateEmail(email);
    // let errorPassword = validatePassword(password);
    let errorCountryCallCd = validateRequiredField(countryCallCd);
    let errorPhone = validateRequiredField(phone);
    this.setState({
      errorName, errorEmail,
      errorCountryCallCd, errorPhone
    });
    if (!errorName && !errorEmail &&
      !errorCountryCallCd && !errorPhone) {
      let { name, email, countryCallCd } = this.state;
      let phone = phoneWithoutCountryCode_Indonesia(this.state.phone);
      let contact = { name, email, phone, countryCallCd };
      this.props.navigation.state.params.setContact(contact);
      this.props.navigation.goBack();
    }
  }


  render() {
    let { name, email, phone, countryCallCd, errorName, errorEmail,
      errorPhone, errorCountryCallCd, error } = this.state;

    let errorMessageName = errorName ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorName}</Text>
      </View> : null;

    let errorMessageEmail = errorEmail ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorEmail}</Text>
      </View> : null;
/*
    let errorMessagePassword = errorPassword ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorPassword}</Text>
      </View> : null;
*/
    let errorMessageCountryCallCd = errorCountryCallCd ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorCountryCallCd}</Text>
      </View> : null;

    let errorMessagePhone = errorPhone ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorPhone}</Text>
      </View> : null;

    let errorMessage = error ?
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{error}</Text>
      </View> : null;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          {/*<KeyboardAwareScrollView
          style={{ backgroundColor: 'transparent' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >*/}
          <View style={{ marginBottom: 25 }}>
            <Text style={globalStyles.categoryTitle1}>
              Kontak
            </Text>
          </View>

          <View style={{marginBottom:5}}>
            <Text style={styles.label}>Nama Lengkap</Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInput
              style={this.state.errorName ?
                styles.searchInputFalse : styles.searchInput
              }
              underlineColorAndroid='transparent'
              placeholder='Nama Lengkap'
              value={name}
              onChangeText={name => this.setState({
                name, errorName: null, error: null
              })}
              returnKeyType={"next"}
              onSubmitEditing={() => this.refs.email.focus()}
            />
          </View>
          {errorMessageName}
          <View style={{marginBottom:5}}>
            <Text style={styles.label}>Email</Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInput
              style={this.state.errorEmail ?
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
                email, errorEmail: null, error: null
              })}
              returnKeyType={"next"}
              onSubmitEditing={() => this.refs.countryCallCd.focus()}
            />
          </View>
          {errorMessageEmail}
          <View style={{marginBottom:5}}>
            <Text style={styles.label}>No. Handphone</Text>
          </View>
          <View style={{ marginBottom: 15, flexDirection: 'row' }}>
            {/*<View style={{ flex: 1.4 }}>
              <TextInput
                style={this.state.errorCountryCallCd ?
                  styles.searchInputFalse : styles.searchInput
                }
                ref='countryCallCd'
                underlineColorAndroid='transparent'
                placeholder='+ ....'
                keyboardType='phone-pad'
                value={countryCallCd}
                selectTextOnFocus={true}
                onChangeText={countryCallCd => this.setState({
                  countryCallCd, errorCountryCallCd: null, error: null
                })}
                returnKeyType={"next"}
                onSubmitEditing={() => this.refs.phone.focus()}
              />
            </View>*/}
            <View style={{ flex: 4 }}>
              <TextInput
                style={this.state.errorPhone ?
                  styles.searchInputFalse : styles.searchInput
                }
                ref='phone'
                underlineColorAndroid='transparent'
                placeholder='No. Handphone'
                keyboardType='numeric'
                value={phone}
                onChangeText={phone => this.setState({
                  phone, errorPhone: null, error: null
                })}
                returnKeyType={'done'}
                onSubmitEditing={this._onSubmitForm}
              />
            </View>
          </View>

          {errorMessageCountryCallCd}
          {errorMessagePhone}
          <Button
            containerStyle={{
              marginTop: 30,
              height: 45,
              paddingTop: 11,
              paddingBottom: 10,
              overflow: 'hidden',
              borderRadius: 25,
              backgroundColor: '#23d3c3',
            }}
            style={{ fontSize: 16, color: '#ffffff', fontFamily: 'Hind-Bold' }}
            onPress={this._onSubmitForm}
            styleDisabled={{ color: '#fff', opacity: 0.7 }}
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
    padding: 15,
    paddingTop: 10,
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
  label: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 9,
        marginBottom: -10
      },
      android: {
      },
    }),
  },
  searchInput: {
    height: 45,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 7,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 25,
    color: '#565656',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Hind',
  },
  searchInputFalse: {
    height: 45,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 7,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fdaab8',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Hind',
  },
});
