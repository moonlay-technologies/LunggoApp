'use strict';

import React, { Component } from 'react'
import {
  StyleSheet, Image, View, Text,
  TouchableHighlight, FlatList,
} from 'react-native';
// import {fetchTravoramaApi, AUTH_LEVEL} from '../components/Common';
import * as Formatter from '../components/Formatter';
import search from '../components/searchController';
import SearchHeader from '../components/SearchHeader';
import { Icon } from 'react-native-elements'

class ListItem extends React.PureComponent {

  _onPress = () => {
    this.props.onPressItem(this.props.item);
  }

  render() {
    const {item} = this.props;
    return (
      <View style={{backgroundColor:'#fff'}}>
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#dddddd'>
          <View style={styles.rowContainer}>
            <View style={styles.containerItem}>
              <Image style={styles.thumbnailMedium}  source={{ uri: item.mediaSrc }} />
              <View style={{flexDirection:'row'}}>
                <View style={styles.textContainer}>
                  <Text style={styles.activityTitle}numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.priceTitle}>
                    { Formatter.price(item.price) }
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={24}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={styles.containerItem2}>
              <Image style={styles.thumbnailMedium} source={{ uri: item.mediaSrc }} />
              <View style={styles.textContainer}>
                <Text style={styles.activityTitle}numberOfLines={1}>{item.name}</Text>
                <Text style={styles.priceTitle}>
                  {Formatter.price(item.price)}
                </Text>
              </View>
            </View>

          </View>
        </TouchableHighlight>
      </View>
    );
  }

}

export default class SearchResults extends Component {

  constructor (props) {
    super(props)
    let {searchString} = this.props.navigation.params || {};
    this.state = {
      searchString: searchString || '',
      placeholder: 'Try "snorkeling"...',
      list:{}
    };
  }

  static navigationOptions = {
    title: 'Results',
  };
 
  componentDidMount() {
    search(this.state.searchString)
      .then(response => this.setState({list: response}))
      .catch(error=>console.log(error))
  }

  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._onPressItem}
    />
  );

  _onPressItem = (item) => {
    this.props.navigation.navigate('DetailScreen', {details: item})
  };
  
  render() {
    this.props.navigation.state.key = 'SearchResults'
    return (
      <FlatList
        data={this.state.list}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem} />
    );
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingLeft:15,
    paddingRight:15,
    paddingBottom:7.5,

    flex:1,
  }, 
  containerItem: {
    paddingRight:15,
    flex:1,
  },
  containerItem2: {
    flex:1,
  },
  thumbnailMedium: {
    resizeMode:'cover', 
    width:'100%', 
    height:100, 
    borderRadius:5,
  },
  activityTitle: {
    fontWeight:'bold',
    fontSize:15,
    color:'#454545',
  },
  priceTitle: {
    fontSize:12,
    color:'#676767',
    marginTop:2
  },
  textContainer: {
    marginTop:5,
    flex:4
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
});