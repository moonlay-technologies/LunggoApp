'use strict';

import React, { Component } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View,
  Button, TextInput, StyleSheet } from 'react-native';
import SearchHeader from '../components/SearchHeader';
import { Icon } from 'react-native-elements';

export default class ExploreScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      message: '',
    };
  }

  static navigationOptions = {
    header: (props) => <SearchHeader {...props}/>
  };

  _goTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  _onPressProduct = id => this._goTo('DetailScreen', {id});
  _onPressCategory = str => this._goTo('SearchResults', {searchString: str});

  render() {

    let categoryHeader = ({title,searchUrl}) =>
      <View style={[styles.container,{marginTop:30,flexDirection:'row'}]}>
        <View style={{flex:2}}>
          <Text style={styles.categoryTitle}>{title}</Text>
        </View>
        <TouchableOpacity style={{flex:1,alignItems:'flex-end'}}
          onPress={() => this._onPressCategory(searchUrl)} >
          <Text style={styles.seeMore}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>


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

        {categoryHeader({title:'Tiket', searchUrl:'tiket'})}

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:300, marginLeft:15,}}>
              <TouchableOpacity 
                activeOpacity={1}
                onPress={() => this._onPressProduct(1)}
              >
                <Image
                  style={styles.thumbnailBig}
                  source={require('../../assets/images/detailimg2.jpg')}
                />
              </TouchableOpacity>
              <View style={{marginTop:10, flexDirection:'row'}}>
                <View style={{flex:4.5}}>
                  <Text style={styles.namaKotaBig}>
                    Jepang
                  </Text>
                  <Text style={styles.activityTitleBig}>
                    Create your own Sushi with Chef Hanzo
                  </Text>
                  <Text style={styles.priceTitleBig}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <Icon
                  name='favorite'
                  type='materialicons'
                  size={30}
                  color='#ff5f5f'/>
                </View>
              </View>
            </View>
            <View style={{width:300, marginLeft:15}}>
              <TouchableOpacity 
                activeOpacity={1}
                onPress={() => this._onPressProduct(1)}
              >
                <Image style={styles.thumbnailBig} source={require('../../assets/images/detailimg3.jpg')}/>
              </TouchableOpacity>
              <View style={{marginTop:10, flexDirection:'row'}}>
                <View style={{flex:4.5}}>
                  <Text style={styles.namaKotaBig}>
                    Jepang
                  </Text>
                  <Text style={styles.activityTitleBig}>
                    Create your own Sushi with Chef Hanzo
                  </Text>
                  <Text style={styles.priceTitleBig}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={30}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={{width:300, marginLeft:15, marginRight:15}}>
              <TouchableOpacity 
                activeOpacity={1}
                onPress={() => this._onPressProduct(1)}
              >
                <Image style={styles.thumbnailBig} source={require('../../assets/images/detailimg.jpg')}/>
              </TouchableOpacity>
              <View style={{marginTop:10, flexDirection:'row'}}>
                <View style={{flex:4.5}}>
                  <Text style={styles.namaKotaBig}>
                    Jepang
                  </Text>
                  <Text style={styles.activityTitleBig}>
                    Create your own Sushi with Chef Hanzo
                  </Text>
                  <Text style={styles.priceTitleBig}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={30}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {categoryHeader({title:'Paket', searchUrl:'paket'})}

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:140, marginLeft:15,}}>
              <TouchableOpacity onPress={() => this._onPressProduct(1)}>
                <Image style={styles.thumbnailMedium} source={require('../../assets/images/other-img1.jpg')}/>
              </TouchableOpacity>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.namaKota}>
                    Jepang
                  </Text>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={24}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={{width:140, marginLeft:15}}>
              <TouchableOpacity onPress={() => this._onPressProduct(1)}>
                <Image style={styles.thumbnailMedium} source={require('../../assets/images/other-img2.jpg')}/>
              </TouchableOpacity>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.namaKota}>
                    Jepang
                  </Text>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={24}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
            <View style={{width:140, marginLeft:15, marginRight:15}}>
              <TouchableOpacity onPress={() => this._onPressProduct(1)}>
                <Image style={styles.thumbnailMedium} source={require('../../assets/images/other-img3.jpg')}/>
              </TouchableOpacity>
              <View style={{marginTop:5, flexDirection:'row'}}>
                <View style={{flex:4}}>
                  <Text style={styles.namaKota}>
                    Jepang
                  </Text>
                  <Text style={styles.activityTitle}>
                    Create your own Sushi
                  </Text>
                  <Text style={styles.priceTitle}>
                    IDR 300.000
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <Icon
                  name='favorite-border'
                  type='materialicons'
                  size={24}
                  color='#cdcdcd'/>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {categoryHeader({title:'Trip', searchUrl:'trip'})}


        {categoryHeader({title:'Tur Keliling Kota', searchUrl:'tur'})}

        <View style={styles.container}>
          <View style={{marginTop:30}}>
            <View style={{flexDirection:'row'}}>
              <View style={{flex:2}}>
                <Text style={styles.categoryTitle}>Lokasi Populer</Text>
              </View>
              <View style={{flex:1,alignItems:'flex-end'}}>
                <Text style={styles.seeMore}>Lihat Semua</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:140, marginLeft:15,}}>
              <View style={{backgroundColor:"#000", borderRadius:5,}}>
                <TouchableOpacity onPress={() => this._onPressProduct(1)}>
                  <Image style={styles.thumbnailPlaces} source={require('../../assets/images/yogya.jpg')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.placeTitleContainer}>
                <Text style={styles.placeTitle}>Jogja</Text>
              </View>
            </View>
            <View style={{width:140, marginLeft:15,}}>
              <View style={{backgroundColor:"#000", borderRadius:5,}}>
                <TouchableOpacity onPress={() => this._onPressProduct(1)}>
                  <Image style={styles.thumbnailPlaces} source={require('../../assets/images/surabaya.jpg')}/>
                </TouchableOpacity>
              </View>
              <View style={styles.placeTitleContainer}>
                <Text style={styles.placeTitle}>Surabaya</Text>
              </View>
            </View>
            <View style={{width:140, marginLeft:15,}}>
              <View style={{backgroundColor:"#000", borderRadius:5,}}>
                <TouchableOpacity onPress={() => this._onPressProduct(1)}>
                  <Image style={styles.thumbnailPlaces} source={require('../../assets/images/bg.jpg')}/>
                </TouchableOpacity>
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
              <View style={{flex:1,alignItems:'flex-end',}}>
                <Text style={styles.seeMore}>Lihat Semua</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:10}}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={{width:300, marginLeft:15,}}>
              <Image style={styles.thumbnailPromo} source={require('../../assets/images/promo2.jpg')}/>
            </View>
            <View style={{width:300, marginLeft:15}}>
              <Image style={styles.thumbnailPromo} source={require('../../assets/images/promo3.jpg')}/>
            </View>
            <View style={{width:300, marginLeft:15, marginRight:15}}>
              <Image style={styles.thumbnailPromo} source={require('../../assets/images/promo1.jpg')}/>
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
    fontSize:16
  },
  namaKota: {
    fontSize:12,
    color:'#454545',
    marginVertical:3,
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        lineHeight:6,
        paddingTop: 14,
        marginBottom:-4,
        //backgroundColor:'red'
      },
      android: {
        lineHeight:18,
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  namaKotaBig: {
    fontSize:14,
    color:'#454545',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        lineHeight:6,
        paddingTop: 14,
        marginBottom:-4,
        //backgroundColor:'red'
      },
      android: {
        lineHeight:18,
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityTitleBig: {
    fontFamily: 'Hind-Bold',
    fontSize:19,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop: 14,
        marginBottom:-13,
        //backgroundColor:'red'
      },
      android: {
        lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityTitle: {
    fontFamily: 'Hind-Bold',
    fontSize:15,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:10,
        paddingTop: 10,
        marginBottom:-12,
       //backgroundColor:'red'
      },
      android: {
        lineHeight:20,
        //paddingTop: 23 - (23* 1),
        

      },
    }),
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
    width:140, 
    height:150, 
    borderRadius:5,
  },
  thumbnailPlaces: {
    resizeMode:'cover', 
    width:140, 
    height:150, 
    borderRadius:5,
    opacity: 0.7
  },
  priceTitle: {
    fontSize:13,
    color:'#676767',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
      //backgroundColor:'red'
      },
      android: {
        marginTop:1

      },
    }),
  },
  priceTitleBig: {
    fontSize:15,
    color:'#676767',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
      //backgroundColor:'red'
      },
      android: {
        marginTop:3

      },
    }),
  },
  categoryTitle :{
    fontFamily: 'Hind-Bold',
    fontSize:22,
    color:'#454545'
  },
  seeMore :{
    fontSize:14,
    color:'#acacac',
    marginTop:3,
    fontFamily: 'Hind'
  },
  container: {
    flex: 1,
    padding:15,
    paddingTop:20,
    backgroundColor: '#fff',
  },
});