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
import { getPaxCountText } from '../../../commons/otherCommonFunctions';
import { Icon } from 'react-native-elements';
import Modal from '../../../commons/components/Modal';

class ActivityListItem extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      modalLocation: {
        left: null,
        right: null,
        top: null,
        bottom: null,
      }
    }
  }

  _viewPdfVoucher = async item => {
    // TODO uncomment this buat local PDF
    // let localUri = await getItemAsync('myBookings.pdfVoucher.' + item.rsvNo);
    // WebBrowser.openBrowserAsync(localUri || item.pdfUrl);
    WebBrowser.openBrowserAsync(item.pdfUrl);
  }

  _goToBookedPageDetail = () => {
    console.log(this.props.item);
    this.props.navigation.navigate
      ('BookedPageDetail', { details: this.props.item })
  };

  _openSettingModal = (evt) => {

    this.setState({ tapX: evt.nativeEvent.pageX, tapY: evt.nativeEvent.pageY })
    this.refs.settingModal.openModal();
  }
  _closeSettingModal = () => this.refs.settingModal.closeModal();

  _voucherButton = item => {
    let renderTicketButton = item => {
      switch (item.bookingStatus) {
        case 'Booked':
        case 'ForwardedToOperator':
          return (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.activityDesc}>Status: </Text>
                <Text style={styles.statusText}>Menunggu Konfirmasi</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.activityDesc}>Otomatis Batal: </Text>
                <Text style={styles.statusText}>{item.timeLimit}</Text>
              </View>
            </View>);
        case 'Ticketing':
          return <View style={{ flexDirection: 'row' }}>
            <Text style={styles.activityDesc}>Status: </Text>
            <Text style={styles.statusText}>Tiket Sedang Diproses</Text>
          </View>;
        case 'Ticketed':
          return (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.activityDesc}>Status: </Text>
                <Text style={styles.statusText}>Tiket Terbit</Text>
              </View>
              <View>
                <Button
                  containerStyle={styles.containerbtn}
                  style={styles.statusbtn}
                  onPress={() =>
                    item.hasPdfVoucher
                      ? this._viewPdfVoucher(item)
                      : this._goToBookedPageDetail()
                  }
                >
                  Lihat Tiket
                </Button>
              </View>
            </View>);
        case 'CancelByCustomer':
        case 'CancelByOperator':
        case 'CancelByAdmin':
        case 'DeniedByOperator':
        case 'DeniedByAdmin':
          return (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.activityDesc}>Status: </Text>
                <Text style={styles.statusText}>Dibatalkan</Text>
              </View>
              <View>
                <Button
                  containerStyle={styles.containerbtn}
                  style={styles.statusbtn}
                  onPress={() =>
                    item.hasPdfVoucher
                      ? this._viewPdfVoucher(item)
                      : this._goToBookedPageDetail()
                  }
                >
                  Refund
                </Button>
              </View>
            </View>);
        default:
          return (
            <View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.activityDesc}>Terjadi kesalahan pada sistem</Text>
              </View>
            </View>);
      }
    }

    let renderRatingButton = item => {
      (item.requestRating || item.requestReview) &&
        <Button
          containerStyle={styles.labelReview}
          style={styles.statusText}
          onPress={() => item.requestRating ?
            this.props.navigation.navigate('SubmitRating', { rsvNo: item.rsvNo }) :
            this.props.navigation.navigate('SubmitReview', { rsvNo: item.rsvNo })}>
          {item.requestRating ? 'Beri Rating' : 'Beri Review'}
        </Button>
    }

    return (
      <View style={{ flexDirection: 'row' }}>
        <View>
          {renderTicketButton(item)}
        </View>
        <View>
          {renderRatingButton(item)}
        </View>
      </View>
    );
  }

  render() {
    let { item } = this.props;
    return (
      <TouchableOpacity activeOpacity={1} onPress={this._goToBookedPageDetail} style={{ position: 'relative' }}>
        <View style={{ flexDirection: 'row', position: 'relative' }}>
          <View style={{ width: 70 }}><Image style={styles.thumbprofile} source={{ uri: item.mediaSrc }} /></View>
          <View style={{ flex: 3 }}>
            <Text style={styles.activityTitle}>
              {item.name}
            </Text>
            <View style={{ flexDirection: 'row', }}>
              <Text style={styles.activityDesc}>{Formatter.dateLong(item.date)}</Text>
              <Text style={styles.activityDesc}>, </Text>
              <Text style={styles.activityDesc}>{item.selectedSession}</Text>
            </View>
            <Text style={styles.activityDesc}>
              {getPaxCountText(item.paxCount)}
            </Text>
            <View>
              {this._voucherButton(item)}
            </View>
          </View>
          <View style={{ position: 'relative' }}>
            <TouchableOpacity
              style={{ width: 25, alignItems: 'center' }}
              onPress={evt => this._openSettingModal(evt)}>
              <Icon
                name='md-more'
                type='ionicon'
                size={26}
                color='#454545' />
            </TouchableOpacity>

            <Modal ref='settingModal'
              style={styles.modalStyle}
              animationIn='fadeIn'
              animationOut='fadeOut'
              backdropOpacity={0}
              tapX={this.state.tapX}
              tapY={this.state.tapY}
            >

              <TouchableOpacity>
                <Text style={styles.teks3a}>Batalkan Aktivitas</Text>
              </TouchableOpacity>

              <View style={styles.separatorOption}></View>

              <TouchableOpacity>
                <Text style={styles.teks3a}>Hapus Aktivitas</Text>
              </TouchableOpacity>

            </Modal>

          </View>
        </View>

        {/*
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
        */}
        <View style={styles.separator} />
      </TouchableOpacity>
    )
  }
}

