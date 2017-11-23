'use strict';

import { Notifications } from 'expo';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

import SearchResults from '../screens/SearchResults';
import LoginScreen from '../screens/LoginScreen';
import AddPax from '../screens/AddPax';
import DetailScreen from '../screens/DetailScreen';
import CalendarView from '../components/CalendarView';
import WebViewScreen from '../screens/WebViewScreen';
import PaxChoice from '../screens/PaxChoice';
import BookingDetail from '../screens/BookingDetail';
import Registration from '../screens/Registration';
import BookedPageDetail from '../screens/BookedPageDetail';

//// unimplemented
import Filter from '../screens/Filter';
import ForgotPassword from '../screens/ForgotPassword'
// import WelcomeScreen from '../screens/WelcomeScreen';


/// Operator
// import LoginScreenOp from '../screens/LoginScreenOp';
// import AppointmentRequest from '../screens/AppointmentRequest';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: LoginScreen,
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
