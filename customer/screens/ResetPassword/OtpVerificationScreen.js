/*

===== UNDESIRED BEHAVIOR =====
- pindah fokus ketika input angka dan ketika backspace

===== FOR FUTURE IMPLEMENTATION =====
- bikin timer untuk resend OTP biar user ga spam resend

*/

'use strict';

import React from 'react';
import { Icon } from 'react-native-elements'
import Button from 'react-native-button';
import { Platform, StyleSheet, Text, View, Image, TextInput,
  ScrollView, KeyboardAvoidingView, TouchableOpacity,
} from 'react-native';
import { sendOtp, verifyOtp } from './ResetPasswordController';

export default class OtpVerificationScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      inputs: [null,null,null, null,null,null],
    }
  }

  static navigationOptions = {
    header: null,
  }

  _resendOtp = () => sendOtp( this.props.navigation.state.params.phone )

  _verifyOtp = () => {
    let otp = this.state.inputs.join();
    let {phone} = this.props.navigation.params;
    verifyOtp(phone, otp).then( response => {
      if (response===true) {
        //go to new password inputScreen
        this.props.navigation.navigate('NewPassword',{phone,otp});
      }
    });
  }

  _onChangeText = (inputText, index) => {
    let indexToFocus;
    //// if user was deleting text
    if (inputText.length==0) {
      // if this textInput is the first one, do nothing
      if (index==0) return;
      // else focus on previous TextInput
      indexToFocus = index - 1;
    } else { // if user was inserting text
      // if this textInput is the last one, do nothing
      if (index==5) return;
      // else focus on next TextInput
      indexToFocus = index + 1;
    }
    //// update state
    this.state.inputs[index] = inputText;
    this.refs['input-'+indexToFocus].focus();
  }

  _onKeyPress = ({nativeEvent}, index) => {
    if (index==0) return;
    if (nativeEvent.key=='Backspace') {
      let indexToFocus = index - 1;
      let {inputs} = this.state;
      if (inputs[index]=='') {
        inputs[indexToFocus] = '';
        // this.forceUpdate();
        // this.setState({input})
      }
      this.refs['input-'+indexToFocus].focus();
    }
    // console.log(this.state.input[index])
  }

  render() {
    let {inputs} = this.state;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={{marginBottom:30}}>
            <Text style={styles.categoryTitle}>Masukkan Kode Verifikasi</Text>
          </View>
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
              />
            </View>
          </View>
          <Button
            containerStyle={{marginTop:50, height:45, paddingTop:13, paddingBottom:10, overflow:'hidden', borderRadius:25, backgroundColor: '#01d4cb',}}
            style={{fontSize: 16, color: '#ffffff'}}
            onPress={this._verifyOtp}
          >
          Kirim
          </Button>
          <TouchableOpacity style={{alignItems:'center', marginTop:15, }}
            onPress={this._resendOtp}
          >
            <Text style={{color:'#01d4cb'}}>Kirim ulang kode verifikasi</Text>
          </TouchableOpacity>
          <View style={{alignItems:'center', marginTop:15, }}>
            <Text style={styles.smallText}>Stare at ceiling light roll over and sun my belly but purr as loud as possible, 
            be the most annoying cat that you can.</Text>
          </View>
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
