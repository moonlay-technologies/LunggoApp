'use strict';

import React from 'react';
import { View, ActivityIndicator, FlatList, RefreshControl, StyleSheet, ScrollView } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import CartListItem from './MyBookingListScreen';
import { getMyBookingList, shouldRefreshMyBookingList } from './MyBookingController';
import LoadingAnimation from '../../components/LoadingAnimation'
import OfflineNotificationBar from './../../../commons/components/OfflineNotificationBar';
import withConnectivityHandler from '../../../higherOrderComponents/withConnectivityHandler';

class MyBookingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
    };
  }

  static navigationOptions = {
    title: 'Pesananku',
  }
  
  listenerSubcription = null;

  componentDidMount() {
    let { params } = this.props.navigation.state;
    if (params && !params.loggedIn) {
      return this.setState({ isLoading: false });
    }
    console.log("did mount mybookingscreen");
    this.listenerSubscription = this.props.navigation.addListener(
      "didFocus", () => this._refreshMyBookingList(false, false)
    );
  }

  componentWillUnmount(){
    console.log("melakukan unmount");
    if(this.listenerSubscription)
    {
      this.listenerSubscription.remove();
    }    
  }
  
  _refreshMyBookingList = (shouldShowLoadingIndicator = true, shouldRefreshFromDatabase = true) => {
    if(shouldShowLoadingIndicator)
    {
      this.setState({ isLoading: true });
    }
    if(shouldRefreshFromDatabase){
      shouldRefreshMyBookingList();
    }
    this.props.withConnectivityHandler(getMyBookingList)
      .then(list => this.setState({ list }))
      .finally(() => this.setState({ isLoading: false }));
  }

  _keyExtractor = (item, index) => index
  _renderItem = ({ item, index }) => (
    <CartListItem
      item={item}
      index={index}
      // onPressItem={this._onPressItem}
      navigation={this.props.navigation}
    />
  )

  render() {
    let { isLoading, list, status } = this.state;
    let { props } = this;

    if (isLoading) return null// <LoadingAnimation />
    else if (list && list.length > 0) return (
      <FlatList
        data={list}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshControl={<RefreshControl onRefresh={this._refreshMyBookingList} refreshing={isLoading} />}
      />
    );
    else return (
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl onRefresh={this._refreshMyBookingList} refreshing={isLoading} />}>
        <BlankScreen {...props} />
      </ScrollView>
    );
  }
}
export default withConnectivityHandler(MyBookingScreen, {hasOfflineNotificationBar: false});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#f1f0f0',
  },
});
