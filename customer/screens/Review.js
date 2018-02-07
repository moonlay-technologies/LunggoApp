'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class LoginScreen extends Component<{}> {
  
  static navigationOptions = {
    title: 'Review',
  };

  render() {
    return (
      <View style={styles.container}>

        <View>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.thumbprofile} source={require('../assets/images/poto-profile.jpg')}/>
            <Text style={styles.reviewTitle}>Jane Doe {"\n"}<Text style={styles.reviewDate}>3 maret 2017</Text></Text>
          </View>
          <Text style={styles.isireview}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.thumbprofile} source={require('../assets/images/poto-profile.jpg')}/>
            <Text style={styles.reviewTitle}>Jane Doe {"\n"}<Text style={styles.reviewDate}>3 maret 2017</Text></Text>
          </View>
          <Text style={styles.isireview}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.thumbprofile} source={require('../assets/images/poto-profile.jpg')}/>
            <Text style={styles.reviewTitle}>Jane Doe {"\n"}<Text style={styles.reviewDate}>3 maret 2017</Text></Text>
          </View>
          <Text style={styles.isireview}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.thumbprofile} source={require('../assets/images/poto-profile.jpg')}/>
            <Text style={styles.reviewTitle}>Jane Doe {"\n"}<Text style={styles.reviewDate}>3 maret 2017</Text></Text>
          </View>
          <Text style={styles.isireview}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex:1,
  },
  reviewTitle: {
    fontSize:16,
    color:'#454545',
  },
  reviewreply: {
    marginLeft:20,
    marginTop:25,
  },
   thumbprofile: {
    height: 30,
    width:30,
    borderRadius: 15,
    marginRight: 10,
  },
  hyperlink: {
    fontSize:11,
    marginTop:5,
    color:'#437ef7',
  },
  isireview: {
    fontSize:13,
    marginTop:10,
    color:'#454545',
  },
  reviewDate: {
    fontSize:12,
    color:'#cecece'
  },
});
