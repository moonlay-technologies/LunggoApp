'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import ListScreen from './MyBookingListScreen';
import { getBookingList } from './MyBookingController';


export default class MyBookingLoadingScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      list:[],
    };
  }

  static navigationOptions = {
    title: 'My Booking',
  };

  componentDidMount() {
    // let response = await getBookingList();

    // let { list, status } = await getBookingList();
    getBookingList().then( ({ list, status }) => {
    // getBookingList().then( (response) => {
      this.setState({list, status, isLoading: false});
    });
  }

  render() {
    let {isLoading, list, status } = this.state;
    let {props} = this;

    if (isLoading) return <ActivityIndicator size="large"/>
    else if (status==200 && list && list.length > 0 ) return (
      <ListScreen list={list} {...props} /> )
    else return <BlankScreen {...props} />
  }
}

// const styles = StyleSheet.create({
// });
