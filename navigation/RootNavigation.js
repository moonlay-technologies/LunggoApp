import { Notifications } from 'expo';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import SearchResults from '../screens/SearchResults';
import LoginScreen from '../screens/LoginScreen';
import AddGuest from '../screens/AddGuest';
import DetailScreen from '../screens/DetailScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';

const RootStackNavigator = StackNavigator(
  {
    Main: {
      screen: LoginScreen,
      // screen: MainTabNavigator,
    },
    // Profile: { screen: WelcomeScreen },
    SearchResults: { screen: SearchResults },
    DetailScreen: { screen: DetailScreen },
    MainTabNavigator: { screen: MainTabNavigator },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
      // headerRight:  <Ionicons
      //                 name={Platform.OS === 'ios' ? 'ios-cart-outline' : 'md-cart'}
      //                 size={28}
      //                 style={{ marginBottom: -3 }}
      //                 // color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      //               />,
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
