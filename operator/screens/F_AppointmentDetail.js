'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import DatePicker from 'react-native-datepicker'

export default class LoginScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Appointment Detail',
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.activityTitle}> *Jalan-Jalan Ke Bali*</Text>
        </View>
        <View style={styles.center}>
          <Text style={styles.activityDesc}>*Tanggal Perjalanan: 25-04-2018*</Text>
        </View>
        <View style={styles.divider}></View>
        <View style={{flexDirection:'row', paddingHorizontal:15}}>
          <View style={{flex:1,}}>
            <Text style={styles.activityDesc}>Total Pendapatan:</Text>
            <Text style={styles.activityDesc}>Yang sudah dibayar:</Text>
          </View>
          <View style={{flex:1, alignItems:'flex-end'}}> 
            <Text style={styles.nominalKecil}>*Rp 300.000*</Text>
            <Text style={styles.nominalKecil}>*Rp 300.000*</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.boxReservation}>  
          <View style={styles.containerAvatar}>
            <Text style={styles.avatar}>A</Text>
          </View>
          <View style={{width:'80%'}}>
            <View>
              <Text style={styles.namaPax}>*Ali Zainal*</Text>
            </View>
            <View>
              <Text style={styles.activityDesc}>*4 dewasa, 2 anak-anak*</Text>
            </View>
           {/* <View>
              <Text style={styles.activityTanggal}>*Tanggal Pesanan: 10-11-2018*</Text>
            </View>*/}
            <View>
              <Text style={styles.activityTanggal}>*Yang sudah dibayar:<Text style={styles.nominalKecil}> Rp 520.000</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.activityTanggal}>*Total Pembayaran:<Text style={styles.nominalKecil}> Rp 1.000.000</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.boxReservation}>  
          <View style={styles.containerAvatar}>
            <Text style={styles.avatar}>I</Text>
          </View>
          <View style={{width:'80%'}}>
            <View>
              <Text style={styles.namaPax}>*Badi*</Text>
            </View>
            <View>
              <Text style={styles.activityDesc}>*4 dewasa, 2 anak-anak*</Text>
            </View>
           {/* <View>
              <Text style={styles.activityTanggal}>*Tanggal Pesanan: 10-11-2018*</Text>
            </View>*/}
            <View>
              <Text style={styles.activityTanggal}>*Yang sudah dibayar:<Text style={styles.nominalKecil}> Rp 520.000</Text>
              </Text>
            </View>
            <View>
              <Text style={styles.activityTanggal}>*Total Pembayaran:<Text style={styles.nominalKecil}> Rp 1.000.000</Text>
              </Text>
            </View>
          </View>
        </View>
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
    fontSize: 27,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 26,
        paddingTop: 10,
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
