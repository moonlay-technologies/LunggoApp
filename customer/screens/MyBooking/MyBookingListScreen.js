/*

  ===== TODO =====
  invoice screen dan instruction screen

*/

'use strict';

import React from 'react';
import Button from 'react-native-button';
import {
  Platform, StyleSheet, Text, View, Image, ScrollView,
  RefreshControl, FlatList, TouchableOpacity, TouchableWithoutFeedback
} from 'react-native';
import { getMyBookingList } from './MyBookingController';
import globalStyles from '../../../commons/globalStyles';
import * as Formatter from '../../components/Formatter';
const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;
import { WebBrowser } from 'expo';

class ActivityListItem extends React.PureComponent {

  _viewPdfVoucher = async item => {
    // TODO uncomment this buat local PDF
    // let localUri = await getItemAsync('myBookings.pdfVoucher.' + item.rsvNo);
    // WebBrowser.openBrowserAsync(localUri || item.pdfUrl);
    WebBrowser.openBrowserAsync(item.pdfUrl);
  }

  _voucherButton = item => {
    if (item.bookingStatus == 'TKTD' || item.bookingStatus == 'CONF')
      return (<View style={styles.labelWarning}>
        <Button
          containerStyle={{ alignItems: 'center', }}
          style={{ fontSize: 12, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
          onPress={() =>
            item.hasPdfVoucher
              ? this._viewPdfVoucher(item)
              : this.props.navigation.navigate('BookedPageDetail', { details: item })
          }
        >
          Lihat Voucher
                </Button>
      </View>);
    else
      return <View><Text style={styles.labelText}>Memproses tiket</Text></View>;
  }

  render() {
    let { item } = this.props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.props.navigation.navigate('BookedPageDetail', { details: item })}>
        <View style={{ flexDirection: 'row', }}>
          <View style={{ flex: 1 }}><Image style={styles.thumbprofile} source={{ uri: item.mediaSrc }} /></View>
          <View style={{ flex: 1.8 }}>
            <Text style={styles.activityTitle}>
              {item.name}
            </Text>
            <View style={{ flexDirection: 'row', }}>
              <Text style={styles.activityDesc}>{Formatter.dateLong(item.date)}</Text>
              <Text style={styles.activityDesc}>, </Text>
              <Text style={styles.activityDesc}>{item.selectedSession}</Text>
            </View>
            <Text style={styles.activityDesc}>
              {item.paxCount.filter(p => p.count != 0).map(p => p.count + ' ' + p.type).join(', ')}
            </Text>
            {this._voucherButton(item)}
          </View>
        </View>

        {(item.requestRating || item.requestReview) && (
          <View style={{ marginTop: 25 }}>
            <View style={{ flex: 1 }}>
              <Button
                containerStyle={globalStyles.ctaButtonReview}
                style={{ fontSize: 12, color: '#000', fontWeight: 'bold' }}
                onPress={
                  () => item.requestRating ?
                    this.props.navigation.navigate('SubmitRating', { rsvNo: item.rsvNo }) :
                    this.props.navigation.navigate('SubmitReview', { rsvNo: item.rsvNo })}
              >
                {item.requestRating ? 'Beri Rating' : 'Beri Review'}
              </Button>
            </View>
          </View>
        )}
        <View style={styles.separator} />
      </TouchableOpacity>
    )
  }
}

class CartListItem extends React.PureComponent {

  _keyExtractor = (item, index) => index
  _renderItem = ({ item, index }) => (
    <ActivityListItem
      item={item}
      index={index}
      // onPressItem={this._onPressItem}
      navigation={this.props.navigation}
    />
  )

  _showInvoice = () => {
    let { item } = this.props;
    let title = "Nomor Keranjang #" + item.cartId;
    let total = item.totalFinalPrice;
    let breakdown = item.activities.map(rsv => {
      return {
        name: rsv.name,
        details: rsv.paxCount.filter(pax => pax.count).map(pax => {
          return {
            unit: pax.type,
            count: pax.count,
            unitPrice: pax.totalPrice / pax.count,
            totalPrice: pax.totalPrice
          }
        })
      }
    });
    let modifiers = [];
    (item.totalDiscount != 0) && modifiers.push({ name: "Diskon", amount: -item.totalDiscount });
    (item.totalUniqueCode != 0) && modifiers.push({ name: "Kode unik", amount: item.totalUniqueCode });
    this.props.navigation.navigate('RincianHarga', { title, total, breakdown, modifiers });
  }
  _showInstruction = () => this.props.navigation.navigate('PaymentScreen') /// TODO ganti jd INstruction

