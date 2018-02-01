'use strict';

import React from 'react';
import Button from 'react-native-button';
import * as Formatter from '../../components/Formatter';
import { Icon } from 'react-native-elements';
import { Platform, StyleSheet, TouchableOpacity, Text, View, Image,
  TextInput, ScrollView, } from 'react-native';
import Moment from 'moment';
import 'moment/locale/id';

export default class BookedPageDetail extends React.Component {

  constructor (props) {
    super(props)
    // const { details } = this.props.navigation.state.params;
    // this.state = details;
    this.state = this.props.navigation.state.params.details;
    this.state.timeLeft = Moment(this.state.timeLimit).toNow();
  }

  _onContinuePaymentPressed = () => {
    this.props.navigation.navigate(
      'WebViewScreen', {rsvNo:this.state.rsvNo}
    );
  }

  render() {
    let {name, mediaSrc, date, bookingStatus, price, timeLeft, city,
          selectedSession } = this.state;
    let bookingStatusText = 'booking status';
    // switch (bookingStatus) {
    //   case 'PROC': bookingStatusText = 'dalam progres'; break;
    // }
    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <ScrollView style={{}}>
          <View style={styles.container}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Image style={styles.thumbnailMedium}
                  source={{uri: mediaSrc}}
                />
              </View>
              <View style={{flex:2, paddingLeft:10}}>
                <View style={{marginBottom:15}}>
                  <Text style={styles.activityTitle}>
                    {name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginBottom:5}}>
                  <View>
                    <Icon
                    name='event'
                    type='materialicons'
                    size={16}
                    color='#454545'/>
                  </View>
                  <View style={{marginTop:1, marginLeft:10}}>
                    <Text style={{fontSize:12}}>
                      {Formatter.dateFullLong(date)}
                    </Text>
                  </View>
                </View>
          { (selectedSession) ?
                <View style={{flexDirection: 'row', marginBottom:5}}>
                  <View style={{}}>
                    <Icon
                    name='access-time'
                    type='materialicons'
                    size={16}
                    color='#454545'/>
                  </View>
                  <View style={{marginTop:1, marginLeft:10}}>
                    <Text style={{fontSize:12}}>
                      {selectedSession}
                    </Text>
                  </View>
                </View>
            :
            null
          }
                <View style={{flexDirection: 'row', marginBottom:5}}>
                  <View style={{}}>
                    <Icon
                    name='location'
                    type='entypo'
                    size={16}
                    color='#454545'/>
                  </View>
                  <View style={{marginTop:1, marginLeft:10}}>
                    <Text style={{fontSize:12}}>
                      {city}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{flex:0.5, alignItems:'flex-end'}}>
                <Text style={{fontSize:12, color:'#676767',}}>
                  Detail
                </Text>
              </View>
            </View>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <View style={{flex:1, flexDirection:'row'}}>
              <View>
                <Text style={styles.activityTitle}>
                  Operator Detail
                </Text>
              </View>
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <TouchableOpacity>
                  <Image style={{width:40, height:40, resizeMode:'cover', marginRight:10 }} source={require('../../../assets/images/phone.png')}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image style={{width:40, height:40, resizeMode:'cover', }} source={require('../../../assets/images/sms.png')}/>
                </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{marginRight:10}}>
                <Image style={styles.avatar} source={require('../../../assets/images/janedoe.jpg')}/>
              </View>
              <View>
                <Text style={{fontWeight:'bold', fontSize:16, color:'#454545'}}>Jane Doe</Text>
                <Text style={{fontSize:13, color:'#454545'}}>Jl. sentul utara no.30, Bogor</Text>
              </View>
            </View>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <View style={{flex:1, flexDirection:'row',}}>
              <View>
                <Text style={styles.activityTitle}>
                  Status
                </Text>
                <Text style={styles.status}>
                  {bookingStatusText}
                </Text>
              </View>
              <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Button
                  containerStyle={{height:35, width:'70%', paddingTop:10, paddingBottom:10, borderRadius:4, backgroundColor: '#00c8be'}}
                  style={{fontSize: 12, color: '#fff', fontWeight:'bold'}}
                  onPress={this._onContinuePaymentPressed}
                >
                Lanjut Bayar
                </Button>
              </View>
            </View>
            <View style={{flex:1, flexDirection:'row', marginTop:25}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:12, color:'#454545',}}>Total yang harus dibayar</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Text style={{fontSize:12}}>
                  {Formatter.price(price)}
                </Text>
              </View>
            </View>
            <View style={{flex:1, flexDirection:'row', marginTop:5}}>
              <View style={{flex:1}}>
                <Text style={{fontSize:12, color:'#454545',}}>Sisa waktu pembayaran</Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Text style={{fontSize:12, color:'#00c8be'}}>
                  {timeLeft}
                </Text>
              </View>
            </View>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <View style={{flex:1,}}>
              <View>
                <Text style={styles.activityTitle}>
                  Kode verifikasi anda
                </Text>
              </View>
              <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <View style={{marginTop:30, marginBottom:10}}>
                  <Image style={styles.barcode} source={require('../../../assets/images/barcode.jpg')}/>
                </View>
                <View>
                  <Text style={{fontWeight:'bold', fontSize:16}}>AJ20090189</Text>
                </View>
              </View>
            </View>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <View style={{flex:1,}}>
              <View>
                <Text style={styles.activityTitle}>
                  Lokasi Appointment
                </Text>
                <Text style={{marginTop:10}}>Disini ada maps</Text>
              </View>
            </View>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <View>
              <View style={{marginBottom:10}}>
                <Text style={styles.activityTitle}>
                  Guest List (2)
                </Text>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', borderBottomColor: '#efefef', borderBottomWidth:1, paddingBottom:20, marginTop:20}}>
                <View><Text>Guest 1</Text></View>
                <View>
                  <Icon
                    name='chevron-thin-right'
                    type='entypo'
                    size={20}
                    color='#707070'/>
                </View>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', borderBottomColor: '#efefef', borderBottomWidth:1, paddingBottom:20, marginTop:20}}>
                <View><Text>Guest 2</Text></View>
                <View>
                  <Icon
                    name='chevron-thin-right'
                    type='entypo'
                    size={20}
                    color='#707070'/>
                </View>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', borderBottomColor: '#efefef', borderBottomWidth:1, paddingBottom:20, marginTop:20}}>
                <View><Text>Guest 3</Text></View>
                <View>
                  <Icon
                    name='chevron-thin-right'
                    type='entypo'
                    size={20}
                    color='#707070'/>
                </View>
              </View>
            </View>
            <View style={{marginTop:25,}}>
              <Text style={styles.activityTitle}>
                Hal yang Perlu Diperhatikan
              </Text>
              <View style={{marginTop:8}}>
                <Text style={{fontSize:13, color:'#454545',}}>
                  Arung jeram dapat diikuti oleh peserta dewasa, remaja dana anak-anak berusia di atas 12 tahun.
                </Text>
              </View>
            </View>
          </View>{/* end container */}
        </ScrollView>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    backgroundColor: '#fff',
    flex:1
  },
  thumbnailMedium: {
    resizeMode:'cover', 
    width:'100%', 
    height:100, 
    borderRadius:5,
  },
  thumb: {
    resizeMode:'cover', 
    width:'100%', 
    height:170,
  },
  activityTitle: {
    fontWeight:'bold',
    fontSize:15,
    color:'#454545',
  },
  status:{
    color:'#f19a4b',
    fontSize:12,
    marginTop:2,
  },
  descriptionActivity: {
    fontSize:11,
    marginTop:0,
    color:'blue'
  },
  avatar:{
    width:40, 
    height:40, 
    resizeMode:'cover', 
    borderRadius:20
  },
  barcode:{
    width:130, 
    height:130, 
    resizeMode:'cover',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 5,
    marginBottom: 5,
  },
});
