'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import BlankScreen from './CartBlankScreen';
import ListScreen from './CartListScreen';
import { AUTH_LEVEL, fetchTravoramaApi } from '../../../api/Common';

async function getCart() {
  const version = 'v1';
  const path = `/${version}/cart`;
  let request = {path, requiredAuthLevel: AUTH_LEVEL.User}
  try {
    let response = await fetchTravoramaApi(request);
    let {status, rsvNoList, totalPrice} = response;
    if(status == 200) return {list:rsvNoList, totalPrice}; ///TODO : ganti nama rsvNoList jadi rsvList ato reservationList
    else if (response.status == 401) return {list:[], totalPrice:0};
  } catch(error) {
    console.log(error);
  }
}

export default class CartScreen extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      list:[],
    };
  }

  static navigationOptions = {
    title: 'Cart',
  };

  componentDidMount() {
    getCart().then( ({list, totalPrice}) => {
      this.setState({list, totalPrice, isLoading: false});
      // this.forceUpdate();
    }).catch(error=>console.log(error));
  }

  render() {
    let {isLoading, list, totalPrice} = this.state;
    let {props} = this;

    if (isLoading) return <ActivityIndicator size="large"/>
    else if (list && list.length > 0 ) return (
      <ListScreen list={list} totalPrice={totalPrice} {...props} /> )
    else return <BlankScreen {...props} />
  }
}

// const styles = StyleSheet.create({
// });
