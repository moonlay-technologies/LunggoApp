'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView, { Marker } from 'react-native-maps';
// import Panel from '../components/Panel';
import Button from 'react-native-button';
import LikeShareHeaderButton from '../components/LikeShareHeaderButton';
import { Rating } from 'react-native-elements';
import * as Formatter from '../components/Formatter';
import { Icon } from 'react-native-elements'
import {
  Platform, StyleSheet,
  Text, View, Image, TextInput, ScrollView,
} from 'react-native';

export default class BookingDetail extends Component {

  static navigationOptions = {
    // header: ({navigate}) => ({
    //     right: (
    //         <LikeShareHeaderButton navigate={navigate}/>
    //     ),
    // }),
    // headerTitleStyle: {color:'white'},
    headerRight: <LikeShareHeaderButton/>,
    headerStyle: {
      // backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
  };

  render() {
    return (
      //<Image style={styles.detailimg}source={require('../assets/images/detailimg.jpg')}/>
      <View style={{flex:1, backgroundColor:'#ffffff'}}>
        <ScrollView style={{marginBottom:60,marginTop:60}}>
          <View style={styles.container}>
            <View>
              <View>
                <Text style={styles.activityTitle}>
                  Trip to Sahara Desert
                </Text>
                <Text style={styles.descriptionActivity}>
                  Menunggu Pembayaran
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop:20}}>
              <View style={{flexDirection: 'row', marginRight:20}}>
                <Image style={styles.icon} 
                  source={require('../assets/icons/person.png')}
                />
                <Text style={styles.timeActivity}>
                  2 orang
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image style={styles.icon} 
                  source={require('../assets/icons/calendar.png')}
                />
                <Text style={styles.timeActivity}>
                  Besok siang
                </Text>
              </View>
            </View>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <Text style={styles.activityTitle}>
              Maps Location Activity
            </Text>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <View>
              <Text style={styles.activityTitle}>
                Guest List
              </Text>
              <View style={{flexDirection:'row', justifyContent: 'space-between', borderBottomColor: '#efefef', borderBottomWidth:1, paddingBottom:10, marginTop:10}}>
                <View><Text>Guest 1</Text></View>
                <View><Text>Details</Text></View>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', borderBottomColor: '#efefef', borderBottomWidth:1, paddingBottom:10, marginTop:10}}>
                <View><Text>Guest 2</Text></View>
                <View><Text>Details</Text></View>
              </View>
              <View style={{flexDirection:'row', justifyContent: 'space-between', borderBottomColor: '#efefef', borderBottomWidth:1, paddingBottom:10, marginTop:10}}>
                <View><Text>Guest 3</Text></View>
                <View><Text>Details</Text></View>
              </View>
            </View>
            <View style={{marginTop:25,}}>
              <Text style={styles.activityTitle}>
                Yang Perlu Dibawa
              </Text>
              <View style={styles.ul}>
                <Text style={styles.li}>
                  &#5867;
                </Text>
                <Text style={styles.lidescriptionActivity}>
                  Eat the fat cats food plop down
                </Text>
              </View>
              <View style={styles.ul}>
                <Text style={styles.li}>
                  &#5867;
                </Text>
                <Text style={styles.lidescriptionActivity}>
                  Sit and stare a nice warm laptop
                </Text>
              </View>
              <View style={styles.ul}>
                <Text style={styles.li}>
                  &#5867;
                </Text>
                <Text style={styles.lidescriptionActivity}>
                  Run outside as soon as door open
                </Text>
              </View>
            </View>
          </View>{/* end container */}
        </ScrollView>

        {/*bottom CTA button*/}
        <View style={styles.bottomBarContainer}>
          <View style={{alignItems: 'flex-start', flex:1.5}}>
            <Button
              containerStyle={{height:35, width:'95%', paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
              style={{fontSize: 12, color: '#ffffff'}}>
            Lihat Instruksi Pembayaran
            </Button>
          </View>
          <View style={{alignItems: 'flex-end', flex:1}}>
            <Button
              containerStyle={{height:35, width:'95%', paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, borderColor:'#000000', borderWidth:1, backgroundColor: '#ffffff'}}
              style={{fontSize: 12, color: '#000000'}}
            >
              Hubungi Kami
            </Button>
          </View>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex:1
  },
    thumb: {
    resizeMode:'cover', 
    width:'100%', 
    height:170,
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize:16,
    marginBottom: 4,
  },
  descriptionActivity: {
    fontSize:11,
    marginTop:0,
    color:'blue'
  },
   divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 5,
    marginBottom: 5,
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
  ul: {
    flex: 1, 
    flexDirection: 'row',
    marginLeft: 10,
  },
  li: {
    fontSize:13,
    marginRight:8
  },
    lidescriptionActivity: {
    fontSize:13,
    marginBottom: 2,
    lineHeight: 15,
  },
  icon: {
    width:20,
    height:20,
    marginRight:3,
  },
  timeActivity: {
    fontSize:13,
    marginTop: 2,
  },
});
