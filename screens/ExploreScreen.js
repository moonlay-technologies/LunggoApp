'use strict';

import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Button, TextInput,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import {AUTH_LEVEL} from '../constants/env';
import {fetchTravoramaApi} from '../components/Common';
import { Icon } from 'react-native-elements'

function getQueryPath (key, value, pageNumber) {
  const version = 'v1';
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;

  // const querystring = Object.keys(data)
  //   .map(key => key + '=' + encodeURIComponent(data[key]))
  //   .join('&');
  const querystring = 'startDate=02-18-2017';

  /// wisata dan kegiatan
  return `/${version}/activities?${querystring}`;
  //+'?searchActivityType=ActivityName&name=tiket&page=1&perPage=10&date=180217';
}

export default class ExploreScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      searchString: '',
      isLoading: false,
      message: ''
    };
  }

  static navigationOptions = {
    header: (props) => 
      <View style={{ backgroundColor: '#fff', height:64 ,paddingTop:20}}>
        <View style={[styles.header,styles.flowRight]}>
          <View style={{flex:6}}>
            <TextInput
              style={styles.searchInput}
              // value={ExploreScreen.state.searchString}
              onChange={ExploreScreen._onSearchTextChanged}
              onSubmitEditing={()=>console.log(new ExploreScreen())}
              // onSubmitEditing={this._onSearchPressed}
              placeholder='Try "snorkeling"...'
              returnKeyType='search'
              underlineColorAndroid='transparent'
              selectTextOnFocus={true}
            />
            <TouchableOpacity
              onPress={()=>console.log(new ExploreScreen())}
              style={{position:'absolute', right:5, top:-3, padding:9}}
              >
              <View 
                // style={{position:'absolute', right:20, top:11,}}
                >
                <Icon
                  name='magnifying-glass'
                  type='entypo'
                  size={22}
                  color='#acacac'/>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end'}}>
            <Icon
              name='shopping-cart'
              type='feather'
              size={30}
              color='#acacac'/>
          </View>
        </View>
      </View>,
  };

  _handleResponse = (response) => {
    if(response) {
      //// navigate
      this.props.navigation.navigate(
        'SearchResults', { list: response.activityList}
      )
    } else {
      this.setState({ message: 'Location not recognized!'})
    }
  }

  _executeRequest = (path) => {
    this.setState({ isLoading: true });
    let request = {path, requiredAuthLevel: AUTH_LEVEL.Guest}
    fetchTravoramaApi(request).then(response => {
      this.setState({ isLoading: false });
      this._handleResponse(response);
    }).catch(error => {
      this.setState({
        isLoading: false,
        message: 'Something bad happened :\n'+ error
      });
      console.log(error);
    });
  };

  _onSearchPressed = () => {
    console.log('aa')
    this.setState({ message: '', isLoading:true });
    const path = getQueryPath('place_name', this.state.searchString, 1);
    this._executeRequest(path);
  };

  //// Bind <TextInput> searchText with state searchString
  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };


  render() {
    const loadingIndicator = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    return (
      <ScrollView style={{backgroundColor:'#fff'}}>

          {/*<View style={{flexDirection:'row', marginTop:20}}>
            <View style={{flex:1, padding:10, borderColor:'#3adfb5', backgroundColor:'#3adfb5', borderRadius:5, borderWidth:2, flexDirection:'row', justifyContent:'center'}}>
              <View>
                <Icon
                name='md-pin'
                type='ionicon'
                size={20}
                color='#fff'/>
              </View>
              <View style={{marginLeft:5}}>
                <Text style={{color:'#fff', fontSize:18,}}>Activity</Text>
              </View>
            </View>
            <View style={{flex:1, padding:10, borderColor:'#3adfb5', backgroundColor:'#fff', borderRadius:5, borderWidth:2, flexDirection:'row', justifyContent:'center', marginLeft:10, marginRight:10,}}>
              <View>
                <Icon
                name='flight'
                type='materialicon'
                size={20}
                color='#3adfb5'/>
              </View>
              <View style={{marginLeft:5}}>
                <Text style={{color:'#acacac', fontSize:18, }}>Flight</Text>
              </View>
            </View>
            <View style={{flex:1, padding:10, borderColor:'#3adfb5', backgroundColor:'#fff', borderRadius:5, borderWidth:2, flexDirection:'row', justifyContent:'center'}}>
              <View>
                <Icon
                name='hotel'
                type='materialicons'
                size={20}
                color='#3adfb5'/>
              </View>
              <View style={{marginLeft:5}}>
                <Text style={{color:'#acacac', fontSize:18,}}>Hotel</Text>
              </View>
            </View>
          </View> */} 

        <View style={styles.container}>
          <View 
            //style={{marginTop:40}}
          >
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Text style={styles.categoryTitle}>Top View</Text>
              </View>
              <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Text style={styles.seeMore}>See More</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:300, marginLeft:15,}}>
              <Image style={styles.thumbnailBig} source={require('../assets/images/detailimg2.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4.5}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi with Chef Hanzo
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite'
                  type='materialicons'
                  size={28}
                  color='#ff0d4a'/>
                </View>
              </View>
            </View>
            <View style={{width:300, marginLeft:15}}>
              <Image style={styles.thumbnailBig} source={require('../assets/images/detailimg3.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4.5}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi with Chef Hanzo
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={28}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={{width:300, marginLeft:15, marginRight:15}}>
              <Image style={styles.thumbnailBig} source={require('../assets/images/detailimg.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4.5}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi with Chef Hanzo
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={28}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.container}>
          <View style={{marginTop:30}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Text style={styles.categoryTitle}>Water Sport</Text>
              </View>
              <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Text style={styles.seeMore}>See More</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:160, marginLeft:15,}}>
              <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img1.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={28}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={{width:160, marginLeft:15}}>
              <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img2.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={28}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={{width:160, marginLeft:15, marginRight:15}}>
              <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img3.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={28}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.container}>
          <View style={{marginTop:30}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Text style={styles.categoryTitle}>City Tour</Text>
              </View>
              <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Text style={styles.seeMore}>See More</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:160, marginLeft:15,}}>
              <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img1.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={28}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={{width:160, marginLeft:15}}>
              <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img2.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={28}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={{width:160, marginLeft:15, marginRight:15}}>
              <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img3.jpg')}/>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, marginTop:34}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={28}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        <View style={styles.container}>
          <View style={{marginTop:30}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Text style={styles.categoryTitle}>Places</Text>
              </View>
              <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Text style={styles.seeMore}>See More</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:160, marginLeft:15,}}>
              <View style={{backgroundColor:"#000", borderRadius:5,}}>
                <Image style={styles.thumbnailPlaces} source={require('../assets/images/yogya.jpg')}/>
              </View>
              <View style={styles.placeTitleContainer}>
                <Text style={styles.placeTitle}>Jogja</Text>
              </View>
            </View>
            <View style={{width:160, marginLeft:15,}}>
              <View style={{backgroundColor:"#000", borderRadius:5,}}>
                <Image style={styles.thumbnailPlaces} source={require('../assets/images/surabaya.jpg')}/>
              </View>
              <View style={styles.placeTitleContainer}>
                <Text style={styles.placeTitle}>Surabaya</Text>
              </View>
            </View>
            <View style={{width:160, marginLeft:15,}}>
              <View style={{backgroundColor:"#000", borderRadius:5,}}>
                <Image style={styles.thumbnailPlaces} source={require('../assets/images/bg.jpg')}/>
              </View>
              <View style={styles.placeTitleContainer}>
                <Text style={styles.placeTitle}>Hawai</Text>
              </View>
            </View>
            
          </ScrollView>
        </View>

         <View style={styles.container}>
          <View style={{marginTop:30}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:1}}>
                <Text style={styles.categoryTitle}>Promo</Text>
              </View>
              <View style={{flex:1,alignItems:'flex-end', justifyContent:'flex-end'}}>
                <Text style={styles.seeMore}>See More</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:300, marginLeft:15,}}>
              <Image style={styles.thumbnailPromo} source={require('../assets/images/promo2.jpg')}/>
            </View>
            <View style={{width:300, marginLeft:15}}>
              <Image style={styles.thumbnailPromo} source={require('../assets/images/promo3.jpg')}/>
            </View>
            <View style={{width:300, marginLeft:15, marginRight:15}}>
              <Image style={styles.thumbnailPromo} source={require('../assets/images/promo1.jpg')}/>
            </View>
          </ScrollView>
        </View>

        <View style={{paddingTop:30}}></View>

      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  placeTitleContainer: { 
    backgroundColor:'transparent',
    alignItems:'center',
    position:'absolute',
    width:'100%',
    bottom:15
  },
  placeTitle: {
    color:'#fff', 
    fontWeight:'bold', 
    fontSize:20
  },
  thumbnailBig: {
    resizeMode:'cover', 
    width:300, 
    height:200, 
    borderRadius:5,
  },
  thumbnailPromo: {
    resizeMode:'cover', 
    width:300, 
    height:150, 
    borderRadius:5,
  },
  thumbnailMedium: {
    resizeMode:'cover', 
    width:160, 
    height:180, 
    borderRadius:5,
  },
  thumbnailPlaces: {
    resizeMode:'cover', 
    width:160, 
    height:180, 
    borderRadius:5,
    opacity: 0.7
  },
  activityTitle: {
    fontWeight:'bold',
    fontSize:18,
    color:'#454545',
  },
  priceTitle: {
    fontSize:16,
    color:'#676767',
    marginTop:2
  },
  categoryTitle :{
    fontWeight:'bold',
    fontSize:24,
    color:'#454545'
  },
  seeMore :{
    fontSize:14,
    color:'#acacac'
  },
  container: {
    flex: 1,
    padding:15,
    paddingTop:25,
    backgroundColor: '#fff',
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  header: {
    paddingHorizontal:15,
    paddingVertical:5,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 35,
    paddingLeft:15,
    paddingTop:5,
    paddingBottom:5,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25,
    color: '#acacac',
    backgroundColor:'#f5f5f5',
  },
});