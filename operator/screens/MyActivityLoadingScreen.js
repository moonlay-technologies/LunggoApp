'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import {fetchTravoramaApi,AUTH_LEVEL} from '../../api/Common';
import ListScreen from './ActivityList';
import LoadingAnimation from '../../customer/components/LoadingAnimation'

async function getActivityList () {
  const version = 'v1';
  const path = `/${version}/operator/myactivity`;
  // this.setState({ isLoading: true });
  let request = {path, requiredAuthLevel: AUTH_LEVEL.User}
  return await fetchTravoramaApi(request);
    // this.setState({ isLoading: false });
    // this._goToActivityList(response);
  // }).catch(error => {
  //   this.setState({
  //     isLoading: false,
  //     message: 'Something bad happened :\n'+ error
  //   });
  //   console.log(error);
  // });
}

export default class ActivityListLoadingScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      list: [],
      isLoading: true,
    };
  }

  static navigationOptions = {
    title: 'My Activity',
  };

  componentDidMount() {
    getActivityList().then( res => {
      this.setState({list:res.activityList, isLoading:false})
    });
    // search(this.state.searchString)
    //   .then(response => {
    //     this.setState({list: response, isLoading: false});
    //     this.forceUpdate();
    //   }).catch(error=>console.log(error));
  }

  render() {
    let { isLoading, list } = this.state;
    let { props } = this;
    if (isLoading) { return <LoadingAnimation /> }
    else if (list.length > 0) { return <ListScreen list={list} {...props}/> }
    else { return <Text>You don't have any activity product!</Text> }
  }

}
