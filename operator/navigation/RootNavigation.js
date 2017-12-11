'use strict';

import { Notifications } from 'expo';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync
  from '../api/registerForPushNotificationsAsync';

import OperatorLoginScreen from '../screens/OperatorLoginScreen';
// import LoginScreen from '../screens/LoginScreen';
import AppointmentDetail from '../screens/AppointmentDetail';
import AppointmentList from '../screens/AppointmentList';
import AppointmentRequest from '../screens/AppointmentRequest';
import DetailScreen from '../screens/DetailScreen';
import ActivityList from '../screens/ActivityList';
// import WelcomeScreen from '../screens/WelcomeScreen';


const RootStackNavigator = StackNavigator(
  {
    Main: {
      // screen: AppointmentRequest,
      // screen: AppointmentList,
      screen: OperatorLoginScreen,
      // screen: MainTabNavigator,
    },
    // Profile: { screen: WelcomeScreen },
    MainTabNavigator: { screen: MainTabNavigator },
    AppointmentRequest: { screen: AppointmentRequest },
    AppointmentList: { screen: AppointmentList },
    AppointmentDetail: { screen: AppointmentDetail },
    ActivityList: { screen: ActivityList },
    DetailScreen: { screen: DetailScreen },
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
