'use strict';

import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import search from '../components/searchController';
import SearchHeader from '../components/SearchHeader';
import ActivityList from './ActivityListScreen';

export default class SearchResults extends React.Component {

  constructor (props) {
    super(props)
    let {searchString} = this.props.navigation.state.params || {};
    this.state = {
      searchString: searchString || '',
      list: {},
      isLoading: true,
    };
  }

  static navigationOptions = {
    title: 'Search Results',
  };

  componentDidMount() {
    search(this.state.searchString)
      .then(response => {
        this.setState({list: response, isLoading: false});
        this.forceUpdate();
      }).catch(error=>console.log(error));
  }

  render() {
    let { isLoading, list } = this.state;
    let { props } = this;
    props.navigation.state.key = 'SearchResults';
    if (isLoading) { return <ActivityIndicator size='large'/> }
    else if (list.length > 0) { return <ActivityList list={list} {...props}/> }
    else { return <Text>Sorry, we can't find the item you're looking for!</Text> }
  }

}
