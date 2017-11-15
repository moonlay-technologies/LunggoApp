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
    title: 'Detail Appointment',
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

              <Text style={styles.activityTitle}>Banana Boat</Text>
              <View style={{width:'100%',flexDirection:'row',}}>
                <View style={{ marginRight:10 }}>
                  <Text style={styles.timeActivity}>
                    Saturday, 10 November 2017
                  </Text>
                </View>
                <View>
                  <Text style={styles.timeActivity}>
                    10.00 AM
                  </Text>
                </View>
              </View>

              <View style={{flexDirection:'row', marginTop:7}}>
                <View style={{alignItems:'flex-start',}}>
                  <Icon
                    name='users'
                    type='entypo'
                    color='#517fa4'
                    size={15}
                  />
                </View>
                <View style={{marginLeft:8}}>
                  <Text>4 guest</Text>
                </View>
              </View>

              <View style={{marginTop:25,}}>
                <View style={{flexDirection:'row',}}>
                  <View style={{alignItems:'flex-start',}}>
                    <Icon
                      name='check'
                      type='entypo'
                      color='#517fa4'
                      size={15}
                    />
                  </View>
                  <View style={{marginLeft:8}}>
                    <Text>Penguin North Verified 09182309</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row', marginTop:12}}>
                  <View style={{alignItems:'flex-start',}}>
                    <Icon
                      name='check'
                      type='entypo'
                      color='#517fa4'
                      size={15}
                    />
                  </View>
                  <View style={{marginLeft:8}}>
                    <Text>Penguin North Verified 09182309</Text>
                  </View>
                </View>
              </View>

            </View>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerListAppointment}>
            <View style={{flex:1}}>

              <View style={{flexDirection:'row', marginBottom:20,}}>
                <View style={{alignItems:'flex-start',}}>
                  <Icon
                    name='users'
                    type='entypo'
                    color='#517fa4'
                    size={15}
                  />
                </View>
                <View style={{marginLeft:8,}}>
                  <Text style={{fontWeight:'bold', fontSize:16}}>Guest Detail</Text>
                </View>
              </View>

              <Text>Flamingo Bird</Text>
              <Text>6 orang</Text>
              <View style={{marginTop:7, marginBottom:3}}>
                <Text style={{fontWeight:'bold'}}>Pesan Khusus:</Text>
              </View>
              <Text>Eat all the power cords give attitude, where is my slave? I'm getting hungry meow for food, then when human fills</Text>
              
              <View style={{flexDirection:'row', marginTop:18}}>
                <View style={{flex:3, paddingRight:10}}>
                  <TextInput
                    underlineColorAndroid= 'transparent'
                    style={styles.txtInput}
                    onChangeText={ name => this.setState({name}) }
                    value={this.state.name}
                    placeholder="masukan kode verifikasi"
                  />
                </View>
                <View style={{flex:1}}>
                  <Button
                    containerStyle={{
                      height: 40,
                      paddingTop: 10,
                      paddingBottom :10,
                      overflow: 'hidden',
                      borderRadius: 4,
                      backgroundColor: '#437ef7',
                    }}
                    style={{fontSize: 14, color: '#ffffff'}}
                    >
                    Tambahkan
                  </Button>
                </View>
              </View>

              <View style={{marginTop:40, alignItems:'center'}}>
                <Button
                    containerStyle={{
                      height: 50,
                      width:50,
                      paddingTop: 10,
                      paddingBottom :10,
                      overflow: 'hidden',
                      borderRadius: 50,
                      backgroundColor: '#437ef7',
                    }}
                    style={{fontSize: 14, color: '#ffffff'}}
                    >
                  </Button>
                  <View style={{marginTop:8}}>
                    <Text>Scan Barcode</Text>
                  </View>
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
  txtInput: {
    height: 40, 
    borderColor: '#cdcdcd', 
    borderWidth: 1,
    borderRadius: 4,
    paddingRight:10, 
    paddingLeft:10, 
    marginBottom:20,
    fontSize:14
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
