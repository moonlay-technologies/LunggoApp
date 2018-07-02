'use strict';

import React from 'react';
import Button from 'react-native-button';
import * as Formatter from '../../components/Formatter';
import { Icon } from 'react-native-elements';
import {
  Platform, StyleSheet, TouchableOpacity, Text, View, Image,
  TextInput, ScrollView, Linking
} from 'react-native';
// import Maps from '../../components/Maps';
import { WebBrowser } from 'expo';
import Avatar from './../../../commons/components/Avatar';
import { reversePhoneWithoutCountryCode_Indonesia } from './../../components/Formatter';
import Moment from 'moment';
import { fetchTravoramaApi } from '../../../api/Common';

export default class BookedPageDetail extends React.Component {

  constructor(props) {
    super(props);

    this.details = {
      totalPaxCount: 0,
      ...props.navigation.state.params.details,
    };
    this.details.paxCount.map(categ => {
      this.details.totalPaxCount += categ.count;
    });
  }

  // _onContinuePaymentPressed = () => {
  //   this.props.navigation.navigate(
  //     'PaymentScreen', {rsvNo:this.details.rsvNo}
  //   );
  // }

  _viewActivityDetail = () => {
    this.props.navigation.navigate('DetailScreen', {
      details: {
        id: this.details.activityId,
        ...this.details,
      },
      hideFooter: true
    });
  }

  _viewPdfVoucher = async () => {
    let { rsvNo, pdfUrl } = this.details;
    // TODO uncomment this buat local PDF
    // let localUri = await getItemAsync('myBookings.pdfVoucher.' + rsvNo);
    // WebBrowser.openBrowserAsync(localUri || pdfUrl);
    WebBrowser.openBrowserAsync(pdfUrl);
  }

  _call = (phone) => Linking.openURL('tel:+' + phone)
  _sms = (phone) => Linking.openURL('sms:+' + phone)
  _email = (email) => Linking.openURL('mailto:' + email)

  _goToRefundScreen = () => {
    this.props.navigation.navigate
      ('RefundScreen', { rsvNo: this.details.rsvNo, ...this.details.refundBankAccount });
  };

