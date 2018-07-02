'use strict';

import React from 'react';
import { View, FlatList } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import { ActivityListItem } from './MyBookingListItems';
import { getMyBookingHistoryList, myBookingStore, shouldRefreshMyBookingHistoryList } from './MyBookingController';
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
    title: 'Riwayat',
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

  _refreshMyBookingList = (shouldLoading = true, refreshing = true) => {
    if (shouldLoading) {
      this.setState({ isLoading: true });
    }
    if (refreshing) {
      shouldRefreshMyBookingHistoryList();
    }
    getMyBookingHistoryList().then( () =>
        this.setState({ isLoading: false })
    );
  }

  _keyExtractor = (item, index) => index.toString();
  _renderItem = ({ item, index }) => (
    <View style={{ backgroundColor: 'white' }}>
      <ActivityListItem
        item={item}
        index={index}
        navigation={this.props.navigation}
        showActionButtons={true}
        myBookingState="history"
      />
    </View>
  )

  render() {
    let { isLoading, isLoggedIn } = this.state;
    let { props } = this;

    if (isLoggedIn)
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: -1 }}>
            <FlatList
              data={myBookingStore.myBookingHistories}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onRefresh={this._refreshMyBookingList}
              refreshing={isLoading}
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
