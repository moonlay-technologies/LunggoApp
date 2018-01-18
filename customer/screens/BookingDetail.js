'use strict';
                    
import React from 'react';
import {AUTH_LEVEL, fetchTravoramaApi} from '../../api/Common';
import * as Formatter from '../components/Formatter';
import globalStyles from '../../commons/globalStyles';
import Button from 'react-native-button';
import { Rating, Icon } from 'react-native-elements';
import { StyleSheet, TouchableOpacity, Text, View, Image, TextInput,
  ScrollView, Platform } from 'react-native';
import { getProfile } from './Auth/AuthController';

async function fetchTravoramaCartAddApi(rsvNo) {
  const version = 'v1';
  let response = await fetchTravoramaApi({
    method: 'PUT',
    path: `/${version}/cart/${rsvNo}`,
    requiredAuthLevel: AUTH_LEVEL.User,
  });
  return response;
}

async function fetchTravoramaBookApi(data) {
  const version = 'v1';
  let response = await fetchTravoramaApi({
    method: 'POST',
    path: `/${version}/activities/book`,
    requiredAuthLevel: AUTH_LEVEL.User,
    data,
  });
  return response;
}

export default class BookingDetail extends React.Component {

  constructor (props) {
    super(props);
    let counter = [], totalCount = 0;
    props.navigation.state.params.package[0].price.map( ({type, minCount}) => {
      counter.push( { type, minCount, count: minCount } );
      totalCount += minCount;
    });
    this.state = {
      counter, totalCount,
      isDateSelected: true,
      isPaxFilled: true,
      contact: {},
    };
  }

  static navigationOptions = {
    title: 'Detail Pesanan'
  };

  componentDidMount() {
    getProfile().then( ({contact}) => {
      this.setState({contact});
    }).catch( err => console.error(err) );
  }
  setPaxListItemIndexes = indexes =>
    this.setState({paxListItemIndexes: indexes});

  setPax = pax => {
    let changes = {pax}
    if (pax.length>0) changes.isPaxFilled = true;
    this.setState(changes);
  }

  setSchedule = scheduleObj => {
    scheduleObj.isDateSelected = true;
    this.setState(scheduleObj);
  }

  setContact = contactObj => {
    // scheduleObj.isDateSelected = true;
    this.setState({contact:contactObj});
  }

  _book = async () => {
    let { /*pax,*/ date, counter, totalCount, contact } = this.state;
    let { params } = this.props.navigation.state;

    //// counting pax
    let pax = totalCount;

    //// validation
    if (!pax) this.setState({isPaxFilled:false});
    if (!date) this.setState({isDateSelected:false});
    if (!pax || !date) return;

    //// prepare fetching book
    this.setState({isLoading:true});

    // building data for bookingAPI
    let ticketCount = [];
    params.package[0].price.map( ({type}) => {
      ticketCount.push({
        type, count: counter[type],
      });
    });

    let data = {
      date, pax, contact, ticketCount,
      packageId: 1, activityId: params.activityId,
    };

    try {
      let response = await fetchTravoramaBookApi(data);
      if(response.status != 200) {
        console.log("Book API: status other than 200 returned!");
        console.log(response);
        this.setState({isLoading:false});
        return;
      }

      //// after done booking and get RsvNo, add item to cart
      response = await fetchTravoramaCartAddApi(response.rsvNo);
      if (response.status != 200) {
        console.error("Cart API: status other than 200 returned!");
        console.log(response);
        this.setState({isLoading:false});
        return;
      } else this.props.navigation.navigate('Cart'); //TODO: ask user before navigate
      this.setState({isLoading:false});
    } catch (error) {
      this.setState({isLoading:false});
      console.log(error);
    }
  }

  _goToBookingContact = () => {
    this.props.navigation.navigate('AddBookingContact', {
      setContact: this.setContact,
      contact: this.state.contact,
    });
  }

  _goToCalendarPicker = () => {
    let {navigation} = this.props;
    let {price, availableDateTimes } = navigation.state.params;
    navigation.navigate('CalendarPicker', {
      price, availableDateTimes,
      setSchedule: this.setSchedule,
      selectedDate: this.state.date,
    });
  }

  _goToPaxChoice = () => {
    let {navigation} = this.props;
    let {price, requiredPaxData} = navigation.state.params;
    let {pax, paxListItemIndexes } = this.state;
    if (!paxListItemIndexes) paxListItemIndexes = [];
    navigation.navigate('PaxChoice', {
      price, requiredPaxData,
      setPax: this.setPax,
      setPaxListItemIndexes: this.setPaxListItemIndexes,
      paxListItemIndexes: paxListItemIndexes.slice(),
      paxCount: pax? pax.length : 0,
    })
  }

  _subsAdult = () => this.setState({adultCount:this._decrement(this.state.adultCount)});
  _addAdult = () => this.setState({adultCount:this.state.adultCount+1});
  _subsChild = () => this.setState({childCount:this._decrement(this.state.childCount)});
  _addChild = () => this.setState({childCount:this.state.childCount+1});

