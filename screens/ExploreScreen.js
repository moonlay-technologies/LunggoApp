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

function getQueryUrl (key, value, pageNumber) {
  const version = 'v1.0';
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  /// wisata dan kegiatan
  return 'https://api.travorama.com/'+version+'/activities?'+querystring;
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
    // header: null,
    title: 'Explore',
  };

  _handleResponse = (response) => {
    this.setState({ isLoading: false })
    if(response) {
      //// navigate
      this.props.navigation.navigate(
        'SearchResults', { list: response}
      )
    } else {
      this.setState({ message: 'Location not recognized!'})
    }
  }

  _executeQuery = (query) => {
    // this.setState({ isLoading: true });
    // fetch(query)
    //   .then(response => response.json())
    //   .then(json => json.response)
    //   // .then(json => this._handleResponse(json.response))
    //   .catch(error => { 
    //     this.setState({
    //       isLoading: false,
    //       message: 'Something bad happened :\n'+ error
    //     })
    //     return false;
    //   });
    return [
      {
        "title" : "Grand Indonesia Mall",
        "url" : "grand-indonesia-mall",
        "src" : "grand-indonesia.png",
        "area" : "Seminyak",
        "city" :"Bali",
        "type" : "Shopping Mall",
        "price" : 1100000,
        "discountPrice" : 100000,
        "priceDetail" : "Inclusive of taxes",
        "rating" : 8.9,
        "reviewer" : 210
      },
      // {
      //    ....dst
      // }
    ];
  };

  _onSearchPressed = () => {
    this.setState({ message: '' });
    const query = getQueryUrl('place_name', this.state.searchString, 1);
    var result = this._executeQuery(query);
    if (result) this._handleResponse(result);
  };

  //// Bind <TextInput> searchText with state searchString
  _onSearchTextChanged = (event) => {
    this.setState({ searchString: event.nativeEvent.text });
  };

  render() {
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={ __DEV__ ?
                require('../assets/images/robot-dev.png') :
                require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>

            <Text style={styles.getStartedText}>
              Get started by opening
            </Text>
            <View
              style={[
                styles.codeHighlightContainer,
                styles.homeScreenFilename,
              ]}>
              <MonoText style={styles.codeHighlightText}>
                screens/HomeScreen.js
              </MonoText>
            </View>

            <Text style={styles.getStartedText}>
              LOREM IPSUM DOLOR SIT AMEN
            </Text>

          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this._handleHelpPress}
              style={styles.helpLink}>
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>
        

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

        <View style={styles.tabBarInfoContainer}>
          
        </View>
      </View>
    );
  }

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
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
