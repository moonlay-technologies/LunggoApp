'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import MapView from 'react-native-maps';
import Panel from '../components/Panel';
import Button from 'react-native-button';
import { Slider } from 'react-native-elements';
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
    title: 'Filter',
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

        <ScrollView style={{marginTop:60,}}>
          <View>
            <Text>Kisaran harga</Text>
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
              <Slider
                thumbTintColor={'blue'}
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
              <Text>Value: {this.state.value}</Text>
            </View>
            <View style={styles.divider}/>
            <Text>Berapa Lama</Text>
            <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
              <Slider
                value={this.state.value}
                onValueChange={(value) => this.setState({value})} />
              <Text>Value: {this.state.value}</Text>
            </View>
            <View style={styles.divider}/>
            <Text>Kategori</Text>
            <View style={styles.divider}/>
            <View style={{flexDirection: 'row'}}>
              <Text style={{}}>Food Scene</Text>
              <View style={{alignItems: 'flex-end', flex:1,}}>
                <CheckBox iconRight style={{backgroundColor:'#ffffff', paddingRight:0,}} checked={this.state.checked} />
              </View>
            </View>
            <View style={styles.divider}/>
            <View style={{flexDirection: 'row'}}>
              <Text style={{}}>Food Scene</Text>
              <View style={{alignItems: 'flex-end', flex:1,}}>
                <CheckBox iconRight style={{backgroundColor:'#ffffff', paddingRight:0,}} checked={this.state.checked} />
              </View>
            </View>
            <View style={styles.divider}/>
            <View style={{flexDirection: 'row'}}>
              <Text style={{}}>Food Scene</Text>
              <View style={{alignItems: 'flex-end', flex:1,}}>
                <CheckBox iconRight style={{backgroundColor:'#ffffff', paddingRight:0,}} checked={this.state.checked} />
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
              Filter
            </Button>
          </View>
        </ScrollView>

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