  render() {
    let {price, requiredPaxData} = this.props.navigation.state.params;
    let {pax, date, time, isDateSelected, isPaxFilled, contact, totalCount, counter } = this.state;

    let selectedDateText = date ?
      Formatter.dateFullShort(date)+', pk '+ time : 'Atur Jadwal';

    let addEditButton = isEdit => !!isEdit ?
      <Text style={{fontSize: 12, color: '#01d4cb'}}> Ubah </Text>
      :
      <Icon name='plus' type='evilicon' size={26} color='#01d4cb'/>

    let counterButtons = counterArr => {
      let add = counterObj => {
        //validasi maximum
        let { maxCount = 100 } = counterObj;
        if (counterObj.count < maxCount) {
          counterObj.count++;
          this.state.totalCount++;
          this.forceUpdate();
          // this.setState({counter: counterArr});
        }
      }
      let substract = counterObj => {
        let DECREMENT = int => (int==0)? 0 : int-1;
        //validasi minimum
        let { minCount = 0 } = counterObj;
        if (counterObj.count > minCount) {
          counterObj.count = DECREMENT(counterObj.count);
          this.state.totalCount = DECREMENT(this.state.totalCount);
          this.forceUpdate();
          // this.setState({counter: counterArr});
        }
      }
      console.log('counterArr')
      console.log(counterArr)
      return counterArr.map( (counterObj, index) =>
        <View style={{flexDirection:'row',marginBottom:20}} key={index}>
          <View style={{flex:1}}>
            <Text style={styles.activityDesc}>{counterObj.type}</Text>
          </View>
          <View style={{alignItems:'center', justifyContent:'flex-end', flex:1, flexDirection:'row',}}>
            <TouchableOpacity style={{borderWidth:1, borderRadius:2, marginRight:8, marginLeft:15, paddingVertical:5, paddingHorizontal:15, borderColor:'#f9a3a3', justifyContent:'center', alignItems:'center'}}
              onPress={()=>substract(counterObj)}
            >
              <Icon name='minus' type='entypo' size={10} color='#ff5f5f'/>
            </TouchableOpacity>
            <Text style={styles.activityDesc}>{counterObj.count}</Text>
            <TouchableOpacity style={{borderWidth:1, borderRadius:2, paddingVertical:5, paddingHorizontal:15, borderColor:'#ff5f5f', justifyContent:'center', alignItems:'center'}}
              onPress={()=>add(counterObj)}
            >
              <Icon name='plus' type='octicon' size={10} color='#ff5f5f'/>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    let paxForm = (/* !!requiredPaxData */ false) ?
      <View style={{
        borderBottomColor: '#efefef',
        borderBottomWidth:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingBottom:20,
        marginTop:20
      }}>
        <Text style={styles.activityDesc}>
          Atur Peserta
        </Text>
        <TouchableOpacity
          containerStyle={styles.addButton}
          onPress={this._goToPaxChoice}
        >
          <View style={{flexDirection:'row'}}>
            <View style={{justifyContent:'center', alignItems:'center', marginLeft:10}}>
              {isPaxFilled ? null:<Text style={styles.validation}>Mohon isi peserta</Text>}
            </View>
            <Icon name='plus' type='evilicon' size={26} color='#01d4cb'/>
          </View>
          
        </TouchableOpacity>
      </View>
      :
      <View style={{
        borderBottomColor: '#efefef',
        borderBottomWidth:1,
        paddingBottom:20,
        marginVertical:20,
      }}>
        {counterButtons(counter)}
      </View>

    let rincianHarga = (pax && date) ?
      <TouchableOpacity style={{flex:1.5}} onPress={
        () => this.props.navigation.navigate('RincianHarga')}>
        <View style={{alignItems: 'flex-start'}}>
          <View>
            <Text style={{fontSize:15, color:'#000',}}>
              Total
            </Text> 
          </View>
          <View style={{marginTop:3}}>
            <Text style={{ color:'#000', fontWeight: 'bold', fontSize:17 }}>
              { Formatter.price(price) }
            </Text>
          </View>
          <View style={{marginTop:4}} >
            <Text style={{fontSize:11, color:'#01d4cb', fontWeight:'bold'}}>
              Lihat Rincian Harga
            </Text> 
          </View>
        </View>
      </TouchableOpacity>
      :
      <View style={{flex:1.5, justifyContent:'center'}} />

    return (
      <ScrollView style={{flex:1, backgroundColor:'#fff'}}>
        <View style={styles.container}>
          {/*<View style={{flex:1, marginBottom:15}}>
            <Image
              style={styles.thumb}
              source={require('../../assets/images/detailimg3.jpg')}
            />
          </View>*/}
          <Text style={[{flex:1.5},styles.activitydetailTitle]}>
            Trip to Sahara Desert
          </Text>
          {/*<View style={{flexDirection: 'row', marginBottom:5}}>
            <Rating
              // startingValue={3.6}
              readonly
              imageSize={12}
              // onFinishRating={this.ratingCompleted}
            />
          </View>
          <Text style={styles.activityDesc}>
            Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et 
            dolore magna aliqua. Ut enim ad minim veniam.
          </Text>*/}
          <View style={{marginTop:15}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Icon name='ios-pin' type='ionicon' size={18} color='#454545'/>
              <View style={{marginTop:1, marginLeft:10}}>
                <Text style={styles.activityDesc}>
                  Jepang
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop:8}}>
              <Icon name='ios-person' type='ionicon' size={18} color='#454545'/>
              <View style={{marginTop:1, marginLeft:10}}>
                <Text style={styles.activityDesc}>
                  Maksimum 6 orang
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop:8}}>
              <Icon name='ios-calendar' type='ionicon' size={18} color='#454545'/>
              <View style={{marginTop:1, marginLeft:10}}>
                <Text style={styles.activityDesc}>
                  Khusus hari minggu
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop:8}}>
              <Icon name='ios-clipboard' type='ionicon' size={18} color='#454545'/>
              <View style={{marginTop:1, marginLeft:10}}>
                <Text style={styles.activityDesc}>
                  Untuk usia diatas 10 tahun
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.divider}/>


        <View style={styles.container}>

          <View>
            <Text style={styles.activityTitle}>Jadwal</Text>
            <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              borderBottomColor: '#efefef',
              borderBottomWidth:1,
              paddingBottom:20,
              marginVertical:20,
            }}>
              <Text style={this.state.isDateSelected ?
                styles.normalText : styles.warningText} >
                {selectedDateText}
              </Text>
              {isDateSelected ? null : <Text style={styles.validation}>mohon isi jadwal</Text>}
              <TouchableOpacity containerStyle={styles.addButton}
                onPress={this._goToCalendarPicker} >
                {addEditButton(date)}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <View style={{flexDirection:'row'}}>
              <Text style={styles.activityTitle}>Peserta</Text>
              <View style={{flex:1,alignItems:'flex-end',}}>
                <Text style={styles.seeMore}>{totalCount} orang</Text>
              </View>
            </View>

