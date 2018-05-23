'use strict';

import React from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet, Platform, Text, TouchableOpacity } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import { TrxListItem, ActivityListItem } from './MyBookingListItems';
import { fetchMyBookingActivityHistoryList } from './MyBookingController';
import LoadingAnimation from '../../components/LoadingAnimation'
import Moment from 'moment';
import ReactNativeDatepicker from 'react-native-datepicker';
import Colors from '../../../constants/Colors';


export default class MyBookingScreen extends React.Component {

  perPage = 1000;

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activityList: [],
      page: 1,
      startDate: Moment().startOf('Month'),
      endDate: Moment(new Date()),
    };
  }

  static navigationOptions = {
    title: 'Riwayat Aktivitas',
  }

  componentDidMount() {
    let { params } = this.props.navigation.state;
    if (params && !params.loggedIn) {
      return this.setState({ isLoading: false });
    }
  }

  _refreshMyBookingList = () => {
    let { startDate, endDate, page } = this.state;
    fetchMyBookingActivityHistoryList(startDate, endDate, page, this.perPage).then(list => {
      let activities = list.reduce((result, cart) => result.concat(cart.activities), []);
      this.setState({ activityList: activities });
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

  _changeDate = (date, whichDate) => {
    date = Moment(date, 'dddd, D MMM YYYY');
    this._refreshMyBookingList();
    this.setState({ [whichDate]: date });
  }

  header = () => (
    <View style={styles.header}>
      <View style={{ marginBottom: 3 }}>
        <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
          Periode
            </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <DatePicker
          mode="date"
          date={this.state.startDate.format('dddd, D MMM YYYY')}
          maxDate={Moment(new Date())}
          onDateChange={d => this._changeDate(d, 'startDate')}
        />
        <View style={{ justifyContent: 'center' }}>
          <Text>—</Text>
        </View>
        <DatePicker
          mode="date"
          date={this.state.endDate.format('dddd, D MMM YYYY')}
          minDate={this.state.startDate}
          maxDate={Moment(new Date())}
          onDateChange={d => this._changeDate(d, 'endDate')}
        />
      </View>
    </View>
  );

  render() {
    let { isLoading, activityList, status } = this.state;
    let { props } = this;

    return (
      <View style={{ flex: 1 }}>
        {this.header()}
        {this.state.isLoading && <LoadingAnimation />}
        {this.state.isLoading || <FlatList
          data={activityList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          ListEmptyComponent={<BlankScreen {...props} />}
        />}
      </View>);
  }
}

const DatePicker = props => (
  <TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
    <ReactNativeDatepicker
      style={[styles.containerTanggal, { ...props.style }]}
      date={props.date}
      mode="date"
      placeholder="select date"
      format="ddd, D MMM YYYY"
      minDate={Moment().subtract(1, 'years').format('dddd, D MMM YYYY')}
      maxDate={Moment().add(1, 'years').format('dddd, D MMM YYYY')}
      showIcon={false}
      confirmBtnText="OK"
      cancelBtnText="Cancel"
      customStyles={{
        placeholderText: {
          fontSize: 20,
          color: '#fff'
        },
        dateText: {
          color: '#fff',
          fontWeight: 'bold'
        },
        dateInput: {
          borderRadius: 3,
          borderColor: '#cdcdcd',
          backgroundColor: Colors.bottomTabSelected,
          height: 35
        },
      }}
      onDateChange={props.onDateChange}
    />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  containerTanggal: {
    width: '90%',
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 15,
    backgroundColor: 'white'
  }
});
