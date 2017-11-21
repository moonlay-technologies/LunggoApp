'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform, StyleSheet, FlatList,
  Text, View, Image, TextInput, ScrollView, TouchableHighlight,
} from 'react-native';
import {fetchTravoramaApi, AUTH_LEVEL} from '../components/Common';


class ListItem extends React.PureComponent {

  _onPress = () => this.props.onPressItem(this.props.item);
  render() {
    const {item} = this.props;
    return (
      <View key={item.rsvNo}>
        <View style={styles.divider}></View>
        <TouchableHighlight
          onPress={this._onPress}
          underlayColor='#ddd'
        >
          <View style={styles.containerBooking}>
            <Image source={{uri: item.mediaSrc}} style={{
              flex: 1.8,
              resizeMode: 'cover',
              width: '100%',
              height: 110,
            }}/>
            <View style={{
              flex:3,
              marginRight: '10%',
              marginLeft: '5%',
            }}>
              <Text style={styles.activityTitle}>
                {item.name}
              </Text>
              <Text style={styles.status}>{item.bookingStatus}</Text>
              <View style={{
                marginTop: 10,
                marginBottom: 5,
                width: '100%',
                flexDirection:'row',
              }}>
                <View style={{ flexDirection:'row', marginRight:10 }}>
                  <Image style={styles.icon}
                    source={require('../assets/icons/person.png')}/>
                  <Text style={styles.timeActivity}>
                    {/*item.paxCount*/} peserta
                  </Text>
                </View>
                <View style={{ flexDirection:'row' }}>
                  <Image style={styles.icon}
                    source={require('../assets/icons/calendar.png')}/>
                  <Text style={styles.timeActivity}>
                    {/*item.duration.count +' '+ item.duration.unit*/}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection:'row' }}>
                <Image style={styles.icon}
                  source={require('../assets/icons/calendar.png')}/>
                <Text style={styles.timeActivity}>
                  {item.date}
                </Text>
              </View>
            </View> 
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default class MyBookingScreen extends Component {

  static navigationOptions = {
    title: 'Pesananku',
  };

  constructor (props) {
    super(props)
    this.state = {bookingList: []};
  }

  componentDidMount() {
    const version = 'v1';
    let request = {
      path: `/${version}/activities/mybooking`,
      requiredAuthLevel: AUTH_LEVEL.Guest,
    }
    fetchTravoramaApi(request).then( response => {
      this.setState({bookingList: response.myBookings});
    }).catch(error => console.log(error));
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
      'BookedPageDetail',{details: item}
    );
  };
  
  render() {

    return (
      <ScrollView style={{flex:1, backgroundColor: '#fff',}}>

      {/* Tab Button

        <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#fff',
          marginTop:10,
        }}>
          <Button
            containerStyle={{
              marginRight:3,
              height:40, width:120, paddingTop:10, paddingBottom:10,
              overflow:'hidden', borderRadius:4,
              backgroundColor: '#437ef7'
            }}
            style={{fontSize: 14, color: '#ffffff'}}
            onPress={() => this._handlePress()}>
            Active
          </Button>
          <Button
            containerStyle={{ height:40, width:120, paddingTop:10,
              paddingBottom:10, overflow:'hidden', borderRadius:4,
              borderWidth: 1,
              borderColor: '#437ef7',backgroundColor: '#ffffff'
            }}
            style={{fontSize: 14, color: '#437ef7'}}
            onPress={() => this._handlePress()}>
            History 
          </Button>
        </View>
        
      */}

        <View style={{marginBottom:10}}>
          <FlatList
            data={this.state.bookingList}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerBooking: {
    padding:10,
    paddingTop:0,
    paddingBottom:0,
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
});
