'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import BlankScreen from './WishlistBlankScreen';
import ListScreen from '../SearchActivity/ActivityResultScreen';
import { fetchWishlist } from '../../../api/Common';


export default class WishlistFrame extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      list:[],
    };
  }

  static navigationOptions = {
    title: 'Wishlist',
  };

  componentDidMount() {
    fetchWishlist().then( ({ activityList, status }) => {
      this.setState({list: activityList, status, isLoading: false});
    }).catch(error=>console.log(error));
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
