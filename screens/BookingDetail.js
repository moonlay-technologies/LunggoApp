'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import LikeShareHeaderButton from '../components/LikeShareHeaderButton';
import { Rating, Icon } from 'react-native-elements';
import * as Formatter from '../components/Formatter';
import {
  Platform, StyleSheet,
  Text, View, Image, TextInput, ScrollView,
} from 'react-native';
import Moment from 'moment';
import 'moment/locale/id';

// class setScheduleButton extends Component {
//   render() {
//     <Button
//       containerStyle={{height:35, width:'100%', paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
//       style={{fontSize: 12, color: '#fff'}}
//       onPress={() => this.props.navigation.navigate('CalendarView', {
//         price: this.props.navigation.state.params.price,
//         setSchedule: this.setSchedule,
//       })}
//     >
//       Ubah Jadwal
//     </Button>
//   }
// }

export default class BookingDetail extends Component {

  constructor (props) {
    super(props)
    this.state = {
      date : null,
      shift: null,
      pax: null,
    };
  }

  static navigationOptions = {
    title: 'Detail Pesanan',
    headerRight: <LikeShareHeaderButton/>,
  };

  setPax = pax => this.setState({pax});
  setSchedule = scheduleObj => this.setState(scheduleObj);

  render() {
    let {navigation} = this.props;
    let {price,requiredPaxData} = navigation.state.params;

    let calendar = (this.state.date) ?
      <View>
        <Text>{Moment(this.state.date).format('ddd, D MMM YYYY')}</Text>
        <Button
          containerStyle={{height:35, width:'100%', paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
          style={{fontSize: 12, color: '#fff'}}
          onPress={() => navigation.navigate('CalendarView', {
            setSchedule: this.setSchedule,
            selectedDate: this.state.date,
            price,
          })}
        >
          Ubah Jadwal
        </Button>
      </View>
      :
      <Button
        containerStyle={{height:35, width:'100%', paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
        style={{fontSize: 12, color: '#fff'}}
        onPress={() => navigation.navigate('CalendarView', {
          setSchedule: this.setSchedule,
          price,
        })}
      >
        Pilih Jadwal
      </Button>

    let schedule =
      <View style={styles.container}>
        <Text style={styles.activityTitle}>
          Jadwal
        </Text>
        {calendar}
      </View>

    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <ScrollView style={{marginBottom:60}}>
          <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex:1, marginRight:20,}}>
                <Image
                  style={styles.thumb}
                  source={require('../assets/images/other-img1.jpg')}
                />
              </View>
              <View style={{flex:1.5}}>
                <Text style={styles.activityTitle}>
                  Trip to Sahara Desert
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Rating
                    // startingValue={3.6}
                    readonly
                    imageSize={12}
                    // onFinishRating={this.ratingCompleted}
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

          {schedule}
          
          <View style={styles.divider}/>
          <View style={styles.container}>
            <Text style={styles.activityTitle}>
              Peserta
            </Text>
            {this.state.pax && this.state.pax.map(item => <Text>- {item.name}</Text>)}
            <View style={{flexDirection: 'row'}}>
              <View>
                <Icon
                name='plus'
                size={10}
                style={{marginTop:5, marginRight:7}}
                type='font-awesome'
                color='blue' />
              </View>
              <Text>Tambah Peserta</Text>
            </View>
            <Button
              containerStyle={{height:35, width:'100%', paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
              style={{fontSize: 12, color: '#fff'}}
              onPress={() => navigation.navigate('PaxChoice', {
                setPax: this.setPax,
                price, requiredPaxData,
              })}
            >
              Tambah Peserta
            </Button>
          </View>{/* end container */}
        </ScrollView>

        {/*bottom CTA button*/}
        <View style={styles.bottomBarContainer}>
          <View style={{alignItems: 'flex-start', flex:1}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{
                color: 'green',
                marginRight: 3,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              { Formatter.price(this.props.navigation.state.params.price) }
              </Text> 
              <Text style={{fontSize:12,}}>/orang</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Rating
                startingValue={3.6}
                readonly
                imageSize={12}
                style={{ paddingTop: 2.5, marginRight:5}}
              />
              <Text style={{fontSize:12,}}>20 Review</Text> 
            </View>
          </View>
          <View style={{alignItems: 'flex-end', flex:1}}>
            <Button
              containerStyle={{
                height: 35,
                width: 100,
                paddingTop: 10,
                paddingBottom: 10,
                overflow: 'hidden',
                borderRadius: 4,
                backgroundColor: '#437ef7'
              }}
              style={{fontSize: 12, color: '#fff'}}
              styleDisabled={{color: '#aaa'}}
              onPress={() =>
                this.props.navigation.navigate('WebViewScreen')
              }
              disabled={!this.state.pax || !this.state.date}
            >
              Pesan
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
