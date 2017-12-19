'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import { Platform, StyleSheet, FlatList, Text, View, Image,
  TextInput, ScrollView, TouchableHighlight, } from 'react-native';
import {fetchTravoramaApi, AUTH_LEVEL} from '../../api/Common';
import Moment from 'moment';
import 'moment/locale/id';


class ListItem extends React.PureComponent {

  _onPressItem = () => this.props.onPressItem(this.props.item);
  _onPressDecline = () => this.props.onPressDecline(this.props.item);
  _onPressAccept = () => this.props.onPressAccept(this.props.item);
  render() {
    const {item} = this.props;
    return (
      <View key={item.rsvNo}>
        <TouchableHighlight
          onPress={this._onPressItem}
          underlayColor='#ddd'
        >
          <View style={{flex:1},styles.containerListAppointment}>

            <View style={{flex:3}}>
              <Text style={styles.activityTitle}>Ali Zainal</Text>
              <View style={{marginTop:5,}}>
                <Text style={styles.timeActivity}>{item.name}</Text>
              </View>
              <View style={{width:'100%',flexDirection:'row', marginTop:5}}>
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
            </View>

            <View style={{
              flex:1,
              flexDirection:'row',
              // justifyContent:'flex-end',
              marginTop:15,
            }}>
              <Button
                containerStyle={{
                  height:32,
                  width:100,
                  paddingTop:6,
                  // overflow:'hidden',
                  borderRadius:4,
                  borderWidth: 1,
                  borderColor: '#bfbfbf',
                  backgroundColor: 'transparent'
                }}
                style={{fontSize: 14, color: '#454545'}}
                onPress={() => this._onPressDecline()}
              >Tolak</Button>
              <Button
                containerStyle={{
                  marginLeft:10,
                  height:32,
                  width:100,
                  paddingTop:6,
                  overflow:'hidden',
                  borderRadius:4,
                  backgroundColor: '#00c8be'
                }}
                style={{fontSize: 14, color: '#fff'}}
                onPress={() => this._onPressAccept()}
              >
                Terima
              </Button>
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.divider}></View>

      </View>
    );
  }
}

export default class AppointmentRequests extends Component {

  static navigationOptions = {
    title: 'Appointment Request',
  };

  constructor (props) {
    super(props)
    this.state = {};
  }

  componentDidMount() {
    const version = 'v1';
    let request = {
      path: `/${version}/operator/request`,
      requiredAuthLevel: AUTH_LEVEL.Guest,
    }
    fetchTravoramaApi(request).then( response => {
      this.setState({list: response.appointmentRequests});
    }).catch(error => console.log(error));
  }

  _keyExtractor = (item, index) => index;
  _renderItem = ({item, index}) => (
    <ListItem
      item={item}
      index={index}
      onPressItem={this._viewDetails}
      onPressAccept={this._acceptRequest}
      onPressDecline={this._declineRequest}
    />
  );

  _viewDetails = (item) => {
    this.props.navigation.navigate(
      'BookedPageDetail',{details: item}
    );
  };  
  _acceptRequest = (item) => {
    this.props.navigation.navigate(
      'BookedPageDetail',{details: item}
    );
  };  
  _declineRequest = (item) => {
    this.props.navigation.navigate(
      'BookedPageDetail',{details: item}
    );
  };  

  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff',}}>
        <View style={{marginBottom:10}}>
          <FlatList
            style={{paddingTop:15}}
            data={this.state.list}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  containerListAppointment: {
    paddingVertical:10,
    paddingHorizontal:15,
    flex:1
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 10,
    marginBottom: 10,
  },
  activityTitle: {
    fontWeight:'bold',
    fontSize:16,
    color:'#454545',
  },
  timeActivity: {
    fontSize:13,
    color:'#454545',
  },
  activityGuest: {
    fontSize:18,
    marginBottom: 3,
    fontWeight:'bold'
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

});
