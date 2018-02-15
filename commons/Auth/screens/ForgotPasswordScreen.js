'use strict';

import React from 'react';
import Colors from '../../../constants/Colors';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';
import { StyleSheet, Text, View, Image, TextInput, ScrollView,
  KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { validatePhone } from '../../../commons/FormValidation';
import { sendOtp } from '../ResetPasswordController';

export default class ForgotPasswordScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      phone: '',
      isLoading: false,
    }
  }

  static navigationOptions = {
    title: 'Forgot Password',
  }

  _submit = () => {
    let {phone} = this.state;
    let errorMessage = validatePhone(phone);
    if (errorMessage) {
      // this.refs.phone.focus(); //// keknya ga gitu guna
      return this.setState({errorMessage});
    }
    this.setState({isLoading: true});
    sendOtp(phone).then( response => {
      if (response.status==200 ||
        response.error=='ERR_TOO_MANY_SEND_SMS_IN_A_TIME')
      {
          this.props.navigation.replace('OtpVerification',
            {phone, resendCooldown: response.resendCooldown });
      }
      else console.log(response.error);
      this.setState({isLoading: false, errorMessage:response.message});
    });
  }

  render() {
    let {phone, isLoading, errorMessage} = this.state;
    let loadingIndicator = isLoading ? <ActivityIndicator/> : null;
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <View style={{marginBottom:15}}>
          <Text style={styles.categoryTitle}>Forgot Your Password ?</Text>
        </View>
        <View style={{marginBottom:25}}>
          <Text style={styles.mediumText}>Enter your phone to reset your password</Text>
        </View>
        { errorMessage ?
          <View style={{alignItems:'center', marginBottom:10}}>
            <Text style={{color:'#fc2b4e'}}>{errorMessage}</Text>
          </View> : null
        }
        <TextInput
          style={styles.searchInput}
          underlineColorAndroid='transparent'
          placeholder='Phone' //placeholder='Email'
          keyboardType='phone-pad' //keyboardType='email-address'
          returnKeyType='done'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={ phone => this.setState({
            phone, errorMessage:null,
          })}
          onSubmitEditing={this._submit}
          ref='phone'
          selectTextOnFocus={true}
          autoFocus={true}
        />
        <Button
          containerStyle={{
            marginTop:40,
            height:45,
            paddingTop:13,
            paddingBottom:10,
            overflow:'hidden',
            borderRadius:25,
            backgroundColor: Colors.primaryColor,
          }}
          style={{fontSize: 16, color: '#fff'}}
          onPress={this._submit}
          disabled={isLoading}
          styleDisabled={{color:'#aaa'}}
        >
          Kirim
        </Button>
        {loadingIndicator}
        <View style={{alignItems:'center', marginTop:15, }}>
          <Text style={styles.smallText}>
            Stare at ceiling light roll over and sun my belly but purr as loud as possible, 
            be the most annoying cat that you can.
          </Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    paddingTop:60,
    backgroundColor: '#fff',
  },
  categoryTitle :{
    fontWeight:'bold',
    fontSize:26,
    color:'#454545',
  },
  mediumText: {
    fontSize:15,
    color:'#454545',
  },
  smallText: {
    fontSize:13,
    color:'#afafaf',
    textAlign:'justify',
  },
  loginemail: {
    backgroundColor: 'transparent',
    color: '#fff',
    marginTop: 50,
  },
  description: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 30,
    padding: 40,
    color: '#fff',
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
