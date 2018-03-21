/*

===== UNDESIRED BEHAVIOR =====
- pindah fokus ketika input dan ketika backspace blm perfect

===== FOR FUTURE IMPLEMENTATION =====
- bikin timer untuk resend OTP biar user ga spam resend

*/

'use strict';

import React from 'react';
import { Icon } from 'react-native-elements'
import Button from 'react-native-button';
import { StyleSheet, Text, View, Image, TextInput, ScrollView,
  KeyboardAvoidingView, TouchableOpacity, ActivityIndicator,
} from 'react-native';
import { sendOtp, verifyOtp } from '../ResetPasswordController';
import LoadingAnimation from '../../../customer/components/LoadingAnimation'

export default class OtpVerificationScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputs: [ null,null,null, null,null,null ],
      isLoading: false,
      cooldown: props.navigation.state.params.resendCooldown,
      showCooldown: false,
    }
  }

  static navigationOptions = {
    header: null,
  }

  _startResendCooldown = () => {
    var itv = setInterval( () => {
      let {cooldown} = this.state;
      cooldown--;
      if (cooldown > 0) this.setState({cooldown});
      else { //// If the cooldown is finished, clear interval
        clearInterval(itv);
        this.setState({cooldown:null, showCooldown: false});
      }
    }, 1000);
  }

  componentDidMount() {
    this._startResendCooldown();
  }

  _resendOtp = () => {
    if (this.state.cooldown) this.setState({showCooldown:true});
    else {
      let {countryCallCd, phone} = this.props.navigation.state.params;
      sendOtp( countryCallCd, phone );
      this.setState({cooldown:120}); //// 2 minutes
      this._startResendCooldown();
    }
  }

  _verifyOtp = () => {
    let otp = this.state.inputs.join('');
    console.log('otp');
    console.log(otp);
    let {countryCallCd, phone} = this.props.navigation.state.params;
    this.setState({isLoading: true});
    verifyOtp(countryCallCd, phone, otp).then( response => {
      if (response.status===200) {
        //go to new password inputScreen
        this.props.navigation.replace('NewPassword',{phone,otp});
      }
      else console.log(response.error);
      this.setState({isLoading: false, errorMessage:response.message});
    });
  }

  _onChangeText = (inputText, index) => {
    let indexToFocus;
    //// if user was deleting text
    if (inputText.length==0) {
      // if this textInput is the first one, do nothing
      // else focus on previous TextInput
      if (index>0) indexToFocus = index - 1;
    } else { // if user was inserting text
      // if this textInput is the last one, do nothing
      // else focus on next TextInput
      if (index<5) indexToFocus = index + 1;
    }
    //// update state
    this.state.inputs[index] = inputText;
    this.setState({errorMessage:null});
    if (indexToFocus) this.refs['input-'+indexToFocus].focus();
  }

  _onKeyPress = ({nativeEvent}, index) => {
    if (index==0) return;
    if (nativeEvent.key=='Backspace') {
      let indexToFocus = index - 1;
      let {inputs} = this.state;
      if (inputs[index]=='') inputs[indexToFocus] = '';
      this.refs['input-'+indexToFocus].focus();
    }
  }

  render() {
    let {inputs, isLoading, errorMessage, cooldown, showCooldown} = this.state;
    let loadingIndicator = isLoading ? <LoadingAnimation /> : null;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={{marginBottom:30}}>
            <Text style={styles.categoryTitle}>Masukkan Kode Verifikasi</Text>
          </View>
          { errorMessage ?
            <View style={{alignItems:'center', marginBottom:10}}>
              <Text style={{color:'#fc2b4e'}}>{errorMessage}</Text>
            </View> : null
          }
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
                maxLength={1}
                ref='input-0'
                autoFocus={true}
                selectTextOnFocus={true}
                value={inputs[0]}
                onKeyPress={ e => this._onKeyPress(e, 0)}
                onChangeText={input => this._onChangeText(input, 0)}
              />
            </View>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
                maxLength={1}
                ref='input-1'
                selectTextOnFocus={true}
                value={inputs[1]}
                onKeyPress={ e => this._onKeyPress(e, 1)}
                onChangeText={input => this._onChangeText(input, 1)}
              />
            </View>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
                maxLength={1}
                ref='input-2'
                selectTextOnFocus={true}
                value={inputs[2]}
                onKeyPress={ e => this._onKeyPress(e, 2)}
                onChangeText={input => this._onChangeText(input, 2)}
              />
            </View>
            <View style={{flex:1}}>
              <TextInput
                style={styles.searchInput}
                keyboardType='numeric'
                underlineColorAndroid='transparent'
                maxLength={1}
                ref='input-3'
                selectTextOnFocus={true}
                value={inputs[3]}
                onKeyPress={ e => this._onKeyPress(e, 3)}
                onChangeText={input => this._onChangeText(input, 3)}
              />
            </View>
            <View style={{flex:1}}>
              <TextInput
                style={styles.searchInput}
                keyboardType='numeric'
                underlineColorAndroid='transparent'
                maxLength={1}
                ref='input-4'
                selectTextOnFocus={true}
                value={inputs[4]}
                onKeyPress={ e => this._onKeyPress(e, 4)}
                onChangeText={input => this._onChangeText(input, 4)}
              />
            </View>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric'
                underlineColorAndroid='transparent'
                maxLength={1}
                ref='input-5'
                selectTextOnFocus={true}
                value={inputs[5]}
                onKeyPress={ e => this._onKeyPress(e, 5)}
                onChangeText={input => this._onChangeText(input, 5)}
                returnKeyType='done'
                onSubmitEditing={this._verifyOtp}
              />
            </View>
          </View>
          <Button
            containerStyle={{marginTop:50, height:45, paddingTop:13, paddingBottom:10, overflow:'hidden', borderRadius:25, backgroundColor: '#01d4cb',}}
            style={{fontSize: 16, color: '#ffffff'}}
            onPress={this._verifyOtp}
            disabled={isLoading}
            styleDisabled={{color:'#aaa'}}
          >
            Verifikasi
          </Button>
          {loadingIndicator}
          <TouchableOpacity style={{alignItems:'center', marginTop:15, }}
            onPress={this._resendOtp}
          >
            <Text style={{
              textAlign:'center',
              color: cooldown ? 'gray' : '#01d4cb',
            }}>
              Kirim ulang kode verifikasi
              {showCooldown? `\n(tunggu ${cooldown} detik)` : null}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
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
    color:'#454545'
  },
  mediumText: {
    fontSize:15,
    color:'#454545'
  },
  smallText: {
    fontSize:13,
    color:'#afafaf',
    textAlign:'justify'
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
    alignItems:'center',
    textAlign:'center',
    fontWeight:'bold',
    height: 50,
    paddingLeft:0,
    paddingTop:10,
    paddingBottom:10,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor:'#f5f5f5',
  },
});
