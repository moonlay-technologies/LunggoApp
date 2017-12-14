'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Button from 'react-native-button';
import { Slider } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

export default class DetailScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Mutasi',
    // header: ({navigate}) => ({
    //     right: (
    //         <LikeShareHeaderButton navigate={navigate}/>
    //     ),
    // }),
    // headerTitleStyle: {color:'white'},
    headerStyle: {
      // backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
  };

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
    };
  }

  

  render() {
    return (
      //<Image style={styles.detailimg}source={require('../assets/images/detailimg.jpg')}/>
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <ScrollView style={{marginTop:60, }}>
          <View style={styles.container}>
            <Text>Total Credit</Text>
            <Text style={{fontSize:14, fontWeight:'bold', color:'#454545',}}>Rp 1.000.000</Text>
          </View>
          <View style={styles.divider}></View>
          <View style={styles.container}>
            <View style={styles.boxMutasi}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                <View style={{flex:2}}>
                  <Text style={{color:'#454545', fontSize:14,}}>Pencairan Dana</Text>
                  <Text style={{color:'#01d4cb', fontSize:14, fontWeight:'bold', marginVertical:3}}>Kode: #AWSD334122</Text>
                  <Text style={{fontSize:12, color:'#a5a5a5'}}>15 Januari 2012 - 16.20</Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  <Text style={{color:'#454545', fontSize:14,}}>+Rp 100.000</Text>
                  <Text style={{fontSize:12, color:'#a5a5a5', marginTop:3}}>Rp 200.000</Text>
                </View>
              </View>
            </View>
            <View style={styles.boxMutasi}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                <View style={{flex:2}}>
                  <Text style={{color:'#454545', fontSize:14,}}>Pencairan Dana</Text>
                  <Text style={{color:'#01d4cb', fontSize:14, fontWeight:'bold', marginVertical:3}}>Kode: #AWSD334122</Text>
                  <Text style={{fontSize:12, color:'#a5a5a5'}}>15 Januari 2012 - 16.20</Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  <Text style={{color:'#454545', fontSize:14,}}>+Rp 100.000</Text>
                  <Text style={{fontSize:12, color:'#a5a5a5', marginTop:3}}>Rp 200.000</Text>
                </View>
              </View>
            </View>
            <View style={styles.boxMutasi}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                <View style={{flex:2}}>
                  <Text style={{color:'#454545', fontSize:14,}}>Pencairan Dana</Text>
                  <Text style={{color:'#01d4cb', fontSize:14, fontWeight:'bold', marginVertical:3}}>Kode: #AWSD334122</Text>
                  <Text style={{fontSize:12, color:'#a5a5a5'}}>15 Januari 2012 - 16.20</Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  <Text style={{color:'#454545', fontSize:14,}}>+Rp 100.000</Text>
                  <Text style={{fontSize:12, color:'#a5a5a5', marginTop:3}}>Rp 200.000</Text>
                </View>
              </View>
            </View>
            <View style={styles.boxMutasi}>
              <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                <View style={{flex:2}}>
                  <Text style={{color:'#454545', fontSize:14,}}>Pencairan Dana</Text>
                  <Text style={{color:'#01d4cb', fontSize:14, fontWeight:'bold', marginVertical:3}}>Kode: #AWSD334122</Text>
                  <Text style={{fontSize:12, color:'#a5a5a5'}}>15 Januari 2012 - 16.20</Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end'}}>
                  <Text style={{color:'#454545', fontSize:14,}}>+Rp 100.000</Text>
                  <Text style={{fontSize:12, color:'#a5a5a5', marginTop:3}}>Rp 200.000</Text>
                </View>
              </View>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    backgroundColor: '#fff',
  },
  bottomBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fbfbfb',
    padding: 20,
    borderTopColor: "#efefef",
    borderTopWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
   divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
  },
  boxMutasi:{
    padding:10,
    borderWidth:1,
    borderColor:'#efefef',
    marginBottom:15
  },
});
