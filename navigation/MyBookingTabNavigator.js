import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TabNavigator, TabBarTop } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../customer/screens/HomeScreen';
import MyBookingTransaction from '../customer/screens/MyBooking/MyBookingScreen';
import MyBookingActivity from '../customer/screens/MyBooking/MyBookingActivityScreen';

export default TabNavigator(
  {
    Activity: { screen: MyBookingActivity },
    Transaction: { screen: MyBookingTransaction },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#fff',
        ...Platform.select({
          ios: {
            borderBottomColor: "#ececec",
            borderBottomWidth: 1,
            height: 51
          },
          android: {
            backgroundColor: 'cyan',
            elevation: 0,
            borderBottomColor: "#ececec",
            borderBottomWidth: 1,
            height: 20,
            marginTop: 0
          },
        }),
      },
    }),
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    //initialLayout: {width:100, height:300},
    animationEnabled: false,
    swipeEnabled: true,
    lazy: false,

    tabBarOptions: {
      activeTintColor: Colors.bottomTabSelected,
      inactiveTintColor: '#eee',
      labelStyle: {
        fontSize: 12,
        fontFamily: 'Hind-SemiBold',
        ...Platform.select({
          ios: {
            marginBottom: -8,
          },
          android: {
            lineHeight: 18,
            //paddingTop: 23 - (23* 1),

          },
        }),
      },
      style: { paddingBottom: 5, height: 50, backgroundColor: '#fbfbfb', borderTopColor: '#ececec', }
    },
  }
);