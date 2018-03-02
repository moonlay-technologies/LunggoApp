'use strict';

import React from 'react';
import Button from 'react-native-button';
import { Platform, StyleSheet, Text, View, } from 'react-native';
import globalStyles from '../../commons/globalStyles';
// import Modal from '../../commons/components/Modal';
import Modal from 'react-native-modal';
import { backToMainTab } from '../../api/Common';

export default class ContinueToCartModal extends React.Component {

  constructor(props) {
    super(props)
    this.state = {};
  }

  componentWillReceiveProps({ isVisible }) {
    this.setState({ isVisible });
  }

  _goToCart = () => {
    this.setState({ isVisible: false });
    this.props.navigation.navigate('Cart');
  }

  _seeMoreActivity = () => {
    this.setState({ isVisible: false });
    backToMainTab(this.props.navigation);
  }

  render() {
    return (
      <Modal
        isVisible={this.state.isVisible}
        onBackButtonPress={this._goToCart}
      >
      <View style={{flex:1}}></View>
        <View style={styles.modalContentContainer}>
          <Text style={styles.textCart}>
            Pesananmu sudah masuk keranjang
          </Text>
          <View style={{marginVertical:10}}>
            <Button
              containerStyle={globalStyles.ctaButton2}
              style={{fontSize: 14, color: '#fff', fontFamily:'Hind-SemiBold'}}
              onPress={this._goToCart}
            >
              Lanjut ke Pembayaran
            </Button>
          </View>
          <View >
            <Button
              containerStyle={globalStyles.ctaButton3}
              style={{fontSize: 14, color: '#ff5f5f', fontFamily:'Hind',}}
              onPress={this._seeMoreActivity}
            >
              Lihat Activity Lainnya
            </Button>
          </View>
        </View>
        <View style={{flex:1}}></View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalContentContainer: {
    backgroundColor: 'white',
    // height: 300,
    // width: 300,
    // flex: 1,
    paddingHorizontal:10,paddingVertical:15,
    // justifyContent: 'flex-end'
  },
  textCart: {
    fontFamily: 'Hind', 
    color:'#454545', 
    fontSize:14,
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop:4,
        marginBottom:-5,
      },
      android: {
        //marginTop:5
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
});