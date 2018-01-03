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

export default TabNavigator(
  {
    Explore:  { screen: ExploreScreen },
    MyBooking:{ screen: MyBooking },
    Home:     { screen: CartBlank },
    Links:    { screen: LinksScreen },
    Settings: { screen: SettingsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight:
        <Ionicons
          name={'md-cart'}
          // name={Platform.OS === 'ios' ? 'ios-cart' : 'md-cart'}
          size={28}
          style={{marginRight: 10}}
        />,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
            break;
          case 'Explore':
            iconName = Platform.OS === 'ios'
              ? `ios-search${focused ? '' : '-outline'}`
              : 'md-search';
            break;
          case 'MyBooking':
            iconName = Platform.OS === 'ios'
              ? `ios-search${focused ? '' : '-outline'}`
              : 'md-search';
            break;
          case 'Links':
            iconName = Platform.OS === 'ios'
              ? `ios-link${focused ? '' : '-outline'}`
              : 'md-link';
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              ? `ios-options${focused ? '' : '-outline'}`
              : 'md-options';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.bottomTabSelected : Colors.bottomTabBlurred}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: { activeTintColor: Colors.bottomTabSelected },
  }
);
