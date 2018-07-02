'use strict';

import React from 'react';
import { View, FlatList } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import { ActivityListItem } from './MyBookingActiveListItem';
import { shouldRefreshMyBookingActivityList, getMyBookingActivityList,
  myBookingStore } from './MyBookingController';
import { checkUserLoggedIn } from '../../../api/Common';
import { observer } from 'mobx-react';

@observer
export default class MyBookingActivityScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false,
    };
  }

  static navigationOptions = {
    title: 'Pesanan Aktif',
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

  _refreshMyBookingList = async (shouldLoading = true, refreshing = true) => {
    if (shouldLoading) {
      this.setState({ isLoading: true });
    }
    if (refreshing) {
      await shouldRefreshMyBookingActivityList();
    }
    getMyBookingActivityList().then(list => {
      this.setState({ list });
    }).finally(() => this.setState({ isLoading: false }));
  }

  _goToActivityHistory = () => this.props.navigation.navigate('MyBookingActivityHistory');
  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({ item, index }) => (
    <View style={{ backgroundColor: 'white' }}>
      <ActivityListItem
        item={item}
        index={index}
        navigation={this.props.navigation}
        showActionButtons={true}
        myBookingState="active"
      />
    </View>
  )

  // header = () => (
  //   <View style={{ height: 90, justifyContent: 'center' }}>
  //     <MenuButton
  //       label='Lihat Riwayat Aktivitas'
  //       icon={
  //         <Icon
  //           name='ios-time-outline'
  //           type='ionicon'
  //           size={26}
  //           color='#454545'
  //         />
  //       }
  //       onPress={this._goToActivityHistory}
  //     />
  //   </View>
  // )

  render() {
    let { isLoading, isLoggedIn } = this.state;
    let { props } = this;
    if (isLoggedIn)
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: -1 }}>
            <FlatList
              data={myBookingStore.activeMyBookings}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onRefresh={this._refreshMyBookingList}
              refreshing={isLoading}
              //ListHeaderComponent={this.header}
              ListEmptyComponent={
                <BlankScreen isLoggedIn={isLoggedIn} {...props} />
              }
            />
          </View>
        </View>);
    else
      return (
        <BlankScreen isLoggedIn={isLoggedIn} {...props} />
      )
  }
}
