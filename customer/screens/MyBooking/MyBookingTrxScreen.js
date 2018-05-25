'use strict';

import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import { TrxListItem } from './MyBookingListItems';
import { getMyBookingTrxList, myBookingTrxItemStore, shouldRefreshMyBookingTrxList } from './MyBookingController';
import LoadingAnimation from '../../components/LoadingAnimation'
import OfflineNotificationBar from './../../../commons/components/OfflineNotificationBar';
import withConnectivityHandler from '../../../higherOrderComponents/withConnectivityHandler';
import MenuButton from './../../../commons/components/MenuButton';
import { Icon } from 'react-native-elements';
import { checkUserLoggedIn } from '../../../api/Common';
import { observer } from 'mobx-react';

@observer
class MyBookingTrxScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: false,
      list: [],
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
    this.setState({ isLoading: true });
    let isLoggedIn = await checkUserLoggedIn();
    this.setState({ isLoggedIn, isLoading: false });
  }

  _goToTrxHistory = () => this.props.navigation.navigate('MyBookingTrxHistory');
  _refreshMyBookingList = (shouldShowLoadingIndicator = true, shouldRefreshFromDatabase = true) => {
    if(shouldShowLoadingIndicator)
    {
      this.setState({ isLoading: true });
    }
    if(shouldRefreshFromDatabase){
      shouldRefreshMyBookingTrxList();
    }
    this.props.withConnectivityHandler(getMyBookingTrxList)
      .then(list => this.setState({ list }))
      .finally(() => this.setState({ isLoading: false }));
  }

  _keyExtractor = (item, index) => index
  _renderItem = ({ item, index }) => (
    <TrxListItem
      item={item}
      index={index}
      // onPressItem={this._onPressItem}
      navigation={this.props.navigation}
    />
  )

  header = () => (
    <View style={{ height: 90, justifyContent: 'center' }}>
      <MenuButton
        label='Lihat Riwayat Pembelian'
        icon={
          <Icon
            name='ios-time-outline'
            type='ionicon'
            size={26}
            color='#454545'
          />
        }
        onPress={this._goToTrxHistory}
      />
    </View>
  );

  render() {
    let { isLoading, isLoggedIn, list, status } = this.state;
    let { props } = this;


    if (isLoggedIn)
      return (
        <View style={{ flex: 1 }}>
          <View style={{ flex: -1 }}>
            <FlatList
              data={myBookingTrxItemStore.myBookingTrxItem}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              onRefresh={this._refreshMyBookingList}
              refreshing={this.state.isLoading}
              ItemSeparatorComponent={() => <View style={{ height: 20 }}></View>}
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
export default withConnectivityHandler(MyBookingTrxScreen, {hasOfflineNotificationBar: false});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: '#f1f0f0',
  },
  separator: {
    height: 20
  }
});
