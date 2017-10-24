'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Panel from '../components/Panel';
import Button from 'react-native-button';
import { CheckBox } from 'react-native-elements'

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

export default class DetailScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Tour Title 12',
    // header: ({navigate}) => ({
    //     right: (
    //         <LikeShareHeaderButton navigate={navigate}/>
    //     ),
    // }),
    // headerTitleStyle: {color:'white'},
    headerStyle: {
      // backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
  };

  constructor (props) {
    super(props)
    this.state = {
      checked: false,
    };
  }

  render() {
    return (
      //<Image style={styles.detailimg}source={require('../assets/images/detailimg.jpg')}/>
      <View style={styles.container}>

        <ScrollView style={{marginBottom:60,marginTop:60,}}>
          <View>
            <View style={{flexDirection: 'row'}}>
              <CheckBox style={{backgroundColor:'#ffffff'}} title='Ali Zainal' checked={this.state.checked} />
              <View style={{alignItems: 'flex-end', flex:1, marginTop:3,}}>
                <Text>Edit</Text>
              </View>
            </View>
            <View style={styles.divider}/>
            <View style={{flexDirection: 'row'}}>
              <CheckBox style={{backgroundColor:'#ffffff'}} title='Guest1' checked={this.state.checked} />
              <View style={{alignItems: 'flex-end', flex:1, marginTop:3,}}>
                <Text>Edit</Text>
              </View>
            </View>
            <View style={styles.divider}/>
            <View style={{flexDirection: 'row'}}>
              <CheckBox style={{backgroundColor:'#ffffff'}} title='Guest2' checked={this.state.checked} />
              <View style={{alignItems: 'flex-end', flex:1, marginTop:3,}}>
                <Text>Edit</Text>
              </View>
            </View>
            <View style={styles.divider}/>
            <Button
              containerStyle={{height:35, flex:1, paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
              style={{fontSize: 12, color: '#ffffff'}}
              // onPress={() => this._handlePress()}
              onPress={() => this.props.navigation.navigate(
                'CalendarView'//, { list: response.activityList}
              )}
            >
              Tambah Guest
            </Button>
          </View>
        </ScrollView>

        {/*bottom CTA button*/}
        <View style={styles.bottomBarContainer}>
          <View style={{alignItems: 'flex-start', flex:1}}>
            <Text style={{marginRight:5, fontSize:12,}}>1 Peserta</Text> 
            <Text style={{color:'green', marginRight:3, fontWeight: 'bold', fontSize:15,}}>Rp. 3.000.000</Text> 
          </View>
          <View style={{alignItems: 'flex-end', flex:1}}>
            <Button
              containerStyle={{height:35, width:120, paddingTop:10, paddingBottom:10, overflow:'hidden', borderRadius:4, backgroundColor: '#437ef7'}}
              style={{fontSize: 12, color: '#ffffff'}}
              // onPress={() => this._handlePress()}
              onPress={() => this.props.navigation.navigate(
                'CalendarView'//, { list: response.activityList}
              )}
            >
              Tambah ke Troli
            </Button>
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    paddingBottom:40,
    backgroundColor: '#fff',
    flex:1,
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
   divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 15,
    marginBottom: 15,
  },
});
