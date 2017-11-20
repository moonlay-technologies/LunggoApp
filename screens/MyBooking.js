'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import { Slider, CheckBox } from 'react-native-elements'
import {
  Platform, StyleSheet,
  Text, View, Image, TextInput, ScrollView,
} from 'react-native';
import {fetchTravoramaApi, AUTH_LEVEL} from '../components/Common';

export default class MyBookingScreen extends Component {

  static navigationOptions = {
    title: 'Pesananku',
  };

  constructor (props) {
    super(props)
    this.state = {bookingList: []};
  }

  componentDidMount() {
    console.log('authlvl')
    console.log(AUTH_LEVEL)
    const version = 'v1';
    let request = {
      path: `/${version}/activities/mybooking`,
      requiredAuthLevel: AUTH_LEVEL.Guest,
    }
    fetchTravoramaApi(request).then( response => {
      this.setState({bookingList: response.myBookings});
      console.log(response)
    }).catch(error => console.log(error));
  }

  render() {

    const bookingListItem = bookingItem =>
      <View>
        <View style={styles.divider}></View>
        <View style={styles.containerBooking}>
          <Image source={{uri: bookingItem.mediaSrc}} style={{
            flex: 1.8,
            resizeMode: 'cover',
            width: '100%',
            height: 110,
          }}/>
          <View style={{flex:3,marginRight: '10%',marginLeft: '5%',}}>
            <Text style={styles.activityTitle}>
              {bookingItem.name}
            </Text>
            <Text style={styles.status}>{bookingItem.bookingStatus}</Text>
            <View style={{
              marginTop: 10,
              marginBottom: 5,
              width: '100%',
              flexDirection:'row',
            }}>
              <View style={{ flexDirection:'row', marginRight:10 }}>
                <Image style={styles.icon}
                  source={require('../assets/icons/person.png')}/>
                <Text style={styles.timeActivity}>
                  {/*bookingItem.paxCount*/} peserta
                </Text>
              </View>
              <View style={{ flexDirection:'row' }}>
                <Image style={styles.icon}
                  source={require('../assets/icons/calendar.png')}/>
                <Text style={styles.timeActivity}>
                  {/*bookingItem.duration.count +' '+ bookingItem.duration.unit*/}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection:'row' }}>
              <Image style={styles.icon}
                source={require('../assets/icons/calendar.png')}/>
              <Text style={styles.timeActivity}>
                {bookingItem.date}
              </Text>
            </View>
          </View> 
        </View>
      </View>

      console.log("this.state.bookingList :")
      console.log(this.state.bookingList)
    return (
      <ScrollView style={{flex:1, backgroundColor: '#fff',}}>

      {/* Tab Button

        <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#fff',
          marginTop:10,
        }}>
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
        
      */}

        <View style={{marginBottom:10}}>
          {this.state.bookingList.map(item => bookingListItem(item))}
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
});
