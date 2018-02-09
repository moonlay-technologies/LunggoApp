'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import { Rating, Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import SvgUri from 'react-native-svg-uri';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class LoginScreen extends Component<{}> {
  
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

  render() {
    let {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>

        <Image width="70" height="70" source={require('../assets/images/loader1.gif')}/>

       {/* <SvgUri 
          width="200" 
          height="200" 
          source={{uri:'https://svgshare.com/i/5Ss.svg'}}
        />*/}

      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  },
});
