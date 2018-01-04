'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import BlankScreen from './BlankScreen';
import ListScreen from './ListScreen';
import { AUTH_LEVEL, fetchTravoramaApi } from '../../../api/Common';

async function getCart() {
  const version = 'v1';
  const path = `/${version}/cart`;
  let request = {path, requiredAuthLevel: AUTH_LEVEL.User}
  try {
    let response = await fetchTravoramaApi(request);
    if(response.status == 200) {
      return response.rsvNoList;
      ///TODO : ganti nama rsvNoList jadi rsvList ato reservationList
    } else if (response.status == 401) {
      return [];
    }
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
  };

  componentDidMount() {
    getCart().then(list => {
      this.setState({list, isLoading: false});
      // this.forceUpdate();
    }).catch(error=>console.log(error));
  }

  render() {
    let {isLoading, list} = this.state;
    let {props} = this;

    if (isLoading) return <ActivityIndicator size="large"/>
    else if (list && list.length > 0 )
         return <ListScreen list={list} {...props} />
    else return <ListScreen list={list} {...props} />
    // else return <BlankScreen list={list} {...props} />
  }
}

// const styles = StyleSheet.create({
// });
