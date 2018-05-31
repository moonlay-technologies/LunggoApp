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
  ScrollView
} from 'react-native';
import { LinearGradient } from 'expo';
import { AUTH_LEVEL, fetchTravoramaApi } from '../../api/Common';
import LoadingModal from './../../commons/components/LoadingModal';
import { fetchMyBookingActivityList } from './MyBooking/MyBookingController';

export default class RefundScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { ...this.props.navigation.state.params, isLoading: false };
  }

  static navigationOptions = {
    title: 'Rekening Refund',
  }

  _submit = async () => {
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
          bankName: this.state.bankName,
          ownerName: this.state.ownerName,
          branch: this.state.branch
        }
      }
    }
    let response = await fetchTravoramaApi(request);
    console.log(response);
    let success = (response.status === 200);
    if (success) {
      this.setState({ isLoading: true });
      fetchMyBookingActivityList().then(a => {
        this.setState({ isLoading: false });
        this.props.navigation.goBack();
      }
      )
    }

  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading && <LoadingModal isVisible={this.state.isLoading}/>}
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 30 }}></View>
          {/* <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#ececec', paddingBottom:20, marginBottom:15 }}>
            <View><Text style={styles.labelRefund}>Jumlah Uang: </Text></View>
            <View><Text style={styles.labelUangRefund}>Rp 400.000</Text></View>
          </View> */}
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
              onSubmitEditing={() => this.refs.bankNameInput.focus()}
              // blurOnSubmit={false}
              onChangeText={accountNumber => this.setState({ accountNumber })}
              value={this.state.accountNumber}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Nama Bank</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TextInput
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
            />
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
              value={this.state.ownerName}
            />
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
            />
          </View>


          <View style={{ marginVertical: 15 }}>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.activityDesc}>*) Penarikan dana ke rekening BRI akan dikenakan biaya transfer Rp 1,000.- oleh Bank BRI.</Text>
            </View>
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.activityDesc}>*) Pengembalian dana akan diproses dalam 2x24 jam.</Text>
            </View>
            <View>
              <Text style={styles.activityDesc}>*) Biaya tambahan yang dibebankan akan menjadi tanggungan pengguna.</Text>
            </View>
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
                fontFamily: 'Hind-SemiBold',
              }}>
                OK
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View style={{ marginBottom: 30 }}></View>
        </ScrollView>
      </View>
    );
  }
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
    fontFamily: 'Hind-SemiBold',
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
    fontFamily: 'Hind-SemiBold',
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
    fontFamily: 'Hind-SemiBold',
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
    fontFamily: 'Hind-Light',
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
