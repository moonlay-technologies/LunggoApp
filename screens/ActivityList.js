'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Panel from '../components/Panel';
import Button from 'react-native-button';
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
    title: 'Your Activity',
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
            <View style={{flex:1}}>

              <View style={{marginBottom:30,}}>
                <View style={styles.shadow}>
                  <Image style={styles.bigThumb}source={require('../assets/images/detailimg.jpg')}/>
                </View>
                <View style={{marginTop:10}}>
                  <Text style={styles.activityTitle}>Activity Title 1</Text>
                  <Text>Rp 3.000.000</Text>
                </View>
              </View>

              <View style={{marginBottom:30,}}>
                <View style={styles.shadow}>
                  <Image style={styles.bigThumb}source={require('../assets/images/detailimg2.jpg')}/>
                </View>
                <View style={{marginTop:10}}>
                  <Text style={styles.activityTitle}>Activity Title 1</Text>
                  <Text>Rp 3.000.000</Text>
                </View>
              </View>

              <View style={{marginBottom:30,}}>
                <View style={styles.shadow}>
                  <Image style={styles.bigThumb}source={require('../assets/images/detailimg3.jpg')}/>
                </View>
                <View style={{marginTop:10}}>
                  <Text style={styles.activityTitle}>Activity Title 1</Text>
                  <Text>Rp 3.000.000</Text>
                </View>
              </View>

            </View>
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerListAppointment: {
    padding:10,
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
    fontWeight:'bold'
  },
  bigThumb: {
    width:'100%',
    height:200,
    resizeMode: 'cover',
    borderRadius:5,
  },
  shadow: {
    shadowOffset:{  width: 1,  height: 1,  },
    shadowRadius:5,
    shadowColor: 'black',
    shadowOpacity: 0.4,
    backgroundColor:'transparent',
    elevation:2,
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
});
