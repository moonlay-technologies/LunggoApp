'use strict';

import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View, Image,
  TextInput, ScrollView, TouchableHighlight, FlatList,
} from 'react-native';
import Moment from 'moment';
import 'moment/locale/id';

class ListItem extends React.PureComponent {

  _onPress = () => this.props.onPressItem(this.props.item);
  render() {
    const {item} = this.props;
    return (
      <View key={item.rsvNo} style={{flex:1,}}>

        <View style={styles.divider}></View>

        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#ddd'
        >
        <View style={styles.containerListAppointment}>
          <View style={{flex:3}}>
            <Text style={styles.activityTitle}>{item.paxCount} Guest</Text>
            <Text style={styles.activityTitle}>{item.name}</Text>
            <View style={{width:'100%',flexDirection:'row',}}>
              <View style={{ flexDirection:'row', marginRight:10 }}>
                <Text style={styles.timeActivity}>
                  {Moment(item.date).format('ddd, D MMM YYYY')}
                </Text>
              </View>
              <View style={{ flexDirection:'row' }}>
                <Text style={styles.timeActivity}>
                  {item.session}
                </Text>
              </View>
            </View>
            <View style={{marginTop:10,}}>
              <Text style={styles.status}>3 days remaining</Text>
            </View>
          </View>

          <View style={{flex:1}}>
            <View style={{marginTop:10, alignItems:'flex-end'}}>
              <Text style={styles.status}>lihat detail</Text>
            </View>
          </View> 
          </View>
        </TouchableHighlight>

      </View>
    );
  }
}

export default class AppointmentList extends Component {

  static navigationOptions = {
    title: 'List Appointment',
  };

  constructor (props) {
    super(props)
    this.state = {
      list: this.props.navigation.state.params.list
    };
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
    this.props.navigation.navigate(
      'AppointmentDetail',{details: item}
    );
  };

  render() {
    return (
      <ScrollView style={{ backgroundColor: '#fff',}}>
        <FlatList
            data={this.state.list}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerListAppointment: {
    padding:20,
    flexDirection: 'row',
    flex:1
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 15,
    marginBottom: 15,
  },
  activityTitle: {
    fontSize:16,
    marginBottom: 3,
  },
  status: {
    color:'green',
    fontSize:12,
  },
  icon: {
    width:15,
    height:15,
    marginRight:3,
  },
  timeActivity: {
    fontSize:12,
  },
  bottomBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fbfbfb',
    padding: 20,
    borderTopColor: "#efefef",
    borderTopWidth: 2,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
  },
});
