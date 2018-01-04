'use strict';

import { Notifications } from 'expo';
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

import { SearchResults, MyBooking, AddPax, DetailScreen,
  CalendarPicker, WebViewScreen, PaxChoice, BookingDetail,
  Registration, BookedPageDetail, AdvanceSearch, BeforeLoginScreen,
  Review, RincianHarga,  } from '../customer/screens/Screens';

import { LoginScreen } from '../commons/Screens';

import { Dashboard, Mutasi, AppointmentList, AppointmentDetail,
  AppointmentRequest, ActivityList } from '../operator/screens/Screens';


import ForgotPassword from '../customer/screens/ForgotPassword'
import Cart from '../customer/screens/Cart/CartScreen'

//// unimplemented
// import Filter from '../screens/Filter';
// import Verifikasi from '../screens/Verifikasi'
// import WelcomeScreen from '../screens/WelcomeScreen';

// for testing purpose
import ExploreScreen from '../customer/screens/ExploreScreen';
import Swiper from '../customer/screens/Swiper';
import MapScreen from '../customer/screens/MapScreen';
import CartBlank from '../customer/screens/Cart/BlankScreen';
import CartList from '../customer/screens/Cart/ListScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      // screen: Dashboard
      //screen: MainTabNavigator
      // screen: Cart
      // screen: ExploreScreen
      // screen: LoginScreen
      // screen: Dashboard
      //screen: BeforeLoginScreen
      screen: MainTabNavigator
      //screen: CartBlank
      // screen: DetailScreen
    },
    MainTabNavigator: { screen: MainTabNavigator },
    SearchResults: { screen: SearchResults },
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
    ExploreScreen: { screen: ExploreScreen },
    Review: { screen: Review },
    Mutasi: { screen: Mutasi },
    RincianHarga: { screen: RincianHarga },
    ForgotPassword: { screen: ForgotPassword },
    MapScreen: { screen: MapScreen },
    Cart: { screen: Cart },

  },
  {
    initialRouteParams: {appType: 'OPERATOR'},
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
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
