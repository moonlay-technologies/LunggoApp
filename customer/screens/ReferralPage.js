'use strict';

import React from 'react';
import Button from 'react-native-button';
import { LinearGradient } from 'expo';
import {
  Platform, StyleSheet, Text, View, Image, ScrollView, //Clipboard,
  TouchableOpacity, TextInput, TouchableWithoutFeedback
} from 'react-native';
import * as Formatter from '../../customer/components/Formatter';
import Modal from '../../commons/components/Modal';
import globalStyles from '../../commons/globalStyles';

export default class Referral extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      referralCode: 'Loading...',
      referralCredit: '...',
      expDate: null,
      shareableLink: '',
    }
  }

  static navigationOptions = {
    title: 'Referral',
  }

  componentDidMount() {
    // getReferralCode().then(res => {
    //   this.setState(res);
    // });
  }

  // _copyToClipboard = () => Clipboard.setString(this.state.referralCode)
  _onShareCTAPressed = () => this.refs.modal.openModal()
  _goToReferralHistory = () => this.props.navigation.navigate('ReferralHistory')

  render() {
    return (
      <ScrollView style={{flex:1, backgroundColor:'#fff', height:'100%'}}>
        <ShareModal ref='modal' />
        <TouchableOpacity
          onPress={this._goToReferralHistory}
          style={styles.containerCredits}
        >
          <View style={{flexDirection:'row'}}>
            <Text style={styles.h2}>
              Kredit kamu:
            </Text>
            <Text style={styles.h2Credit}>
              {Formatter.price(this.state.referralCredit)}
            </Text>
          </View>
          <Text style={styles.h2}>Lihat Referral</Text>
        </TouchableOpacity>

        <View style={styles.container}>
          <View style={{alignItems:'center'}}>
            <Image 
              style={{ width: 220, height: 220, resizeMode: 'contain' }}
              source={require('../../assets/images/referral.png')} 
            />
          </View>
          <View style={{alignItems:'center', marginTop:10}}>
            <Text style={styles.h1}>Undang Teman Kamu</Text>
            <Text style={styles.activityDesc}>
              Immediately regret falling into bathtub kitten is playing with dead mouse i like
            </Text>
          </View>
          <TouchableWithoutFeedback onPress={this._onShareCTAPressed}>
            <View>
              <View style={styles.containerKode}>
                <Text style={styles.kodeReferral}>
                  {this.state.referralCode}
                </Text>
                {/*<Text style={styles.btnSalin}>Salin</Text>*/}
              </View>
              <View style={{alignItems: 'center', width:'100%', marginTop:10}} >
                <LinearGradient
                  colors={['#00d3c5', '#35eac6']}
                  start={[0, 0]}
                  end={[1, 0]}
                  style={{ height: 45, paddingTop: 11, alignItems: 'center', borderRadius: 3, width: '100%',  }}>
                  <Text style={{
                    backgroundColor: 'transparent',
                    fontSize: 18, color: '#ffffff',
                    fontFamily: 'Hind-SemiBold',
                  }}>
                    Share
                  </Text>
                </LinearGradient>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    );
  }
}

class ShareModal extends React.Component {

  openModal = () => this._modal.openModal()
  closeModal = () => this._modal.closeModal()
  render() {
    return (
      <Modal ref={ mod => this._modal = mod}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 15, backgroundColor: '#fff' }}>
          <Text style={styles.h6}>
            DUMMY: modal untuk share
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Button
              containerStyle={globalStyles.ctaButton2}
              style={{ fontSize: 14, color: '#fff', fontFamily: 'Hind', }}
              onPress={this.closeModal}>
              Tutup
            </Button>
          </View>
          <View>
            <Button
              containerStyle={globalStyles.ctaButton3}
              style={{ fontSize: 14, color: '#ff5f5f', fontFamily: 'Hind', }}
              onPress={this.closeModal}>
              Tutup
            </Button>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1,
    padding:20,
  },
  containerCredits:{
    backgroundColor:'#f57b76',
    padding:10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  h1:{
    fontFamily: 'Hind-SemiBold',
    fontSize: 22,
    color: '#454545',
    backgroundColor:'transparent',
    ...Platform.select({
      ios: {
        lineHeight: 19,
        paddingTop:15 ,
        marginBottom: -10,
      },
      android: {
        lineHeight: 30,
        marginBottom:5,
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  h2: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Hind-SemiBold',
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
  h2Credit: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Hind-Bold',
    marginLeft: 5,
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
  activityDesc: {
    fontSize: 15.5,
    color: '#454545',
    fontFamily: 'Hind-Light',
    textAlign:'center',
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
  kodeReferral: {
    fontSize: 16,
    color: '#000',
    textAlign:'center',
    fontWeight:'bold'
  },
  // btnSalin: {
  //   fontSize: 16,
  //   color: '#009389',
  //   textAlign:'center',
  //   fontWeight:'bold'
  // },
  containerKode: {
    borderColor:'#dcdcdc',
    borderWidth:2,
    paddingHorizontal:15,
    paddingVertical:15,
    // flexDirection:'row',
    // justifyContent:'space-between',
    width:'100%',
    marginTop:25,
  },
});
