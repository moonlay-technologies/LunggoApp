'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo';
import { AUTH_LEVEL, fetchTravoramaApi } from '../../api/Common';
import LoadingModal from './../../commons/components/LoadingModal';
import Moment from 'moment';
import 'moment/locale/id';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import { CheckBox } from 'react-native-elements';
import { getMyBookingTrxList, cancelReservation, async } from './MyBooking/MyBookingController';

export default class RefundScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { ...this.props.navigation.state.params, isLoading: false };
    this.setState({
      checked: false
    });
  }

  static navigationOptions = {
    title: 'Rekening Refund',
  }

  _checkRefundData = async () => {
    let checkAccNumber = isNullOrWhitespace(this.state.accountNumber);
    this.setState({
      error: false
    });
    if (checkAccNumber) {
      this.setState({
        error: true,
        errorAccountNumber: 'Tidak boleh kosong'
      })
    }
    let checkOwnerName = isNullOrWhitespace(this.state.ownerName);
    if (checkOwnerName) {
      this.setState({
        error: true,
        errorOwnerName: 'Tidak boleh kosong'
      })
    }
    let checkCabangBank = isNullOrWhitespace(this.state.branch);
    if (checkCabangBank) {
      this.setState({
        error: true,
        errorBranch: 'Tidak boleh kosong'
      })
    }
    let namaBank = this.refs.namaBank.value();
    let checkNamaBank = isNullOrWhitespace(namaBank);
    if (checkNamaBank) {
      this.setState({
        error: true,
        errorNamaBank: 'Tidak boleh kosong'
      })
    }
    if (this.state.status == 'cancel') {
      let checkCancellationReason = isNullOrWhitespace(this.state.cancellationReason);
      if (checkCancellationReason) {
        this.setState({
          error: true,
          errorCancellationReason: 'Pilih salah satu alasan'
        })
      }

      if (this.state.cancellationReason == "Lainnya") {
        let checkOtherReason = isNullOrWhitespace(this.state.otherReason);
        if (checkOtherReason) {
          this.setState({
            error: true,
            errorOtherReason: 'Tidak boleh kosong'
          })
        }
      }
    }

    if (!this.state.checked) {
      this.setState({
        error: true,
        errorCheckBox: 'Anda belum menyetujui terms and condition'
      })
    }

  }


  _submit = async () => {

    await this._checkRefundData();
    console.log("kondisi error");
    console.log(this.state.error);
    if (this.state.error) return;
    if (this.state.status == 'cancel') {
      await cancelReservation(this.state.rsvNo, this.state.cancellationReason == "Lainnya" ? this.state.otherReason : this.state.cancellationReason);
    }
    let namaBank = this.refs.namaBank.value()
    this.setState({ isLoading: true });
    const version = 'v1';
    let request = {
      path: `/${version}/activities/mybooking/${this.state.rsvNo}/refund/bankaccount`,
      method: 'POST',
      requiredAuthLevel: AUTH_LEVEL.User,
      data: {
        rsvNo: this.state.rsvNo,
        bankAccount: {
          accountNumber: this.state.accountNumber,
          bankName: namaBank,
          ownerName: this.state.ownerName,
          branch: this.state.branch
        }
      }
    }
    let response = await fetchTravoramaApi(request);
    console.log(response);
    let success = (response.status === 200);
    if (success)
      this.props.navigation.goBack();
    this.setState({ isLoading: true });
  }

  render() {
    let amount = this.state.amount;
    let radio_props = [
      { label: "Tidak jadi berangkat", value: "Tidak jadi berangkat" },
      { label: "Menemukan operator yang lebih mmurah", value: "Menemukan operator yang lebih mmurah" },
      { label: "Jadwal berangkat berubah", value: "Jadwal berangkat berubah" },
      { label: "Pilih aktivitas lain", value: "Pilih aktivitas lain" },
      { label: "Lainnya", value: "Lainnya" },
    ]
    let namaBank = [{
      value: 'Bank BNI',
    }, {
      value: 'Bank BRI',
    }, {
      value: 'Bank Mandiri',
    }];
    return (
      <View style={styles.container}>
        {this.state.isLoading && <LoadingModal />}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >

          <View style={{ marginTop: 30 }}></View>
          {/* <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#ececec', paddingBottom:20, marginBottom:15 }}>
            <View><Text style={styles.labelRefund}>Jumlah Uang: </Text></View>
            <View><Text style={styles.labelUangRefund}>Rp 400.000</Text></View>
          </View> */}
          <View>
            <Text style={styles.label}>No Pesanan: {this.state.rsvNo} </Text>
          </View>
          <View style={{ marginTop: 10, marginBottom: 20 }}>
            <Text style={styles.label}>Jumlah Uang Refund: {amount ? amount : 0} </Text>
          </View>

          {!!amount && (
            <View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.label}>No. Rekening</Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  style={styles.searchInput}
                  ref='accountNumberInput'
                  keyboardType='default'
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  onSubmitEditing={() => this.refs.ownerNameInput.focus()}
                  onFocus={() => this.setState({ errorAccountNumber: undefined })}
                  // blurOnSubmit={false}
                  onChangeText={accountNumber => this.setState({ accountNumber })}
                  value={this.state.accountNumber}
                />
                <Text style={[styles.activityDesc, { color: 'red' }]}>
                  {
                    this.state.errorAccountNumber
                  }
                </Text>
              </View>

              <View >
                <Text style={styles.label}>Nama Bank</Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                {/* <TextInput
              style={styles.searchInput}
              ref='bankNameInput'
              keyboardType='default'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              onSubmitEditing={() => this.refs.ownerNameInput.focus()}
              // blurOnSubmit={false}
              onChangeText={bankName => this.setState({ bankName })}
              value={this.state.bankName}
            /> */}
                <Dropdown
                  label='Nama Bank'
                  data={namaBank}
                  ref='namaBank'
                  onChangeText={() => this.setState({ errorNamaBank: undefined })}
                />
                <Text style={[styles.activityDesc, { color: 'red' }]} >
                  {
                    this.state.errorNamaBank
                  }
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.label}>Nama Pemilik Rekening</Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  style={styles.searchInput}
                  ref='ownerNameInput'
                  keyboardType='default'
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  onSubmitEditing={() => this.refs.branchInput.focus()}
                  // blurOnSubmit={false}
                  onChangeText={ownerName => this.setState({ ownerName })}
                  onFocus={() => this.setState({ errorOwnerName: undefined })}
                  value={this.state.ownerName}
                />
                <Text style={[styles.activityDesc, { color: 'red' }]} >
                  {
                    this.state.errorOwnerName
                  }
                </Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <Text style={styles.label}>Cabang Bank</Text>
              </View>
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  style={styles.searchInput}
                  ref='branchInput'
                  keyboardType='default'
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  onSubmitEditing={this._submit}
                  // blurOnSubmit={false}
                  onChangeText={branch => this.setState({ branch })}
                  value={this.state.branch}
                  onFocus={() => this.setState({ errorBranch: undefined })}
                />
                <Text style={[styles.activityDesc, { color: 'red' }]} >
                  {
                    this.state.errorBranch
                  }
                </Text>
              </View>
            </View>)
          }
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Alasan Pembatalan</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <RadioForm
              radio_props={radio_props}
              initial={-1}
              animation={false}
              onPress={(value) => this.setState({ cancellationReason: value, errorCancellationReason: undefined })}
              buttonColor={'#000000'}
              selectedButtonColor={'#00d3c5'}
              buttonSize={10}
              style={{ alignItems: 'flex-start' }}
            />
            <Text style={[styles.activityDesc, { color: 'red' }]} >
              {
                this.state.errorCancellationReason
              }
            </Text>
          </View>
          {
            this.state.cancellationReason == "Lainnya" && (
              <View style={{ marginBottom: 10 }}>
                <TextInput
                  style={styles.searchInput}
                  ref='otherReason'
                  keyboardType='default'
                  underlineColorAndroid='transparent'
                  autoCapitalize='none'
                  autoCorrect={false}
                  returnKeyType='next'
                  onSubmitEditing={this._submit}
                  onChangeText={other => this.setState({ otherReason: other })}
                  onFocus={() => this.setState({ errorOtherReason: undefined })}
                  value={this.state.otherReason}
                />
                <Text style={[styles.activityDesc, { color: 'red' }]} >
                  {
                    this.state.errorOtherReason
                  }
                </Text>
              </View>

            )
          }

          <View style={{ marginVertical: 15 }}>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.activityDesc}>- Penarikan dana ke rekening BRI akan dikenakan biaya transfer Rp 1,000.- oleh Bank BRI.</Text>
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.activityDesc}>- Pengembalian dana akan diproses dalam 1x24 jam.</Text>
            </View>
            <View>
              <Text style={styles.activityDesc}>- Biaya tambahan yang dibebankan akan menjadi tanggungan pengguna.</Text>
            </View>
          </View>
          <View style={{ marginTop: 10 }}>
            <CheckBox
              size={20}
              title='Dengan centang, kamu telah setuju untuk terms dan cond pembatalan dan uang kembali'
              textStyle={styles.activityDesc}
              checked={this.state.checked}
              onPress={() => this.setState({ checked: !this.state.checked, errorCheckBox: undefined })} />
            <Text style={[styles.activityDesc, { color: 'red', marginLeft: 10 }]} >
              {
                this.state.errorCheckBox
              }
            </Text>
          </View>

          <TouchableOpacity
            style={{ alignItems: 'center', width: '100%', marginTop: 20 }}
            activeOpacity={0.6}
            styleDisabled={{ opacity: .7 }}
            onPress={this._submit}
          >
            <LinearGradient
              colors={['#00d3c5', '#35eac6', '#6affc6']}
              start={[0, 0]}
              end={[1, 0]}
              style={{ height: 45, paddingTop: 11, alignItems: 'center', borderRadius: 25, width: '100%' }}>
              <Text style={{
                backgroundColor: 'transparent',
                fontSize: 18, color: '#ffffff',
                fontFamily: 'HindSemiBold',
              }}>
                OK
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {
            this.state.error && (
              <View>
                <Text style={[styles.activityDesc, { color: 'red', alignItems: 'center' }]} >
                  Masih terjadi error
            </Text>
              </View>
            )
          }
          <View style={{ marginBottom: 30 }}></View>

        </ScrollView>
      </View>
    );
  }
}

function isNullOrWhitespace(input) {

  if (typeof input === 'undefined' || input == null) return true;

  return input.replace(/\s/g, '').length < 1;

}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'HindSemiBold',
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
  labelUangRefund: {
    fontSize: 18,
    color: '#00d3c5',
    fontFamily: 'HindSemiBold',
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
  labelRefund: {
    fontSize: 18,
    color: '#454545',
    fontFamily: 'HindSemiBold',
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
  searchInput: {
    height: 45,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 7,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 25,
    color: '#565656',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Hind',
  },
  searchInputFalse: {
    height: 45,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 7,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#fdaab8',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Hind',
  },
  activityDesc: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'HindLight',
    ...Platform.select({
      ios: {
        lineHeight: 14,
        paddingTop: 9,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
});
