'use strict';

import React from 'react';
import { Platform, StyleSheet, Text, View, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Timeline from 'react-native-timeline-listview';
import { getPaxCountText, getPaymentSumInSteps } from '../../commons/otherCommonFunctions';
import { date, rupiah } from '../../customer/components/Formatter';

export default class F_ReservationDetail extends React.Component {

  constructor (props) {
    super(props);
    this.data = [
      {time: '09:00', title: 'DP 1', description: 'Jumlah: Rp 300.000\nPada tanggal: 1 Jan 2018'},
      {
        time: '10:45',
        title: 'DP 2',
        description: 'Jumlah: Rp 700.000\nPada tanggal: 5 Jan 2018',
        circleColor: '#009688'
      },
      {time: '12:00', title: 'Lunas', description: 'Jumlah: Rp 1.000.000\nPada tanggal: 5 Jan 2018'},
    ];
    this.timelineData = props.navigation.state.params.rsv.paymentSteps.map(
      step => {
        return {
          time: step.date,
          title: '*DP 2*dummy this.timelineData',
          description: 'Jumlah: ' + rupiah(step.amount) +
                       '\nPada tanggal: ' + date(step.date),
          circleColor: step.isCompleted ? '#00d3c5' : '#ababab'//'#f57b76'
        }
      }
    );
  }

  static navigationOptions = {
    title: 'Reservation Detail',
  }

  render() {
    let { rsv } = this.props.navigation.state.params;
    let totalPayment = getPaymentSumInSteps(rsv.paymentSteps);
    let completedPayment = getPaymentSumInSteps(rsv.paymentSteps,true);
    let isSettled = completedPayment == totalPayment;
    console.warn('potensi bug di Tanggal Pelunasan: uda pasti blom kalo tanggal terakhir itu ada di array terakhir?')
    let dueDate = date(rsv.paymentSteps[rsv.paymentSteps.length-1].date);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.boxDetail}>
          <Icon
            style={{marginRight:15}}
            name='ios-bicycle'
            type='ionicon'
            size={26}
            color='#00d3c5' 
          />
          <View style={{flex:1}}>
            <Text style={styles.labelHeader}>Detail Aktifitas</Text>
            <View style={{marginTop:3}}>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>*Judul Aktifitas:</Text>
                <Text style={styles.activityDesc}>*Liburan ke Bali*</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>*Waktu:</Text>
                <Text style={styles.activityDesc}>*20 Jan 2018, 12.00-15.00*</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>*Nama Paket:</Text>
                <Text style={styles.activityDesc}>*Paket Keluarga besar*</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>Peserta :</Text>
                <Text style={styles.activityDesc}>
                  {getPaxCountText(rsv.paxCount)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.boxDetail}>
          <Icon
            style={{marginRight:15}}
            name='ios-paper-outline'
            type='ionicon'
            size={26}
            color='#00d3c5' 
          />
          <View style={{flex:1}}>
            <Text style={styles.labelHeader}>Detail Pesanan</Text>
            <View style={{marginTop:3}}>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>No. Reservasi:</Text>
                <Text style={styles.activityDesc}>{rsv.rsvNo}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>Nama Pemesan:</Text>
                <Text style={styles.activityDesc}>
                  {rsv.contact.name}
                </Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style={styles.labelDesc}>Tanggal Pesan:</Text>
                <Text style={styles.activityDesc}>{date(rsv.rsvTime)}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.boxDetail}>
          <Icon
            style={{marginRight:15}}
            name='ios-cash-outline'
            type='ionicon'
            size={26}
            color='#00d3c5' 
          />
          <View style={{flex:1}}>
            <Text style={styles.labelHeader}>Detail Pembayaran</Text>
            <Timeline
              data={this.timelineData}
              showTime={false}
              // circleColor={'#ababab'}
              circleSize={12}
              lineWidth={1}
              lineColor={'#e1e1e1'}
              innerCircle={'dot'}
              style={{marginLeft:-15,marginTop:18}}
              rowContainerStyle={{marginLeft:0, paddingLeft:0}}
              detailContainerStyle={{marginTop:-12, paddingBottom:15}}
              titleStyle={styles.activityTitle}
              descriptionStyle={styles.activityDescTimeline}
            />
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={styles.labelDesc}>Status :</Text>
              <Text style={isSettled ? styles.nominalKecil : styles.danger}>
                {isSettled ? 'Lunas' : 'Belum Lunas'}
              </Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={styles.labelDesc}>Total Seluruh Pembayaran :</Text>
              <Text style={styles.nominalKecil}>{totalPayment}</Text>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between' }}>
              <Text style={styles.labelDesc}>Tanggal Pelunasan :</Text>
              <Text style={styles.activityDesc}>{dueDate}</Text>
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
});