{/* 
            {pax && pax.map( item =>
              <View  key={item.key} style={{paddingVertical:20, borderBottomWidth:1, borderBottomColor:'#efefef',}}>
                <Text>{item.name}</Text>
              </View>
            )} */}
            {paxForm}
          </View>

          <View>
            <Text style={styles.activityTitle}>Kontak yang dapat dihubungi</Text>
            <View style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              // borderBottomColor: '#efefef',
              // borderBottomWidth:1,
              // paddingBottom:20,
              paddingTop:20,
              // marginVertical:20,
            }}>
              <Text style={this.state.isDateSelected ?
                styles.normalText : styles.warningText} >
                {contact.name + '\n'}
                {contact.email+'\n'}
                {contact.countryCallCd + ' ' + contact.phone}
              </Text>
              {isDateSelected ? null : <Text style={styles.validation}>mohon isi jadwal</Text>}
              <TouchableOpacity containerStyle={styles.addButton}
                onPress={this._goToBookingContact} >
                {addEditButton(contact)}
              </TouchableOpacity>
            </View>
          </View>
          
        </View>



        <View style={globalStyles.bottomCtaBarContainer1}>
          {rincianHarga}
          <View style={{alignItems: 'flex-end', flex:1, justifyContent:'flex-end'}}>
            <Button
              containerStyle={globalStyles.ctaButton}
              style={{fontSize: 16, color: '#fff', fontWeight:'bold'}}
              onPress={this._book}
              disabled={this.state.isLoading}
              styleDisabled={{color:'#aaa'}}
            >Pesan</Button>
          </View>
        </View>
        {/*bottom CTA button*/}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex:1
  },
  addButton: {
    height:35,
    width:'100%',
    paddingTop:10,
    paddingBottom:10,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: '#437ef7',
  },
  thumb: {
    resizeMode:'cover', 
    width:'100%', 
    height:170,
    borderRadius:5
  },
  seeMore: {
    fontSize:14,
    color:'#676767',
    marginTop:3
  },
  activityTitle: {
    fontFamily: 'Hind-Bold',
    fontSize:15,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:15*0.8,
        paddingTop: 20 - (19 * 0.4),
        //backgroundColor:'red'
      },
      android: {
        lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activitydetailTitle: {
    fontFamily: 'Hind-Bold',
    fontSize:19,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:15*0.8,
        paddingTop: 20 - (19 * 0.4),
        marginBottom:-15,
        //backgroundColor:'red'
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
    fontFamily: 'Hind',
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
   divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 5,
    marginBottom: 5,
  },
  validation:{
    color:'#fc2b4e',
    fontSize:12
  },
  warningText: {
    color: 'red',
  }
});
