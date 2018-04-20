'use strict';

import React from 'react';
import Button from 'react-native-button';
import { Platform, StyleSheet, Text, View, Linking, BackHandler } from 'react-native';
import globalStyles from '../../commons/globalStyles';
// import Modal from '../../commons/components/Modal';
import Modal from 'react-native-modal';
import { backToMain } from '../../api/Common';
import { NavigationActions } from 'react-navigation';
import RNExitApp from 'react-native-exit-app';

export default class UpdateNotifModal extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      isVisible: true
    }
  }
  render() {
    if (this.props.isVisible) return (
      <Modal
        isVisible={this.state.isVisible}
        onBackButtonPress={BackHandler.exitApp}
      >
        <View style={{ flex: 1 }}></View>
        <View style={styles.modalContentContainer}>
          <Text style={styles.textCart}>
            Your version is {this.props.currentVersion},
            You need to update to {this.props.latestVersion} version.
            Tap OK to update
          </Text>
          <View style={{ marginVertical: 10 }}>
            <Button
              containerStyle={globalStyles.ctaButton2}
              style={{ fontSize: 14, color: '#fff', fontFamily: 'Hind-SemiBold' }}
              onPress={() => Linking.openURL(this.props.urlPlatform)}
            >
              OK
            </Button>
          </View>
          {
            !this.props.forceToUpdate && (
              <View >
                <Button
                  containerStyle={globalStyles.ctaButton3}
                  style={{ fontSize: 14, color: '#ff5f5f', fontFamily: 'Hind', }}
                  onPress={() => this.setState({
                    isVisible: false
                  })}
                >
                  Later
            </Button>
              </View>
            )
          }
        </View>
        <View style={{ flex: 1 }}></View>
      </Modal>
    );
    else return null;
  }
}

const styles = StyleSheet.create({
  modalContentContainer: {
    backgroundColor: 'white',
    // height: 300,
    // width: 300,
    // flex: 1,
    paddingHorizontal: 10, paddingVertical: 15,
    // justifyContent: 'flex-end'
  },
  textCart: {
    fontFamily: 'Hind',
    color: '#454545',
    fontSize: 14,
    textAlign: 'center',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 4,
        marginBottom: -5,
      },
      android: {
        //marginTop:5
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
});