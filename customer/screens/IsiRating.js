'use strict';

import React, { Component } from 'react';
import Button from 'react-native-button';
import { Rating, Icon } from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class LoginScreen extends Component<{}> {
  
  static navigationOptions = {
    title: 'Rating',
  };

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
        <View style={styles.containerReview}>
          <View >
            <View style={{marginBottom:40}}>
              <Text style={styles.activityTitleBig}>Thank you</Text>
            </View>
            <View>
              <Text style={styles.activityDesc}>Plan steps for world domination fooled again thinking the dog likes me flop over?</Text>
            </View>
            <View style={{alignItems:'center', marginTop:20}}>
              <StarRating
                disabled={false}
                maxStars={5}
                starColor={'#f2a609'}
                emptyStarColor={'#f2a609'}
                starSize={35}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
          </View>
        </View>
          <TouchableOpacity style={styles.containerSubmit} onPress={() => navigate('IsiReview')}>
            <Text style={{color:'#fff', fontWeight:'bold'}}>Continue</Text>
          </TouchableOpacity>
      </View>

      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    flex:1,
    backgroundColor:'#f7f9fc', 
  },
  containerSubmit:{
    backgroundColor:'#23d3c3',
    paddingVertical:20,
    alignItems:'center',
    position:'absolute',
    bottom:0,
    width:'111%'
  },
  containerReview: {
    backgroundColor:'#fff',
    paddingVertical:40,
    paddingHorizontal:20,
    marginBottom:20,
    borderRadius:3,
    marginTop:70,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 6,
        shadowOpacity: 0.1
      },
      android: {
        elevation: 2 ,
      },
    }),
  },
  activityTitleBig: {
    fontFamily: 'Hind',
    fontSize:30,
    color:'#454545',
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight:16,
        paddingTop: 24,
        marginBottom:-30,
      },
      android: {
        lineHeight:36
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
    activityDesc: {
    fontSize:17,
    color:'#454545',
    fontFamily: 'Hind',
    textAlign:'center',
    ...Platform.select({
      ios: {
        lineHeight:15*0.8,
        paddingTop: 10,
        marginBottom:-10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
});
