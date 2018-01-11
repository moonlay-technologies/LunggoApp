'use strict';

import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  TouchableNativeFeedback,
  StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {fetchTravoramaApi,AUTH_LEVEL} from '../../api/Common';

export default class Dashboard extends React.Component {

  constructor (props) {
    super(props)
    this.state = {};
  }

  static navigationOptions = {
    title: 'Dashboard',
  };

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

  _goToActivityList = (response) => {
    if(response) {
      //// navigate
      this.props.navigation.navigate(
        'ActivityList', { list: response.activityList}
      )
    } else {
      this.setState({ message: 'response undefined'})
      console.log(response)
    }
  }

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
  _getActivityList = () => {
    const version = 'v1';
    const path = `/${version}/operator/myactivity`;
    // this.setState({ isLoading: true });
    let request = {path, requiredAuthLevel: AUTH_LEVEL.Guest}
    fetchTravoramaApi(request).then(response => {
      this.setState({ isLoading: false });
      this._goToActivityList(response);
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
  _onActivityListPressed = () => {
    this.setState({ message: '', isLoading:true });
    this._getActivityList();
  }

  //// Bind <TextInput> searchText with state searchString
  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };


  render() {
    const loadingIndicator = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    return (
      <ScrollView style={{backgroundColor:'#fff'}}>

        <View style={styles.container}>
          <View 
            //style={{marginTop:40}}
          >
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Image style={styles.avatarBig} source={require('../../assets/images/janedoe.jpg')}/>
              </View>
              <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Icon
                  style={{marginRight:4}}
                  name='sms'
                  type='materialicons'
                  size={30}
                  color='#454545'/>
                <View style={styles.notification}>
                  <Text style={{color:'#fff', fontWeight:'bold', fontSize:11}}>5</Text>
                </View>
              </View>
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
              >
                Edit Profile
              </Button>
            </View>
            <View style={{marginLeft:10}}>
              <Icon
                name='ios-settings-outline'
                type='ionicon'
                size={26}
                color='#454545'/>
            </View>
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
              <View style={{flex:1,alignItems:'flex-end', justifyContent:'center'}}>
                <Text style={styles.textKecil}>Details</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <View style={{marginTop:0}}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity style={{flex:1, alignItems:'center'}}
                onPress={this._onActivityListPressed}
              >
                <Text style={styles.point}>2</Text>
                <Text style={styles.textKecil}>Activities</Text>
              </TouchableOpacity>
              <View style={{flex:1, alignItems:'center'}}>
                <Text style={styles.point}>13</Text>
                <Text style={styles.textKecil}>Deals</Text>
              </View>
              <View style={{flex:1, alignItems:'center'}}>
                <Text style={styles.point}>107</Text>
                <Text style={styles.textKecil}>Views</Text>
              </View>
              <View style={{flex:1, alignItems:'center'}}>
                <Text style={styles.point}>14</Text>
                <Text style={styles.textKecil}>Review</Text>
              </View>
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


        <View style={{paddingTop:30}}></View>

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
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
    fontWeight:'bold',
    fontSize:15,
    color:'#454545',
  },
  priceTitleBig: {
    fontSize:14,
    color:'#676767',
    marginTop:2,
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
  categoryTitle :{
    fontFamily: 'Hind-Bold',
    fontSize:20,
    color:'#454545',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom:-15,
      },
      android: {

      },
    }),
  },
  avatarBig:{
    width:60, 
    height:60, 
    resizeMode:'cover', 
    borderRadius:30
  },
  container: {
    flex: 1,
    padding:15,
    paddingTop:20,
    backgroundColor: '#fff',
  },
});

//   render() {
//     const spinner = this.state.isLoading ?
//       <ActivityIndicator size='large'/> : null;
//     return (
//       <ScrollView
//         style={styles.container}
//         contentContainerStyle={styles.contentContainer}
//       >
//         {/*<View style={styles.flowRight}>*/}
//           <Button
//             onPress={this._onAppointmentRequestPressed}
//             color='#48BBEC'
//             title='AppointmentRequest'
//           />
//           <Button
//             onPress={this._onAppointmentListPressed}
//             color='#48BBEC'
//             title='AppointmentList'
//           />
//           <Button
//             onPress={this._onActivityListPressed}
//             color='#48BBEC'
//             title='ActivityList'
//           />
//         {/*</View>*/}
//         {spinner}
//         <Text>
//           {this.state.message}
//         </Text>
//       </ScrollView>
//     );
//   }

// }




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     paddingTop: 30,
//   },
//   flowRight: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     alignSelf: 'stretch',
//   },
//   searchInput: {
//     height: 36,
//     padding: 4,
//     marginRight: 5,
//     flexGrow: 1,
//     fontSize: 18,
//     borderWidth: 1,
//     borderColor: '#48BBEC',
//     borderRadius: 8,
//     color: '#48BBEC',
//   },
// });