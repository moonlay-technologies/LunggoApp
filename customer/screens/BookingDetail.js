'use strict';

import React from 'react';
import { AUTH_LEVEL, fetchTravoramaApi } from '../../api/Common';
import * as Formatter from '../components/Formatter';
import globalStyles from '../../commons/globalStyles';
import Button from 'react-native-button';
import { Icon } from 'react-native-elements';
import {
  StyleSheet, TouchableOpacity, Text, View, Image, TextInput,
  ScrollView, Platform
} from 'react-native';
import ContinueToCartModal from '../components/ContinueToCartModal';
import { shouldRefreshMyBookingList } from './MyBooking/MyBookingController';
import LoadingModal from './../../commons/components/LoadingModal';
import cartCountStore from './Cart/CartCountStorage';
import OfflineNotificationBar from './../../commons/components/OfflineNotificationBar';
import { phoneWithoutCountryCode_Indonesia } from './../components/Formatter';

async function fetchTravoramaCartAddApi(rsvNo) {
  const version = 'v1';
  let response = await fetchTravoramaApi({
    method: 'PUT',
    path: `/${version}/cart/${rsvNo}`,
    requiredAuthLevel: AUTH_LEVEL.User,
  });
  return response;
}

async function fetchTravoramaBookApi(data) {
  const version = 'v1';
  let response = await fetchTravoramaApi({
    method: 'POST',
    path: `/${version}/activities/book`,
    requiredAuthLevel: AUTH_LEVEL.User,
    data,
  });
  return response;
}


export default class BookingDetail extends React.Component {

  constructor(props) {
    super(props);
    let counter = [], totalCount = 0, price = 0;
    props.navigation.state.params.package[0].price.map(({ type, amount, minCount }) => {
      counter.push({ type, amount, minCount, count: minCount });
      totalCount += minCount;
      price += amount * minCount;
    });

    let maxCount = props.navigation.state.params.package[0].maxCount;
    let defaultMaxCount = props.navigation.state.params.package[0].maxCount;
    this.state = {
      counter, totalCount, price, maxCount, defaultMaxCount,
      isDateSelected: false,
      isDateValid: true,
      isPaxFilled: true,
      isContactFilled: false,
      isContactNeverFilled: true,
      isBookButtonPressed: false
    };
  }

  static navigationOptions = {
    title: 'Detail Pesanan'
  };

  setPaxListItemIndexes = indexes =>
    this.setState({ paxListItemIndexes: indexes });

  setPax = pax => {
    let changes = { pax }
    if (pax.length > 0) changes.isPaxFilled = true;
    this.setState(changes);
  }

  setSchedule = scheduleObj => {
    scheduleObj.isDateSelected = true;
    scheduleObj.isDateValid = true;
    this.setState(scheduleObj);
    console.log(scheduleObj.paxSlot);
    if (scheduleObj.paxSlot < this.state.maxCount) {
      this.setState({
        maxCount: scheduleObj.paxSlot
      });
    }
    else {
      this.setState({
        maxCount: this.state.defaultMaxCount
      });
    }
  }

  setContact = contactObj => {
    this.setState({ contact: contactObj, isContactFilled: true });
  }

