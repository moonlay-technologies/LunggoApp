import React from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../customer/screens/HomeScreen';
import Explore from '../customer/screens/ExploreScreen';
import MyBooking from '../navigation/MyBookingTabNavigator';
import Wishlist from '../customer/screens/Wishlist/WishlistScreen';
import MessageBlank from '../customer/screens/MessageBlank';
import AccountPage from '../customer/screens/AccountPage';
import { observer } from 'mobx-react';
import { myBookingStore } from '../customer/screens/MyBooking/MyBookingController';

export default TabNavigator(
  {
    Explore: { screen: Explore },
    MyBooking: { screen: MyBooking },
    Favorit: { screen: Wishlist },
    // MessageBlank: { screen: MessageBlank },
    AccountPage: { screen: AccountPage },
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
      tabBarLabel: () => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Explore':
            return 'Jelajah';
          case 'MyBooking':
            return 'Pesananku';
          case 'Favorit':
            return 'Favorit';
          case 'MessageBlank':
            return 'Inbox';
          case 'AccountPage':
            return 'Akun';
        }
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName, control;
        switch (routeName) {
          case 'Explore':
            iconName = `ios-search${focused ? '' : '-outline'}`;
            break;
          case 'MyBooking':
            iconName = `ios-paper${focused ? '' : '-outline'}`;
            control = myBookingBubbleControl;
            break;
          case 'Favorit':
            iconName = `ios-heart${focused ? '' : '-outline'}`;
            break;
          case 'MessageBlank':
            iconName = `ios-mail-open${focused ? '' : '-outline'}`;
            break;
          case 'AccountPage':
            iconName = `ios-person${focused ? '' : '-outline'}`;
        }
        return (
          <View>
            <Ionicons
              name={iconName}
              size={28}
              style={{ marginBottom: -4, }}
              color={focused ? Colors.bottomTabSelected : Colors.bottomTabBlurred}
            />
            <IconBubble control={control} />
          </View>
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: true,
    lazy: false,

    tabBarOptions: {
      activeTintColor: Colors.bottomTabSelected,
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
      style: { paddingBottom: 5, height: 60, backgroundColor: '#fbfbfb', borderTopColor: '#ececec', }
    },
  }
);

const myBookingBubbleControl = () => {
  return myBookingStore.hasNewBooking;
}

@observer
class IconBubble extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.control) {
      let display = this.props.control();
      return display && (
        <View style={styles.notification} />
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  containerCart: {
    ...Platform.select({
      ios: {
        paddingRight: 23,
      },
      android: {
        paddingRight: 23.5,
        zIndex: 100,
      },
    }),
  },
  notification: {
    backgroundColor: '#ffc943',
    height: 16,
    width: 16,
    position: 'absolute',
    right: 13,
    top: -4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    zIndex: 100,
    ...Platform.select({
      ios: {
        right: 15
      },
      android: {
        paddingRight: 23.5,
        zIndex: 100,
      },
    }),
  },
  txtNotification: {
    color: '#fff',
    fontFamily: 'Hind-Bold',
    fontSize: 11,
    ...Platform.select({
      ios: {
        //backgroundColor:'red',
        height: 12,
        lineHeight: 16,
      },
    })
  },
  header: {
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        paddingHorizontal: 15,
        paddingTop: 30,
        paddingBottom: 15,
        shadowColor: '#cdcdcd',
        shadowOffset: { height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // paddingVertical:15,
      },
      android: {
        paddingHorizontal: 15,
        elevation: 0,
        borderBottomColor: "#ececec",
        borderBottomWidth: 1,
      },
    }),
  },
  notification: {
    backgroundColor: Colors.primaryColor,
    height: 8,
    width: 8,
    position: 'absolute',
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
  },
});