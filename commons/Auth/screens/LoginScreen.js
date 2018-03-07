'use strict';

import React from 'react';
import {
  StyleSheet, Text, View, Image, TextInput,
  TouchableOpacity, Keyboard, TouchableWithoutFeedback, Platform,
} from 'react-native';
import { fetchTravoramaLoginApi } from '../AuthController'
import {
  validateUserName, validatePassword,
} from '../../FormValidation';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';
import globalStyles from '../../globalStyles';
import { Notifications } from 'expo';
import registerForPushNotificationsAsync
  from '../../../api/registerForPushNotificationsAsync';
import { fetchWishlist, backToMain } from '../../../api/Common';
import { LinearGradient } from 'expo';
const { setItemAsync } = Expo.SecureStore;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: [] };
  }

  _onLoginPressed = () => {
    let { userName, password } = this.state;
    let errorUserName = validateUserName(userName);
    let errorPassword = validatePassword(password);
    this.setState({ errorUserName, errorPassword });
    if (!errorUserName && !errorPassword) this._login();
  }

  componentWillUnmount() {
    this._notificationSubscription &&
      this._notificationSubscription.remove();
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };

  _login = () => {
    this.setState({ isLoading: true })
    let { navigation } = this.props;
    let { navigate, goBack, replace, pop } = navigation;
    let { params } = navigation.state;

    fetchTravoramaLoginApi(this.state.userName, this.state.password)
      .then(response => {
        this.setState({ isLoading: false });
        if (response.status == 200) {
          setItemAsync('isLoggedIn', 'true');
          if (params && params.appType == 'OPERATOR') {
            backToMain(navigation);
          } else {
          // this._notificationSubscription = this._registerForPushNotifications();
            fetchWishlist();
            let { resetAfter, thruBeforeLogin } = params;
            if (resetAfter)
              backToMain(navigation);
            else if (thruBeforeLogin)
              pop(2);
            else
              pop();
          }
        } else {
          console.log(response);
          let error;
          switch (response.error) {
            case 'ERR_NOT_REGISTERED':
              error = 'Akun ' + this.state.userName + ' tidak ditemukan'
              break;
            case 'ERR_INVALID_PASSWORD':
              error = 'Password salah';
              break;
            default:
              error = 'Terjadi kesalahan pada server';
          }
          this.setState({ error });
        }
      }).catch(error => {
        this.setState({ isLoading: false });
        console.log("Login error!!");
        console.log(error);
      })
  }

  _toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  }

  render() {
    let { userName, password, showPassword, isLoading,
      errorUserName, errorPassword, error } = this.state;
    let { params } = this.props.navigation.state;

    let errorMessageUserName = errorUserName ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorUserName}</Text>
      </View> : null;

    let errorMessagePassword = errorPassword ?
      <View style={{ alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{errorPassword}</Text>
      </View> : null;

    let errorMessage = error ?
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text style={{ color: '#fc2b4e' }}>{error}</Text>
      </View> : null;

    let registerHereButton =
      (params && params.appType == 'OPERATOR') ? null :
        <TouchableOpacity
          style={{
            position: 'absolute', bottom: 20,
            alignItems: 'center', width: '111%'
          }}
          onPress={() => this.props.navigation.replace('Registration', params)}
        >
          <Text style={{ fontSize: 14, color: '#000', fontFamily: 'Hind' }}>
            Belum punya akun? Daftar di sini
        </Text>
        </TouchableOpacity>

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={{ marginBottom: 40 }}>
            <Text style={globalStyles.categoryTitle}>Login</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={this.state.errorUserName ?
                styles.searchInputFalse : styles.searchInput
              }
              placeholder='Email / No. Handphone'
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              onSubmitEditing={(event) => {
                this.refs.passwordInput.focus();
              }}
              // blurOnSubmit={false}
              onChangeText={userName => this.setState({
                userName, errorUserName: null, error: null
              })}
            />
          </View>

          {errorMessageUserName}
          <View>
            <TextInput
              ref='passwordInput'
              style={this.state.errorPassword ?
                styles.searchInputFalse : styles.searchInput
              }
              underlineColorAndroid='transparent'
              placeholder='Password'
              secureTextEntry={!showPassword}
              autoCapitalize='none'
              autoCorrect={false}
              blurOnSubmit={true}
              onChangeText={password => this.setState({
                password, errorPassword: null, error: null
              })}
              onSubmitEditing={this._onLoginPressed}
              returnKeyType='done'
            />
            <View style={{ position: 'absolute', right: 20, top: 11, }}>
              <TouchableOpacity onPress={this._toggleShowPassword}>
                <Icon
                  name={showPassword ? 'eye' : 'eye-with-line'}
                  type='entypo' size={22} color='#acacac'
                />
              </TouchableOpacity>
            </View>
          </View>
          {errorMessagePassword}
          {errorMessage}

           <TouchableOpacity
           onPress={this._onLoginPressed}
            style={{alignItems: 'center', width:'100%', marginTop:30 }}
            activeOpacity={1}
            disabled={isLoading}
            styleDisabled={{ opacity: .7 }}
          >
            <LinearGradient
              colors={['#00d3c5', '#35eac6', '#6affc6']}
              start={[0, 0]}
              end={[1, 0]}
              style={{height: 45, paddingTop: 11, alignItems: 'center', borderRadius: 25, width:'100%'}}>
              <Text style={{
                  backgroundColor: 'transparent',
                  fontSize: 18, color: '#ffffff', 
                  fontFamily: 'Hind-SemiBold', 
                }}>
                Masuk
              </Text>
            </LinearGradient>
          </TouchableOpacity>


          <TouchableOpacity style={{ marginTop: 15, alignItems: 'flex-end' }}
            onPress={() => this.props.navigation.navigate('ForgotPassword')}>
            <Text style={{ fontSize: 12, color: '#464646', fontFamily: 'Hind' }}>
              Lupa Password?
              </Text>
          </TouchableOpacity>
          {registerHereButton}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  /*categoryTitle :{
    fontWeight:'bold',
    fontSize:26,
    color:'#454545'
  },*/
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
