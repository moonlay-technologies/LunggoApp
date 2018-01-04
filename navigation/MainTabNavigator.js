import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../customer/screens/HomeScreen';
import ExploreScreen from '../customer/screens/ExploreScreen';
import MyBooking from '../customer/screens/MyBooking';
import LinksScreen from '../customer/screens/LinksScreen';
import SettingsScreen from '../customer/screens/SettingsScreen';
import CartBlank from '../customer/screens/CartBlank';
import WhishlistBlank from '../customer/screens/WhishlistBlank';
import MyBookingBlank from '../customer/screens/MyBookingBlank';
import MessageBlank from '../customer/screens/MyBookingBlank';
import AccountPage from '../customer/screens/AccountPage';

export default TabNavigator(
  {
    Explore:  { screen: ExploreScreen,  },
    MyBookingBlank:{ screen: MyBookingBlank },
    WhishlistBlank: { screen: WhishlistBlank },
    MessageBlank:    { screen: MessageBlank },
    AccountPage: { screen: AccountPage },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight:
        <Ionicons
          name={Platform.OS === 'ios' ? 'ios-cart-outline' : 'md-cart'}
          size={28}
          style={{ marginRight: 10}}
        />,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Explore':
            iconName = Platform.OS === 'ios'
              ? `ios-search${focused ? '' : '-outline'}`
              : 'ios-search-outline';
            break;
            case 'MyBookingBlank':
            iconName = Platform.OS === 'ios'
              ? `ios-paper${focused ? '' : '-outline'}`
              : 'ios-paper-outline';
            break;
          case 'WhishlistBlank':
            iconName = Platform.OS === 'ios'
              ? `ios-heart${focused ? '' : '-outline'}`
              : 'ios-heart-outline';
            break;
          case 'MessageBlank':
            iconName = Platform.OS === 'ios'
              ? `ios-mail-open${focused ? '' : '-outline'}`
              : 'ios-mail-open-outline';
            break;
          case 'AccountPage':
            iconName = Platform.OS === 'ios'
              ? `ios-person${focused ? '' : '-outline'}`
              : 'ios-person-outline';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -4, }}
            color={focused ? Colors.bottomTabSelected : Colors.bottomTabBlurred}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    //initialLayout: {width:100, height:300},
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: { 
      activeTintColor: Colors.bottomTabSelected, 
      style:{paddingBottom:5, height:60, backgroundColor:'#fbfbfb', borderTopColor:'#ececec'} 
    },
  }
);