  _labelPaymentStatus = status => {
    if (status == 'SETTLED')
      return <View style={styles.labelOk}><Text style={styles.labelTextLunas}>Lunas</Text></View>;
    else
      return <View> style={styles.labelDanger}><Text style={styles.labelTextBelumLunas}>Belum Lunas</Text></View>;
  }

  render() {
    let { item } = this.props;
    return (
      <View style={styles.cartbox}>

        <FlatList
          data={item.activities}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />

        <View style={styles.total}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.totalText}>Total</Text>

            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.totalText}>{Formatter.price(item.totalFinalPrice)}</Text>
              {this._labelPaymentStatus(item.paymentStatus)}
            </View>
          </View>
        </View>

        <View style={styles.invoice}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Button
                containerStyle={globalStyles.ctaButton6}
                style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}
                onPress={
                  (item.paymentStatus == 'SETTLED') ?
                    this._showInvoice :
                    this._showInstruction
                }
              >
                {(item.paymentStatus == 'SETTLED') ?
                  'Lihat Invoice' : 'Lihat Instruksi'
                }
              </Button>
            </View>
          </View>
        </View>


      </View>
    )
  }
}

export default class MyBookingListScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Pesananku',
  }

  _keyExtractor = (item, index) => index
  _renderItem = ({ item, index }) => (
    <CartListItem
      item={item}
      index={index}
      // onPressItem={this._onPressItem}
      navigation={this.props.navigation}
    />
  )

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FlatList
          data={this.props.list}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />


        {/* Tab Button

        <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#fff',
          marginTop:10,
        }}>
          <Button
            containerStyle={{
              marginRight:3,
              height:40, width:120, paddingTop:10, paddingBottom:10,
              overflow:'hidden', borderRadius:4,
              backgroundColor: '#437ef7'
            }}
            style={{fontSize: 14, color: '#ffffff'}}
            onPress={() => this._handlePress()}>
            Active
          </Button>
          <Button
            containerStyle={{ height:40, width:120, paddingTop:10,
              paddingBottom:10, overflow:'hidden', borderRadius:4,
              borderWidth: 1,
              borderColor: '#437ef7',backgroundColor: '#ffffff'
            }}
            style={{fontSize: 14, color: '#437ef7'}}
            onPress={() => this._handlePress()}>
            History 
          </Button>
        </View>
        
      */}


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#f7f8fb',
  },
  cartbox: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 15,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#e8f0fe',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.9
      },
      android: {
        elevation: 5,
      },
    }),
  },
  activityTitle: {
    fontFamily: 'Hind-Bold',
    fontSize: 15,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 10,
        marginBottom: -12,
      },
      android: {
        lineHeight: 20,

      },
    }),
  },
  activityPrize: {
    fontFamily: 'Hind-Light',
    fontSize: 14,
    color: '#000',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 13,
        marginBottom: -12,
      },
      android: {
        lineHeight: 24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityDesc: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind-Light',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 10,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  thumbprofile: {
    height: 90,
    width: 90,
  },
  separator: {
    backgroundColor: '#ececec',
    height: 0.3,
    width: '100%',
    marginVertical: 20
  },
  total: {
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ececec'
  },
  totalText: {
    fontSize: 16,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 10,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  invoice: {
    marginTop: 10,
    paddingVertical: 10,
  },
  labelDanger: {
    width: '100%',
    paddingVertical: 6,
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: '#23d3c3',
  },
  labelWarning: {
    backgroundColor: '#ff5f5f',
    padding: 5,
    borderRadius: 3,
    marginTop: 5
  },
  labelText: {
    color: '#18b0a2',
    fontSize: 13,
    textAlign: 'left',
    fontWeight: 'bold'
  },
  labelTextLunas: {
    color: '#5ba1ff',
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 10,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  labelTextBelumLunas: {
    color: '#f74d4d',
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 10,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  labelOk: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

});
