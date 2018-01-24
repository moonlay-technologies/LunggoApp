'use strict';

import { Notifications } from 'expo';
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

import { SearchActivity, MyBooking, AddPax, DetailScreen,
  CalendarPicker, WebViewScreen, PaxChoice, BookingDetail,
  Registration, BookedPageDetail, AdvanceSearch, BeforeLoginScreen,
  Review, RincianHarga, } from '../customer/screens/Screens';

import { LoginScreen } from '../commons/Screens';

import { Dashboard, Mutasi, AppointmentList, AppointmentDetail,
  AppointmentRequest, ActivityList } from '../operator/screens/Screens';

import EditActivity from '../operator/screens/EditActivity';
import EditDetailActivity from '../operator/screens/EditDetailActivity';
import Cart from '../customer/screens/Cart/CartScreen'
import MapScreen from '../customer/screens/MapScreen';
import AccountPage from '../customer/screens/AccountPage';
import MyBookingList from '../customer/screens/MyBooking/MyBookingList';
import AddBookingContact from '../customer/screens/AddBookingContact';

//// unimplemented
import ForgotPassword from '../customer/screens/ForgotPassword';
// import Filter from '../screens/Filter';
// import Verifikasi from '../screens/Verifikasi'
// import WelcomeScreen from '../screens/WelcomeScreen';

import Swiper from '../customer/screens/Swiper';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: BeforeLoginScreen
      // screen: MyBookingList
    },
    MainTabNavigator: { screen: MainTabNavigator },
    SearchActivity: { screen: SearchActivity },
    DetailScreen: { screen: DetailScreen },
    CalendarPicker: { screen: CalendarPicker },
    WebViewScreen: { screen: WebViewScreen },
    PaxChoice: { screen: PaxChoice },
    AddPax: { screen: AddPax },
    BookingDetail: { screen: BookingDetail },
    Registration: { screen: Registration },
    BookedPageDetail: { screen: BookedPageDetail },
    LoginScreen: { screen: LoginScreen },
    AppointmentList: { screen: AppointmentList },
    Dashboard: { screen: Dashboard },
    AppointmentDetail: { screen: AppointmentDetail },
    AppointmentRequest: { screen: AppointmentRequest },
    ActivityList: { screen: ActivityList },
    Review: { screen: Review },
    Mutasi: { screen: Mutasi },
    RincianHarga: { screen: RincianHarga },
    ForgotPassword: { screen: ForgotPassword },
    MapScreen: { screen: MapScreen },
    Cart: { screen: Cart },
    AddBookingContact: { screen: AddBookingContact },
    EditActivity: { screen: EditActivity },
    EditDetailActivity: { screen: EditDetailActivity },

  },
  {
    initialRouteParams: {appType: 'OPERATOR'},
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
        fontFamily:'Hind',
        marginBottom:-5
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    // this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}
