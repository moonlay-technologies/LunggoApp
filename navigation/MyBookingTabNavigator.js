import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TabNavigator, TabBarTop } from 'react-navigation';

import Colors from '../constants/Colors';

import MyBookingTrx from '../customer/screens/MyBooking/MyBookingTrxScreen';
import MyBookingActivity from '../customer/screens/MyBooking/MyBookingActivityScreen';
import UnreviewedMyBooking from '../customer/screens/MyBooking/MyBookingUnreviewedScreen';
import MyBookingHistory from '../customer/screens/MyBooking/MyBookingHistoryScreen';

export default TabNavigator(
  {
    MyBookingActivity: { screen: MyBookingActivity },
    MyBookingTrx: { screen: MyBookingTrx },
    UnreviewedMyBooking: { screen: UnreviewedMyBooking },
    MyBookingHistory: { screen: MyBookingHistory },
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
      scrollEnabled: true,
      activeTintColor: Colors.bottomTabSelected,
      inactiveTintColor: '#49ddd3',
      indicatorStyle: {
            backgroundColor: '#00d3c5',
        },
      labelStyle: {
        fontSize: 12,
        fontFamily: 'HindSemiBold',
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
      style: { paddingBottom: 5, height: 50, backgroundColor: '#fbfbfb', borderTopColor: '#ececec', borderBottomColor:'#00d3c5'}
    },
  }
);