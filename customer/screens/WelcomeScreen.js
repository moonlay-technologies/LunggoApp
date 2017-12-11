'use strict';

import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
// import AppIntro from 'react-native-app-intro';

export default class WelcomeScreen extends Component {
  static navigationOptions = {
    title: 'Welcome',
  };

  onSkipBtnHandle = (index) => {
    // Alert.alert('Skip');
    console.log(index);
  }
  doneBtnHandle = () => {
    // Alert.alert('Done');
  }
  nextBtnHandle = (index) => {
    // Alert.alert('Next');
    console.log(index);
  }
  onSlideChangeHandle = (index, total) => {
    console.log(index, total);
  }

  render() {
    const pageArray = [{
      title: 'Page 1',
      description: 'Description 1',
      img: 'http://lorempixel.com/400/200',
      imgStyle: {
        height: 80 * 2.5,
        width: 109 * 2.5,
      },
      backgroundColor: '#fa931d',//'skyblue',
      fontColor: '#fff',
      level: 10,
    }, {
      title: 'Page 2',
      description: 'Description 2',
      img: 'http://lorempixel.com/400/200/abstract',
      // img: require('http://lorempixel.com/1080/1920/abstract/Dummy-Text'),
      imgStyle: {
        height: 93 * 2.5,
        width: 103 * 2.5,
      },
      backgroundColor: '#a4b602',
      fontColor: '#fff',
      level: 10,
    }];
    return (
      <AppIntro
        onNextBtnClick={this.nextBtnHandle}
        onDoneBtnClick={this.doneBtnHandle}
        onSkipBtnClick={this.onSkipBtnHandle}
        onSlideChange={this.onSlideChangeHandle}
        pageArray={pageArray}
      />
    );
  }
}