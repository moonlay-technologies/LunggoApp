'use strict';

import React from 'react';
import { Platform, StyleSheet, Text, View, Image, ScrollView,
  TouchableOpacity
} from 'react-native';

export default class Refund extends React.Component {

  static navigationOptions = {
    title: 'Refund',
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.nominalBesar1}>Total Refund</Text>
          <Text style={styles.nominalBesar}>*Rp 1.300.000* </Text>
          <View style={{marginTop:1, alignItems:'center'}}>
            <View style={{marginTop:3}}>
              <Text style={styles.activityDesc}>*RP 520.000 dalam 3 hari lagi*</Text>
            </View>
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
            <Text style={styles.activityTanggal}>*Pemesan: Ali Zainal*</Text>
            <Text style={styles.activityTanggal}>*Peserta: 2 Dewasa, 3 Anak-anak*</Text>
            <Text style={styles.activityTanggal}>*Batas akhir refund: 10-11-2018*</Text>
            <Text style={styles.activityTanggal}>*Yang harus direfund:
              <Text style={styles.nominalKecil}> Rp 520.000</Text>
            </Text>
            
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
    fontFamily: 'Hind-SemiBold',
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
