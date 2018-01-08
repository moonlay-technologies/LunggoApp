import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../customer/screens/HomeScreen';
import ExploreScreen from '../customer/screens/ExploreScreen';
import MyBooking from '../customer/screens/MyBooking/MyBookingLoadingScreen';
// import LinksScreen from '../customer/screens/LinksScreen';
// import SettingsScreen from '../customer/screens/SettingsScreen';
import WhishlistBlank from '../customer/screens/WhishlistBlank';
import MessageBlank from '../customer/screens/MessageBlank';
import AccountPage from '../customer/screens/AccountPage';

export default TabNavigator(
  {
    Explore: { screen: ExploreScreen },
    MyBooking: { screen: MyBooking },
    WhishlistBlank: { screen: WhishlistBlank },
    MessageBlank: { screen: MessageBlank },
    AccountPage: { screen: AccountPage },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerRight:
      <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
        {/*<Ionicons name={'md-cart'} size={28} style={{marginRight: 10}} />*/}
        <Entypo name={'shopping-basket'} size={26} color='#23d3c3'
          style={{ marginRight: 10}} />
        <View style={styles.notification}>
          <Text style={styles.txtNotification}>5</Text>
        </View>
      </TouchableOpacity>,

      headerStyle: {
        backgroundColor: '#fff',
        ...Platform.select({
          ios: {
           /* paddingHorizontal:15,
            paddingTop:30,
            paddingBottom:10,
            shadowColor: '#cdcdcd',
            shadowOffset: { height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            // paddingVertical:15,*/
            paddingHorizontal:3,
            paddingVertical:15,
            borderBottomColor: "#ececec",
            borderBottomWidth: 1,
          },
          android: {
            paddingHorizontal:15,
            paddingVertical:15,
            elevation: 0,        
            borderBottomColor: "#ececec",
            borderBottomWidth: 1,
          },
        }),
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Explore':
            iconName = Platform.OS === 'ios'
              ? `ios-search${focused ? '' : '-outline'}`
              : 'ios-search-outline';
            break;
            case 'MyBooking':
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


const styles = StyleSheet.create({

  notification: {
    backgroundColor:'#ffc943',
    height:18,
    width:19,
    position:'absolute',
    right:10,
    top:-4,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:9,
  },
  txtNotification: {
    color:'#fff',
    fontFamily:'Hind-Bold',
    fontSize:12,
    ...Platform.select({
      ios: {
        //backgroundColor:'red',
        height:12,
        lineHeight:16,
      },
    })
  },
  header: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        paddingHorizontal:15,
        paddingTop:30,
        paddingBottom:15,
        shadowColor: '#cdcdcd',
        shadowOffset: { height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // paddingVertical:15,
      },
      android: {
        paddingHorizontal:15,
        paddingVertical:15,
        elevation: 20,        
        borderBottomColor: "#ececec",
        borderBottomWidth: 1,
      },
    }),
  },
});