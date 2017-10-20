'use strict';

import React, { Component } from 'react'
import {
  StyleSheet, Image, View, Text,
  TouchableHighlight, FlatList,
} from 'react-native';

//// Format price to Rp1.000.000
var priceFormatter = price => "Rp" +
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    // const price = item.price_formatted.split(' ')[0];
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.imgSrc }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{priceFormatter(item.price)}</Text>
              <Text style={styles.title}
                numberOfLines={1}>{item.name}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class SearchResults extends Component {

  static navigationOptions = {
    title: 'Results',
  };
 
  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (index) => {
    console.log("Pressed row: "+index);
    this.props.navigation.navigate(
      'DetailScreen'//, { list: response.activityList}
    )
  };
  
  render() {
    return (
      <FlatList
        data={this.props.navigation.state.params.list}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }

}

const styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});