  _showTicket() {
    let { bookingStatus, hasPdfVoucher, isPdfUploaded, ticketNumber } = this.details;
    
    if (bookingStatus == 'Ticketed' && hasPdfVoucher && isPdfUploaded) {
      return (
        <View style={styles.container}>
          <View style={{ marginBottom: 0, alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>
              Tiket
            </Text>
          </View>
          <Button
            containerStyle={styles.labelOk}
            style={{ fontSize: 12, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
            onPress={() => this._viewPdfVoucher()}
          >
            Lihat Tiket
        </Button>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={[styles.activityDesc, { textAlign: 'center', color: '#1e1e1e' }]}>
              Tunjukkan tiket ini kepada pihak operator saat kamu sudah berada di tempat dan waktu aktivitas
            </Text>
          </View>
        </View>

      );
    }
    else if (bookingStatus == 'Ticketed' && ticketNumber) {
      return (
        <View style={styles.container}>
          <View style={{ marginBottom: 0, alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>
              Kode Tiket
            </Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.kodetiket}>{ticketNumber}</Text>
          </View>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={[styles.activityDesc, { textAlign: 'center', color: '#1e1e1e' }]}>
              Tunjukkan kode ini kepada pihak operator saat kamu sudah berada di tempat dan waktu aktivitas.
              Jangan berikan kode ini kepada operator sebelum saatnya!
            </Text>
          </View>
        </View>);
    }
    else
      return null;
  }

  _showRefundButton() {
    let { bookingStatus, needRefundBankAccount, refundBankAccount } = this.details;

    if (bookingStatus == 'CancelByOperator' ||
      bookingStatus == 'CancelByAdmin' ||
      bookingStatus == 'DeniedByOperator' ||
      bookingStatus == 'DeniedByAdmin' ||
      bookingStatus == 'CancelByCustomer') {
      return (
        <View style={styles.container}>
          <View style={{ marginBottom: 0, alignItems: 'center' }}>
            <Text style={styles.sectionTitle}>
              Refund
            </Text>
          </View>
          <Button
            containerStyle={styles.labelOk}
            style={{ fontSize: 12, color: '#fff', fontWeight: 'bold', textAlign: 'center' }}
            onPress={this._goToRefundScreen}
          >
            {refundBankAccount ? 'Ubah Nomor Rekening Refund' : 'Isi Nomor Rekening Refund'}
          </Button>
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={[styles.activityDesc, { textAlign: 'center', color: '#1e1e1e' }]}>
              Berikan data nomor rekening kamu untuk proses refund dana
            </Text>
          </View>
        </View>

      );
    }
    else
      return null;
  }

  _showStatus() {
    let { bookingStatus, hasPdfVoucher, isPdfUploaded, ticketNumber, cancellationReason, timeLimit } = this.details;

    switch (bookingStatus) {
      case 'Booked':
        return <BookingStatusText text="Menunggu proses pembayaran"/>;
      case 'ForwardedToOperator':
        let now = Moment();
        let daysDiff = Moment(now).diff(timeLimit, 'days');
        let hoursDiff = Moment(now).diff(timeLimit, 'hours') - (daysDiff * 24);
        let timeLimitString = (daysDiff ? `${daysDiff} hari ` : '') + `${hoursDiff} jam`;
        return (
          <View style={styles.container}>
            <View style={styles.labelText}>
              <Text style={{ color: '#ff5f5f' }}>
                Voucher sedang dalam proses*
              </Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <Text style={[styles.activityDesc, { textAlign: 'center', color: '#1e1e1e' }]}>
                * Aktivitas akan dibatalkan otomatis jika dalam <Text style={{ fontWeight: 'bold' }}>1x24 jam</Text>{"\n"}operator tidak mengonfirmasi pesanan kamu
            </Text>
            </View>
          </View>);
      case 'Ticketing':
        return <BookingStatusText text="Tiket sedang diproses"/>;
      case 'Ticketed':
        return null;

      case 'CancelByOperator':
      case 'CancelByAdmin':
      case 'DeniedByOperator':
      case 'DeniedByAdmin':
      case 'NoResponseByAdmin':
      case 'NoResponseByOperator':
        return (
          <View style={styles.container}>
            <View style={styles.labelText}><Text style={{ color: '#ff5f5f' }}>Aktivitas tidak dapat diproses</Text></View>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
              <Text style={[styles.activityDesc, { textAlign: 'center', color: '#1e1e1e' }]}>
                <Text style={{ fontWeight: 'bold' }}>Alasan: </Text>{cancellationReason}
              </Text>
            </View>
          </View>);
      case 'CancelByCustomer':
        return <BookingStatusText text="Dibatalkan"/>;
      default:
        return <BookingStatusText text="Terjadi kesalahan pada sistem"/>;
    }
  }

  render() {
    let { name, mediaSrc, date, price, city, address, bookingStatus,
      selectedSession, operatorName, operatorPhone, ticketNumber,
      operatorEmail, totalPaxCount, latitude, longitude, paxes, refundBankAccount,
      hasPdfVoucher, isPdfUploaded, paxCount, contact, rsvNo, cancellation
    } = this.details;
    return (
      <ScrollView style={{ flex: 1, backgroundColor: '#fafafa' }}>

        <View style={{ marginTop: 15 }}>
          {this._showStatus()}
        </View>

        {this._showTicket()}

        {this._showRefundButton()}

        <View style={styles.container}>

          <View style={{ flexDirection: 'row' }}>

            <Image style={styles.thumbprofile} source={{ uri: mediaSrc }} />

            <View style={{ flex: 3, paddingLeft: 15 }}>
              <Text style={styles.activityDesc}>
                No. Pesanan: {rsvNo}
              </Text>
              <View style={{ marginBottom: 3 }}>
                <Text style={styles.activityTitle}>
                  {name}
                </Text>
              </View>

              <View style={{ flex: 1, flexDirection: 'row', }}>
                {/* <View style={{justifyContent:'center'}}>
                <Icon name='calendar' type='octicon' size={18} color='#009389' style={{width:20}} />
              </View>*/}
                <View>
                  <Text style={styles.activityDesc}>
                    {Formatter.dateFullLong(date)}
                  </Text>
                </View>
              </View>

              {!!selectedSession && (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  {/* <View style={{justifyContent:'center'}}>
                  <Icon name='ios-time' type='ionicon' size={18} color='#009389' style={{width:20}} />
                </View> */}
                  <View>
                    <Text style={styles.activityDesc}>
                      {selectedSession}
                    </Text>
                  </View>
                </View>)
              }

              <View style={{ flex: 1, flexDirection: 'row' }}>
                {/*<View style={{justifyContent:'center'}}>
                <Icon  name='location' type='octicon' size={18} color='#009389' style={{width:20}} />
              </View>*/}
                <View>
                  <Text style={styles.activityDesc}>
                    {city}
                  </Text>
                </View>
              </View>

            </View>

            <TouchableOpacity onPress={this._viewActivityDetail} style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontSize: 12, color: '#00d3c5', }}>
                Lihat Detail
            </Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={styles.divider} />
        <View style={styles.container}>
          <View style={{ marginBottom: 0 }}>
            <Text style={styles.sectionTitle}>
              Jumlah Peserta
            </Text>
          </View>
          <Text style={[styles.activityDesc, { paddingBottom: 5 }]}>
            {paxCount.filter(t => t.count != 0).map((t) => `${t.count} ${t.type}`).join(', ')}
          </Text>
          <View style={{ marginBottom: 0 }}>
            <Text style={styles.sectionTitle}>
              Kontak Peserta
            </Text>
          </View>
          <View style={{ flex: 1 }}>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.iconKontaksmall}>
                <Icon
                  name='ios-person'
                  type='ionicon'
                  size={22}
                  color='#00d3c5' />
              </View>
              <Text style={styles.activityDesc}>
                {contact.name}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.iconKontaksmall}>
                <Icon
                  name='ios-call'
                  type='ionicon'
                  size={22}
                  color='#00d3c5' />
              </View>
              <Text style={styles.activityDesc}>
                {reversePhoneWithoutCountryCode_Indonesia(contact.phone)}
              </Text>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.iconKontaksmall}>
                <Icon
                  name='ios-mail'
                  type='ionicon'
                  size={22}
                  color='#00d3c5' />
              </View>
              <Text style={styles.activityDesc}>
                {contact.email}
              </Text>
            </View>
          </View>
        </View>

        {bookingStatus == 'Ticketed' &&
          <View>
            <View style={styles.divider} />

            <View style={styles.container}>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.sectionTitle}>
                  Kontak Operator
            </Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 2, flexDirection: 'row' }}>
                  <Avatar size={40} name={operatorName} style={[styles.avatar, { marginRight: 15 }]} />
                  <View>
                    <View style={{ marginBottom: 7 }}>
                      <Text style={styles.reviewTitle}>
                        {operatorName}
                      </Text>
                    </View>
                    <Text style={styles.activityDesc}>
                      {operatorPhone}
                    </Text>
                    <Text style={styles.activityDesc}>
                      {operatorEmail}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                  <TouchableOpacity onPress={() => this._call(this.details.operatorPhone)} style={[styles.iconKontak, { marginRight: 15 }]}>
                    <Icon
                      name='ios-call'
                      type='ionicon'
                      size={23}
                      color='#00d3c5' />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this._sms(this.details.operatorPhone)} style={styles.iconKontak}>
                    <Icon
                      name='ios-mail'
                      type='ionicon'
                      size={23}
                      color='#00d3c5' />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.container, { flex: 1, }]}>
              <Text style={styles.sectionTitle}>
                Lokasi
              </Text>
              {/* <Maps lat={latitude} long={longitude} name={name}
                address={address} city={city} {...this.props} /> */}
            </View>
          </View>
        }
        {(bookingStatus == 'Ticketed' || bookingStatus == 'Ticketing' || bookingStatus == 'Booked' || bookingStatus == 'ForwardedToOperator') &&
          <View style={styles.container}>
            <View>
              <Text style={styles.sectionTitle}>
                Ketentuan Pembatalan
            </Text>
            </View>
            <Text>Voucher ini dapat dibatalkan</Text>

            {/* {cancellation.map(c =>
              `Pembatalan H${c.thresholdDays < 0 ? c.thresholdDays : `+${c.thresholdDays}`} dari waktu ${c.thresholdFrom == 'Book' ? 'pemesanan' : 'kegiatan'} dikenakan biaya admin sebesar ${c.valuePercentage}%${c.valueConstant ? `+ ${rupiah(c.valueConstant)}` : ''}.\n`)} */}

            <View>
              <Button
                containerStyle={styles.containerbtn}
                style={styles.statusbtn}
                onPress={() => this.props.navigation.navigate('RefundScreen', { rsvNo: rsvNo, ...refundBankAccount })}
              >
                Refund
                </Button>
            </View>
          </View>
        }
        <View style={styles.container}>
          <View>
            <Text style={styles.sectionTitle}>
              Butuh Bantuan?
            </Text>
          </View>

          <View style={{ flex: 1, marginBottom: 15 }}>
            <Text style={styles.activityDesc}>Customer Service kami dengan senang hati akan membantu kamu mengenai pertanyaan atau seputar masalah aktivitas yang telah dipilih.
            Pastikan kamu menyebutkan No. Pesanan saat menghubungi agar kami dapat lebih cepat memberikan respons.{"\n"}{"\n"}Silahkan hubungi kami melalui kontak di bawah ini:</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <View style={styles.iconKontaksmall}>
              <Icon
                name='ios-call'
                type='ionicon'
                size={22}
                color='#00d3c5' />
            </View>
            <Text style={styles.activityDesc} onPress={() => this._call('085574679737')}>0855-7467-9737</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <View style={styles.iconKontaksmall}>
              <Icon
                name='ios-mail'
                type='ionicon'
                size={22}
                color='#00d3c5' />
            </View>
            <Text style={styles.activityDesc} onPress={() => this._email('cs@travorama.com')}>cs@travorama.com</Text>
          </View>

        </View>
        {/* <View style={styles.container}>
          <View>
          
            <Text style={[styles.activityTitle, { marginBottom: 10 }]}>
              Peserta: {totalPaxCount} orang
            </Text>
            {paxes && paxes.map((pax, idx) =>
              <TouchableOpacity key={idx} style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: '#efefef',
                borderBottomWidth: 1,
                paddingBottom: 20,
                marginTop: 20
              }}>
                <Text>{pax.name}</Text>
                <Icon
                  name='chevron-thin-right'
                  type='entypo'
                  size={20}
                  color='#707070' />
              </TouchableOpacity>
            )}
          </View> */}
        {/* <View style={{marginTop:25,}}>
            <Text style={styles.activityTitle}>
              Hal yang Perlu Diperhatikan
            </Text>
            <Text style={{marginTop:8,fontSize:13, color:'#454545',}}>
              Arung jeram dapat diikuti oleh peserta dewasa, remaja dana anak-anak berusia di atas 12 tahun.
            </Text>
          </View>
        </View>*/}
      </ScrollView >
    );
  }
}

