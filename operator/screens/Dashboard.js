'use strict';

import React from 'react';
import {
  Image, Platform, ScrollView, Text, TouchableOpacity, View,
  TextInput, ActivityIndicator, TouchableNativeFeedback, StyleSheet,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Button from 'react-native-button';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../api/Common';
import { getProfile } from '../../commons/ProfileController';
import * as Formatter from '../../customer/components/Formatter';
import Modal from '../../commons/components/Modal';
import LoadingAnimation from '../../customer/components/LoadingAnimation';
import LogoutConfirmationModal from '../../commons/components/LogoutConfirmationModal';
import { checkUserLoggedIn } from '../../api/Common';
import { NavigationActions } from 'react-navigation';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '...',
      balance: 9999999,
      avatar: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png',
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    getProfile().then(({ contact }) => this.setState(contact));
    checkUserLoggedIn().then(isLoggedIn => {
      if (!isLoggedIn) {
        let { reset, navigate } = NavigationActions;
        const action = reset({
          index: 0,
          actions: [navigate({ routeName: 'LoginScreen' })],
        });
        this.props.navigation.dispatch(action);
      }
    });
  }

  _handleResponse = (response) => {
    if (response) {
      //// navigate
      this.props.navigation.navigate(
        'AppointmentList', { list: response.appointments }
      )
    } else {
      this.setState({ message: 'response undefined' })
      console.log(response)
    }
  }

  _goToAppointmentRequest = (response) => {
    if (response) {
      //// navigate
      this.props.navigation.navigate(
        'AppointmentRequest', { list: response.appointmentRequests }
      )
    } else {
      this.setState({ message: 'response undefined' })
      console.log(response)
    }
  }

  _goToAppointmentList = (response) => {
    if (response) {
      //// navigate
      this.props.navigation.navigate(
        'AppointmentList', { list: response.appointments }
      )
    } else {
      this.setState({ message: 'response undefined' })
      console.log(response)
    }
  }

  _goToActivityList = () => {
    this._closeSettingModal();
    this.props.navigation.navigate('ActivityList');
  }

  _getAppointmentRequest = () => {
    const version = 'v1';
    const path = `/${version}/operator/appointments/request`;
    // this.setState({ isLoading: true });
    let request = { path, requiredAuthLevel: AUTH_LEVEL.Guest }
    fetchTravoramaApi(request).then(response => {
      this.setState({ isLoading: false });
      this._goToAppointmentRequest(response);
    }).catch(error => {
      this.setState({
        isLoading: false,
        message: 'Something bad happened :\n' + error
      });
      console.log(error);
    });
  }

  _getAppointmentList = () => {
    const version = 'v1';
    const path = `/${version}/operator/appointments`;
    // this.setState({ isLoading: true });
    let request = { path, requiredAuthLevel: AUTH_LEVEL.Guest }
    fetchTravoramaApi(request).then(response => {
      this.setState({ isLoading: false });
      this._goToAppointmentList(response);
    }).catch(error => {
      this.setState({
        isLoading: false,
        message: 'Something bad happened :\n' + error
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
    this.setState({ message: '', isLoading: true });
    this._getAppointmentRequest();
  }
  _onAppointmentListPressed = () => {
    this.setState({ message: '', isLoading: true });
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

  // _goToSettingsScreen = () => this.props.navigation.navigate('Settings')

  _goToAccountScreen = () => this.props.navigation.navigate('AccountPage')

  _goToMessageScreen = () => this.props.navigation.navigate('NotFound')
  _goToDealsScreen = () => this.props.navigation.navigate('NotFound')
  // _goToActivityViewsScreen = () => this.props.navigation.navigate('NotFound')
  // _goToActivityViewDetailsScreen = () => this.props.navigation.navigate('NotFound')
  _goToReviewScreen = () => this.props.navigation.navigate('NotFound')
  _goToProfile = () => {
    this._closeSettingModal();
    'TODO'
    console.warn('TODO: Dashboard.js _goToProfile')
  }
  _goToMutasi = () => {
    this._closeSettingModal();
    this.props.navigation.navigate('Mutasi');
  }

  _openSettingModal = () => this.refs.settingModal.openModal();
  _closeSettingModal = () => this.refs.settingModal.closeModal();
  _openLogoutModal = () => this.refs.logoutModal.openModal();

  _askLogout = () => this._openLogoutModal();

  render() {
    const loadingIndicator = this.state.isLoading ?
      <LoadingAnimation /> : null;
    return (
      <ScrollView style={{ backgroundColor: '#f7f8fb' }}>
        <View style={{ height: 340 }}>
          <Image style={{ height: 250, resizeMode: 'cover' }} source={require('../../assets/images/bg1.jpg')} />
          <View style={styles.containerDashboard}>
            <View style={styles.containerBoxDashboard}>
              <View style={{ position: 'absolute', flexDirection: 'row', right: 15, top: 15, }}>
                {/*<TouchableOpacity>
                  <Icon
                    style={{ width: 45, alignItems: 'center', }}
                    name='ios-paper-plane'
                    type='ionicon'
                    size={26}
                    color='#454545' />
                  <View style={styles.notification}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 10 }}>5</Text>
                  </View>
                </TouchableOpacity>*/}
                <TouchableOpacity
                  style={{ width: 25, alignItems: 'center' }}
                  onPress={this._openSettingModal}
                >
                  <Icon
                    name='md-more'
                    type='ionicon'
                    size={26}
                    color='#454545' />
                </TouchableOpacity>
              </View>

              <Modal ref='settingModal'
                style={styles.modalMenu}
                animationIn='fadeIn'
                animationOut='fadeOut'
                backdropOpacity={0}
              >

                <LogoutConfirmationModal ref='logoutModal' {...this.props} />

                <TouchableOpacity onPress={this._goToMutasi}>
                  <Text style={styles.teks3a}>Lihat Daftar Transaksi</Text>
                </TouchableOpacity>
                <View style={styles.separatorOption}></View>
                {/*<TouchableOpacity onPress={this._goToProfile}>
                  <Text style={styles.teks3a}>Ubah Profil</Text>
                </TouchableOpacity>
                <View style={styles.separatorOption}></View>
                <TouchableOpacity onPress={this._goToActivityList}>
                  <Text style={styles.teks3a}>Ubah Activity</Text>
                </TouchableOpacity>
                <View style={styles.separatorOption}></View>*/}
                <TouchableOpacity onPress={this._askLogout}>
                  <Text style={styles.teks3a}>Log Out Akun</Text>
                </TouchableOpacity>
              </Modal>

              <Image style={styles.avatarBig} source={{ uri: this.state.avatar }} />
              <View style={{ marginTop: 20 }}>
                <Text style={styles.namaProfile}>{this.state.name}</Text>
              </View>
              <View style={{}}>
                <Text style={styles.saldo}>{Formatter.price(this.state.balance)}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 25 }}>
                <TouchableOpacity onPress={this._goToActivityList} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.teks1}>Activity</Text>
                  <Text style={styles.teks2}>22</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onAppointmentRequestPressed} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.teks1}>Request</Text>
                  <Text style={styles.teks2}>3</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._onAppointmentListPressed} style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={styles.teks1}>Akan datang</Text>
                  <Text style={styles.teks2}>12</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </View>


{/*
        <View style={{ marginTop: 30, padding: 15, paddingBottom: 5 }}>
          <Text style={styles.categoryTitle}>Activity yang berlangsung</Text>
        </View>



        <View style={styles.containerRecentActivity}>
          <View style={styles.boxRecentActivity}>
            <View style={{ flex: 1, }}>
              <Image style={styles.imgRecentActivity} source={require('../../assets/images/other-img3.jpg')} />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: 15 }}>
              <Text style={styles.activityTitle}>Trip to Bandung</Text>
              <Text style={styles.teks1}>Bandung</Text>
              <View style={{ marginTop: 5 }}>
                <Text style={styles.teks3}>30 Jan 2018</Text>
                <Text style={styles.teks3}>10.00am - 12.00pm</Text>
              </View>
              <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Button
                  containerStyle={styles.ctaButton1}
                  style={{ fontSize: 12, color: '#fff', }}
                >
                  Sedang Berjalan
              </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.containerRecentActivity}>
          <View style={styles.boxRecentActivity}>
            <View style={{ flex: 1, }}>
              <Image style={styles.imgRecentActivity} source={require('../../assets/images/other-img2.jpg')} />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: 15 }}>
              <Text style={styles.activityTitle}>Trip to Bandung</Text>
              <Text style={styles.teks1}>Bandung</Text>
              <View style={{ marginTop: 5 }}>
                <Text style={styles.teks3}>30 Jan 2018</Text>
                <Text style={styles.teks3}>10.00am - 12.00pm</Text>
              </View>
              <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Button
                  containerStyle={styles.ctaButton2}
                  style={{ fontSize: 12, color: '#fff', }}
                >
                  1 hari lagi
              </Button>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.containerRecentActivity}>
          <View style={styles.boxRecentActivity}>
            <View style={{ flex: 1, }}>
              <Image style={styles.imgRecentActivity} source={require('../../assets/images/other-img1.jpg')} />
            </View>
            <View style={{ flex: 1, alignItems: 'flex-end', paddingLeft: 15 }}>
              <Text style={styles.activityTitle}>Trip to Bandung</Text>
              <Text style={styles.teks1}>Bandung</Text>
              <View style={{ marginTop: 5 }}>
                <Text style={styles.teks3}>30 Jan 2018</Text>
                <Text style={styles.teks3}>10.00am - 12.00pm</Text>
              </View>
              <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <Button
                  containerStyle={styles.ctaButton3}
                  style={{ fontSize: 12, color: '#f57b76', }}
                >
                  5 hari lagi
              </Button>
              </View>
            </View>
          </View>
        </View>*/}

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  modalMenu: {
    backgroundColor: '#fff',
    width: 160,
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 80,
    zIndex: 100,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 4,
        shadowOpacity: 0.2
      },
      android: {
        elevation: 2
      },
    }),
  },
  separatorOption: {
    paddingVertical: 10
  },
  containerDashboard: {
    padding: 15,
    position: 'absolute',
    top: 70,
    width: '100%'
  },
  containerBoxDashboard: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
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
        elevation: 2
      },
    }),
  },
  containerRecentActivity: {
    borderRadius: 20,
  },
  boxRecentActivity: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    margin: 15,
    marginTop: 5,
    padding: 15,
    flexDirection: 'row',
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
        elevation: 2
      },
    }),
  },
  avatarBig: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 45,
  },
  namaProfile: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 22,
    color: '#454545',
    letterSpacing: -1,
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -18
      },
      android: {
        marginBottom: -5

      },
    }),
  },
  imgRecentActivity: {
    height: 125,
    width: '100%',
    resizeMode: 'cover',
    overflow: 'hidden'
  },
  saldo: {
    fontSize: 16,
    color: '#f57b76',
    marginTop: 2,
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -5,
      },
      android: {

      },
    }),
  },
  teks1: {
    fontSize: 14,
    color: '#989898',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -5,
      },
      android: {

      },
    }),
  },
  teks2: {
    fontSize: 20,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -5,
      },
      android: {

      },
    }),
  },
  teks3: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind',
    textAlign: 'right',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  teks3a: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind',
    textAlign: 'left',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  teks4: {
    fontSize: 14,
    color: '#23d3c3',
    fontFamily: 'Hind-SemiBold',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  teks5: {
    fontSize: 14,
    color: '#f57b76',
    fontFamily: 'Hind-SemiBold',
    textAlign: 'center',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
      android: {

      },
    }),
  },
  ctaButton1: {
    width: '100%',
    paddingVertical: 6,
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: '#00d3c5',
  },
  ctaButton2: {
    width: '100%',
    paddingVertical: 6,
    overflow: 'hidden',
    borderRadius: 3,
    backgroundColor: '#f57b76',
  },
  ctaButton3: {
    width: '100%',
    paddingVertical: 6,
    overflow: 'hidden',
    borderRadius: 3,
    borderColor: '#ff5f5f',
    borderWidth: 1
  },
  categoryTitle: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 19,
    color: '#454545',
  },
  activityReviewButton: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
  },
  credit: {
    fontSize: 15,
    marginTop: 3,
    marginLeft: 5,
    fontFamily: 'Hind',
    color: '#454545',
  },
  notification: {
    backgroundColor: '#00d3c5',
    alignItems: 'center',
    padding: 1,
    width: 15,
    height: 15,
    borderRadius: 20,
    position: 'absolute',

    ...Platform.select({
      ios: {
        right: 3,
        bottom: 14,
      },
      android: {
        right: 3,
        bottom: 11,
      },
    }),
  },
  textKecil: {
    fontSize: 12,
    fontFamily: 'Hind',
    color: '#676767',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -8,
      },
      android: {
        marginBottom: -2,
      },
    }),
  },
  boldRating: {
    fontSize: 45,
    fontFamily: 'Hind-Bold',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -30,
      },
      android: {
        marginBottom: -14,
      },
    }),
  },
  point: {
    fontFamily: 'Hind-Bold',
    fontSize: 30,
    color: '#01d4cb',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -20,
      },
      android: {
        marginBottom: -2,
      },
    }),
  },
  activityTitle: {
    fontSize: 16,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    textAlign: 'right',
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
    padding: 20,
    backgroundColor: '#f7f8fb',
  },
});