'use strict';

import React, { Component } from 'react';
import { Image, Platform, ScrollView, Text, TouchableOpacity, View,
  Button, TextInput, StyleSheet } from 'react-native';
import SearchHeader from './SearchActivity/SearchHeader';
import { Icon } from 'react-native-elements';
import WishButton from '../components/WishButton';
import search from './SearchActivity/SearchController';
import * as Formatter from '../components/Formatter';

export default class ExploreScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      tiketList: [],
      paketList: [],
      tripList: [],
      turList: [],
    };
  }

  static navigationOptions = {
    title: 'Jelajah',
    header: (props) => <SearchHeader {...props} />
  };

  _refreshContents = () => {
    search('tiket').then( tiketList => this.setState({tiketList}));
    search('paket').then( paketList => this.setState({paketList}));
    search('trip').then( tripList => this.setState({tripList}));
    search('tur').then( turList => this.setState({turList}));
  }

  componentDidMount() {
    this._refreshContents();
  }

  componentWillReceiveProps({navigation}) {
    if (navigation.state.params.shouldRefresh) {
      this._refreshContents();
    }
  }

  _goTo = (screen, params) =>
    this.props.navigation.navigate(screen, params);

  _onPressProduct = item => this._goTo('DetailScreen', {details:item});
  _onPressCategory = str => this._goTo('SearchActivity', {searchString: str});

  render() {
    console.log('rendering ExploreScreen')
    let categoryHeader = ({title,searchUrl}) =>
      <View style={[styles.container,{flexDirection:'row',}]}>
        <Text style={[{flex:2},styles.categoryTitle]}>{title}</Text>
        <TouchableOpacity style={{flex:1,alignItems:'flex-end'}}
          onPress={() => this._onPressCategory(searchUrl)} >
          <Text style={styles.seeMore}>Lihat Semua</Text>
        </TouchableOpacity>
      </View>

    let categoryContent = (list, big=false) => {
      return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}
          style={{marginBottom:20, height:'100%'}} >

          {list.map( listItem =>
            <TouchableOpacity key={listItem.id}
              style={{width:big?300:140, marginLeft:15,}}
              activeOpacity={1}
              onPress={() => this._onPressProduct(listItem.id)}
            >
              <TouchableOpacity activeOpacity={1}
                onPress={() => this._onPressProduct(listItem)}
              >
                <Image
                  style={big?styles.thumbnailBig:styles.thumbnailMedium}
                  source={{uri:listItem.mediaSrc}}
                />
              </TouchableOpacity>
              <View style={{marginTop:big?10:5, flexDirection:'row'}}>
                <View style={{flex:big?4.5:4}}>
                  <Text style={big? styles.namaKotaBig : styles.namaKota}>
                    {listItem.city}
                  </Text>
                  <Text style={big? styles.activityTitleBig : styles.activityTitle }>
                    {listItem.name}
                  </Text>
                  <Text style={big? styles.priceTitleBig : styles.priceTitle }>
                    {Formatter.price(listItem.price)}
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <WishButton wishlisted={listItem.wishlisted}
                    id={listItem.id} big={big} {...this.props} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </ScrollView>
      );
    }

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
        {categoryContent(this.state.tiketList, true)}

        {categoryHeader({title:'Paket', searchUrl:'paket'})}
        {categoryContent(this.state.paketList)}

        {categoryHeader({title:'Trip', searchUrl:'trip'})}
        {categoryContent(this.state.tripList)}

        {categoryHeader({title:'Tur Keliling Kota', searchUrl:'tur'})}
        {categoryContent(this.state.turList)}

        <View style={styles.container}>
          <View style={{marginTop:10}}>
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
        marginBottom:-2

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
    fontSize:20,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:12,
        paddingTop: 14,
        marginBottom:-13,
      },
      android: {
        lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityTitle: {
    fontSize:15,
    color:'#454545',
    fontFamily: 'Hind-Bold',
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
    color:'#454545',
  },
  seeMore :{
    fontSize:14,
    color:'#acacac',
    marginTop:5,
    fontFamily: 'Hind'
  },
  container: {
    // flex: 1,
    padding:15,
    backgroundColor: '#fff',
  },
});