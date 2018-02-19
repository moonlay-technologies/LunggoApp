'use strict';

import React from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View,
  TextInput, ActivityIndicator, TouchableNativeFeedback, StyleSheet
} from 'react-native';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {fetchTravoramaApi,AUTH_LEVEL} from '../../api/Common';
import { getProfile } from '../../commons/ProfileController';
import * as Formatter from '../../customer/components/Formatter';

export default class Dashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '...',
      balance: 9999999,
      avatar: require('../../assets/images/janedoe.jpg'),
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    getProfile().then( ({ contact }) => this.setState(contact) );
  }

  _handleResponse = (response) => {
    if(response) {
      //// navigate
      this.props.navigation.navigate(
        'AppointmentList', { list: response.appointments}
      )
    } else {
      this.setState({ message: 'response undefined'})
      console.log(response)
    }
  }

  _goToAppointmentRequest = (response) => {
    if(response) {
      //// navigate
      this.props.navigation.navigate(
        'AppointmentRequest', { list: response.appointmentRequests}
      )
    } else {
      this.setState({ message: 'response undefined'})
      console.log(response)
    }
  }

  _goToAppointmentList = (response) => {
    if(response) {
      //// navigate
      this.props.navigation.navigate(
        'AppointmentList', { list: response.appointments}
      )
    } else {
      this.setState({ message: 'response undefined'})
      console.log(response)
    }
  }

  _goToActivityList = () => this.props.navigation.navigate('ActivityList');

  _getAppointmentRequest = () => {
    const version = 'v1';
    const path = `/${version}/operator/appointments/request`;
    // this.setState({ isLoading: true });
    let request = {path, requiredAuthLevel: AUTH_LEVEL.Guest}
    fetchTravoramaApi(request).then(response => {
      this.setState({ isLoading: false });
      this._goToAppointmentRequest(response);
    }).catch(error => {
      this.setState({
        isLoading: false,
        message: 'Something bad happened :\n'+ error
      });
      console.log(error);
    });
  }
  _getAppointmentList = () => {
    const version = 'v1';
    const path = `/${version}/operator/appointments`;
    // this.setState({ isLoading: true });
    let request = {path, requiredAuthLevel: AUTH_LEVEL.Guest}
    fetchTravoramaApi(request).then(response => {
      this.setState({ isLoading: false });
      this._goToAppointmentList(response);
    }).catch(error => {
      this.setState({
        isLoading: false,
        message: 'Something bad happened :\n'+ error
      });
      console.log(error);
    });
  }

  // _getAppointmentDetail = id => {
  //   const version = 'v1';
  //   const path = `/${version}/operator/appointments/${id}`;
  //   // this.setState({ isLoading: true });
  //   let request = {path, requiredAuthLevel: AUTH_LEVEL.Guest}
  //   fetchTravoramaApi(request).then(response => {
  //     console.log(response)
  //     this.setState({ isLoading: false });
  //     this._handleResponse(response);
  //   }).catch(error => {
  //     this.setState({
  //       isLoading: false,
  //       message: 'Something bad happened :\n'+ error
  //     });
  //     console.log(error);
  //   });
  // }

  _onAppointmentRequestPressed = () => {
    this.setState({ message: '', isLoading:true });
    this._getAppointmentRequest();
  }
  _onAppointmentListPressed = () => {
    this.setState({ message: '', isLoading:true });
    this._getAppointmentList();
  }
  // _onAppointmentDetailPressed = () => {
  //   this.setState({ message: '', isLoading:true });
  //   const id = 1;
  //   this._getAppointmentDetail(id);
  // }

  //// Bind <TextInput> searchText with state searchString
  _onSearchTextChanged = event => {
    this.setState({ searchString: event.nativeEvent.text });
  }

  _goToSettingsScreen = () => this.props.navigation.navigate('Settings')

  _goToAccountScreen = () => this.props.navigation.navigate('AccountPage')

  _goToMessageScreen = () => this.props.navigation.navigate('NotFound')
  _goToDealsScreen = () => this.props.navigation.navigate('NotFound')
  _goToActivityViewsScreen = () => this.props.navigation.navigate('NotFound')
  _goToActivityViewDetailsScreen = () => this.props.navigation.navigate('NotFound')
  _goToReviewScreen = () => this.props.navigation.navigate('NotFound')

  render() {
    const loadingIndicator = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    return (
      <ScrollView style={{backgroundColor:'#f7f8fb'}}>
      <View style={{height:340}}>
        <Image style={{height:250, resizeMode:'cover'}} source={require('../../assets/images/bg1.jpg')}/>
        <View style={styles.containerDashboard}>
          <View style={styles.containerBoxDashboard}>
            <Image style={styles.avatarBig} source={this.state.avatar}/>
            <View style={{marginTop:20}}>
              <Text style={styles.namaProfile}>{this.state.name}</Text>
            </View>
            <View style={{}}>
              <Text style={styles.saldo}>{Formatter.price(this.state.balance)}</Text>
            </View>
            <View style={{flexDirection:'row', marginTop:25 }}>
              <TouchableOpacity onPress={this._goToActivityList} style={{flex:1, alignItems:'center'}}>
                <Text style={styles.teks1}>Activity</Text>
                <Text style={styles.teks2}>22</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onAppointmentRequestPressed} style={{flex:1, alignItems:'center'}}>
                <Text style={styles.teks1}>Request</Text>
                <Text style={styles.teks2}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this._onAppointmentListPressed} style={{flex:1, alignItems:'center'}}>
                <Text style={styles.teks1}>Akan datang</Text>
                <Text style={styles.teks2}>12</Text>
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </View>
      <View style={{marginTop:30, padding:15, paddingBottom:5}}>
        <Text style={styles.categoryTitle}>Activity yang berlangsung</Text>
      </View>



      <View style={styles.containerRecentActivity}>
        <View style={styles.boxRecentActivity}>
          <View style={{flex:1,}}>
            <Image style={styles.imgRecentActivity} source={require('../../assets/images/other-img3.jpg')}/>
          </View>
          <View style={{flex:1, alignItems:'flex-end',paddingLeft:15}}>
            <Text style={styles.activityTitle}>Trip to Bandung</Text>
            <Text style={styles.teks1}>Bandung</Text>
            <View style={{marginTop:5}}>
              <Text style={styles.teks3}>30 Jan 2018</Text>
              <Text style={styles.teks3}>10.00am - 12.00pm</Text>
            </View>
            <View style={{position:'absolute', bottom:0, width:'100%'}}>
              <Button
                  containerStyle={styles.ctaButton1}
                  style={{fontSize: 12, color: '#fff',}}
                >
                  Sedang Berjalan
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containerRecentActivity}>
        <View style={styles.boxRecentActivity}>
          <View style={{flex:1,}}>
            <Image style={styles.imgRecentActivity} source={require('../../assets/images/other-img2.jpg')}/>
          </View>
          <View style={{flex:1, alignItems:'flex-end',paddingLeft:15}}>
            <Text style={styles.activityTitle}>Trip to Bandung</Text>
            <Text style={styles.teks1}>Bandung</Text>
            <View style={{marginTop:5}}>
              <Text style={styles.teks3}>30 Jan 2018</Text>
              <Text style={styles.teks3}>10.00am - 12.00pm</Text>
            </View>
            <View style={{position:'absolute', bottom:0, width:'100%'}}>
              <Button
                  containerStyle={styles.ctaButton2}
                  style={{fontSize: 12, color: '#fff',}}
                >
                  1 hari lagi
              </Button>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containerRecentActivity}>
        <View style={styles.boxRecentActivity}>
          <View style={{flex:1,}}>
            <Image style={styles.imgRecentActivity} source={require('../../assets/images/other-img1.jpg')}/>
          </View>
          <View style={{flex:1, alignItems:'flex-end',paddingLeft:15}}>
            <Text style={styles.activityTitle}>Trip to Bandung</Text>
            <Text style={styles.teks1}>Bandung</Text>
            <View style={{marginTop:5}}>
              <Text style={styles.teks3}>30 Jan 2018</Text>
              <Text style={styles.teks3}>10.00am - 12.00pm</Text>
            </View>
            <View style={{position:'absolute', bottom:0, width:'100%'}}>
              <Button
                  containerStyle={styles.ctaButton3}
                  style={{fontSize: 12, color: '#ff5f5f',}}
                >
                  5 hari lagi
              </Button>
            </View>
          </View>
        </View>
      </View>


       {/*<View style={styles.container}>
        <View style={{}}>
          <Text style={styles.namaProfile}>Ali Zainal Abidin</Text>
        </View>
       </View>*/}

        {/*<View style={styles.container}>
          <View>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                style={{flex:1}}
                onPress={this._goToAccountScreen}
              >
                <Image style={styles.avatarBig} source={require('../../assets/images/janedoe.jpg')}/>
              </View>
              <View style={{flex:1,alignItems:'flex-start', justifyContent:'flex-start'}}>
                <View style={{}}>
                  <Text style={styles.categoryTitle}>Hello Mr. Fox!</Text>
                </View>
                <View style={{}}>
                  <Text style={styles.priceTitleBig}>Amazing Experience from dawn till the dusk</Text>
                </View>
              </TouchableOpacity>
                <Icon
                  style={{marginRight:4}}
                  name='sms'
                  type='materialicons'
                  size={30}
                  color='#454545'/>
                <View style={styles.notification}>
                  <Text style={{color:'#fff', fontWeight:'bold', fontSize:11}}>5</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{padding:15,paddingTop:0,}}>
          <View style={{}}>
            <Text style={styles.categoryTitle}>Hello Mr. Fox!</Text>
          </View>
          <View style={{}}>
            <Text style={styles.priceTitleBig}>Amazing Experience from dawn till the dusk</Text>
          </View>
          <View style={{flexDirection:'row', marginTop:8}}>
            <View style={{flex:1}}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Mutasi')
                }
              >
                <View style={{flexDirection:'row'}}>
                  <View>
                     <Icon
                    name='wallet'
                    type='entypo'
                    size={23}
                    color='#454545'/>
                  </View>
                  <Text style={styles.credit}>Rp 1.000.000</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <Button
                containerStyle={{
                  height: 25,
                  width: 95,
                  paddingTop: 5,
                  overflow: 'hidden',
                  borderRadius:5,
                  backgroundColor: '#fff',
                  borderColor:'#676767',
                  borderWidth:1
                }}
                style={{fontSize: 12, color: '#676767',}}
                onPress={this._goToAccountScreen}
              >
                Edit Profile
              </Button>
            </View>
            <TouchableOpacity
              style={{marginLeft:10}}
              onPress={this._goToSettingsScreen}
            >
              <Icon
                name='ios-settings-outline'
                type='ionicon'
                size={26}
                color='#454545'/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:15, padding:15,paddingTop:0,}}>
          <TouchableOpacity
            style={{
              flex:1, paddingVertical:5, alignItems:'center', borderRadius:4, borderColor:'#01d4cb', borderWidth:2
            }}
            onPress={this._onAppointmentRequestPressed}
          >
            <Text style={styles.textKecil}>You have</Text>
            <Text style={styles.point}>12</Text>
            <Text style={styles.textKecil}>Pending Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{flex:1, paddingVertical:5, alignItems:'center', borderRadius:4, borderColor:'#01d4cb', borderWidth:2, marginLeft:6}}
            onPress={this._onAppointmentListPressed}
          >
            <Text style={styles.textKecil}>You have</Text>
            <Text style={styles.point}>3</Text>
            <Text style={styles.textKecil}>Appointments</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={{marginTop:0}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:2}}>
                <Text style={styles.categoryTitle}>Activity Review</Text>
              </View>
              <TouchableOpacity
                onPress={this._goToActivityViewDetailsScreen}
                style={{flex:1,alignItems:'flex-end', justifyContent:'center'}}
              >
                <Text style={styles.textKecil}>Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{marginTop:0}}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                onPress={this._onActivityListPressed}
                style={styles.activityReviewButton}
              >
                <Text style={styles.point}>2</Text>
                <Text style={styles.textKecil}>Activities</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._goToDealsScreen}
                style={styles.activityReviewButton}
              >
                <Text style={styles.point}>13</Text>
                <Text style={styles.textKecil}>Deals</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._goToActivityViewsScreen}
                style={styles.activityReviewButton}
              >
                <Text style={styles.point}>107</Text>
                <Text style={styles.textKecil}>Views</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this._goToReviewScreen}
                style={styles.activityReviewButton}
              >
                <Text style={styles.point}>14</Text>
                <Text style={styles.textKecil}>Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.container}>
          <View style={{marginTop:0}}>
            <View style={{}}>
              <View style={{}}>
                <Text style={styles.categoryTitle}>Rating</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{marginTop:0}}>
            <View style={{flexDirection:'row'}}>
              <View style={{}}>
                <Text style={styles.boldRating}>4.3</Text>
                <Text style={{fontSize: 12, color: '#676767', marginLeft:20}}>Out of 5</Text>
              </View>
              <View style={{}}>
                
              </View>
            </View>
          </View>
        </View>


        <View style={{paddingTop:30}}></View>*/}

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({

  containerDashboard:{
    padding:15,
    position:'absolute',
    top:70,
    width:'100%'
  },
  containerBoxDashboard:{
    backgroundColor:'#ffffff',
    borderRadius:5,
    alignItems:'center',
    padding:10,
    zIndex:1,
    ...Platform.select({
      ios: {
        shadowColor: '#e8f0fe',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 2,
        shadowOpacity: 0.9
      },
      android: {
        elevation:2
      },
    }),
  },
  containerRecentActivity:{
    borderRadius:20,
  },
  boxRecentActivity:{
    backgroundColor:'#ffffff',
    borderRadius:5,
    margin:15,
    marginTop:5,
    padding:15,
    flexDirection:'row', 
    ...Platform.select({
      ios: {
        shadowColor: '#e8f0fe',
        shadowOffset: {
          width: 2,
          height: 1
        },
        shadowRadius: 6,
        shadowOpacity: 1
      },
      android: {
        elevation:2
      },
    }),
  },
  avatarBig:{
    width:90, 
    height:90, 
    resizeMode:'cover', 
    borderRadius:45,
  },
  namaProfile :{
    fontFamily: 'Hind-SemiBold',
    fontSize:22,
    color:'#454545',
    letterSpacing:-1,
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-18
      },
      android: {
        marginBottom:-5

      },
    }),
  },
  imgRecentActivity:{
    height:125,
    width:'100%',
    resizeMode:'cover',
    overflow: 'hidden'
  },
  saldo: {
    fontSize:16,
    color:'#ff5f5f',
    marginTop:2,
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-5,
      },
      android: {

      },
    }),
  },
  teks1: {
    fontSize:14,
    color:'#989898',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-5,
      },
      android: {

      },
    }),
  },
  teks2: {
    fontSize:20,
    color:'#737c84',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-5,
      },
      android: {

      },
    }),
  },
    teks3: {
    fontSize:14,
    color: '#454545',
    fontFamily: 'Hind',
    textAlign:'right',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-10,
      },
      android: {

      },
    }),
  },
  teks4: {
    fontSize:14,
    color: '#23d3c3',
    fontFamily: 'Hind-SemiBold',
    textAlign:'center',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-10,
      },
      android: {

      },
    }),
  },
  teks5: {
    fontSize:14,
    color: '#ff5f5f',
    fontFamily: 'Hind-SemiBold',
    textAlign:'center',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-10,
      },
      android: {

      },
    }),
  },
  ctaButton1: {
    width: '100%',
    paddingVertical:6,
    overflow: 'hidden',
    borderRadius:3,
    backgroundColor: '#23d3c3',
  },
  ctaButton2: {
    width: '100%',
    paddingVertical:6,
    overflow: 'hidden',
    borderRadius:3,
    backgroundColor: '#ff5f5f',
  },
    ctaButton3: {
    width: '100%',
    paddingVertical:6,
    overflow: 'hidden',
    borderRadius:3,
    borderColor: '#ff5f5f',
    borderWidth:1
  },
  categoryTitle: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 19,
    color: '#454545',
  },
  activityReviewButton: {
    flex:1,
    alignItems:'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
  },
  credit: {
    fontSize:15,
    marginTop:3,
    marginLeft:5,
    fontFamily:'Hind',
    color:'#454545',
  },
  notification: {
    backgroundColor:'#01d4c7', 
    alignItems:'center', 
    padding:3, 
    width:20, 
    height:20, 
    borderRadius:20, 
    position:'absolute', 
    right:0, 
    bottom:20
  },
  textKecil: {
    fontSize: 12, 
    fontFamily:'Hind', 
    color: '#676767', 
    backgroundColor:'transparent',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-8,
      },
      android: {
        marginBottom:-2,
      },
    }),
  },
  boldRating: {
    fontSize:45, 
    fontFamily:'Hind-Bold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-30,
      },
      android: {
        marginBottom:-14,
      },
    }),
  },
  point:{
    fontFamily:'Hind-Bold', 
    fontSize:30,
    color:'#01d4cb',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-20,
      },
      android: {
        marginBottom:-2,
      },
    }),
  },
  activityTitle: {
    fontSize: 16,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    textAlign:'right',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 10,
        marginBottom: -12,
        //backgroundColor:'red'
      },
      android: {
        lineHeight: 20,
        //paddingTop: 23 - (23* 1),
      },
    }),
  },
  container: {
    flex: 1,
    padding:20,
    backgroundColor: '#f7f8fb',
  },
});