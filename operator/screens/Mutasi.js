'use strict';

import React from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import { Slider } from 'react-native-elements';
import { CheckBox } from 'react-native-elements';
import {
  Platform, StyleSheet, Text, View, Image, TextInput,
  ScrollView,
} from 'react-native';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../api/Common'
import * as Formatter from '../../customer/components/Formatter'
import DatePicker from 'react-native-datepicker'
import globalStyles from '../../commons/globalStyles';

export default class Mutasi extends React.Component {

  static navigationOptions = {
    title: 'Mutasi'
  };

  componentDidMount() {
    const endpoint = '/v1/operator/transactionstatement';
    fetchTravoramaApi({
      path: endpoint,
      method: 'GET',
      requiredAuthLevel: AUTH_LEVEL.User,
    }).then(response => {
      this.setState({ trx: response.transactionStatements });
    })
  }

  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '20:00',
      datetime: '2016-05-05 20:00',
      datetime1: '2016-05-05 20:00'
    };
  }



  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
        <ScrollView>
        <View style={{flex:1, marginBottom:10, backgroundColor:'#ffffff', borderWidth:1, borderColor:'#dfdfdf', padding:15}}>
          <View style={{flexDirection:'row', flex:1}}>
            <DatePicker
                style={{flex:1, paddingRight:10,}}
                date={this.state.date}
                showIcon={false}
                mode="date"
                placeholder="Start Date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}
                customStyles={{
                  placeholderText:{
                    color:'#000'
                  },
                  dateInput:{
                    borderRadius:3
                  },
                }}
              />
              <DatePicker
                style={{flex:1}}
                date={this.state.date}
                showIcon={false}
                mode="date"
                placeholder="End Date"
                format="YYYY-MM-DD"
                minDate="2016-05-01"
                maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={(date) => {this.setState({date: date});}}
                customStyles={{
                  placeholderText:{
                    color:'#000'
                  },
                  dateInput:{
                    borderRadius:3
                  },
                }}
              />
          </View>
            <View style={{flex:1, alignItems:'center', marginTop:15}}>
              <Button
                containerStyle={globalStyles.ctaButton8}
                style={{fontSize: 14, color: '#fff'}}
              >
                Pilih
              </Button>
            </View>
          </View>  

          {/* <View style={styles.container}>
            <Text style={styles.priceTitleBig}>Total Credit</Text>
            <Text style={styles.categoryTitle}>Rp 1.000.000</Text>
          </View>
          <View style={styles.divider}></View> */}
          <View style={styles.container}>
            {/*this.state.trx.map(t =>
              <View style={styles.boxMutasi}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.textKecil}>{t.remarks}</Text>
                    <Text style={styles.kode}>{t.trxNo}</Text>
                    <Text style={styles.textKecilabu}>{Moment(t.dateTime).format('D MMM YYYY HH:MM')}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.textKecil}>+{Formatter.rupiah(t.amount)}</Text>
                    <Text style={styles.textKecilabu}>Rp 200.000</Text>
                  </View>
                </View>
              </View>
            )*/}
            <View style={styles.boxMutasi}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.textKecil}>lalalalal</Text>
                    <Text style={styles.kode}>1234567890</Text>
                    <Text style={styles.textKecilabu}>6 Jan 2018 20:97</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.textKecil}>+Rp 142.172u1</Text>
                    <Text style={styles.textKecilabu}>Rp 200.000</Text>
                  </View>
                </View>
              </View>
          </View>
          <View style={styles.container}>
            {/*this.state.trx.map(t =>
              <View style={styles.boxMutasi}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.textKecil}>{t.remarks}</Text>
                    <Text style={styles.kode}>{t.trxNo}</Text>
                    <Text style={styles.textKecilabu}>{Moment(t.dateTime).format('D MMM YYYY HH:MM')}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.textKecil}>+{Formatter.rupiah(t.amount)}</Text>
                    <Text style={styles.textKecilabu}>Rp 200.000</Text>
                  </View>
                </View>
              </View>
            )*/}
            <View style={styles.boxMutasi}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.textKecil}>lalalalal</Text>
                    <Text style={styles.kode}>1234567890</Text>
                    <Text style={styles.textKecilabu}>6 Jan 2018 20:97</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.textKecil}>+Rp 142.172u1</Text>
                    <Text style={styles.textKecilabu}>Rp 200.000</Text>
                  </View>
                </View>
              </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderWidth:1, 
    borderColor:'#dfdfdf',
    marginTop:10
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
  },
  boxMutasi: {
    marginBottom: 15,
    paddingBottom:15,
    borderBottomWidth:1, 
    borderBottomColor:'#dfdfdf',
  },
  priceTitleBig: {
    fontSize: 14,
    color: '#676767',
    marginTop: 2,
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -8,
      },
      android: {

      },
    }),
  },
  categoryTitle: {
    fontFamily: 'Hind-Bold',
    fontSize: 18,
    color: '#454545',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -15,
      },
      android: {
      },
    }),
  },
  textKecil: {
    fontSize: 14,
    fontFamily: 'Hind',
    color: '#676767',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {
        marginBottom: -3,
      },
    }),
  },
  kode: {
    fontSize: 15,
    fontFamily: 'Hind-Bold',
    color: '#01d4cb',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {
        marginBottom: -3,
      },
    }),
  },
  textKecilabu: {
    fontSize: 13,
    fontFamily: 'Hind',
    color: '#a5a5a5',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {
        marginBottom: -3,
      },
    }),
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
