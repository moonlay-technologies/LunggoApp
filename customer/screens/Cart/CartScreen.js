'use strict';

import React from 'react';
import { ActivityIndicator } from 'react-native';
import BlankScreen from './CartBlankScreen';
import ListScreen from './CartListScreen';
import { getCart } from './CartController';


export default class CartScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      list: [],
    };
  }

  static navigationOptions = {
    title: 'Cart',
  };

  componentDidMount() {
    getCart().then(({ cartId, list, totalPrice, status }) => {
      this.setState({ cartId, list, totalPrice, status, isLoading: false });
    }).catch(error => console.log(error));
  }

  render() {
    let { cartId, isLoading, list, totalPrice, status } = this.state;
    let { props } = this;

    if (isLoading) return (
      <View style={styles.container}>
        <Image width="70" height="70" source={require('../assets/images/loader1.gif')} />
      </View>)
    else if (status == 200 && list && list.length > 0) return (
      <ListScreen list={list} totalPrice={totalPrice} cartId={cartId} {...props} />
    );
    else return <BlankScreen {...props} />
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
});

