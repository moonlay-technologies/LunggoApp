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
    title: 'Pesananku',
  };

  componentDidMount() {
    let {params} = this.props.navigation.state;
    if (params && !params.loggedIn) {
      return this.setState({isLoading:false});
    }
    getBookingList().then( ({ list, status }) => {
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
