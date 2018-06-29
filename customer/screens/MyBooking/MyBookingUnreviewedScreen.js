'use strict';

import React from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Platform } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import { ActivityListItem } from './MyBookingListItems';
import { getUnreviewedBookingList, myBookingStore } from './MyBookingController';
import LoadingAnimation from '../../components/LoadingAnimation'
import MenuButton from './../../../commons/components/MenuButton';
import { Icon } from 'react-native-elements';
import { checkUserLoggedIn } from '../../../api/Common';
import { observer } from 'mobx-react';

@observer
export default class MyBookingActivityScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
      isLoggedIn: false,
    };
  }

  static navigationOptions = {
    title: 'Butuh Review',
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
      shouldRefreshMyBookingActivityList();
    }
    getUnreviewedBookingList().then(list => {
      // this.setState({ list });
    }).finally(() => this.setState({ isLoading: false }));
  }

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

  render() {
    let { isLoading, isLoggedIn, status } = this.state;
    let { props } = this;

    if (isLoggedIn)
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: -1 }}>
            <FlatList
              data={myBookingStore.unreviewedMyBookings}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onRefresh={this._refreshMyBookingList}
              refreshing={this.state.isLoading}
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

const styles = StyleSheet.create({
  separator: {
    height: 20
  }
});
