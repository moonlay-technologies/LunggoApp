'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import BlankScreen from './CartBlankScreen';
import ListScreen from './CartListScreen';
import { getCart } from './CartController';


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
    getCart().then( ({ list, totalPrice, status }) => {
      this.setState({list, totalPrice, status, isLoading: false});
      // this.forceUpdate();
    }).catch(error=>console.log(error));
  }

  render() {
    let {isLoading, list, totalPrice, status } = this.state;
    let {props} = this;

    if (isLoading) return <ActivityIndicator size="large"/>
    else if (status==200 && list && list.length > 0 ) return (
      <ListScreen list={list} totalPrice={totalPrice} {...props} /> )
    else return <BlankScreen {...props} />
  }
}

// const styles = StyleSheet.create({
// });
