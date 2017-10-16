'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

export default class LoginScreen extends Component<{}> {
  render() {
    return (
      //<Image style={styles.detailimg}source={require('../assets/images/detailimg.jpg')}/>
      <ScrollView>  
        <ImageSlider height={350} images={[
          require('../assets/images/detailimg.jpg'),
          require('../assets/images/detailimg.jpg'),
          require('../assets/images/detailimg.jpg')
        ]}/>
        <View style={styles.container}>
          <Text style={styles.titleActivity}>
            Tour Title 1 
          </Text>
          <Text style={styles.locationActivity}>
            Location | Activity small description 
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image style={styles.icon}source={require('../assets/icons/time.png')}/>
            <Text style={styles.timeActivity}>
              5 hari 
            </Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image style={styles.icon}source={require('../assets/icons/person.png')}/>
            <Text style={styles.timeActivity}>
              20 orang 
            </Text>
          </View>
          <View style={styles.border}/>
          <Text style={styles.titledescriptionActivity}>
            Tour Description 
          </Text>
          <Text style={styles.descriptionActivity}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={styles.titledescriptionActivity}>
            Highlights
          </Text>
          <Text style={styles.descriptionActivity}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
            cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
  },
  icon: {
    width:15,
    height:15,
    marginRight:5,
  },
  titledescriptionActivity: {
    fontWeight: 'bold',
    fontSize:16,
    marginBottom: 7,
  },
  descriptionActivity: {
    fontSize:11,
    marginBottom: 18,
    lineHeight: 15,
  },
  border: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
    marginTop: 15,
    marginBottom: 15,
  },
  titleActivity: {
    fontWeight: 'bold',
    fontSize:20,
    marginBottom: 7,
  },
  locationActivity: {
    fontSize:12,
    marginBottom: 5,
  },
  timeActivity: {
    fontSize:12,
    marginBottom: 5,
  },
  detailimg: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
});
