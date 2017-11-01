'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import { Slider } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

export default class DetailScreen extends Component<{}> {

  static navigationOptions = {
    title: 'MyBooking',
    // header: ({navigate}) => ({
    //     right: (
    //         <LikeShareHeaderButton navigate={navigate}/>
    //     ),
    // }),
    // headerTitleStyle: {color:'white'},
    headerStyle: {
      // backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
  };

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
    };
  }

  

  render() {
    return (
      //<View style={styles.divider}></View>
      //<Image style={styles.detailimg}source={require('../assets/images/detailimg.jpg')}/>
      <ScrollView style={{paddingTop:80, flex:1, backgroundColor: '#fff',}}>
        <View style={{flex:1,}}>
          <View style={{flex:1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor:'#ffffff'}}>
            <Button
              containerStyle={{ marginRight:3, height:40, width:120, paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
              style={{fontSize: 14, color: '#ffffff'}}
              onPress={() => this._handlePress()}>
              Active
            </Button>
            <Button
              containerStyle={{ height:40, width:120, paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, borderWidth: 1,
              borderColor: '#437ef7',backgroundColor: '#ffffff'}}
              style={{fontSize: 14, color: '#437ef7'}}
              onPress={() => this._handlePress()}>
              History 
            </Button>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerBooking}>
            <Image source={require('../assets/images/other-img1.jpg')} style={{flex:1.8,resizeMode:'cover',width:'100%',height:110,}}/>
            <View style={{flex:3,marginRight: '10%',marginLeft: '5%',}}>
              <Text style={styles.activityTitle}>Trip to Sahara Desert</Text>
              <Text style={styles.status}>On Going</Text>
              <View style={{marginTop:10, marginBottom:5, width:'100%',flexDirection:'row',}}>
                <View style={{ flexDirection:'row', marginRight:10 }}>
                  <Image style={styles.icon}source={require('../assets/icons/person.png')}/>
                  <Text style={styles.timeActivity}>
                    5 hari
                  </Text>
                </View>
                <View style={{ flexDirection:'row' }}>
                  <Image style={styles.icon}source={require('../assets/icons/calendar.png')}/>
                  <Text style={styles.timeActivity}>
                    20 Oktober 2017
                  </Text>
                </View>
              </View>
              <Text style={{color:'green', marginRight:3, fontWeight: 'bold', fontSize:18,}}>Rp. 3.000.000</Text> 
            </View> 
          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerBooking}>
            <Image source={require('../assets/images/other-img1.jpg')} style={{flex:1.8,resizeMode:'cover',width:'100%',height:110,}}/>
            <View style={{flex:3,marginRight: '10%',marginLeft: '5%',}}>
              <Text style={styles.activityTitle}>Trip to Sahara Desert</Text>
              <Text style={styles.status}>On Going</Text>
                <View style={{marginTop:10, marginBottom:5, width:'100%',flexDirection:'row',}}>
                  <View style={{ flexDirection:'row', marginRight:10 }}>
                    <Image style={styles.icon}source={require('../assets/icons/person.png')}/>
                    <Text style={styles.timeActivity}>
                      5 hari
                    </Text>
                  </View>
                  <View style={{ flexDirection:'row' }}>
                    <Image style={styles.icon}source={require('../assets/icons/calendar.png')}/>
                    <Text style={styles.timeActivity}>
                      20 Oktober 2017
                    </Text>
                  </View>
                </View>
                <Text style={{color:'green', marginRight:3, fontWeight: 'bold', fontSize:18,}}>Rp. 3.000.000</Text> 
            </View> 
          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerBooking}>
            <Image source={require('../assets/images/other-img1.jpg')} style={{flex:1.8,resizeMode:'cover',width:'100%',height:110,}}/>
            <View style={{flex:3,marginRight: '10%',marginLeft: '5%',}}>
              <Text style={styles.activityTitle}>Trip to Sahara Desert</Text>
              <Text style={styles.status}>On Going</Text>
                <View style={{marginTop:10, marginBottom:5, width:'100%',flexDirection:'row',}}>
                  <View style={{ flexDirection:'row', marginRight:10 }}>
                    <Image style={styles.icon}source={require('../assets/icons/person.png')}/>
                    <Text style={styles.timeActivity}>
                      5 hari
                    </Text>
                  </View>
                  <View style={{ flexDirection:'row' }}>
                    <Image style={styles.icon}source={require('../assets/icons/calendar.png')}/>
                    <Text style={styles.timeActivity}>
                      20 Oktober 2017
                    </Text>
                  </View>
                </View>
                <Text style={{color:'green', marginRight:3, fontWeight: 'bold', fontSize:18,}}>Rp. 3.000.000</Text> 
            </View> 
          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerBooking}>
            <Image source={require('../assets/images/other-img1.jpg')} style={{flex:1.8,resizeMode:'cover',width:'100%',height:110,}}/>
            <View style={{flex:3,marginRight: '10%',marginLeft: '5%',}}>
              <Text style={styles.activityTitle}>Trip to Sahara Desert</Text>
              <Text style={styles.status}>On Going</Text>
                <View style={{marginTop:10, marginBottom:5, width:'100%',flexDirection:'row',}}>
                  <View style={{ flexDirection:'row', marginRight:10 }}>
                    <Image style={styles.icon}source={require('../assets/icons/person.png')}/>
                    <Text style={styles.timeActivity}>
                      5 hari
                    </Text>
                  </View>
                  <View style={{ flexDirection:'row' }}>
                    <Image style={styles.icon}source={require('../assets/icons/calendar.png')}/>
                    <Text style={styles.timeActivity}>
                      20 Oktober 2017
                    </Text>
                  </View>
                </View>
                <Text style={{color:'green', marginRight:3, fontWeight: 'bold', fontSize:18,}}>Rp. 3.000.000</Text> 
            </View> 
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerBooking: {
    padding:10,
    paddingTop:0,
    paddingBottom:0,
    flexDirection: 'row',
    flex:1
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 15,
    marginBottom: 15,
  },
  activityTitle: {
    fontSize:16,
    marginBottom: 3,
  },
  status: {
    color:'green',
    fontSize:12,
  },
  icon: {
    width:15,
    height:15,
    marginRight:3,
  },
  timeActivity: {
    fontSize:12,
  },
  bottomBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fbfbfb',
    padding: 20,
    borderTopColor: "#efefef",
    borderTopWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
