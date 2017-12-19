'use strict';

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput,
    TouchableHighlight,TouchableOpacity, } from 'react-native';
import { fetchTravoramaLoginApi } from '../../api/Common';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
  //   // header: ({navigate}) => ({
    header: null
  //   //     right: (
  //   //         <LikeShareHeaderButton navigate={navigate}/>
  //   //     ),
  //   // }),
  //   // headerTitleStyle: {color:'white'},
  //  // headerRight: <LikeShareHeaderButton/>,
  //   headerStyle: {
  //     backgroundColor: 'transparent',
  //     position: 'absolute',
  //     zIndex: 100,
  //     top: 0,
  //     left: 0,
  //     right: 0
  //   },
  };

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
        <View style={{marginVertical:20}}>
          <Text style={{fontSize:46, color:'#fff', fontWeight:'bold', /*fontFamily: 'opensans-bold'*/}}>
            Mulai liburanmu sekarang
          </Text>
        </View>

        <Button
          containerStyle={{marginTop:30, height:45, paddingTop:11,overflow:'hidden', borderRadius:25, backgroundColor: '#fff',}}
          style={{fontSize: 18, color: '#01d4cb'}}
          onPress={() => this.props.navigation.navigate('Registration')}
          // onPress={this._login}
          // disabled={isLoading || !userName || !password}
        >
          Daftar
        </Button>
        <View style={{marginTop:24, alignItems:'center'}}>
          <TouchableOpacity
              onPress={() => this.props.navigation.navigate('LoginScreen')}
              activeOpacity={0.7}
            >
            <Text style={{fontSize:16, color:'#fff', fontWeight:'bold'}}>
              Sudah punya akun? Tap Disini
            </Text>
          </TouchableOpacity>
        </View>
        {/*<View style={{flexDirection:'row', marginVertical:11}}>
          <View style={{flex:1, backgroundColor:'#fff', height:1, marginTop:8}}></View>
          <View style={{paddingLeft:10, paddingRight:10,}}>
            <Text style={{fontSize:14, color:'#fff'}}>atau masuk dengan</Text>
          </View>
          <View style={{flex:1, backgroundColor:'#fff', height:1,  marginTop:8}}></View>
        </View>
        <View style={{flexDirection:'row', marginTop:6}}>
          <View style={{flex:1, paddingVertical:8, backgroundColor:'transparent', borderWidth:1, borderRadius:25, borderColor:'#fff'}}>
            <Icon
              name='sc-facebook'
              type='evilicon'
              size={28}
              color='#fff'/>
          </View>
          <View style={{flex:1, marginLeft:10, paddingVertical:8, paddingLeft:4, backgroundColor:'transparent', borderWidth:1, borderRadius:25, borderColor:'#fff'}}>
            <Icon
              name='sc-google-plus'
              type='evilicon'
              size={28}
              color='#fff'/>
          </View>
        </View>*/}
        <View style={{position:'absolute', bottom:20, alignItems:'center', width:'111%',}}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('MainTabNavigator')}
          >
            <Text style={{fontSize:14, color:'#fff'}}>
              Lewati
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,
    paddingTop:60,
    backgroundColor: '#01d4cb',
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