const BookingStatusText = props =>
  <View style={styles.container}>
    <View style={styles.labelText}>
      <Text style={{ color: '#ff5f5f' }}>
        {props.text}
      </Text>
    </View>
  </View>

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 15,
    marginVertical: 7.5,
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
        elevation: 2,
      },
    }),
  },
  thumbnailMedium: {
    resizeMode: 'cover',
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  thumb: {
    resizeMode: 'cover',
    width: '100%',
    height: 170,
  },
  thumbprofile: {
    height: 60,
    width: 60,
  },
  activityTitle: {
    fontFamily: 'HindBold',
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
  activityDesc: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'HindLight',
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
  status: {
    color: '#f19a4b',
    fontSize: 12,
    marginTop: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  barcode: {
    width: 130,
    height: 130,
    resizeMode: 'cover',
  },
  divider: {
    height: 1,
  },
  labelWarning: {
    backgroundColor: '#ff5f5f',
    padding: 10,
    borderRadius: 3,
    marginTop: 5,
    alignItems: 'center',
  },
  labelOk: {
    backgroundColor: '#00d3c5',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  labelText: {
    borderColor: '#ff5f5f',
    padding: 10,
    borderRadius: 3,
    borderWidth: 1,
    marginTop: 5,
    alignItems: 'center',
  },
  sectionTitle: {
    fontFamily: 'HindSemiBold',
    fontSize: 18,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 20 - (19 * 0.4),
        marginBottom: 0,
      },
      android: {
        lineHeight: 24,
        marginBottom: 10
      },
    }),
  },
  reviewTitle: {
    fontFamily: 'HindSemiBold',
    fontSize: 17,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 20 - (19 * 0.4),
        marginBottom: -15,
        //backgroundColor:'red'
      },
      android: {
        lineHeight: 13
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  reviewDate: {
    fontSize: 13,
    color: '#9a9a9a',
    marginTop: 2

  },
  kodetiket: {
    fontFamily: 'HindBold',
    fontSize: 24,
    color: '#00d3c5',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 20,
        marginBottom: -15,
      },
      android: {
        lineHeight: 18,

      },
    }),
  },
  iconKontak: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: '#00d3c5',
    justifyContent: 'center'
  },
  iconKontaksmall: {
    width: 26,
    height: 26,
    justifyContent: 'center',
    marginRight: 5
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
    fontFamily: 'HindSemiBold',
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
});
