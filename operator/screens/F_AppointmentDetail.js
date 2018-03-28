'use strict';

import React from 'react';
import Button from 'react-native-button';
import {
  Platform, StyleSheet, Text, View, Image, TouchableOpacity,
  ScrollView, FlatList,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import { dateFullShort, rupiah } from '../../customer/components/Formatter';
import {
  getPaxCountText, getPaymentSumInSteps as getPaymentInfo,
  getPaymentSumInReservations as getPaymentSum,
} from '../../commons/otherCommonFunctions';


export default class F_AppointmentDetail extends React.Component {

  static navigationOptions = {
    title: 'Appointment Detail',
  }

  _keyExtractor = (item, index) => index
  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      {...this.props}
    />
  )

  render() {
    let {details} = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container}>
        <View style={[styles.center,{paddingHorizontal:15}]}>
          <Text style={styles.activityTitle}>{details.name}</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.activityDesc}>
            {dateFullShort(details.date)}{details.session&&' pk. '+details.session}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={{flexDirection:'row', paddingHorizontal:15}}>
          <View style={{flex:1,}}>
            <Text style={styles.activityDesc}>Yang sudah dibayar:</Text>
            <Text style={styles.activityDesc}>Total Pendapatan:</Text>
          </View>
          <View style={{flex:1, alignItems:'flex-end'}}> 
            <Text style={styles.nominalKecil}>
              {getPaymentSum(details.reservations,'completed')}
            </Text>
            <Text style={styles.nominalKecil}>
              {getPaymentSum(details.reservations)}
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <FlatList
          style={{paddingTop:15}}
          data={details.reservations}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </ScrollView>
    );
  }
}


class ListItem extends React.PureComponent {

  // _goToFAppointmentDetail = () => this.props.navigation.navigate(
  //   'F_AppointmentDetail', {details: this.props.item}
  // )

  render() {
    let {item} = this.props;
    return (
      <View>
        <TouchableOpacity style={styles.boxReservation}>  
          <View style={styles.containerAvatar}>
            <Text style={styles.avatar}>
              {item.contact.name.substr(0,1)}
            </Text>
          </View>
          <View style={{width:'80%'}}>
            <Text style={styles.namaPax}>{item.contact.name}</Text>
            <Text style={styles.activityDesc}>
              {getPaxCountText(item.paxCount)}
            </Text>
           {/*<Text style={styles.activityTanggal}>*Tanggal Pesanan: 10-11-2018*</Text>*/}
            <Text style={styles.activityTanggal}>
              Yang sudah dibayar:
              <Text style={styles.nominalKecil}> {getPaymentInfo(item.paymentSteps,'completed')}</Text>
            </Text>
            <Text style={styles.activityTanggal}>
              Total Pembayaran:
              <Text style={styles.nominalKecil}> {getPaymentInfo(item.paymentSteps)}</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical:20,
    backgroundColor: '#fff',
    flex:1,
  },
  center:{
    alignItems:'center',
  },
  boxReservation:{
    paddingHorizontal:15,
    flexDirection:'row',
    flex:1,
    width:'100%',
  },
  containerAvatar:{
    width:40,
    height:40,
    borderRadius:20,
    backgroundColor:'#00d3c5',
    alignItems:'center',
    justifyContent:'center',
    marginRight:10
  },
  avatar:{
    color:'#fff',
    fontWeight:'bold'
  },
  nominalBesar:{
    fontFamily: 'Hind',
    fontSize: 35,
    color: '#00d3c5',
    ...Platform.select({
      ios: {
        height:45
      },
      android: {
        lineHeight: 30,
        marginBottom:5,
        paddingBottom:8
      },
    }),
  },
  nominalKecil:{
    fontFamily: 'Hind',
    fontSize: 15,
    color: '#00d3c5',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 9,
        marginBottom: -10,
      },
      android: {
        lineHeight: 20,
        marginBottom:5,
      },
    }),
  },
  activityTitle: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 24,
    color: '#454545',
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight: 18,
        paddingTop: 15,
        marginBottom: -15,
      },
      android: {
        lineHeight: 24,

      },
    }),
  },
  activityDesc: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind-Light',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 9,
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  namaPax: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 9,
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
   activityTanggal: {
    fontSize: 15  ,
    color: '#636363',
    fontFamily: 'Hind-Light',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 9,
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  status: {
    fontSize: 15,
    color: '#f57b76',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 9,
        marginBottom: -10
      },
      android: {

      },
    }),
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#e1e1e1',
    marginVertical:15
  },
  containerTanggal: {
    width: '90%',
  },
});
