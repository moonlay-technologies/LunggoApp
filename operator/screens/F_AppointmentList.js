'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import DatePicker from 'react-native-datepicker'

export default class LoginScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Appointment List',
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.nominalBesar1}>Total Pendapatan</Text>
          <Text style={styles.nominalBesar}>*Rp 1.300.000* </Text>
          <View style={{marginTop:10, alignItems:'center'}}>
            <Text style={styles.activityDesc}>*Total yang sudah dibayar:<Text style={styles.nominalKecil}> Rp 300.000* </Text></Text>
            <View style={{marginTop:3}}>
              <Text style={styles.activityDesc}>*Periode (02-01-2017 - 12-08-2018)*</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={{flexDirection:'row'}}>
          <View style={{flex:1, alignItems:'center'}}>
             <DatePicker
              style={styles.containerTanggal}
              date="2016-05-15"
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderRadius: 3,
                  borderColor: '#cdcdcd',
                  height:35,
                },
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
           </View>
           <View style={{justifyContent:'center'}}>
             <Text>-</Text>
           </View>
           <View style={{flex:1, alignItems:'center'}}> 
             <DatePicker
              style={styles.containerTanggal}
              date="2016-05-15"
              mode="date"
              placeholder="select date"
              format="YYYY-MM-DD"
              minDate="2016-05-01"
              maxDate="2016-06-01"
              showIcon={false}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateInput: {
                  borderRadius: 3,
                  borderColor: '#cdcdcd',
                  height:35,
                },
              }}
              onDateChange={(date) => {this.setState({date: date})}}
            />
           </View>
        </View>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.boxReservation}>  
          <View style={{marginRight:10, width:'20%' }}>
            <Image style={{ height: 55, width:'100%',}} source={require('../../assets/images/bg1.jpg')} />
          </View>
          <View style={{width:'80%'}}>
            <Text style={styles.activityTitle}>
              *Jalan-Jalan Ke Bali*
            </Text>
            <View>
              <Text style={styles.activityTanggal}>*Tanggal Aktifitas: 10-11-2018*</Text>
            </View>
            <View>
              <Text style={styles.activityDesc}>*4 dewasa, 2 anak-anak*</Text>
            </View>
            
            <View>
              <Text style={styles.activityTanggal}>*Yang sudah dibayar:<Text style={styles.nominalKecil}> Rp 520.000</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.activityTanggal}>*Total Pembayaran:<Text style={styles.nominalKecil}> Rp 1.000.000</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.boxReservation}>  
          <View style={{marginRight:10, width:'20%' }}>
            <Image style={{ height: 55, width:'100%',}} source={require('../../assets/images/other-img4.jpg')} />
          </View>
          <View style={{width:'80%'}}>
            <Text style={styles.activityTitle}>
              *Jalan-Jalan Ke Surabaya*
            </Text>
            <View>
              <Text style={styles.activityTanggal}>*Tanggal Aktifitas: 10-11-2018*</Text>
            </View>
            <View>
              <Text style={styles.activityDesc}>*4 dewasa, 2 anak-anak*</Text>
            </View>
            
            <View>
              <Text style={styles.activityTanggal}>*Yang sudah dibayar:<Text style={styles.nominalKecil}> Rp 520.000</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.activityTanggal}>*Total Pembayaran:<Text style={styles.nominalKecil}> Rp 1.000.000</Text>
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.divider}></View>


         
      </ScrollView>
    );
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
  nominalBesar1:{
    fontFamily: 'Hind',
    fontSize: 18,
    color: '#454545',
    ...Platform.select({
      ios: {
        height:22
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
        height:45
      },
      android: {
        lineHeight: 20,
        marginBottom:5,
      },
    }),
  },
  activityTitle: {
    fontFamily: 'HindSemiBold',
    fontSize: 17,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 10,
        marginBottom: -12,
      },
      android: {
        lineHeight: 24,

      },
    }),
  },
  activityDesc: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'HindLight',
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
    fontFamily: 'HindLight',
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
