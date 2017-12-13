'use strict';

import React, { Component } from 'react';
import { Icon } from 'react-native-elements'
import Button from 'react-native-button';
import { Platform, StyleSheet, TouchableOpacity,
  Text, View, Image, TextInput, ScrollView, KeyboardAvoidingView,
} from 'react-native';
import {fetchTravoramaApi, AUTH_LEVEL} from '../../api/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class Registration extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {countryCode:'+62'}
  }

  static navigationOptions = {
    //header: null,
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
    },
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
      if (response.status == 200)
        this.props.navigation.navigate('MainTabNavigator');
      else {
        this.setState({isLoading:false});
        console.log(request)
        console.log(response)
      }
    }).catch(error => console.log(error));
  }

  render() {
    let { name, email, phone, password, countryCode,
      showPassword, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ backgroundColor: 'transparent' }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View style={{marginBottom:40}}>
            <Text style={styles.categoryTitle}>Daftar Akun Baru</Text>
          </View>
          
          <View style={{marginBottom:15}}>
            <TextInput style={styles.searchInput}
              underlineColorAndroid='transparent'
              placeholder='Nama Lengkap'
              value={name}
              onChangeText={userName => this.setState({name})}
              returnKeyType={ "next" }
              onSubmitEditing={(event) => { 
                this.refs.email.focus(); 
              }}
            />
          </View>
          <View style={{marginBottom:15}}>
            <TextInput style={styles.searchInput}
              ref='email'
              underlineColorAndroid='transparent'
              placeholder='Email'
              keyboardType='email-address'
              autoCapitalize='none'
              autoCorrect={false}
              value={email}
              onChangeText={email => this.setState({email})}
              returnKeyType={ "next" }
              onSubmitEditing={(event) => { 
                this.refs.countryCode.focus(); 
              }}
            />
          </View>
          <View style={{marginBottom:15, flexDirection:'row'}}>
            <View style={{flex:1.4}}>
              <TextInput
                ref='countryCode'
                style={styles.searchInput} 
                underlineColorAndroid='transparent'
                placeholder='+ ....'
                keyboardType='phone-pad'
                value={countryCode}
                selectTextOnFocus={true}
                onChangeText={countryCode => this.setState({countryCode})}
                returnKeyType={ "next" }
                onSubmitEditing={(event) => { 
                this.refs.phone.focus(); 
              }}
              />
            </View>
            <View style={{flex:4}}>
              <TextInput
                ref='phone'
                style={styles.searchInput} 
                underlineColorAndroid='transparent' 
                placeholder='No. Handphone'
                keyboardType='numeric'
                value={phone}
                onChangeText={phone => this.setState({phone})}
                returnKeyType={ "next" }
                onSubmitEditing={(event) => { 
                this.refs.password.focus(); 
              }}
              />
            </View>
          </View>
          <View style={{marginBottom:15}}>
            <TextInput
              ref='password'
              style={styles.searchInput} 
              underlineColorAndroid='transparent' 
              placeholder='Password'
              value={password}
              onChangeText={password => this.setState({password})}
              autoCapitalize='none'
              autoCorrect={false}
              secureTextEntry={!showPassword}
              returnKeyType={ "done" }
            />
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
              paddingTop:13,
              paddingBottom:10,
              overflow:'hidden',
              borderRadius:25,
              backgroundColor: '#01d4cb',
            }}
            style={{fontSize: 16, color: '#ffffff'}}
            onPress={this._register}
            disabled={!name || !email || !phone || !password ||
              !countryCode || isLoading}
            styleDisabled={{color:'#fff', opacity:0.7}}
          >
          Daftarkan
          </Button>
          <TouchableOpacity style={{marginTop:30, alignItems:'center'}}
            onPress={() => this.props.navigation.navigate('LoginScreen')}
          >
            <Text style={{fontSize:12, color:'#000'}}>
              Sudah punya akun? Login di sini
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
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
  categoryTitle :{
    fontWeight:'bold',
    fontSize:26,
    color:'#454545'
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
    paddingBottom:10,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor:'#f5f5f5',
  },
});
