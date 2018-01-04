'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import globalStyles from '../../commons/globalStyles';
import { Rating, Icon } from 'react-native-elements';

export default class LoginScreen extends Component<{}> {
  
  static navigationOptions = {
    title: 'Akun',
  };;
  state = {open: false};

  render() {
    return (
      <ScrollView style={{backgroundColor:'#fff'}}>
      <View style={styles.container}>
        <View style={{alignItems:'center',marginBottom:40}}>
          <View style={{marginBottom:20}}>
            <Image style={styles.avatarBig} source={require('../../assets/images/janedoe.jpg')}/>
          </View>
          <View style={{}}>
            <View>
              <Text style={styles.activitydetailTitle}>Ali Zainal Abidin</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.textCart}>Edit Profile</Text>
              <View style={{marginHorizontal:10}}>
                <Text style={styles.textCart}>|</Text>
              </View>
              <Text style={styles.textCartColor}>100 point</Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#efefef', paddingBottom:15, marginBottom:15}}>
          <View style={{justifyContent:'center', flex:1}}>
            <Text style={styles.optionProfile}>Notifikasi</Text>
          </View>
          <View style={{alignItems:'flex-end', flex:1}}>
            <Icon
            name='ios-notifications-outline'
            type='ionicon'
            size={30}
            color='#454545'/>
          </View>
        </View>
        <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#efefef', paddingBottom:15, marginBottom:15}}>
          <View style={{justifyContent:'center', flex:1}}>
            <Text style={styles.optionProfile}>Undang Teman</Text>
          </View>
          <View style={{alignItems:'flex-end', flex:1}}>
            <Icon
            name='ios-contacts-outline'
            type='ionicon'
            size={30}
            color='#454545'/>
          </View>
        </View>
        <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#efefef', paddingBottom:15, marginBottom:15}}>
          <View style={{justifyContent:'center', flex:1}}>
            <Text style={styles.optionProfile}>Pembayaran</Text>
          </View>
          <View style={{alignItems:'flex-end', flex:1}}>
            <Icon
            name='ios-cash-outline'
            type='ionicon'
            size={30}
            color='#454545'/>
          </View>
        </View>
        <View style={{flexDirection:'row', borderBottomWidth:1, borderBottomColor:'#efefef', paddingBottom:15, marginBottom:15}}>
          <View style={{justifyContent:'center', flex:1}}>
            <Text style={styles.optionProfile}>Pengaturan</Text>
          </View>
          <View style={{alignItems:'flex-end', flex:1}}>
            <Icon
            name='ios-settings-outline'
            type='ionicon'
            size={30}
            color='#454545'/>
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex:1,
  },
  activitydetailTitle: {
    fontFamily: 'Hind-Bold',
    fontSize:19,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop: 14,
        marginBottom:-16,
      },
      android: {
        lineHeight:24
      },
    }),
  },
  avatarBig:{
    width:90, 
    height:90, 
    resizeMode:'cover', 
    borderRadius:45
  },
  textCartBesar: {
    fontFamily: 'Hind-Bold', 
    color:'#454545', 
    fontSize:19,
    ...Platform.select({
      ios: {
        lineHeight:25,
        paddingTop:0,
      },
      android: {},
    }),
  },
  textCart: {
    fontFamily: 'Hind-Light', 
    color:'#454545', 
    fontSize:14,
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop:4,
        marginBottom:-5,
        marginTop:8
      },
      android: {
        marginTop:5

      },
    }),
  },
  textCartColor: {
    fontFamily: 'Hind', 
    color:'#ff5f5f', 
    fontSize:14,
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop:4,
        marginBottom:-5,
        marginTop:8
      },
      android: {
        marginTop:5

      },
    }),
  },
  optionProfile:{
    fontFamily:'Hind-Light',
    fontSize:17,
    ...Platform.select({
      ios: {
        lineHeight:25,
        paddingTop:0,
        marginBottom:-10,
        //backgroundColor:'red'
      },
      android: {},
    }),
  },
});
