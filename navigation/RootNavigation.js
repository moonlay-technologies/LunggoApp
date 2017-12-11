'use strict';

import { Notifications } from 'expo';
import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

const screenPath = '../customer/screens/';
import SearchResults from '../customer/screens/SearchResults';
import MyBooking from '../customer/screens/MyBooking';
import AddPax from '../customer/screens/AddPax';
import DetailScreen from '../customer/screens/DetailScreen';
import CalendarView from '../customer/components/CalendarView';
import WebViewScreen from '../customer/screens/WebViewScreen';
import PaxChoice from '../customer/screens/PaxChoice';
import BookingDetail from '../customer/screens/BookingDetail';
import Registration from '../customer/screens/Registration';
import BookedPageDetail from '../customer/screens/BookedPageDetail';
import AdvanceSearch from '../customer/screens/AdvanceSearch';
import LoginScreen from '../commons/LoginScreen';
import OperatorLoginScreen from '../operator/screens/OperatorLoginScreen';
import BeforeLoginScreen from '../customer/screens/BeforeLoginScreen';
import HomeScreenOperator from '../customer/screens/HomeScreenOperator';
import Dashboard from '../operator/screens/Dashboard';
import AppointmentList from '../operator/screens/AppointmentList';
import AppointmentDetail from '../operator/screens/AppointmentDetail';
import AppointmentRequest from '../operator/screens/AppointmentRequest';


//// unimplemented
// import Filter from '../screens/Filter';
// import ForgotPassword from '../screens/ForgotPassword'
// import Verifikasi from '../screens/Verifikasi'
// import WelcomeScreen from '../screens/WelcomeScreen';

// for testing purpose
import ExploreScreen from '../operator/screens/ExploreScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      // screen: Dashboard
      // screen: OperatorLoginScreen
      screen: LoginScreen
      // screen: HomeScreenOperator
      // screen: BeforeLoginScreen
      // screen: AdvanceSearch,
      // screen: LoginScreen,
      // screen: MainTabNavigator,
    },
    // Profile: { screen: WelcomeScreen },
    MainTabNavigator: { screen: MainTabNavigator },
    SearchResults: { screen: SearchResults },
    DetailScreen: { screen: DetailScreen },
    CalendarView: { screen: CalendarView },
    WebViewScreen: { screen: WebViewScreen },
    PaxChoice: { screen: PaxChoice },
    AddPax: { screen: AddPax },
    BookingDetail: { screen: BookingDetail },
    Registration: { screen: Registration },
    BookedPageDetail: { screen: BookedPageDetail },
    LoginScreen: { screen: LoginScreen },
    Dashboard: { screen: Dashboard },
    AppointmentList: { screen: AppointmentList },
    Dashboard: { screen: Dashboard },
    AppointmentDetail: { screen: AppointmentDetail },
    AppointmentRequest: { screen: AppointmentRequest },
    ExploreScreen: { screen: ExploreScreen },
  },
  {
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
