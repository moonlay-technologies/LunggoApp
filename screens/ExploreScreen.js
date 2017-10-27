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
      searchString: 'london',
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this._onSearchTextChanged}
            onSubmitEditing={this._onSearchPressed}
            placeholder='Search via name or postcode'
            returnKeyType='search'
            selectTextOnFocus={true}
          />
          {/*searchButton*/}
          <Button
            onPress={this._onSearchPressed}
            color='#48BBEC'
            title='Search'
          />
        </View>
        {spinner}
        <Text>
          {this.state.message}
        </Text>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC',
  },
});