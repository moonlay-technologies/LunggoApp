'use strict';

import React from 'react';
import LoadingAnimation from '../../components/LoadingAnimation';
import BlankScreen from './WishlistBlankScreen';
import ListScreen from '../SearchActivity/ActivityResultScreen';
import { fetchWishlist } from '../../../api/Common';


export default class WishlistFrame extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      isLoading: false,
      list:[],
    };
  }

  static navigationOptions = {
    title: 'Wishlist',
  };

  _getWishlist = () => {
    this.setState({isLoading: true});
    fetchWishlist().then( ({ activityList, status }) => {
      this.setState({list: activityList, status, isLoading: false});
    }).catch(error=>console.log(error));
  }

  componentDidMount() {
    let {params} = this.props.navigation.state;
    if (params && !params.loggedIn) return;
    this._getWishlist();
  }

  componentWillReceiveProps({navigation}) {
    if (navigation.state.params.shouldRefresh) {
      this._getWishlist();
    }
  }

  render() {
    console.log('wishlist rerendered');
    let {isLoading, list, status } = this.state;
    let {props} = this;
    if (isLoading) return <LoadingAnimation />
    else if (status==200 && list && list.length > 0 )
         return <ListScreen list={list} {...props} />
    else return <BlankScreen {...props} />
  }
}

// const styles = StyleSheet.create({
// });
