'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import * as Formatter from '../components/Formatter'

export default class RincianHarga extends Component {

  constructor(props) {
    super(props);
    let params = this.props.navigation.state.params;
    this.title = params.title;
    this.breakdown = params.breakdown;
    this.total = params.total;
  }

  static navigationOptions = {
    title: 'Rincian',
  };

  render() {
    console.log(this.breakdown);
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.categoryTitle}>Rincian Harga</Text>
        </View>
        <View style={{ marginTop: 3 }}>
          <Text style={{ color: '#454545', fontSize: 13, letterSpacing: .8, }}>{this.title}</Text>
        </View>
        <View style={{ marginTop: 20 }}>
          {this.breakdown.map((bd, i) =>
            <View key={i}>
              {bd.name &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                  <View style={{ flex: 2, paddingRight: 0 }}>
                    <Text style={{ color: '#454545', fontSize: 14, letterSpacing: .8, }}>{bd.name}</Text>
                  </View>
                </View>}
              {bd.details.map((det, j) =>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }} key={j}>
                  <View style={{ flex: 2, paddingRight: 5 }}>
                    <Text style={{ color: '#454545', fontSize: 14, letterSpacing: .8, }}>
                      {det.count ? det.count + 'x ' : ''}{det.unit}{det.unitPrice ? ' @ ' + Formatter.price(det.unitPrice) : ''}
                    </Text>
                  </View>
                  {det.description &&
                    <View style={{ marginTop: 6 }}>
                      <Text style={{ color: '#454545', fontSize: 11, letterSpacing: .8, lineHeight: 14 }}>det.description</Text>
                    </View>}
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={{ color: '#454545', fontSize: 14, letterSpacing: .8, }}>{Formatter.price(det.totalPrice)}</Text>
                  </View>
                </View>
              )}
            </View>
          )}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#efefef', paddingTop: 20 }}>
            <View style={{ flex: 1, paddingRight: 5 }}>
              <Text style={{ color: '#454545', fontSize: 14, letterSpacing: .8, }}>Total</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={{ color: '#454545', fontSize: 14, letterSpacing: .8, fontWeight: 'bold' }}>{Formatter.price(this.total)}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  reviewTitle: {
    fontSize: 16,
    color: '#454545',
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#454545'
  },
  reviewreply: {
    marginLeft: 20,
    marginTop: 25,
  },
  thumbprofile: {
    height: 30,
    width: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  hyperlink: {
    fontSize: 11,
    marginTop: 5,
    color: '#437ef7',
  },
  isireview: {
    fontSize: 13,
    marginTop: 10,
    color: '#454545',
  },
  reviewDate: {
    fontSize: 12,
    color: '#cecece'
  },
});
