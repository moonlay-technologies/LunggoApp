'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import * as Formatter from '../components/Formatter';
import { Icon } from 'react-native-elements';
import {
  Platform, StyleSheet, FlatList,
  Text, View, Image, TextInput, ScrollView, TouchableHighlight, ListView
} from 'react-native';


class ListItem extends React.PureComponent {

  render() {
    const {item} = this.props;
    return (
      <TouchableHighlight key={item.rsvNo}
        underlayColor='rgba(192,192,192,1,0.6)'
        // onPress={this.viewNote.bind(this, rowData)}
      >
        <View>
          <View style={styles.rowContainer}>
            <Text style={styles.note}> rowData </Text>
          </View>
          <View style={styles.divider} />
        </View>
      </TouchableHighlight>
    );
  }

}

export default class Cart extends Component {

  constructor (props) {
    super(props)
    this.state = {
      list: [
        { rsvNo: "Ali Zainal" },
        { rsvNo: "John Doe (me)" },
      ]
    };
  }

  static navigationOptions = {
  };

  viewNote(rowData) {
    this.props.navigator.push({
      title: 'The Note',
      component: ViewNote,
      passProps: {
        noteText: rowData,
        noteId: this.noteId(rowData),
      }
    });
  }

  _viewDetails = (item) => {
    this.props.navigation.navigate(
      'BookedPageDetail',{details: item}
    );
  }

  _keyExtractor = (item, index) => index;
  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._viewDetails}
    />
  );

  render() {
    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
        <ScrollView style={{marginBottom:60,marginTop:60}}>
          <View style={styles.container}>
            <View style={styles.container}>
              <FlatList
                data={this.state.list}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex:1
  },
    thumb: {
    resizeMode:'cover', 
    width:'100%', 
    height:170,
  },
  activityTitle: {
    fontWeight: 'bold',
    fontSize:16,
    marginBottom: 7,
  },
  descriptionActivity: {
    fontSize:11,
    lineHeight: 15,
    marginTop:10,
  },
   divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 5,
    marginBottom: 5,
  },
});
