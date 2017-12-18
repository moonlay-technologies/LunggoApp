'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView, { Marker } from 'react-native-maps';
import Panel from '../components/Panel';
import Button from 'react-native-button';
import LikeShareHeaderButton from '../components/LikeShareHeaderButton';
import { Rating } from 'react-native-elements';
import * as Formatter from '../components/Formatter';
import { Icon } from 'react-native-elements'
import Swipeout from 'react-native-swipeout';
import {
  Platform, StyleSheet,
  Text, View, Image, TextInput, ScrollView, TouchableHighlight, ListView
} from 'react-native';

export default class BookingDetail extends Component {


  constructor (props) {
    super(props)
    this.state = {
      dataSource: [
        { name: "Ali Zainal" },
        { name: "John Doe (me)" },
      ]
    };
  }

  static navigationOptions = {
    // header: ({navigate}) => ({
    //     right: (
    //         <LikeShareHeaderButton navigate={navigate}/>
    //     ),
    // }),
    // headerTitleStyle: {color:'white'},
    headerRight: <LikeShareHeaderButton/>,
    headerStyle: {
      // backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
  };

renderRow(rowData) {
    return (
    <TouchableHighlight
      underlayColor='rgba(192,192,192,1,0.6)'
      onPress={this.viewNote.bind(this, rowData)} >
      <View>
        <View style={styles.rowContainer}>
          <Text style={styles.note}> {rowData} </Text>
        </View>
        <Separator />
      </View>
    </TouchableHighlight>
    )
  }
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

  render() {
    return (
      //<Image style={styles.detailimg}source={require('../assets/images/detailimg.jpg')}/>
      <View style={{flex:1, backgroundColor:'#ffffff'}}>
        <ScrollView style={{marginBottom:60,marginTop:60}}>
          <View style={styles.container}>
            <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)} />
        </View>
          </View>{/* end container */}
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
