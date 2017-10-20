import React, { Component } from 'react';
// import {StyleSheet} from 'react-native';
import { CalendarList } from 'react-native-calendars';

export default class CalendarView extends Component {
  // constructor(props) {
  //   super(props);

  //   this.icons = {   
  //     'up'   : require('../assets/icons/right-arrow.png'),
  //     'down' : require('../assets/icons/down-arrow.png')
  //   };

  //   this.state = {       
  //     title: props.title,
  //     expanded: true
  //   };
  // }

  render(){
    return ( 
      <CalendarList
        minDate={Date()}
        pastScrollRange={0}
        futureScrollRange={12}
        // scrollEnabled={true}
      />
    );
  }
}

// var styles = StyleSheet.create({
  // container: {
  //   backgroundColor: '#fff',
  //   marginTop:20,
  //   overflow:'hidden'
  // },
  // titleContainer: {
  //   flexDirection: 'row'
  // },
  // title: {
  //   flex    : 1,
  //   color   :'#2a2f43',
  //   fontSize: 14,
  // },
  // button: {
  // },
  // buttonImage: {
  //   width : 20,
  //   height: 20
  // },
  // body: {
  //   padding   : 10,
  //   paddingTop: 0,
  //   borderBottomColor: "#cdcdcd",
  //   borderBottomWidth: 1,
  // }
// });