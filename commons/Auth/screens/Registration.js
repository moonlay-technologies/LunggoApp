'use strict';

import React from 'react';
import { Icon } from 'react-native-elements'
import {
  Platform, StyleSheet, TouchableOpacity, Text, View, Image,
  TextInput, ScrollView, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback,
} from 'react-native';
import { validateEmail, validatePassword, validateRequiredField }
  from '../../FormValidation';
import globalStyles from '../../globalStyles';
import { phoneWithoutCountryCode_Indonesia } from '../../../customer/components/Formatter';
import { fetchTravoramaApi, fetchWishlist, AUTH_LEVEL, backToMain } from '../../../api/Common';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import registerForPushNotificationsAsync
  from '../../../api/NotificationController';
import { fetchTravoramaLoginApi } from '../AuthController'
import { WideCTAButton } from '../../components/Buttons';

export default class Registration extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      countryCallCd: '+62',
    }
  }

  _onRegisterPressed = () => {
    let { name, email, countryCallCd, phone, password } = this.state;
    let errorName = validateRequiredField(name);
    let errorEmail = validateEmail(email);
    let errorPassword = validatePassword(password);
    let errorCountryCallCd = validateRequiredField(countryCallCd);
    let errorPhone = validateRequiredField(phone);
    if (!errorName && !errorEmail && !errorPassword &&
      !errorCountryCallCd && !errorPhone) {
      this._register();
    }
    else this.setState({
      errorName, errorEmail, errorPassword,
      errorCountryCallCd, errorPhone
    });
  }

  _register = () => {
    let { navigate, goBack, replace, pop } = this.props.navigation;
    let { params } = this.props.navigation.state;
    this.setState({ isLoading: true })
    console.log('1111');

    let request = {
      path: '/v1/register',
      method: 'POST',
      data: {...this.state, phone: phoneWithoutCountryCode_Indonesia(this.state.phone) },
      requiredAuthLevel: AUTH_LEVEL.Guest,
    }
    fetchTravoramaApi(request).then(response => {
      if (response.status == 200) {
        fetchTravoramaLoginApi(this.state.email || this.state.phone, this.state.password)
          .then(response => {
            if (response.status == 200) {
              registerForPushNotificationsAsync();
              fetchWishlist();
              let { resetAfter, thruBeforeLogin } = params;
              if (resetAfter)
                backToMain(this.props.navigation);
              else if (thruBeforeLogin)
                pop(2);
              else
                pop();
              this.setState({ isLoading: false })
            } else {
              console.log(response);
              let error = 'Terjadi kesalahan pada server';
            }
            this.setState({ error });
          }
          ).catch(error => {
            this.setState({ isLoading: false });
            console.log("Login error!!");
            console.log(error);
          })
      }
      else {
        this.setState({ isLoading: false });
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
        this.setState({ error });
      }
    }).catch(error => console.log(error));
  }

  render() {
    let { name, email, phone, countryCallCd, errorName, errorEmail,
      errorPhone, errorCountryCallCd, error, password, showPassword,
      isLoading, errorPassword, } = this.state;

    let errorMessageName = errorName ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorName}</Text>
      </View> : null;

    let errorMessageEmail = errorEmail ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorEmail}</Text>
      </View> : null;

    let errorMessagePassword = errorPassword ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorPassword}</Text>
      </View> : null;

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
        <KeyboardAvoidingView style={styles.container}>
          {/*<KeyboardAwareScrollView
          style={{ backgroundColor: 'transparent' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >*/}
          <View style={{ marginBottom: 25 }}>
            <Text style={globalStyles.categoryTitle1}>
              Daftar Akun Baru
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
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              value={email}
              onChangeText={email => this.setState({
                email, errorEmail: null, error: null
              })}
              returnKeyType={"next"}
              onSubmitEditing={() => this.refs.phone/*countryCallCd*/.focus()}
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
                keyboardType='numeric'
                value={phone}
                onChangeText={phone => this.setState({
                  phone, errorPhone: null, error: null
                })}
                returnKeyType={"next"}
                onSubmitEditing={() => this.refs.password.focus()}
              />
            </View>
          </View>

          {errorMessageCountryCallCd}
          {errorMessagePhone}
          <View style={{marginBottom:5}}>
            <Text style={styles.label}>Password</Text>
          </View>
          <View style={{ marginBottom: 15 }}>
            <TextInput
              style={this.state.errorPassword ?
                styles.searchInputFalse : styles.searchInput
              }
              ref='password'
              underlineColorAndroid='transparent'
              placeholder='Password'
              value={password}
              onChangeText={password => this.setState({
                password, errorPassword: null, error: null
              })}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={!showPassword}
              returnKeyType={"done"}
              onSubmitEditing={() => this._onRegisterPressed()}
            />
            {errorMessagePassword}
            {errorMessage}
            <View style={{ position: 'absolute', right: 20, top: 11, }}>
              <TouchableOpacity
                onPress={() =>
                  this.setState({ showPassword: !showPassword })}
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

          <WideCTAButton
            onPress={this._onRegisterPressed}
            disabled={isLoading}
            text='Daftarkan'
          />

          <TouchableOpacity
            style={{ marginTop: 30, alignItems: 'center' }}
            onPress={() =>
              this.props.navigation.replace('LoginScreen', this.props.navigation.state.params)
            }
          >
            <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Hind' }}>
              Sudah punya akun? Login di sini
            </Text>
          </TouchableOpacity>
          {/*</KeyboardAwareScrollView>*/}
        </KeyboardAvoidingView>
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
