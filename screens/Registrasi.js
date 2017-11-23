'use strict';

import React, { Component } from 'react';
import { Icon } from 'react-native-elements'
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

export default class LoginScreen extends Component<{}> {
  constructor(props, context) {
    super(props, context);
  }

  static navigationOptions = {
    header: null,
  }

  _handlePress = () => {
    this.props.navigation.navigate('MainTabNavigator')
  }
  render() {
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={{marginBottom:40}}>
            <Text style={styles.categoryTitle}>Registrasi</Text>
          </View>
          <View style={{marginBottom:15}}>
            <TextInput style={styles.searchInput} underlineColorAndroid='transparent' placeholder='User Name'/>
          </View>
          <View style={{marginBottom:15}}>
            <TextInput style={styles.searchInput} underlineColorAndroid='transparent' placeholder='Email'/>
          </View>
          <View style={{marginBottom:15, flexDirection:'row'}}>
            <View style={{flex:1.4}}>
              <TextInput
                style={styles.searchInput} 
                underlineColorAndroid='transparent' 
                placeholder='+62'
              />
            </View>
            <View style={{flex:4}}>
              <TextInput
                style={styles.searchInput} 
                underlineColorAndroid='transparent' 
                placeholder='Phone Number'
              />
            </View>
          </View>
          <View style={{marginBottom:15}}>
            <TextInput
              style={styles.searchInput} 
              underlineColorAndroid='transparent' 
              placeholder='Password'
            />
            <View style={{position:'absolute', right:20, top:11,}}>
              <Icon
                //name='eye'
                name='eye-with-line'
                type='entypo'
                size={22}
                color='#acacac'/>
            </View>
          </View>
          <Button
            containerStyle={{marginTop:30, height:45, paddingTop:13, paddingBottom:10, overflow:'hidden', borderRadius:25, backgroundColor: '#01d4cb',}}
            style={{fontSize: 16, color: '#ffffff'}}
            onPress={this._handlePress}
          >
          Registrasi
          </Button>
          
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