export default class CartListItem extends React.PureComponent {

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
    let title = "No. Transaksi: " + item.cartId;
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
      return (
        <TouchableWithoutFeedback onPress={this._showInvoice}>
          <View>
            <Text style={styles.labelTextLunas}>Lihat Invoice</Text>
          </View>
        </TouchableWithoutFeedback>);
    else
      return <View><Text style={styles.labelTextBelumLunas}>Belum Lunas</Text></View>;
  }

  _goToPayment = cartId => this.props.navigation.navigate('PaymentScreen', { cartId });

  render() {
    let { item } = this.props;
    return (
      <View style={styles.cartbox}>

        <View style={{ marginBottom: 20, borderBottomWidth: 1, borderBottomColor: '#ececec', paddingBottom: 10 }}>
          <View>
            <Text style={styles.headerText}>No. Transaksi: <Text style={styles.activityDesc}>{item.cartId}</Text></Text>
          </View>
          {/* <View>
            <Text style={styles.headerText}>Tanggal Pesanan: <Text style={styles.activityDesc}>20 Jan 2018, 12.00 PM</Text></Text>
          </View> */}
        </View>

        <FlatList
          data={item.activities}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />

        <View>
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
        {item.paymentStatus == 'PENDING' && (
          <View>
            <Button
              containerStyle={styles.labelWarning}
              style={{ fontSize: 12, color: '#fff', fontWeight: 'bold' }}
              onPress={() => this._goToPayment(item.cartId)}
            >
              Lanjutkan Pembayaran
            </Button>
          </View>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#f1f0f0',
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
  headerText: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind-Bold',
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
    height: 60,
    width: 60,
  },
  separator: {
    backgroundColor: '#bfbfbf',
    height: 0.3,
    width: '100%',
    marginTop: 25,
    marginBottom: 15
  },
  total: {
    paddingBottom: 1,
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
    backgroundColor: '#00d3c5',
    paddingVertical: 10,
    borderRadius: 3,
    marginTop: 13,
    alignItems: 'center',
    marginRight: 10,
  },
  labelReview: {
    backgroundColor: '#f57b76',
    paddingVertical: 10,
    borderRadius: 3,
    marginTop: 13,
    alignItems: 'center',
    marginRight: 10,
  },
  labelOff: {
    backgroundColor: '#8f8f8f',
    paddingVertical: 10,
    borderRadius: 3,
    marginTop: 13,
    alignItems: 'center',
    marginRight: 10,
    opacity: 0.7,

  },
  labelText: {
    borderColor: '#00d3c5',
    paddingVertical: 10,
    borderRadius: 3,
    borderWidth: 1,
    marginTop: 13,
    alignItems: 'center',
    marginRight: 10,
  },
  labelTextLunas: {
    color: '#00d3c5',
    fontSize: 14,
    textAlign: 'right',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 10,
        marginBottom: 0,
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
  statusText: {
    fontSize: 13,
    color: '#00d3c5',
    fontFamily: 'Hind',
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
  teks3a: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind',
    textAlign: 'left',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  separatorOption: {
    paddingVertical: 8
  },

  labelOk: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },

  containerbtn: {
    backgroundColor: '#00d3c5',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 7
  },
  statusbtn: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Hind-SemiBold',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 4,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  modalStyle: {
    backgroundColor: '#fff',
    width: 150,
    padding: 10,
    zIndex: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 4,
        shadowOpacity: 0.2
      },
      android: {
        elevation: 2
      },
    }),
  }
});
