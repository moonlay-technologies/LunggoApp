'use strict';

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image,
  TextInput, KeyboardAvoidingView, TouchableHighlight,TouchableOpacity,
} from 'react-native';
import { fetchTravoramaLoginApi } from '../components/Common';
import { Icon } from 'react-native-elements';
import ImageSlider from 'react-native-image-slider';
import Button from 'react-native-button';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    header: null,
  }

  _login = () => {
    this.setState({isLoading:true})
    // //// validation
    //TODO

    //// if validation passed, POST to API
    fetchTravoramaLoginApi(this.state.userName, this.state.password)
    .then(response => {
      this.setState({isLoading:false});
      if (response.status == 200)
        this.props.navigation.navigate('MainTabNavigator');
      else console.log(response);
    }).catch(error => {
      this.setState({isLoading:false});
      console.log("Login error!!");
      console.log(error);
    })
  }
  
  render() {
    let {userName, password, showPassword, isLoading} = this.state;
    return (
      <View style={styles.container}>
        {/*<KeyboardAvoidingView behavior="position">*/}
          <View style={{alignItems:'center', backgroundColor:'transparent'}}>
            <View style={{}}>
              <Image style={{}} source={require('../assets/images/travorama.jpg')}></Image>
            </View>
          </View>
          <View style={{}}>
            <ImageSlider images={[
              'http://placeimg.com/640/480/any',
              'http://placeimg.com/640/480/any',
              'http://placeimg.com/640/480/any'
            ]}/>
          </View>
          <Button
            containerStyle={{marginTop:30, height:45, paddingTop:13, paddingBottom:10, overflow:'hidden', borderRadius:25, backgroundColor: '#01d4cb',}}
            style={{fontSize: 16, color: '#ffffff'}}
            onPress={this._login}
            disabled={isLoading || !userName || !password}
          >
            Create an account
          </Button>
          <View style={{marginTop:15, alignItems:'center'}}>
            <Text style={{fontSize:14, color:'#000', fontWeight:'bold'}}>
              Already have account? Log In
            </Text>
          </View>
          <View style={{flexDirection:'row', marginTop:10, marginBottom:10}}>
            <View style={{flex:1, backgroundColor:'#cdcdcd', height:1, marginTop:8}}></View>
            <View style={{paddingLeft:10, paddingRight:10}}>
              <Text>or</Text>
            </View>
            <View style={{flex:1, backgroundColor:'#cdcdcd', height:1,  marginTop:8}}></View>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Button
                containerStyle={{height:45, paddingTop:13, paddingBottom:10, overflow:'hidden', borderRadius:25, backgroundColor: '#0080d4',}}
                style={{fontSize: 16, color: '#ffffff'}}
              >
                Facebook
              </Button>
            </View>
            <View style={{flex:1, paddingLeft:5}}>
              <Button
                containerStyle={{height:45, paddingTop:13, paddingBottom:10, overflow:'hidden', borderRadius:25, backgroundColor: '#ff6364',}}
                style={{fontSize: 16, color: '#ffffff'}}
              >
                Google+
              </Button>
            </View>
          </View>
          <View style={{marginTop:30, alignItems:'center'}}>
            <TouchableHighlight
              onPress={() => this.props.navigation.navigate('Registration')}
            >
              <Text style={{fontSize:14, color:'#000'}}>
                Skip
              </Text>
            </TouchableHighlight>
          </View>
        {/*</KeyboardAvoidingView>*/}
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
