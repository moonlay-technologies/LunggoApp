'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import Panel from '../components/Panel';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ScrollView,
} from 'react-native';
import MapView from 'react-native-maps';

export default class DetailScreen extends Component<{}> {

  static navigationOptions = {
    title: 'Tour Title 1',
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

          <View style={styles.containerdescriptionActivity}>
            <Text style={styles.titledescriptionActivity}>
              Tour Description 
            </Text>
            <Text style={styles.descriptionActivity}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
              cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>{/* end containerdescriptionActivity */}

          <View style={styles.containerdescriptionActivity}>
            <Text style={styles.titledescriptionActivity}>
              Highlights
            </Text>
            <View style={styles.ul}>
              <Text style={styles.li}>
                &#5867;
              </Text>
              <Text style={styles.lidescriptionActivity}>
                Full-day quad biking and rafting adventure tour from Denpasar
              </Text>
            </View>
            <View style={styles.ul}>
              <Text style={styles.li}>
                &#5867;
              </Text>
              <Text style={styles.lidescriptionActivity}>
                Full-day quad biking and rafting adventure tour from Denpasar
              </Text>
            </View>
          </View>{/* end containerdescriptionActivity */}

          <View style={styles.containerdescriptionActivity}>
            <Text style={styles.titledescriptionActivity}>
              Price Included
            </Text>
            <View style={styles.ul}>
              <Text style={styles.li}>
                &#5867;
              </Text>
              <Text style={styles.lidescriptionActivity}>
                Full-day quad biking and rafting adventure tour from Denpasar
              </Text>
            </View>
            <View style={styles.ul}>
              <Text style={styles.li}>
                &#5867;
              </Text>
              <Text style={styles.lidescriptionActivity}>
                Full-day quad biking and rafting adventure tour from Denpasar
              </Text>
            </View>
          </View>{/* end containerdescriptionActivity */}

          <MapView
            style={{width:"100%", height:"10%"}}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <Text>
          {/*style={styles.titledescriptionActivity}>*/}
            Jl. Sisingamangaraja 22
            Selong
          </Text>

          <Text style={styles.titledescriptionActivity}>
            Review
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image style={styles.thumbprofile} source={require('../assets/images/poto-profile.jpg')}/>
            <Text style={{fontWeight:'bold'}}>Jane Doe {"\n"}<Text style={{fontSize:10, fontWeight:'normal'}}>3 maret 2017</Text></Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Image style={styles.thumbimgreview} source={require('../assets/images/thumbimg1.jpg')}/>
            <Image style={styles.thumbimgreview} source={require('../assets/images/thumbimg2.jpg')}/>
            <Image style={styles.thumbimgreview} source={require('../assets/images/thumbimg1.jpg')}/>
          </View>
          <Text style={styles.isireview}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et
          </Text>
          <Text style={styles.hyperlink}>
            Baca 20 Review Lainnya
          </Text>

          <Panel title="A Panel with short content text">
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
          </Panel>
          <Panel title="A Panel with long content text">
            <Text>Lorem ipsum...</Text>
          </Panel>
          <Panel title="Another Panel">
            <Text>Lorem ipsum dolor sit amet...</Text>
          </Panel>

        </View>{/* end container */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
  },
  thumbimgreview: {
    width:60,
    height:50,
    marginRight:5,
    marginTop:10,
  },
  hyperlink: {
    fontSize:11,
    marginTop:8,
    color:'#437ef7',
    textDecorationLine: 'underline'
  },
  isireview: {
    fontSize:11,
    marginTop:10,
  },
  thumbprofile: {
    height: 30,
    width:30,
    borderRadius: 15,
    marginRight: 10,
  },
  ul: {
    flex: 1, 
    flexDirection: 'row',
    marginLeft: 10,
  },
  li: {
    fontSize:11,
    marginRight:8
  },
  icon: {
    width:15,
    height:15,
    marginRight:5,
  },
  containerdescriptionActivity: {
    marginBottom: 18,
  },
  titledescriptionActivity: {
    fontWeight: 'bold',
    fontSize:16,
    marginBottom: 7,
  },
  descriptionActivity: {
    fontSize:11,
    lineHeight: 15,
  },
  lidescriptionActivity: {
    fontSize:11,
    marginBottom: 2,
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
