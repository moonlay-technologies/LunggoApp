'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import { Rating, Icon } from 'react-native-elements';
import {
  Platform, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView
} from 'react-native';
import {
  AUTH_LEVEL, fetchTravoramaApi, checkUserLoggedIn, backToMain,
} from '../../api/Common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo';
export default class SubmitReviewScreen extends React.Component {

  static navigationOptions = {
    title: 'Beri Review',
  };

  constructor(props) {
    super(props);
    this.reviewText = '';
    this.minLength = 20;
    this.state = { isValidated: true };
  }

  _validate = async () => {
    let textLength = (this.reviewText.match(/\S/g) || []).length;
    if (textLength < this.minLength)
      await this.setState({ isValidated: false });
    else
      await this.setState({ isValidated: true });
  }

  _submitReview = async () => {
    Keyboard.dismiss();
    await this._validate();
    if (!this.state.isValidated)
      return;

    const version = 'v1';
    let rsvNo = this.props.navigation.state.params.rsvNo;
    console.log({
      review: this.reviewText,
      date: new Date()
    });
    let request = {
      path: `/${version}/activities/mybooking/${rsvNo}/review`,
      requiredAuthLevel: AUTH_LEVEL.User,
      data: {
        review: this.reviewText,
        date: new Date()
      },
      method: 'POST'
    };
    fetchTravoramaApi(request).catch(error => console.log(error));
    backToMain(this.props.navigation);
  }

  render() {
    let { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled" enableAutomaticScroll={true} enableOnAndroid={true} extraScrollHeight={94}>
      <View style={styles.container}>      
        <View style={styles.containerReview}>
          <View>
            {/* <View style={{ marginBottom: 40 }}>
              <Text style={styles.activityTitleBig}>Thank you</Text>
            </View> */}
            <View>
              <Text style={styles.activityDesc}>Berikan komentar dan ulasanmu!</Text>
            </View>
            <View style={{ alignItems: 'center', marginTop: 25, }}>
              <TextInput
                style={{ textAlignVertical: 'top', borderWidth: 1, borderColor: '#cdcdcd', fontSize: 14, width: '100%', borderRadius: 5, paddingVertical: 13, paddingHorizontal: 10, height: 100 }}
                placeholder='Aktivitasnya menyenangkan, pelayanannya baik dan ramah, dst...'
                underlineColorAndroid='transparent'
                multiline={true}
                numberOfLines={5}
                onChangeText={text => {
                  this.reviewText = text;
                  this._validate();
                }}
                onSubmitEditing={Keyboard.dismiss}
              />
            </View>
          </View>
          {this.state.isValidated ||
            <Text style={{ color: 'red', alignSelf: 'flex-end', paddingTop: 5 }}>
              Review minimal memiliki 20 karakter
            </Text>}
        </View>
        <TouchableOpacity
            onPress={this._submitReview}
            style={{ alignItems: 'center', width: '100%', marginTop: 30 }}
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
                Lanjut
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        

        {/*<TouchableOpacity style={styles.containerSubmit} onPress={() => this._submitReview()}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Lanjut</Text>
            </TouchableOpacity>*/}
       
      </View>
      
      </KeyboardAwareScrollView>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#f7f9fc',
  },
  containerSubmit: {
    backgroundColor: '#23d3c3',
    paddingVertical: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '111%'
  },
  containerReview: {
    backgroundColor: '#fff',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
    borderRadius: 3,
    marginTop: 70,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 6,
        shadowOpacity: 0.1
      },
      android: {
        elevation: 2,
      },
    }),
  },
  activityTitleBig: {
    fontFamily: 'Hind',
    fontSize: 30,
    color: '#454545',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 16,
        paddingTop: 24,
        marginBottom: -30,
      },
      android: {
        lineHeight: 36
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityDesc: {
    fontSize: 17,
    color: '#454545',
    fontFamily: 'Hind',
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
});
