'use strict';

import React from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl, StyleSheet, ScrollView, Platform } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import CartListItem, { ActivityListItem } from './MyBookingListScreen';
import { getMyBookingList, shouldRefreshMyBookingList } from './MyBookingController';
import LoadingAnimation from '../../components/LoadingAnimation'


export default class MyBookingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
    };
  }

  static navigationOptions = {
    title: 'Aktivitas',
  }

  listenerSubcription = null;

  componentDidMount() {
    let { params } = this.props.navigation.state;
    if (params && !params.loggedIn) {
      return this.setState({ isLoading: false });
    }
    console.log("did mount mybookingscreen");
    this.listenerSubscription = this.props.navigation.addListener("didFocus", () => this._refreshMyBookingList(false, false));
  }

  componentWillUnmount() {
    console.log("melakukan unmount");
    if (this.listenerSubscription) {
      this.listenerSubscription.remove();
    }
  }

  _refreshMyBookingList = (shouldLoading = true, refreshing = true) => {
    if (shouldLoading) {
      this.setState({ isLoading: true });
    }
    if (refreshing) {
      shouldRefreshMyBookingList();
    }
    getMyBookingList().then(list => {
      let activities = list.reduce((result, cart) => result.concat(cart.activities), []);
      this.setState({ list: activities });
    }).finally(() => this.setState({ isLoading: false }));
  }

  _keyExtractor = (item, index) => index
  _renderItem = ({ item, index }) => (
    <ActivityListItem
      item={item}
      index={index}
      // onPressItem={this._onPressItem}
      navigation={this.props.navigation}
      showActionButtons={true}
    />
  )

  render() {
    let { isLoading, list, status } = this.state;
    let { props } = this;

    if (isLoading) return <LoadingAnimation />
    else if (list && list.length > 0) return (
      <View style={styles.container}>
        <FlatList
          data={list}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshControl={<RefreshControl onRefresh={this._refreshMyBookingList} refreshing={this.state.isLoading} />}
        />
      </View>)
    else return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl onRefresh={this._refreshMyBookingList} refreshing={this.state.isLoading} />}>
        <BlankScreen {...props} />
      </ScrollView>)
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 5,
  }
});
