'use strict';

import React from 'react';
import Button from 'react-native-button';
import * as Formatter from '../../components/Formatter';
import { Icon } from 'react-native-elements';
import { Platform, StyleSheet, TouchableOpacity, Text, View, Image,
  TextInput, ScrollView, Linking } from 'react-native';
import Maps from '../../components/Maps';
// import Moment from 'moment';
// import 'moment/locale/id';

export default class BookedPageDetail extends React.Component {

  constructor (props) {
    super(props);
    this.details = props.navigation.state.params.details;
    this.details.totalPaxCount = 0;
    this.details.paxCount.map( categ => {
      this.details.totalPaxCount += categ.count;
    });
    // this.state = {
    //   timeLeft: Moment(this.details.timeLimit).toNow(),
    // };
    console.warn('call and sms operator blom di tes');
    console.warn('avatar operator dan pax list masih dummy / blm jln');
  }

  // _onContinuePaymentPressed = () => {
  //   this.props.navigation.navigate(
  //     'PaymentScreen', {rsvNo:this.details.rsvNo}
  //   );
  // }

  _viewActivityDetail = () => {
    this.props.navigation.navigate('DetailScreen', {
      details:{
        id: this.details.activityId,
        ...this.details,
      }
    });
  }

  _callOperator = () => Linking.openURL('tel:'+this.details.operatorPhone)
  _smsOperator = () => Linking.openURL('sms:'+this.details.operatorPhone)

  render() {
    let { name, mediaSrc, date, price, city, address, //bookingStatus,
          selectedSession, operatorName, operatorPhone,
          operatorEmail, totalPaxCount, latitude, longitude, paxes,
        } = this.details;
    // let bookingStatusText = bookingStatus;
        // switch (bookingStatus) {
        //   case 'PROC': bookingStatusText = 'dalam progres'; break;
        // }
    return (
      <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
        <View style={[styles.container,{flexDirection:'row'}]}>
          <Image style={[{flex:1},styles.thumbnailMedium]}
            source={{uri: mediaSrc}}
          />
          <View style={{flex:2, paddingLeft:10}}>
            <Text style={[{marginBottom:15},styles.activityTitle]}>
              {name}
            </Text>
            <View style={{flexDirection: 'row', marginBottom:5}}>
              <Icon
                name='event'
                type='materialicons'
                size={16}
                color='#454545'/>
              <Text style={{marginTop:1, marginLeft:10,fontSize:12}}>
                {Formatter.dateFullLong(date)}
              </Text>
            </View>
    { (selectedSession) &&
            <View style={{flexDirection: 'row', marginBottom:5}}>
              <Icon
                name='access-time'
                type='materialicons'
                size={16}
                color='#454545'
              />
              <Text style={{marginTop:1, marginLeft:10,fontSize:12}}>
                {selectedSession}
              </Text>
            </View>
    }
            <View style={{flexDirection: 'row', marginBottom:5}}>
              <Icon
                name='location'
                type='entypo'
                size={16}
                color='#454545'
              />
              <Text style={{marginTop:1, marginLeft:10,fontSize:12}}>
                {city}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={this._viewActivityDetail}>
            <Text style={{flex:0.5, alignItems:'flex-end',fontSize:12, color:'#676767',}}>
              Detail
            </Text>
          </TouchableOpacity>
        </View>{/* end container */}
        <View style={styles.divider}/>
        <View style={styles.container}>
          <View style={{flex:1, flexDirection:'row'}}>
            <Text style={styles.activityTitle}>
              Operator Detail
            </Text>
            <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
              <TouchableOpacity onPress={this._callOperator}>
                <Image style={{width:40, height:40, resizeMode:'cover', marginRight:10 }} source={require('../../../assets/images/phone.png')}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._smsOperator}>
                <Image style={{width:40, height:40, resizeMode:'cover', }} source={require('../../../assets/images/sms.png')}/>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
            <Image style={[styles.avatar,{marginRight:10}]} source={require('../../../assets/images/janedoe.jpg')}/>
            <View>
              <Text style={{fontWeight:'bold', fontSize:16, color:'#454545'}}>
                {operatorName}
              </Text>
              <Text style={{fontSize:13, color:'#454545'}}>
                {operatorPhone} - {operatorEmail}
              </Text>
            </View>
          </View>
        </View>{/* end container */}
        {/*<View style={styles.divider}/>
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
            <Text style={{flex:1,fontSize:12, color:'#454545',}}>
              Total yang harus dibayar
            </Text>
            <Text style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end',fontSize:12}}>
              {Formatter.price(price)}
            </Text>
          </View>
          <View style={{flex:1, flexDirection:'row', marginTop:5}}>
            <Text style={{flex:1,fontSize:12, color:'#454545',}}>
              Sisa waktu pembayaran
            </Text>
            <Text style={{flex:1, alignItems:'flex-end', justifyContent:'flex-end',fontSize:12, color:'#00c8be'}}>
              {this.state.timeLeft}
            </Text>
          </View>
        </View>{/* end container */}
        {/*<View style={styles.divider}/>
        <View style={styles.container}>
          <View style={{flex:1,}}>
            <Text style={styles.activityTitle}>
              Kode verifikasi anda
            </Text>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
              <Image style={[{marginTop:30, marginBottom:10},styles.barcode]}
                source={require('../../../assets/images/barcode.jpg')} />
              <Text style={{fontWeight:'bold', fontSize:16}}>
                DUMMYNO J092374932
              </Text>
            </View>
          </View>
        </View>{/* end container */}
        <View style={styles.divider}/>
        <View style={[styles.container,{flex:1,}]}>
          <Text style={styles.activityTitle}>
            Lokasi Appointment
          </Text>
          <Maps lat={latitude} long={longitude} name={name}
            address={address} city={city} {...this.props} />
        </View>{/* end container */}
        <View style={styles.divider}/>
        <View style={styles.container}>
          <View>
            <Text style={[styles.activityTitle,{marginBottom:10}]}>
              Peserta: {totalPaxCount} orang
            </Text>
            {paxes && paxes.map( pax =>
              <TouchableOpacity style={{
                flexDirection:'row',
                justifyContent: 'space-between',
                borderBottomColor: '#efefef',
                borderBottomWidth:1,
                paddingBottom:20,
                marginTop:20
              }}>
                <Text>{pax.firstName + ' ' + pax.lastName}</Text>
                <Icon
                  name='chevron-thin-right'
                  type='entypo'
                  size={20}
                  color='#707070'/>
              </TouchableOpacity>
            )}
          </View>
          {/*<View style={{marginTop:25,}}>
            <Text style={styles.activityTitle}>
              Hal yang Perlu Diperhatikan
            </Text>
            <Text style={{marginTop:8,fontSize:13, color:'#454545',}}>
              Arung jeram dapat diikuti oleh peserta dewasa, remaja dana anak-anak berusia di atas 12 tahun.
            </Text>
          </View>*/}
        </View>{/* end container */}
      </ScrollView>
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
