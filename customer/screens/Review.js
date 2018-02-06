'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import * as Formatter from '../components/Formatter';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { AUTH_LEVEL, fetchTravoramaApi, checkUserLoggedIn,
} from '../../api/Common';

export default class ReviewScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Review',
  };

  constructor (props) {
    super(props)
    this.state = {
      reviews : []
    }
  }

  componentDidMount() {
    const version = 'v1';
    const {id} = this.props.navigation.state;
    let request = {
      path: `/${version}/activities/${id}/review`,
      requiredAuthLevel: AUTH_LEVEL.Guest,
    };
    fetchTravoramaApi(request).then( response => {
      this.setState({reviews: response.reviews});
      if (!response.review) {
        console.log('REVIEW:');
        console.log(response.reviews);
      }
    }).catch(error => console.log(error));
  }

  render() {
    return (
      this.state.reviews.map(review => (
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.thumbprofile} source='{review.avatar}'/>
            <Text style={styles.reviewTitle}>{review.name} {"\n"}<Text style={styles.reviewDate}>{Formatter.dateLong(review.date)}</Text></Text>
          </View>
          <Text style={styles.isireview}>
            {review.content}
          </Text>
        </View>
      ))
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