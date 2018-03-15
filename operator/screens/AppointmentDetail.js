'use strict';

import React from 'react';
import Button from 'react-native-button';
import { Icon } from 'react-native-elements'
import {
  Platform, StyleSheet, Text, View,
  Image, TextInput, ScrollView, TouchableHighlight,
} from 'react-native';
import { LinearGradient } from 'expo';
import * as Formatter from '../../customer/components/Formatter';
import Moment from 'moment';
import 'moment/locale/id';

export default class AppointmentDetail extends React.Component {

  static navigationOptions = {
    title: 'Detail Appointment',
  };

  render() {
    let { details } = this.props.navigation.state.params;
    // let {paxGroups} = details;
    return (
      <ScrollView style={{backgroundColor: '#fff',}}>
        <View style={{flex:1,}}>

          <View style={styles.containerListAppointment}>
            <View style={{flex:1}}>

              <Text style={styles.activityTitle}>
                {details.name}
              </Text>
              <View style={{width:'100%',flexDirection:'row', marginTop:3}}>
                <View style={{ marginRight:10 }}>
                  <Text style={styles.activityDesc}>
                    {Moment(details.date).format('ddd, D MMM YYYY')}
                  </Text>
                </View>
                <View >
                  <Text style={styles.activityDesc}>
                    {details.session}
                  </Text>
                </View>
              </View>

              <View style={{flexDirection:'row', marginTop:5}}>
                <View style={{alignItems:'flex-start',}}>
                  <Icon
                    name='ios-people'
                    type='ionicon'
                    color='#454545'
                    size={22}
                  />
                </View>
                <View style={{marginLeft:8}}>
                  <Text style={styles.activityDesc}>
                    Total {details.totalPax} orang peserta
                  </Text>
                </View>
              </View>



              { details.reservations.map( rsv =>
                <TouchableHighlight
                  key={rsv.rsvNo}
                  onPress={this._onPress}
                  underlayColor='#ddd'
                >
                  <View style={{flexDirection:'row', marginTop:20,}}>
                    <View>
                      <View>
                        <Text style={styles.activityTitle}>{rsv.contact.name}</Text>
                        <Text style={styles.activityDesc}>{Formatter.paxCount(rsv.paxCount)}</Text>
                      </View>
                      <Text style={styles.activityDesc}>{rsv.contact.countryCallCd+rsv.contact.phone}</Text>
                      <Text style={styles.activityDesc}>{rsv.contact.email}</Text>
                    </View>

                    <View style={{flex:1, justifyContent:'center'}}>
                      <View style={{marginTop:10, alignItems:'flex-end', }}>
                        <Icon
                          name='chevron-thin-right'
                          type='entypo'
                          size={20}
                          color='#707070'
                        />
                      </View>
                    </View>
                  </View>
                </TouchableHighlight> 
              ) }


{/*paxGroups.map(pg =>
              <View style={{flexDirection:'row', marginTop:40,}}>

                <View style={{flex:1}}>
                  <View>
                    <Text style={styles.activityTitle}>pg.contact.name</Text>
                  </View>
                  <View>
                    <Text style={{color:'#00d3ca', fontSize:13, fontStyle:'italic'}}>Verified</Text>
                    <Text style={{color:'#9a9a9a', fontSize:13, fontStyle:'italic'}}>Waiting for verification</Text>
                  </View>
                </View>

                <View style={{flex:1}}>
                  <View style={{marginTop:10, alignItems:'flex-end'}}>
                    <Icon
                      name='chevron-thin-right'
                      type='entypo'
                      size={24}
                      color='#707070'
                    />
                  </View>
                </View> 

              </View>
              )}

              {/*<View style={{marginTop:25,}}>
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
              </View>*/}

            </View>
          </View>

          <View style={styles.divider}></View>

          <View style={styles.containerListAppointment}>
            <View style={{flex:1}}>
              
              <View>
                <View style={{flex:2,}}>
                  <View style={{marginBottom:10}}>
                    <Text style={styles.label}>Masukkan Kode Verifikasi</Text>
                  </View>
                  
                  <TextInput
                    underlineColorAndroid= 'transparent'
                    style={styles.txtInput}
                    // onChangeText={ name => this.setState({name}) }
                    // value={this.state.name}
                    placeholder="Kode verifikasi"
                  />
                </View>

                <View style={{flex:1, alignItems:'center', width:'100%', justifyContent:'center', marginTop:15}}>
                  <LinearGradient
                    colors={['#00d3c5', '#35eac6', '#6affc6']}
                    start={[0, 0]}
                    end={[1, 0]}
                    style={{ height: 35, paddingTop: 6, alignItems: 'center', borderRadius: 5, width: '50%' }}>
                    <Text style={{
                      backgroundColor: 'transparent',
                      fontSize: 15, color: '#ffffff',
                      fontFamily: 'Hind-Bold',
                    }}>
                      Verifikasi
                    </Text>
                  </LinearGradient>
                </View>
              </View>

{/*              <View style={{marginTop:40, alignItems:'center'}}>
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
              </View>*/}

            </View>
          </View>
          
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerListAppointment: {
    padding:15,
    flexDirection: 'row',
    flex:1
  },
  txtInput: {
    height: 35,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 9,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 5,
    color: '#565656',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Hind',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 15,
    marginBottom: 15,
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
  activityTitle:{
    fontFamily: 'Hind-SemiBold',
    fontSize: 18,
    color: '#454545',
    backgroundColor:'transparent',
    ...Platform.select({
      ios: {
        lineHeight: 19,
        paddingTop:15 ,
        marginBottom: -15,
      },
      android: {
        lineHeight: 30,
        marginBottom:5,
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityDesc: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind-Light',
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 9,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  label: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 9,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  
});
