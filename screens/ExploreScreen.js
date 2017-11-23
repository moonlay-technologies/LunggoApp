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
  TouchableNativeFeedback,
  StyleSheet
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { Icon } from 'react-native-elements'

function getQueryUrl (key, value, pageNumber) {
  const domain = 'http://travorama-local-api.azurewebsites.net';
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
  return `${domain}/${version}/activities?${querystring}`;
  //+'?searchActivityType=ActivityName&name=tiket&page=1&perPage=10&date=180217';
}

export default class ExploreScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      searchString: 'Search..',
      isLoading: false,
      message: ''
    };
  }

  static navigationOptions = {
    title: 'Explore',
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

  _executeQuery = (query) => {
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(response => {
        this.setState({ isLoading: false });
        this._handleResponse(response);
        // console.log(response)
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          message: 'Something bad happened :\n'+ error
        })
      });
    // return [
    //   {
    //     "title" : "Gili Island Snorkeling Day Trip",
    //     "url" : "https://www.tripadvisor.com/AttractionProductDetail-g297733-d11457788-Gili_Island_Snorkeling_Day_Trip-Lombok_West_Nusa_Tenggara.html",
    //     "src" : "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/7980/SITours/gili-island-snorkeling-day-trip-in-mataram-211397.jpg",
    //     "area" : "Gili Island",
    //     "city" :"Lombok",
    //     "type" : "Snorkeling",
    //     "price" : 1014000,
    //     // "discountPrice" : 100000,
    //     "priceDetail" : "Inclusive of taxes",
    //     "rating" : 5.0,
    //     "reviewer" : 2
    //     // "otherDetails" : "3 other travelers have booked this activity in the past 30 days."
    //   },
    //   {
    //     "title" : "3-Day Mt Rinjani Volcano Trekking Tour from Lombok",
    //     "url" : "https://www.tripadvisor.com/AttractionProductDetail-g297733-d11988509-3_Day_Mt_Rinjani_Volcano_Trekking_Tour_from_Lombok-Lombok_West_Nusa_Tenggara.html",
    //     "src" : "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/28798/SITours/3-day-mt-rinjani-volcano-trekking-tour-from-lombok-in-mataram-285702.jpg",
    //     "area" : "Mt Rinjani",
    //     "city" :"Lombok",
    //     "type" : "Trekking",
    //     "price" : 4189000,
    //     "priceDetail" : "Inclusive of taxes",
    //     "rating" : 0,
    //     "reviewer" : 0
    //   },
    //   {
    //     "title" : "Private Tour: Amazing Waterfalls of Lombok",
    //     "url" : "https://www.tripadvisor.com/AttractionProductDetail?product=26391P4&d=1723009&aidSuffix=tvrm&partner=Viator",
    //     "src" : "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/26391/SITours/private-tour-amazing-waterfalls-of-lombok-in-lombok-284920.jpg",
    //     "area" : "Sendang Gile",
    //     "city" :"Lombok",
    //     "type" : "Tour",
    //     "price" : 973000,
    //     "priceDetail" : "Inclusive of taxes",
    //     "rating" : 1,
    //     "reviewer" : 1
    //   },
    //   {
    //     "title" : "Gili Island Snorkeling Day Trip",
    //     "url" : "https://www.tripadvisor.com/AttractionProductDetail-g297733-d11457788-Gili_Island_Snorkeling_Day_Trip-Lombok_West_Nusa_Tenggara.html",
    //     "src" : "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/7980/SITours/gili-island-snorkeling-day-trip-in-mataram-211397.jpg",
    //     "area" : "Gili Island",
    //     "city" :"Lombok",
    //     "type" : "Snorkeling",
    //     "price" : 1014000,
    //     // "discountPrice" : 100000,
    //     "priceDetail" : "Inclusive of taxes",
    //     "rating" : 5.0,
    //     "reviewer" : 2
    //     // "otherDetails" : "3 other travelers have booked this activity in the past 30 days."
    //   },
    //   {
    //     "title" : "3-Day Mt Rinjani Volcano Trekking Tour from Lombok",
    //     "url" : "https://www.tripadvisor.com/AttractionProductDetail-g297733-d11988509-3_Day_Mt_Rinjani_Volcano_Trekking_Tour_from_Lombok-Lombok_West_Nusa_Tenggara.html",
    //     "src" : "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/28798/SITours/3-day-mt-rinjani-volcano-trekking-tour-from-lombok-in-mataram-285702.jpg",
    //     "area" : "Mt Rinjani",
    //     "city" :"Lombok",
    //     "type" : "Trekking",
    //     "price" : 4189000,
    //     "priceDetail" : "Inclusive of taxes",
    //     "rating" : 0,
    //     "reviewer" : 0
    //   },
    //   {
    //     "title" : "Private Tour: Amazing Waterfalls of Lombok",
    //     "url" : "https://www.tripadvisor.com/AttractionProductDetail?product=26391P4&d=1723009&aidSuffix=tvrm&partner=Viator",
    //     "src" : "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/26391/SITours/private-tour-amazing-waterfalls-of-lombok-in-lombok-284920.jpg",
    //     "area" : "Sendang Gile",
    //     "city" :"Lombok",
    //     "type" : "Tour",
    //     "price" : 973000,
    //     "priceDetail" : "Inclusive of taxes",
    //     "rating" : 1,
    //     "reviewer" : 1
    //   },
    //   {
    //     "title" : "Private Tour: Amazing Waterfalls of Lombok",
    //     "url" : "https://www.tripadvisor.com/AttractionProductDetail?product=26391P4&d=1723009&aidSuffix=tvrm&partner=Viator",
    //     "src" : "https://cache-graphicslib.viator.com/graphicslib/thumbs674x446/26391/SITours/private-tour-amazing-waterfalls-of-lombok-in-lombok-284920.jpg",
    //     "area" : "Sendang Gile",
    //     "city" :"Lombok",
    //     "type" : "Tour",
    //     "price" : 973000,
    //     "priceDetail" : "Inclusive of taxes",
    //     "rating" : 1,
    //     "reviewer" : 1
    //   },
    // ];
  };

  _onSearchPressed = () => {
    this.setState({ message: '', isLoading:true });
    const query = getQueryUrl('place_name', this.state.searchString, 1);
    this._executeQuery(query);
    // var result = this._executeQuery(query);
    // if (result) this._handleResponse(result);
  };

  //// Bind <TextInput> searchText with state searchString
  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };

  render() {
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    // const searchButton = Platform.OS === 'ios' ? 
    //     <Button
    //       onPress={this._onSearchPressed}
    //       color='#48BBEC'
    //       title='Search'
    //     />
    //   : <TouchableNativeFeedback
    //       onPress={this._onSearchPressed}
    //       color='#48BBEC'
    //       title='Search'
    //     />
    return (
      <ScrollView style={{backgroundColor:'#fff'}}>
        <View style={styles.container}>
          <View style={styles.flowRight}>
            <View style={{flex:6}}>
              <TextInput
                style={styles.searchInput}
                value={this.state.searchString}
                onChange={this._onSearchTextChanged}
                onSubmitEditing={this._onSearchPressed}
                placeholder='Search via name or postcode'
                returnKeyType='search'
                underlineColorAndroid='transparent'
                selectTextOnFocus={true}
              />
              <View style={{position:'absolute', right:20, top:11,}}>
                <Icon
                  name='magnifying-glass'
                  type='entypo'
                  size={22}
                  color='#acacac'/>
              </View>
            </View>

            <View style={{flex:1, justifyContent:'flex-end', alignItems:'flex-end'}}>
              <Icon
                name='shopping-cart'
                type='feather'
                size={30}
                color='#acacac'/>
            </View>
          </View>

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

          <View style={{marginTop:40}}>
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
  searchInput: {
    height: 45,
    paddingLeft:15,
    paddingTop:10,
    paddingBottom:10,
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