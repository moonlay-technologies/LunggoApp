'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView, { Marker } from 'react-native-maps';
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
            <View style={{flexDirection: 'row'}}>
              <View style={{flex:1, marginRight:20,}}>
                <Image style={styles.thumb} source={require('../assets/images/other-img1.jpg')} />
              </View>
              <View style={{flex:1.5}}>
                <Text style={styles.activityTitle}>
                  Trip to Sahara Desert
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Rating
                    type="star"
                    fractions={1}
                    startingValue={3.6}
                    readonly
                    imageSize={12}
                    onFinishRating={this.ratingCompleted}
                  />
                </View>
                <Text style={styles.descriptionActivity}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                  dolore magna aliqua. Ut enim ad minim veniam.
                </Text>
              </View>
            </View>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <Text style={styles.activityTitle}>
              Calendar
            </Text>
          </View>{/* end container */}
          <View style={styles.divider}/>
          <View style={styles.container}>
            <Text style={styles.activityTitle}>
              Guest Detail
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View>
                <Icon
                name='plus'
                size='10'
                style={{marginTop:5, marginRight:7}}
                type='font-awesome'
                color='blue' />
              </View>
              <View><Text>Tambah Guest Lainnya</Text></View>
            </View>

          </View>{/* end container */}
        </ScrollView>

        {/*bottom CTA button*/}
        <View style={styles.bottomBarContainer}>
          <View style={{alignItems: 'flex-start', flex:1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{
                color:'green',
                marginRight:3,
                fontWeight: 'bold',
                fontSize:15,
              }}>1.000.000</Text> 
              <Text style={{fontSize:12,}}>/orang</Text>
            </View>
            <View style={{flexDirection: 'row',  }}>
              <Rating
                type="star"
                fractions={1}
                startingValue={3.6}
                readonly
                imageSize={12}
                onFinishRating={this.ratingCompleted}
                style={{ paddingTop: 2.5, marginRight:5}}
              />
              <Text style={{fontSize:12,}}>20 Review</Text> 
            </View>
          </View>
          <View style={{alignItems: 'flex-end', flex:1}}>
            <Button
              containerStyle={{height:35, width:100, paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
              style={{fontSize: 12, color: '#ffffff'}}
              onPress={() => this.props.navigation.navigate('CalendarView',
                             {activityId: details.id})}
            >
              Cari Tiket
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
    marginBottom: 7,
  },
  descriptionActivity: {
    fontSize:11,
    lineHeight: 15,
    marginTop:10,
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
});
