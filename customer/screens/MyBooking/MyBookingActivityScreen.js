'use strict';

import React from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Platform } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import { TrxListItem, ActivityListItem } from './MyBookingListItems';
import { shouldRefreshMyBookingActivityList, myBookingActivityItemStore, getMyBookingActivityList } from './MyBookingController';
import LoadingAnimation from '../../components/LoadingAnimation'
import withConnectivityHandler from '../../../higherOrderComponents/withConnectivityHandler';
import MenuButton from './../../../commons/components/MenuButton';
import { Icon } from 'react-native-elements';
import { checkUserLoggedIn } from '../../../api/Common';
import { observer } from 'mobx-react';

@observer
class MyBookingActivityScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activityList: [],
      isLoggedIn: false,
    };
  }

  static navigationOptions = {
    header: null,
  }

  listenerSubcription = null;

  componentDidMount() {
    this._checkLoggedIn();
    this.listenerSubscription = this.props.navigation.addListener("didFocus", () => this._refreshMyBookingList(false, false));
  }

  componentWillUnmount() {
    if (this.listenerSubscription) {
      this.listenerSubscription.remove();
    }
  }

  _checkLoggedIn = async () => {
    let isLoggedIn = await checkUserLoggedIn();
    this.setState({ isLoggedIn });
  }
  
  _refreshMyBookingList = (shouldShowLoadingIndicator = true, shouldRefreshFromDatabase = true) => {
    console.log("melakuka refresh activity list my booking");
    if(shouldShowLoadingIndicator) {
      this.setState({ isLoading: true });
    }
    if(shouldRefreshFromDatabase){
      shouldRefreshMyBookingActivityList();
    }
    this.props.withConnectivityHandler(getMyBookingActivityList)
      .then(list => {
        this.setState({ list });
        // const activityList = list.reduce(
        //   (result, cart) => result.concat(cart.activities)
        // , [] );
        // this.setState({ activityList });
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  _goToActivityHistory = () => this.props.navigation.navigate('MyBookingActivityHistory');
  _keyExtractor = (item, index) => index;
  _renderItem = ({ item, index }) => (
    <View style={{ backgroundColor: 'white' }}>
      <ActivityListItem
        item={item}
        index={index}
        // onPressItem={this._onPressItem}
        navigation={this.props.navigation}
        showActionButtons={true}
      />
    </View>
  )

  header = () => (
    <View style={{ height: 90, justifyContent: 'center' }}>
      <MenuButton
        label='Lihat Riwayat Aktivitas'
        icon={
          <Icon
            name='ios-time-outline'
            type='ionicon'
            size={26}
            color='#454545'
          />
        }
        onPress={this._goToActivityHistory}
      />
    </View>
  )

  render() {
    let { isLoading, isLoggedIn, activityList, status } = this.state;
    let { props } = this;

    if (isLoggedIn)
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: -1 }}>
            <FlatList
              data={myBookingActivityItemStore.myBookingActivityItem}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onRefresh={this._refreshMyBookingList}
              refreshing={this.state.isLoading}
              ListHeaderComponent={this.header}
              ListEmptyComponent={<BlankScreen {...props} />}
            />
          </View>
        </View>);
    else
      return (
        <BlankScreen {...props} />
      )
  }
}
export default withConnectivityHandler(MyBookingActivityScreen, {hasOfflineNotificationBar: false});

const styles = StyleSheet.create({
  separator: {
    height: 20
  }
});
