import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../customer/screens/HomeScreen';
import ExploreScreen from '../customer/screens/ExploreScreen';
import MyBooking from '../customer/screens/MyBooking';
import LinksScreen from '../customer/screens/LinksScreen';
import SettingsScreen from '../customer/screens/SettingsScreen';

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
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name={'md-cart'} size={28} style={{marginRight: 10}} />
        </TouchableOpacity> ,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Explore':
            iconName = Platform.OS === 'ios'
              ? `ios-search${focused ? '' : '-outline'}`
              : 'md-search';
            break;
            case 'MyBooking':
            iconName = Platform.OS === 'ios'
              ? `ios-paper${focused ? '' : '-outline'}`
              : 'md-paper';
            break;
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-heart${focused ? '' : '-outline'}`
              : 'md-heart';
            break;
          case 'Links':
            iconName = Platform.OS === 'ios'
              ? `ios-mail-open${focused ? '' : '-outline'}`
              : 'md-mail-open';
            break;
          case 'Settings':
            iconName = Platform.OS === 'ios'
              ? `ios-person${focused ? '' : '-outline'}`
              : 'md-person';
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
