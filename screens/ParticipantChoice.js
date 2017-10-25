'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Panel from '../components/Panel';
import Button from 'react-native-button';
import { CheckBox } from 'react-native-elements'

import {
  Platform, StyleSheet,
  Text, View, Image, TextInput, ScrollView,
} from 'react-native';

export default class ParticipantChoice extends Component {

  static navigationOptions = {
    title: 'Pilih Peserta',
  };

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
    };
  }

  postData = () => {
    let domain = 'http://travorama-local-api.azurewebsites.net';
    // let domain = 'api.travorama.com';
    let url = domain + '/v1/activities/book';
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        activityId: 1,
        contact: {
          title: 1,
          name: "Tony",
          countryCallCd: 62,
          phone : 1234567890,
          email: "developer@travelmadezy.com",
        },
        pax: [
          {
            type : 1,
            title : 1,
            name : "guest 1",
            dob : "02-18-1997",
            nationality : "ID",
            passportNo : "1234567",
            passportExp : "02-18-2022",
            passportCountry : "en",
          }
        ],
        // date: this.props.navigation.state.params.date,
      })
    });
  }

  render() {
    return (
      //<Image style={styles.detailimg}source={require('../assets/images/detailimg.jpg')}/>
      <View style={styles.container}>

        <ScrollView style={{marginBottom:60,marginTop:60,}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox style={{backgroundColor:'#ffffff'}} title='Ali Zainal' checked={this.state.checked} />
              <View style={{alignItems: 'flex-end', flex:1, marginTop:3,}}>
                <Text>Edit</Text>
              </View>
            </View>
            <View style={styles.divider}/>
            <View style={{flexDirection: 'row'}}>
              <CheckBox style={{backgroundColor:'#ffffff'}} title='Guest1' checked={this.state.checked} />
              <View style={{alignItems: 'flex-end', flex:1, marginTop:3,}}>
                <Text>Edit</Text>
              </View>
            </View>
            <View style={styles.divider}/>
            <View style={{flexDirection: 'row'}}>
              <CheckBox style={{backgroundColor:'#ffffff'}} title='Guest2' checked={this.state.checked} />
              <View style={{alignItems: 'flex-end', flex:1, marginTop:3,}}>
                <Text>Edit</Text>
              </View>
            </View>
            <View style={styles.divider}/>
            <Button
              containerStyle={{height:35, flex:1, paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
              style={{fontSize: 12, color: '#ffffff'}}
              // onPress={() => this._handlePress()}
            >
              Tambah Guest
            </Button>
          </View>
        </ScrollView>

        {/*bottom CTA button*/}
        <View style={styles.bottomBarContainer}>
          <View style={{alignItems: 'flex-start', flex:1}}>
            <Text style={{marginRight:5, fontSize:12,}}>1 Peserta</Text> 
            <Text style={{color:'green', marginRight:3, fontWeight: 'bold', fontSize:15,}}>Rp. 3.000.000</Text> 
          </View>
          <View style={{alignItems: 'flex-end', flex:1}}>
            <Button
              containerStyle={{height:35, width:120, paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
              style={{fontSize: 12, color: '#ffffff'}}
              onPress={() => this.postData()}
              //onPress={() => this.props.navigation.navigate(
              //  'CalendarView', { date: this.props.navigation.state.params.date }
              //)}
            >
              Tambah ke Troli
            </Button>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    paddingBottom:40,
    backgroundColor: '#fff',
    flex:1,
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
   divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 15,
    marginBottom: 15,
  },
});
