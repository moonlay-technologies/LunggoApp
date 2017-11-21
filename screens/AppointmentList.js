'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Panel from '../components/Panel';
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
    title: 'List Appointment',
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
              <Text style={styles.activityTitle}>4 Guest</Text>
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
              <View style={{marginTop:10,}}>
                <Text style={styles.status}>3 days remaining</Text>
              </View>
            </View>

            <View style={{flex:1}}>
              <View style={{marginTop:10, alignItems:'flex-end'}}>
                <Text style={styles.status}>lihat detail</Text>
              </View>
            </View> 

          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerListAppointment}>

            <View style={{flex:3}}>
              <Text style={styles.activityTitle}>2 Guest</Text>
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
              <View style={{marginTop:10,}}>
                <Text style={styles.status}>3 days remaining</Text>
              </View>
            </View>

            <View style={{flex:1}}>
              <View style={{marginTop:10, alignItems:'flex-end'}}>
                <Text style={styles.status}>lihat detail</Text>
              </View>
            </View> 

          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerListAppointment}>

            <View style={{flex:3}}>
              <Text style={styles.activityTitle}>10 Guest</Text>
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
              <View style={{marginTop:10,}}>
                <Text style={styles.status}>3 days remaining</Text>
              </View>
            </View>

            <View style={{flex:1}}>
              <View style={{marginTop:10, alignItems:'flex-end'}}>
                <Text style={styles.status}>lihat detail</Text>
              </View>
            </View> 

          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerListAppointment}>

            <View style={{flex:3}}>
              <Text style={styles.activityTitle}>5 Guest</Text>
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
              <View style={{marginTop:10,}}>
                <Text style={styles.status}>3 days remaining</Text>
              </View>
            </View>

            <View style={{flex:1}}>
              <View style={{marginTop:10, alignItems:'flex-end'}}>
                <Text style={styles.status}>lihat detail</Text>
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
