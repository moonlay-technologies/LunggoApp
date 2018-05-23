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

export default class LoginScreen extends Component<{}> {
  render() {
    return (
      <View style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        <View style={{marginTop:30}}></View>
          <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#ececec', paddingBottom:20, marginBottom:15 }}>
            <View><Text style={styles.labelRefund}>Jumlah Uang: </Text></View>
            <View><Text style={styles.labelUangRefund}>Rp 400.000</Text></View>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Nama Rekening</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={ styles.searchInput
              }
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              onSubmitEditing={(event) => {
                this.refs.passwordInput.focus();
              }}
              // blurOnSubmit={false}
              onChangeText={userName => this.setState({
                userName, errorUserName: null, error: null
              })}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Nama Bank</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={ styles.searchInput
              }
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              onSubmitEditing={(event) => {
                this.refs.passwordInput.focus();
              }}
              // blurOnSubmit={false}
              onChangeText={userName => this.setState({
                userName, errorUserName: null, error: null
              })}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>Cabang Bank</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={ styles.searchInput
              }
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              onSubmitEditing={(event) => {
                this.refs.passwordInput.focus();
              }}
              // blurOnSubmit={false}
              onChangeText={userName => this.setState({
                userName, errorUserName: null, error: null
              })}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <Text style={styles.label}>No. Rekening</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              style={ styles.searchInput
              }
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              autoCorrect={false}
              returnKeyType='next'
              onSubmitEditing={(event) => {
                this.refs.passwordInput.focus();
              }}
              // blurOnSubmit={false}
              onChangeText={userName => this.setState({
                userName, errorUserName: null, error: null
              })}
            />
          </View>


          <View style={{marginVertical:15}}>
            <View style={{marginBottom:8}}>
              <Text style={styles.activityDesc}>*) Penarikan dana ke rekening BRI akan dikenakan biaya transfer Rp 1,000.- oleh Bank BRI.</Text>
            </View>
            <View style={{marginBottom:8}}>
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
                Refund
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        <View style={{marginBottom:30}}></View>
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal:15,
    backgroundColor: '#fff',
    flex:1,
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
