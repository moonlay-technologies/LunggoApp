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

export default class Mutasi extends React.Component {
  constructor(props) {
    super(props);
    this.state = { trx: [] };
  }

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



  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{ marginTop: 60, }}>
          {/* <View style={styles.container}>
            <Text style={styles.priceTitleBig}>Total Credit</Text>
            <Text style={styles.categoryTitle}>Rp 1.000.000</Text>
          </View>
          <View style={styles.divider}></View> */}
          <View style={styles.container}>
            {this.state.trx.map(t =>
              <View style={styles.boxMutasi}>
                <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                  <View style={{ flex: 2 }}>
                    <Text style={styles.textKecil}>{t.remarks}</Text>
                    <Text style={styles.kode}>{t.trxNo}</Text>
                    <Text style={styles.textKecilabu}>{Moment(t.dateTime).format('D MMM YYYY HH:MM')}</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.textKecil}>+{Formatter.rupiah(t.amount)}</Text>
                    {/* <Text style={styles.textKecilabu}>Rp 200.000</Text> */}
                  </View>
                </View>
              </View>
            )}
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
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
  },
  boxMutasi: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#efefef',
    marginBottom: 15
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
});
