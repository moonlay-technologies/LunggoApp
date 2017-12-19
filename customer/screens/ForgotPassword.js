'use strict';

import React, { Component } from 'react';
import Colors from '../../constants/Colors';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';
import { StyleSheet, Text, View, Image, TextInput, ScrollView,
  KeyboardAvoidingView } from 'react-native';

export default class ForgotPassword extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = {
    title: 'Forgot Password',
  }

  _handlePress = () => {
    this.props.navigation.navigate('MainTabNavigator')
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={{marginBottom:15}}>
            <Text style={styles.categoryTitle}>Forgot Your Password ?</Text>
          </View>
          <View style={{marginBottom:25}}>
            <Text style={styles.mediumText}>Enter your email to reset your password</Text>
          </View>
          <TextInput style={styles.searchInput} underlineColorAndroid='transparent' placeholder='Email'/>
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
            onPress={this._handlePress}
          >
            Kirim
          </Button>
          <View style={{alignItems:'center', marginTop:15, }}>
            <Text style={styles.smallText}>
              Stare at ceiling light roll over and sun my belly but purr as loud as possible, 
              be the most annoying cat that you can.
            </Text>
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