  _book = async () => {
    let { /*pax,*/ date, counter, totalCount, contact, time } = this.state;
    let { navigation } = this.props;
    let { params } = navigation.state;

    //// counting pax
    let pax = totalCount;

    //// validation
    this.setState({ isBookButtonPressed: true });
    if (!pax) this.setState({ isPaxFilled: false });
    if (!date) this.setState({ isDateValid: false });
    if (!contact) this.setState({ isContactFilled: false });
    if (!pax || !date || !contact) return;

    //// prepare fetching book
    this.setState({ isLoading: true });
    let selectedSession = time;
    // building data for bookingAPI
    let ticketCount = counter;
    // console.log('counter');
    // console.log(counter);
    // params.package[0].price.map( ({type}) => {
    //   ticketCount.push({
    //     type, count: counter[type],
    //   });
    // });

    let data = {
      date, pax, contact, ticketCount, selectedSession,
      packageId: params.activityId, activityId: params.activityId,
      paxes: [contact],
    };

    try {
      let response = await fetchTravoramaBookApi(data);
      if (response.status != 200) {
        console.log("Book API: status other than 200 returned!");
        console.log(response);
        this.setState({ isLoading: false });
        return;
      }

      //// after done booking and get RsvNo, add item to cart
      response = await fetchTravoramaCartAddApi(response.rsvNo);
      this.setState({ isLoading: false });
      if (response.status != 200) {
        console.error("Cart API: status other than 200 returned!");
        console.log(response);
        return;
      } else {
        await cartCountStore.setCartCount();
        shouldRefreshMyBookingList();
        this.setState({ isContinueToCartModalVisible: true });
      }
    } catch (error) {
      this.setState({ isLoading: false });
      console.log(error);
    }
  }

  _goToBookingContact = () => {
    this.props.navigation.navigate('AddBookingContact', {
      setContact: this.setContact,
      contact: this.state.contact,
      isContactNeverFilled: this.state.isContactNeverFilled,
    });
  }

  _goToCalendarPicker = () => {
    let { navigation } = this.props;
    let { availableDateTimes } = navigation.state.params;
    let { price, date, time } = this.state;
    navigation.navigate('CalendarPicker', {
      price, availableDateTimes,
      setSchedule: this.setSchedule,
      selectedDate: date,
      selectedTime: time,
    });
  }

  // _goToPaxChoice = () => {
  //   let { navigation } = this.props;
  //   let { price, requiredPaxData } = navigation.state.params;
  //   let { pax, paxListItemIndexes } = this.state;
  //   if (!paxListItemIndexes) paxListItemIndexes = [];
  //   navigation.navigate('PaxChoice', {
  //     price, requiredPaxData,
  //     setPax: this.setPax,
  //     setPaxListItemIndexes: this.setPaxListItemIndexes,
  //     paxListItemIndexes: paxListItemIndexes.slice(),
  //     paxCount: pax ? pax.length : 0,
  //   })
  // }

  _goToRincian = () => {
    let params = this.props.navigation.state.params;
    let total = this.state.price;
    let breakdown =
      [{
        name: params.title,
        details: this.state.counter.map(ctr => {
          return {
            unit: ctr.type,
            count: ctr.count,
            unitPrice: ctr.amount,
            totalPrice: ctr.count * ctr.amount
          }
        })
      }];
    this.props.navigation.navigate('RincianHarga', { breakdown, total })
  }

