'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Panel from '../components/Panel';
import Button from 'react-native-button';
import { Slider } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-elements'


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
    title: 'Appointment Request',
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
      <ScrollView style={{paddingTop:80, backgroundColor: '#fff',}}>
        <View style={{flex:1,}}>

          <View style={styles.containerListAppointment}>

            <View style={{flex:3}}>
              <Text style={styles.activityGuest}>Ali Zainal</Text>
              <Text style={styles.activityTitle}>Banana Boat</Text>
              <View style={{width:'100%',flexDirection:'row',}}>
                <View style={{ flexDirection:'row', marginRight:10 }}>
                  <Text style={styles.timeActivity}>
                    Saturday, 10 November 2017
                  </Text>
                </View>
                <View style={{ flexDirection:'row' }}>
                  <Text style={styles.timeActivity}>
                    10.00 AM
                  </Text>
                </View>
              </View>
            </View>

            <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end', marginTop:10}}>
              <View style={{paddingRight:10}}>
                <Icon
                  name='check'
                  type='font-awesome'
                  color='#fff'
                  containerStyle={{backgroundColor:'#4285f4', borderRadius:30, padding:10}}
                  />
              </View>
              <View style={{}}>
                <Icon
                  name='check'
                  type='font-awesome'
                  color='#fff'
                  containerStyle={{backgroundColor:'#ef4f41', borderRadius:60, padding:10}}/>
              </View>
            </View> 

          </View>

          <View style={styles.divider}></View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerListAppointment: {
    padding:20,
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
    fontSize:14,
    marginBottom: 3,
  },
  activityGuest: {
    fontSize:18,
    marginBottom: 3,
    fontWeight:'bold'
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
    fontSize:11,
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
