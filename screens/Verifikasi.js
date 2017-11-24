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
          <View style={{marginBottom:30}}>
            <Text style={styles.categoryTitle}>Masukkan Kode Verifikasi</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
              />
            </View>
            <View style={{flex:1}}>
              <TextInput 
                style={styles.searchInput} 
                keyboardType='numeric' 
                underlineColorAndroid='transparent'
              />
            </View>
          </View>
          <Button
            containerStyle={{marginTop:50, height:45, paddingTop:13, paddingBottom:10, overflow:'hidden', borderRadius:25, backgroundColor: '#01d4cb',}}
            style={{fontSize: 16, color: '#ffffff'}}
            onPress={this._handlePress}
          >
          Kirim
          </Button>
          <View style={{alignItems:'center', marginTop:15, }}>
            <Text style={{color:'#01d4cb'}}>Kirim ulang kode verifikasi</Text>
          </View>
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
