'use strict';

import React from 'react';
import { Text, ActivityIndicator } from 'react-native';
import search from './SearchController';
import SearchHeader from './SearchHeader';
import ListScreen from './ActivityResultScreen';

export default class SearchLoadingScreen extends React.Component {

  constructor (props) {
    super(props)
    let {searchString} = this.props.navigation.state.params || {};
    this.state = {
      searchString: searchString || '',
      list: [],
      isLoading: true,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: `Pencarian '${params.searchString}'`
    }
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
    props.navigation.state.key = 'SearchActivity';
    if (isLoading) { return <ActivityIndicator size='large'/> }
    else if (list.length > 0) { return <ListScreen list={list} {...props}/> }
    else { return <Text>Sorry, we can't find the item you're looking for!</Text> }
  }

}
