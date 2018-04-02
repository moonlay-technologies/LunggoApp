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
import DatePicker from 'react-native-datepicker';
import { Icon } from 'react-native-elements';
import Timeline from 'react-native-timeline-listview'

export default class LoginScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Reservation Detail',
  }

  constructor(){
    super()
    this.data = [
      {time: '09:00', title: 'DP 1', description: 'Jumlah: Rp 300.000\nPada tanggal: 1 Jan 2018'},
      {time: '10:45', title: 'DP 2', description: 'Jumlah: Rp 700.000\nPada tanggal: 5 Jan 2018'},
      {time: '12:00', title: 'Lunas', description: 'Jumlah: Rp 1.000.000\nPada tanggal: 5 Jan 2018'},
    ]
  }

  render() {
    return (
      <ScrollView style={styles.container}>

        <View style={styles.boxDetail}>
          <View style={{marginRight:15}}>
            <Icon
              name='ios-bicycle'
              type='ionicon'
              size={26}
              color='#00d3c5' 
            />
          </View>
          <View style={{flex:1}}>
            <Text style={styles.labelHeader}>Detail Aktifitas</Text>
            <View style={{marginTop:3}}>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>*Judul Aktifitas:</Text>
                <Text style={styles.activityDesc}>Liburan ke Bali</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>*Waktu:</Text>
                <Text style={styles.activityDesc}>20 Jan 2018, 12.00-15.00*</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>*Nama Paket:</Text>
                <Text style={styles.activityDesc}>Paket Keluarga besar*</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>*Peserta:</Text>
                <Text style={styles.activityDesc}>5 Dewasa, 2 anak-anak*</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.boxDetail}>
          <View style={{marginRight:15}}>
            <Icon
              name='ios-paper-outline'
              type='ionicon'
              size={26}
              color='#00d3c5' 
            />
          </View>
          <View style={{flex:1}}>
            <Text style={styles.labelHeader}>Detail Pesanan</Text>
            <View style={{marginTop:3}}>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>Nama Pemesan:</Text>
                <Text style={styles.activityDesc}>Ali Zainal Abidin*</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>No. Reservasi:</Text>
                <Text style={styles.activityDesc}>abcde12345*</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>*Tanggal Pesan:</Text>
                <Text style={styles.activityDesc}>1 Jan 2018*</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.boxDetail}>
          <View style={{marginRight:15}}>
            <Icon
              name='ios-cash-outline'
              type='ionicon'
              size={26}
              color='#00d3c5' 
            />
          </View>
          <View style={{flex:1}}>
            <Text style={styles.labelHeader}>Detail Pembayaran  ( State Netral )</Text>
            <View style={{marginTop:3}}>
              <Timeline
                data={this.data}
                showTime={false}
                circleColor={'#ababab'}
                circleSize={12}
                lineWidth={1}
                lineColor={'#e1e1e1'}
                innerCircle={'dot'}
                style={{marginLeft:-15,marginTop:15}}
                rowContainerStyle={{marginLeft:0, paddingLeft:0}}
                detailContainerStyle={{marginTop:-12, paddingBottom:15}}
                titleStyle={styles.activityTitle}
                descriptionStyle={styles.activityDescTimeline}
              />
            </View>
            <Text style={styles.labelHeader}>Detail Pembayaran  ( State Lunas)</Text>
            <View style={{marginTop:3}}>
              <Timeline
                data={this.data}
                showTime={false}
                circleColor={'#00d3c5'}
                circleSize={12}
                lineWidth={1}
                lineColor={'#e1e1e1'}
                innerCircle={'dot'}
                style={{marginLeft:-15,marginTop:15}}
                rowContainerStyle={{marginLeft:0, paddingLeft:0}}
                detailContainerStyle={{marginTop:-12, paddingBottom:15}}
                titleStyle={styles.activityTitle}
                descriptionStyle={styles.activityDescTimeline}
              />
            </View>
            <Text style={styles.labelHeader}>Detail Pembayaran  ( State Batal)</Text>
            <View style={{marginTop:3}}>
              <Timeline
                data={this.data}
                showTime={false}
                circleColor={'#f57b76'}
                circleSize={12}
                lineWidth={1}
                lineColor={'#e1e1e1'}
                innerCircle={'dot'}
                style={{marginLeft:-15,marginTop:15}}
                rowContainerStyle={{marginLeft:0, paddingLeft:0}}
                detailContainerStyle={{marginTop:-12, paddingBottom:15}}
                titleStyle={styles.activityTitle}
                descriptionStyle={styles.activityDescTimeline}
              />
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={styles.labelDesc}>*Total Pembayaran: *</Text>
              <Text style={styles.nominalKecil}>Rp 1.000.000</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={styles.labelDesc}>*Tanggal Pelunasan:*</Text>
              <Text style={styles.activityDesc}>5 Jan 2018</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={styles.labelDesc}>*Batas waktu Pelunasan:*</Text>
              <Text style={styles.activityDesc}>3 Jan 2018</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={styles.labelDesc}>*Status:*</Text>
              <Text style={styles.nominalKecil}>Lunas</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={styles.labelDesc}>*Status:*</Text>
              <Text style={styles.danger}>Belum Lunas</Text>
            </View>
          </View>
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f0f0',
    flex:1,
  },
  center:{
    alignItems:'center',
  },
  boxDetail:{
    backgroundColor:'#fff',
    borderBottomColor:'#e1e1e1',
    borderBottomWidth: 2,
    padding:15,
    flexDirection:'row',
    marginBottom:20,
    flex:1
  },
  nominalKecil:{
    fontFamily: 'Hind',
    fontSize: 14,
    color: '#00d3c5',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 9,
        marginBottom: -10,
      },
      android: {
        lineHeight: 20,
      },
    }),
  },
  danger:{
    fontFamily: 'Hind',
    fontSize: 14,
    color: '#f57b76',
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
  labelHeader:{
    fontFamily: 'Hind',
    fontSize: 18,
    color: '#000',
    marginTop:2,
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 10,
        marginBottom: -12,
      },
      android: {
        lineHeight: 24,

      },
    }),
  },
  activityTitle: {
    fontFamily: 'Hind',
    fontSize: 15,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 10,
        marginBottom: -15,
      },
      android: {
        lineHeight: 20,

      },
    }),
  },
  
  activityDesc: {
    fontSize: 14,
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
  labelDesc: {
    fontSize: 14,
    color: '#2f2f2f',
    fontFamily: 'Hind',
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
  activityDescTimeline: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind-Light',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 9,
        marginBottom: -10,
      },
      android: {
        marginTop:5,
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
