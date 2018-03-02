'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import BlankScreen from './MyBookingBlankScreen';
import ListScreen from './MyBookingListScreen';
import { getMyBookingList } from './MyBookingController';
import LoadingAnimation from '../../components/LoadingAnimation'


export default class MyBookingScreen extends React.Component {

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
    getMyBookingList().then( ({ list, status }) => {
      this.setState({list, status, isLoading: false});
    });
  }

  render() {
    let {isLoading, list, status } = this.state;
    let {props} = this;

    if (isLoading) return <LoadingAnimation />
    else if (status==200 && list && list.length > 0 ) return (
      <ListScreen list={list} {...props} /> )
    else return <BlankScreen {...props} />
  }
}

// const styles = StyleSheet.create({
// });
