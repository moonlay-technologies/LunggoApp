'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
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
    return (
      <ScrollView style={styles.container}>
        <View style={{paddingHorizontal:20}}>
          <Text style={styles.categoryTitle}>Rincian Harga</Text>
        </View>
        <View style={{ marginTop: 3, paddingHorizontal:20}}>
          <Text style={{ color: '#454545', fontSize: 13, letterSpacing: .8, }}>#kode23408123</Text>
        </View>

        <View style={styles.containerRincian}>
          <View style={{marginBottom:10}}>
            <Text style={styles.activityTitle}>Paket perjalanan ke Hongkong</Text>
          </View>
          {this.breakdown.map((bd, i) =>
            <View key={i}>
              {bd.name &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0 }}>
                  <View style={{ flex: 2, paddingRight: 0 }}>
                    <Text style={styles.activityDesc}>{bd.name}</Text>
                  </View>
                </View>}
              {bd.details.map((det, j) =>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0}} key={j}>

                  <View style={{ flex: 2, paddingRight: 5 }}>
                    <Text style={styles.activityDesc}>
                      {det.count ? det.count + 'x ' : ''}{det.unit}{det.unitPrice ? ' @ ' + Formatter.price(det.unitPrice) : ''}
                    </Text>
                  </View>
                  {det.description &&
                    <View style={{ marginTop: 6 }}>
                      <Text style={{ color: '#454545', fontSize: 11, letterSpacing: .8, lineHeight: 14 }}>det.description</Text>
                    </View>}
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.activityDesc}>{Formatter.price(det.totalPrice)}</Text>
                  </View>

                </View> 
              )}
            </View>
          )} 

           <View style={{marginVertical:5}}></View>

          {this.breakdown.map((bd, i) =>
            <View key={i}>
              {bd.name &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20 }}>
                  <View style={{ flex: 2, paddingRight: 0 }}>
                    <Text style={styles.activityDesc}>{bd.name}</Text>
                  </View>
                </View>}
              {bd.details.map((det, j) =>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical:0}} key={j}>

                  <View style={{ flex: 2, paddingRight: 5 }}>
                    <Text style={styles.activityDesc}>
                      1x Child @ Rp 200.000
                    </Text>
                  </View>
                  {det.description &&
                    <View style={{ marginTop: 6 }}>
                      <Text style={{ color: '#454545', fontSize: 11, letterSpacing: .8, lineHeight: 14 }}>det.description</Text>
                    </View>}
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.activityDesc}>Rp 200.000</Text>
                  </View>

                </View> 
              )}
            </View>
          )} 
          
          <View style={{marginVertical:5}}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#efefef', paddingTop: 15 }}>
            <View style={{ flex: 1, paddingRight: 5 }}>
              <Text style={styles.activityDesc}>Total</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.activityDesc}>{Formatter.price(this.total)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerRincian}>
          <View style={{marginBottom:10}}>
            <Text style={styles.activityTitle}>Paket perjalanan ke Inggeris</Text>
          </View>
          {this.breakdown.map((bd, i) =>
            <View key={i}>
              {bd.name &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0 }}>
                  <View style={{ flex: 2, paddingRight: 0 }}>
                    <Text style={styles.activityDesc}>{bd.name}</Text>
                  </View>
                </View>}
              {bd.details.map((det, j) =>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0}} key={j}>

                  <View style={{ flex: 2, paddingRight: 5 }}>
                    <Text style={styles.activityDesc}>
                      {det.count ? det.count + 'x ' : ''}{det.unit}{det.unitPrice ? ' @ ' + Formatter.price(det.unitPrice) : ''}
                    </Text>
                  </View>
                  {det.description &&
                    <View style={{ marginTop: 6 }}>
                      <Text style={{ color: '#454545', fontSize: 11, letterSpacing: .8, lineHeight: 14 }}>det.description</Text>
                    </View>}
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.activityDesc}>{Formatter.price(det.totalPrice)}</Text>
                  </View>

                </View> 
              )}
            </View>
          )} 
          <View style={{marginVertical:5}}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#efefef', paddingTop: 15 }}>
            <View style={{ flex: 1, paddingRight: 5 }}>
              <Text style={styles.activityDesc}>Total</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.activityDesc}>{Formatter.price(this.total)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.containerRincian}>
          {this.breakdown.map((bd, i) =>
            <View key={i}>
              {bd.details.map((det, j) =>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0}} key={j}>
                  <View style={{ flex: 2, paddingRight: 5 }}>
                    <Text style={styles.activityDesc}>
                      Diskon voucher
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.activityDesc}>Rp 200.000</Text>
                  </View>

                </View> 
              )}
            </View>
          )} 
          <View style={{marginVertical:5}}></View>

          {this.breakdown.map((bd, i) =>
            <View key={i}>
              {bd.details.map((det, j) =>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 0}} key={j}>
                  <View style={{ flex: 2, paddingRight: 5 }}>
                    <Text style={styles.activityDesc}>
                      Kode Unik
                    </Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end' }}>
                    <Text style={styles.activityDesc}>Rp 153</Text>
                  </View>

                </View> 
              )}
            </View>
          )} 
          <View style={{marginVertical:5}}></View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#efefef', paddingTop: 15 }}>
            <View style={{ flex: 1, paddingRight: 5 }}>
              <Text style={styles.activityDescTotal}>Grand Total</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <Text style={styles.activityDescTotal}>{Formatter.price(this.total)}</Text>
            </View>
          </View>
        </View>

        <View style={{paddingBottom:40}}></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    backgroundColor: '#fafafa',
    flex: 1,
  },
  containerRincian: {
     marginTop: 20, 
     backgroundColor:'#fff', 
     padding:20,
     borderWidth:1,
     borderColor:'#dfdfdf'
  },
  activityTitle: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 17,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 20 - (19 * 0.4),
        //backgroundColor:'red'
      },
      android: {
        lineHeight: 24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityDesc: {
    fontSize: 15,
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
    activityDescTotal: {
    fontSize: 17,
    color: '#454545',
    fontFamily: 'Hind-Bold',
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
  categoryTitle: {
    fontFamily: 'Hind-Bold',
    fontSize: 28,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight:30,
        paddingTop:5,
        marginBottom:-25,  
      },
      android: {
        lineHeight: 26,
        paddingBottom:8,

      },
    }),
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
