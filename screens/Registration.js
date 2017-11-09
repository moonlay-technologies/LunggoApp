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

// class RegistrationInput  extends React.PureComponent {}
export default class Registration extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      phone: null,
      password: null,
      repeatPassword: null,
      passwordMatch : false,
    };
  }

  static navigationOptions = {
    title: 'Daftarkan Akun',
  };

  _register = () => {
    // //// validation
    // if (this.state.password !== this.state.repeatPassword) {
    //   //TODO make repeatPassword field red
    //   return;
    // }

    //// if validation passed
    //// POST to login API

    let domain = 'http://travorama-local-api.azurewebsites.net';
    // let domain = 'api.travorama.com';
    let url = domain + '/v1/register';
    console.log(JSON.stringify(this.state))
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state)
    }).then(response => response.json())
    .then(response => {
      console.log(response)
      this.props.navigation.navigate('MainTabNavigator')
    })
    .catch(error => {
      console.log("error!!!!")
      console.log(error)
      // this.setState({
      //   isLoading: false,
      //   message: 'Something bad happened :\n'+ error
      // })
    });
  }

  render() {
    let { name, email, phone, password, repeatPassword } = this.state;
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.label}>
          Nama
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={ name => this.setState({name}) }
          value={name}
          placeholder="contoh: Andi Budi"
        />
        <Text style={styles.label}>
          Email
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={ email => this.setState({email}) }
          value={email}
          placeholder="contoh@email.com"
        />
        <Text style={styles.label}>
          No. Telepon
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={ phone => this.setState({phone}) }
          value={phone}
          placeholder="08123456789"
        />
        <Text style={styles.label}>
          Password
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={ password => this.setState({password}) }
          value={password}
          placeholder="minimal 6 digit, huruf dan angka"
        />
        <Text style={styles.label}>
          Ulangi Password
        </Text>
        <TextInput
          underlineColorAndroid= 'transparent'
          style={styles.txtInput}
          onChangeText={ repeatPassword => this.setState({repeatPassword}) }
          value={repeatPassword}
          placeholder="minimal 6 digit, huruf dan angka"
        />
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
        <View style={{justifyContent: 'center', alignItems: 'center', marginTop:25, flexDirection: 'row'}}>
          <Text>
            Sudah punya akun ?
          </Text>
          <Text style={{marginLeft:10, color:'#437ef7', textDecorationLine: 'underline'}}>
            Login
          </Text>
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
