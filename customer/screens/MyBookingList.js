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

import globalStyles from '../../commons/globalStyles';
export default class LoginScreen extends Component<{}> {
  
  static navigationOptions = {
    title: 'My Booking ',
  };

  render() {
    return (
      <ScrollView style={{backgroundColor:'#f7f9fc', flex:1}}>
        <View style={styles.container}>
          <View style={styles.cartbox}>

            <View style={{flexDirection:'row'}}>
              <View>
                <Image style={styles.thumbprofile} source={require('../assets/images/thumbimg2.jpg')}/>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.activityTitle}>Trip to Bandung</Text>
                <Text style={styles.activityDesc}>12 Agustus 2017</Text>
                <Text style={styles.activityDesc}>2 Adults</Text>
              </View>
            </View>

            <View style={{flexDirection:'row', marginTop:15}}>
              <View style={{flex:1}}>
                <Button
                  containerStyle={globalStyles.ctaButton5}
                  style={{fontSize: 12, color: '#777',}}>
                  Review
                </Button>
              </View>
              <View style={{flex:1, alignItems:'flex-end'}}>
                <Button
                  containerStyle={globalStyles.ctaButton4}
                  style={{fontSize: 12, color: '#fff',}}>
                  Lihat Voucher
                </Button>
              </View>
            </View>
            <View style={styles.separator}></View>
            <View style={{flexDirection:'row'}}>
              <View>
                <Image style={styles.thumbprofile} source={require('../assets/images/thumbimg2.jpg')}/>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.activityTitle}>Trip to Bandung</Text>
                <Text style={styles.activityDesc}>12 Agustus 2017</Text>
                <Text style={styles.activityDesc}>2 Adults</Text>
              </View>
            </View>
            <View style={{flexDirection:'row', marginTop:15}}>
              <View style={{flex:1}}>
                <Button
                  containerStyle={globalStyles.ctaButton5}
                  style={{fontSize: 12, color: '#777',}}>
                  Review
                </Button>
              </View>
              <View style={{flex:1, alignItems:'flex-end'}}>
                <Button
                  containerStyle={globalStyles.ctaButton4}
                  style={{fontSize: 12, color: '#fff',}}>
                  Lihat Voucher
                </Button>
              </View>
            </View>
            <View style={styles.total}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Text style={styles.activityDesc}>Total</Text>
                  <Text style={styles.activityDesc}>Status: Terbit</Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  <Text style={styles.activityDesc}>Rp. 1.000.000</Text>
                </View>
              </View>
            </View>

            <View style={styles.invoice}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Button
                    containerStyle={globalStyles.ctaButton6}
                    style={{fontSize: 12, color: '#fff',}}>
                    Lihat Invoice
                  </Button>
                </View>
              </View>
            </View>

          </View>

          <View style={styles.cartbox}>
            <View style={{flexDirection:'row'}}>
              <View>
                <Image style={styles.thumbprofile} source={require('../assets/images/thumbimg2.jpg')}/>
              </View>
              <View style={{flex:1}}>
                <Text style={styles.activityTitle}>Trip to Bandung</Text>
                <Text style={styles.activityDesc}>12 Agustus 2017</Text>
                <Text style={styles.activityDesc}>2 Adults</Text>
              </View>
            </View>

            <View style={{flexDirection:'row', marginTop:15}}>
              <View style={{flex:1}}>
                <Button
                  containerStyle={globalStyles.ctaButton5}
                  style={{fontSize: 12, color: '#777',}}>
                  Review
                </Button>
              </View>
              <View style={{flex:1, alignItems:'flex-end'}}>
                <Button
                  containerStyle={globalStyles.ctaButton4}
                  style={{fontSize: 12, color: '#fff',}}>
                  Lihat Voucher
                </Button>
              </View>
            </View>
            <View style={styles.total}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Text style={styles.activityDesc}>Total</Text>
                  <Text style={styles.activityDesc}>Status: Terbit</Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  <Text style={styles.activityDesc}>Rp. 1.000.000</Text>
                </View>
              </View>
            </View>
            <View style={styles.invoice}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Button
                    containerStyle={globalStyles.ctaButton6}
                    style={{fontSize: 12, color: '#fff',}}>
                    Lihat Invoice
                  </Button>
                </View>
              </View>
            </View>
          </View>


        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    flex:1,
  },
  cartbox: {
    backgroundColor:'#fff',
    padding:15,
    marginBottom:20,
    borderRadius:3,
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
        elevation: 2 ,
      },
    }),
  },
    activityTitle: {
    fontFamily: 'Hind-Bold',
    fontSize:15,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:10,
        paddingTop:10,
        marginBottom:-12,
      },
      android: {
        lineHeight:20,

      },
    }),
  },
  activityPrize: {
    fontFamily: 'Hind-Light',
    fontSize:14,
    color:'#000',
    ...Platform.select({
      ios: {
        lineHeight:10,
        paddingTop:13,
        marginBottom:-12,
      },
      android: {
        lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityDesc: {
    fontSize:14,
    color:'#454545',
    fontFamily: 'Hind-Light',
    ...Platform.select({
      ios: {
        lineHeight:15*0.8,
        paddingTop: 10,
        marginBottom:-10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  thumbprofile: {
    height: 70,
    width:70,
    marginRight:10
  },
  separator: {
    backgroundColor:'#ececec',
    height:0.3,
    width:'100%',
    marginVertical:20
  },
  total: {
    marginTop:15,
    paddingVertical:15,
    borderTopWidth:1,
    borderTopColor:'#ececec',
    borderBottomWidth:1,
    borderBottomColor:'#ececec'
  },
  invoice: {
    marginTop:10,
    paddingVertical:10,
  },
});