  render() {
    let { requiredPaxData } = this.props.navigation.state.params;
    let { price, pax, date, time, paxSlot, isDateSelected, isDateValid, isPaxFilled, isContactFilled, isContactNeverFilled, isBookButtonPressed, contact, totalCount, counter } = this.state;

    let selectedDateText = date ?
      `${Formatter.dateFullShort(date)}\n${time}` : '';

    let addEditButton = isEdit => !!isEdit ?
      <View>
        <Text style={styles.clickableText}>UBAH</Text>
      </View>
      :
      <View>

      </View>


    let counterButtons = counterArr => {
      let add = counterObj => {
        //validasi maximum
        let { maxCount = 100 } = counterObj;
        if (counterObj.count < maxCount) {
          counterObj.count++;
          this.setState({ totalCount: ++this.state.totalCount, price: this.state.price + counterObj.amount });
        }
      }
      let substract = counterObj => {
        let DECREMENT = int => (int == 0) ? 0 : int - 1;
        //validasi minimum
        let { minCount = 0 } = counterObj;
        if (counterObj.count > minCount) {
          counterObj.count = DECREMENT(counterObj.count);
          this.setState({ totalCount: DECREMENT(this.state.totalCount), price: this.state.price - counterObj.amount });
        }
      }
      return counterArr.map((counterObj, index) =>
        <View style={{ flexDirection: 'row', }} key={index}>
          <View style={{ flex: 1 }}>
            <Text style={styles.activityDesc}>{counterObj.type}</Text>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1, flexDirection: 'row', }}>
            {
              (counterObj.count > counterObj.minCount) && (
                <TouchableOpacity style={{ borderWidth: 1, borderRadius: 2, marginLeft: 15, paddingVertical: 5, paddingHorizontal: 15, borderColor: '#ff5f5f', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => substract(counterObj)}
                >
                  <Icon name='minus' type='entypo' size={10} color='#ff5f5f' />
                </TouchableOpacity>
              )
            }
            {
              (counterObj.count <= counterObj.minCount) && (
                <TouchableOpacity style={{ borderWidth: 1, borderRadius: 2, marginLeft: 15, paddingVertical: 5, paddingHorizontal: 15, borderColor: '#d3d3d3', justifyContent: 'center', alignItems: 'center' }}
                  disabled={true}
                >
                  <Icon name='minus' type='entypo' size={10} color='#d3d3d3' />
                </TouchableOpacity>
              )
            }
            <Text style={[styles.activityDesc, { width: 35, textAlign: 'center' }]}>{counterObj.count}</Text>
            {
              (this.state.totalCount < this.state.maxCount) && (
                <TouchableOpacity style={{ borderWidth: 1, borderRadius: 2, paddingVertical: 5, paddingHorizontal: 15, borderColor: '#ff5f5f', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => add(counterObj)}
                >
                  <Icon name='plus' type='octicon' size={10} color='#ff5f5f' />
                </TouchableOpacity>
              )
            }
            {
              (this.state.totalCount >= this.state.maxCount) && (
                <TouchableOpacity disabled={true} style={{ borderWidth: 1, borderRadius: 2, paddingVertical: 5, paddingHorizontal: 15, borderColor: '#d3d3d3', justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name='plus' type='octicon' size={10} color='#d3d3d3' />
                </TouchableOpacity>
              )
            }
          </View>
          <OfflineNotificationBar />
        </View>
      );
    }

    let paxForm =
      <View>
        {counterButtons(counter)}
      </View>;

    let rincianHarga = (date) ?
      <TouchableOpacity style={{ flex: 1.5 }} onPress={this._goToRincian}>
        <View style={{ alignItems: 'flex-start' }}>
          <View>
            <Text style={{ fontSize: 15, color: '#000', }}>
              Total
            </Text>
          </View>
          <View style={{ marginTop: 3 }}>
            <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 17 }}>
              {Formatter.price(price)}
            </Text>
          </View>
          <View style={{ marginTop: 4 }} >
            <Text style={{ fontSize: 11, color: '#01d4cb', fontWeight: 'bold' }}>
              Lihat Rincian Harga
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      :
      <View style={{ flex: 1.5, justifyContent: 'center' }} />

    let validasiPaxCount = () => {
      console.log("jalanin validasi paxCount");
      console.log("totalCount: ");
      console.log(this.state.totalCount);
      console.log(this.state.maxCount);
      if (this.state.totalCount > this.state.maxCount) {
        console.log("masuk ke error");
        return (
          <Text style={{ color: "red" }}>total pax lebih dari jumlah maksimal</Text>
        )
      }
    }

    return (
      <View style={{ flex: 1, backgroundColor: '#FAFAFA', paddingBottom: 100 }}>
        <ScrollView style={{ flex: 1, }}>
          <ContinueToCartModal
            isVisible={this.state.isContinueToCartModalVisible}
            {...this.props}
          />
          <LoadingModal isVisible={this.state.isLoading} />

          <View style={styles.container}>

            <View style={{ marginBottom: 30 }}>
              <TouchableOpacity onPress={this._goToCalendarPicker} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <View>
                    <Text style={styles.activityTitle}>Jadwal</Text>
                    {isDateValid || <Text style={styles.validation}>Mohon pilih jadwal</Text>}
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.clickableText}>
                      {isDateSelected ? 'Ubah' : 'Pilih'}
                    </Text>
                  </View>
                </View>

                {this.state.isDateSelected ||
                  <View style={styles.containerPackage}>
                    <Text style={styles.activityDesc}>Pilih Jadwal yang kamu inginkan</Text>
                  </View>
                }


              </TouchableOpacity>

              {this.state.isDateSelected &&
                <View style={styles.containerPackage}>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={this.state.isDateSelected ?
                      styles.activityDesc : styles.warningText} >
                      {selectedDateText}
                    </Text>
                  </View>
                </View>
              }
            </View>

            <View style={{ marginBottom: 30 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.activityTitle}>Peserta</Text>
                <View style={{ flex: 1, alignItems: 'flex-end', }}>
                  <Text style={styles.seeMore}>{totalCount} orang</Text>
                </View>
              </View>

              <View style={styles.containerPackage}>
                {paxForm}
                {validasiPaxCount()}
              </View>

            </View>

            <View>
              <TouchableOpacity onPress={this._goToBookingContact} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <View>
                    <Text style={styles.activityTitle}>Kontak Peserta</Text>
                    {/*isContactFilled || <Text style={styles.validation}>Mohon masukkan kontak</Text>*/}
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.clickableText}>
                      {isContactFilled ? 'Ubah' : 'Pilih'}
                    </Text>
                  </View>
                </View>

                {isContactFilled ||
                  <View style={styles.containerPackage}>
                    <Text style={styles.activityDesc}>Masukkan kontak untuk aktivitas ini</Text>
                  </View>
                }

              </TouchableOpacity>

              {isContactFilled && contact &&
                <View style={styles.containerPackage}>
                  <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                    <Text style={styles.activityDesc}>
                      {contact.name}{'\n'}
                      {contact.email}{'\n'}
                      {phoneWithoutCountryCode_Indonesia(contact.phone)}
                    </Text>
                  </View>
                </View>
              }
              {!isContactFilled && isBookButtonPressed &&
                <Text style={styles.warningText} >
                  Mohon isi data kontak peserta
              </Text>
              }
            </View>

          </View>

        </ScrollView>
        <View style={globalStyles.bottomCtaBarContainer3}>
          {rincianHarga}
          <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
            <Button
              containerStyle={globalStyles.ctaButton}
              style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}
              onPress={this._book}
              disabled={this.state.isLoading}
              styleDisabled={{ color: '#aaa' }}
            >
              Pesan
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  clickableText: {
    color: '#00d3c5',
    fontWeight: 'bold',
    fontSize: 13,
  },
  container: {
    padding: 20,
    backgroundColor: '#fafafa',
    flex: 1,
  },
  containerPackage: {
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#B0B0B0',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.3
      },
      android: {
        elevation: 2,
      },
    }),
  },
  addButton: {
    height: 35,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#437ef7',
  },
  thumb: {
    resizeMode: 'cover',
    width: '100%',
    height: 170,
    borderRadius: 5
  },
  seeMore: {
    fontSize: 14,
    color: '#676767',
    marginTop: 3
  },
  activityTitle: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 15,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {
        lineHeight: 24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activitydetailTitle: {
    fontFamily: 'Hind-Bold',
    fontSize: 19,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 20 - (19 * 0.4),
        marginBottom: -15,
        //backgroundColor:'red'
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
  activityDesc1: {
    fontSize: 14,
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
  hargaDesc: {
    fontSize: 14,
    color: '#f57b76',
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
  moreDesc: {
    fontSize: 12,
    color: '#818181',
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
  activityDescNumb: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind',
    width: 30,
    textAlign: 'center',
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
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 5,
    marginBottom: 5,
  },
  validation: {
    color: '#fc2b4e',
    fontSize: 12
  },
  warningText: {
    color: 'red',
  },
  containerMoreDescription: {
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    paddingTop: 15,
    marginTop: 15
  },
});
