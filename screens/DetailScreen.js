'use strict';

import React, { Component } from 'react';
import ImageSlider from 'react-native-image-slider';
import Accordion from '../components/Accordion';
import MapView, { Marker } from 'react-native-maps';
import Button from 'react-native-button';
import LikeShareHeaderButton from '../components/LikeShareHeaderButton';
import { Rating } from 'react-native-elements';
import { Icon } from 'react-native-elements'
import * as Formatter from '../components/Formatter';
import {
  Platform, StyleSheet,
  Text, View, Image, TextInput, ScrollView,
} from 'react-native';
import {AUTH_LEVEL, fetchTravoramaApi} from '../components/Common';

export default class DetailScreen extends Component {

  constructor (props) {
    super(props)
    const {details} = this.props.navigation.state.params || {};
    if (!details) {   //// if params.details doesnt exist,
      this.state = {  //// use default state object
        // isLoading, id
        requiredPaxData: '',
        name: 'loading activity name...',
        city: 'loading address...',
        duration: {amount: 'loading ', unit: 'duration...'},
        price: 'loading price...',
        mediaSrc: []
      }
    } else {
      details.mediaSrc = [details.mediaSrc];
      this.state = details; //// prevent error when params == undefined
    }
  }

  static navigationOptions = {
    // header: ({navigate}) => ({
    //     right: (
    //         <LikeShareHeaderButton navigate={navigate}/>
    //     ),
    // }),
    // headerTitleStyle: {color:'white'},
   // headerRight: <LikeShareHeaderButton/>,
    headerStyle: {
      backgroundColor: 'transparent',
      position: 'absolute',
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0
    },
  };

  componentDidMount() {
    const version = 'v1';
    const id = 1;
    // const {id} = this.state;
    let request = {
      path: `/${version}/activities/${id}`,
      requiredAuthLevel: AUTH_LEVEL.Guest,
    };
    fetchTravoramaApi(request).then( response => {
      this.setState(response.activityDetail);
    }).catch(error => console.log(error));
  }

  render() {
    const { requiredPaxData, isLoading, name, city, duration, price, id,
      mediaSrc } = this.state;
    return (
      <View>
        <ScrollView
          style={{backgroundColor:'#fff'}}
        >
          <View>
            <ImageSlider height={350} images={mediaSrc}/>
            <View style={{position:'absolute', top:20, right:20, flexDirection:'row'}}>
              <View style={{}}>
                <Icon
                name='share'
                type='materialicons'
                size={30}
                color='#fff'/>
              </View>
              <View style={{marginLeft:10}}>
                <Icon
                name='favorite-border'
                type='materialicons'
                size={30}
                color='#fff'/>
              </View>
            </View>
          </View>
          <View style={styles.container}>
            <View style={{marginBottom:10}}>
              <Text style={styles.activitydetailTitle}>
                { name }
              </Text>
            </View>
            <View style={{marginBottom:15}}>
              <Text style={styles.activityDesc}>
                Jump five feet high and sideways when a shadow moves hiding behind the couch 
                until lured out by a feathery toy so yowling nonstop the whole night.
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{}}>
                <Icon
                name='location'
                type='entypo'
                size={16}
                color='#454545'/>
              </View>
              <View style={{marginTop:1, marginLeft:10}}>
                <Text style={{fontSize:12}}>
                  { city }
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop:8}}>
              <View style={{}}>
                <Icon
                name='person'
                type='materialicons'
                size={16}
                color='#454545'/>
              </View>
              <View style={{marginTop:1, marginLeft:10}}>
                <Text style={{fontSize:12}}>
                  Maksimum 6 orang
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop:8}}>
              <View style={{}}>
                <Icon
                name='event'
                type='materialicons'
                size={16}
                color='#454545'/>
              </View>
              <View style={{marginTop:1, marginLeft:10}}>
                <Text style={{fontSize:12}}>
                  Khusus hari minggu
                </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', marginTop:8}}>
              <View style={{}}>
                <Icon
                name='receipt'
                type='materialicons'
                size={16}
                color='#454545'/>
              </View>
              <View style={{marginTop:1, marginLeft:10}}>
                <Text style={{fontSize:12}}>
                  Untuk usia diatas 10 tahun
                </Text>
              </View>
            </View>
            {/*<View style={{flex: 1, flexDirection: 'row'}}>
              <Image style={styles.icon} 
                source={require('../assets/icons/time.png')}
              />
              <Text style={styles.timeActivity}>
                { duration.amount +" "+ duration.unit }
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image style={styles.icon}
              source={require('../assets/icons/person.png')}/>
              <Text style={styles.timeActivity}>
                **20 orang**
              </Text>
            </View>*/}

            <View style={styles.containerdescriptionActivity}>
              <Text style={styles.sectionTitle}>
                Hal yang Perlu Diperhatikan
              </Text>
              <Text style={styles.activityDesc}>
                Eat all the power cords rub whiskers on bare skin act innocent 
                for slap kitten brother with paw. Chase mice i just saw other cats
              </Text>
            </View>{/* end containerdescriptionActivity */}

            <View style={styles.divider}></View>

            <View style={styles.containerdescriptionActivity}>
              <View style={{flexDirection:'row', flex:1}}>
                <View style={{flex:2}}>
                  <Text style={styles.reviewTitle}>
                    Amazing Experience!
                  </Text>
                </View>
                <View style={{flex:1, alignItems:'flex-end',}}>
                  <Text style={styles.reviewDate}>
                    June 2017
                  </Text>
                </View>
              </View>
              <View>
                <Rating
                  type="star"
                  fractions={1}
                  startingValue={3.6}
                  readonly
                  imageSize={12}
                  ratingColor="#00c5bc"
                  onFinishRating={this.ratingCompleted}
                  style={{ paddingTop: 2.5, marginRight:5,}}
                />
              </View>
              <View style={{marginTop:10}}>
                <Text style={styles.activityDesc}>
                  Eat all the power cords rub whiskers on bare skin act innocent 
                  for slap kitten brother with paw. Chase mice i just saw other cats
                </Text>
              </View>
            </View>{/* end containerdescriptionActivity */}

            <View style={styles.divider}></View>

            <View style={{flex:1, marginTop:15, marginBottom:15, flexDirection:'row', justifyContent:'flex-end'}}>
              <View style={{marginTop:3}}>
                <Text style={{ color:'#454545', fontSize:16,}}>
                  See all 20 reviews
                </Text>
              </View>
              <View style={{marginLeft:10,}}>
                <Icon
                name='chevron-right'
                type='entypo'
                size={24}
                color='#00c5bc'/>
              </View>
            </View>

            <View style={styles.divider}></View>

            <View style={styles.containerdescriptionActivity}>
              <MapView
                style={{width:"100%", height:150}}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                zoomEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
              >
                <Marker
                  coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                />
              </MapView>
              <View style={{marginTop:10}}>
                <Text>
                  Jl. Sisingamangaraja 22{"\n"}
                  Selong
                </Text>
              </View>

              <View style={{marginTop:30, marginBottom:30}}>
                <Text style={styles.sectionTitle}>
                  Hal yang Perlu Dibawa
                </Text>
                <Text style={styles.activityDesc}>
                  Eat all the power cords rub whiskers on bare skin act innocent 
                  for slap kitten brother with paw. Chase mice i just saw other cats
                </Text>
              </View>{/* end containerdescriptionActivity */}

              <View style={styles.divider}></View>

            </View>

            {/*<Text style={styles.sectionTitle}>
              Review
            </Text>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image
                style={styles.thumbprofile}
                source={require('../assets/images/poto-profile.jpg')}
              />
              <Text style={{fontWeight:'bold'}}>Jane Doe{"\n"}
                <Text style={{fontSize:10, fontWeight:'normal'}}>
                  3 maret 2017
                </Text>
              </Text>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <Image style={styles.reviewThumbImg}
                source={require('../assets/images/thumbimg1.jpg')}/>
              <Image style={styles.reviewThumbImg}
                source={require('../assets/images/thumbimg2.jpg')}/>
              <Image style={styles.reviewThumbImg}
                source={require('../assets/images/thumbimg1.jpg')}/>
            </View>
            <Text style={styles.isireview}>
              sit amet, consectetur aaa adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et
            </Text>
            <Text style={styles.hyperlink}>
              Baca 20 Review Lainnya
            </Text>

            <Accordion style={styles.containerdescriptionActivity}
              sections={[
              {
                title: 'Agenda',
                content: 'Lorem ipsum dolor sit amet, consectetur ',
              },
              {
                title: 'Participant Requirement',
                content: 'Lorem ipsum...',
              },
              {
                title: 'Cancelation Policy',
                content: 'Lorem ipsum...',
              },
            ]}/>*/}
            <View style={{marginTop:0}}>
              <View style={{flexDirection:'row'}}>
                <View style={{flex:1}}>
                  <Text style={styles.sectionTitle}>Similiar Activities</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end',}}>
                  <Text style={styles.seeMore}>See More</Text>
                </View>
              </View>
            </View>
            
          </View>{/* end container */}

          
          <View style={{flex: 1, flexDirection: 'row',}}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
              <View style={{width:140, marginLeft:15,}}>
                <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img1.jpg')}/>
                <View style={{marginTop:8, flexDirection:'row'}}>
                  <View style={{flex:4,}}>
                    <Text style={styles.namaKota}>
                      Jepang
                    </Text>
                    <Text style={styles.activityTitle}>
                      Create your own Sushi
                    </Text>
                    <Text style={styles.priceTitle}>
                      IDR 300.000
                    </Text>
                    <View>
                      <Rating
                        type="star"
                        fractions={1}
                        startingValue={3.6}
                        readonly
                        imageSize={11}
                        ratingColor="#00c5bc"
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingTop: 2.5, marginRight:5,}}
                      />
                    </View>
                  </View>
                  <View style={{flex:1, marginTop:0}}>
                    <Icon
                    name='favorite-border'
                    type='materialicons'
                    size={24}
                    color='#cdcdcd'/>
                  </View>
                </View>
              </View>
              <View style={{width:140, marginLeft:15,}}>
                <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img2.jpg')}/>
                <View style={{marginTop:8, flexDirection:'row'}}>
                  <View style={{flex:4,}}>
                    <Text style={styles.namaKota}>
                      Jepang
                    </Text>
                    <Text style={styles.activityTitle}>
                      Create your own Sushi
                    </Text>
                    <Text style={styles.priceTitle}>
                      IDR 300.000
                    </Text>
                    <View>
                      <Rating
                        type="star"
                        fractions={1}
                        startingValue={3.6}
                        readonly
                        imageSize={11}
                        ratingColor="#00c5bc"
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingTop: 2.5, marginRight:5,}}
                      />
                    </View>
                  </View>
                  <View style={{flex:1, marginTop:0}}>
                    <Icon
                    name='favorite-border'
                    type='materialicons'
                    size={24}
                    color='#cdcdcd'/>
                  </View>
                </View>
              </View>
              <View style={{width:140, marginLeft:15, marginRight:15}}>
                <Image style={styles.thumbnailMedium} source={require('../assets/images/other-img3.jpg')}/>
                <View style={{marginTop:8, flexDirection:'row'}}>
                  <View style={{flex:4,}}>
                    <Text style={styles.namaKota}>
                      Jepang
                    </Text>
                    <Text style={styles.activityTitle}>
                      Create your own Sushi
                    </Text>
                    <Text style={styles.priceTitle}>
                      IDR 300.000
                    </Text>
                    <View>
                      <Rating
                        type="star"
                        fractions={1}
                        startingValue={3.6}
                        readonly
                        imageSize={11}
                        ratingColor="#00c5bc"
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingTop: 2.5, marginRight:5,}}
                      />
                    </View>
                  </View>
                  <View style={{flex:1, marginTop:0}}>
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

          <View style={{paddingBottom:100}}></View>

        </ScrollView>

        {/*bottom CTA button*/}
        <View style={styles.bottomBarContainer}>
          <View style={{alignItems: 'flex-start', flex:1.5}}>
            <View >
              <Text style={{fontSize:12, color:'#676767',}}>Start from</Text> 
            </View>
            <View>
              <Text style={{
                color:'#000',
                fontWeight: 'bold',
                fontSize:20,
              }}>{ Formatter.price(price) }</Text>
            </View> 
            
          </View>
          <View style={{alignItems: 'flex-end', flex:1}}>
            <Button
              containerStyle={{
                height: 45,
                width: '100%',
                paddingTop: 13,
                paddingBottom: 13,
                overflow: 'hidden',
                borderRadius:25,
                backgroundColor: '#01d4cb',
              }}
              style={{fontSize: 16, color: '#fff', fontWeight:'bold'}}
              onPress={() => {
                this.setState({isLoading: true})
                this.props.navigation.navigate('BookingDetail', {
                  activityId: id,
                  price, requiredPaxData,
                });
              }}
              disabled={!requiredPaxData || isLoading}
              styleDisabled={{color:'#aaa'}}
            >
              Pesan
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    backgroundColor: '#fff',
  },
  similarActivityContainer: {
    marginRight:10,
    width:150,
    // flex:1,
  },
  thumbnailMedium: {
    resizeMode:'cover', 
    width:140, 
    height:150, 
    borderRadius:5,
  },
  namaKota: {
    fontSize:12,
    color:'#454545',
  },
  activityTitle: {
    fontWeight:'bold',
    fontSize:15,
    color:'#454545',
  },
  activitydetailTitle: {
    fontWeight:'bold',
    fontSize:18,
    color:'#454545',
  },
  priceTitle: {
    fontSize:12,
    color:'#676767',
    marginTop:2
  },
  seeMore :{
    fontSize:14,
    color:'#acacac'
  },
  activityDesc: {
    fontSize:13,
    color:'#454545',
  },
  containerdescriptionActivity: {
    marginBottom: 30,
    marginTop:30,
    flex: 1
  },
  containersimiliarActivity: {
    marginBottom: 20,
    marginTop:20,
    flex: 1
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize:16,
    marginBottom: 7,
    color:'#454545',
  },

  reviewTitle: {
    fontSize:15,
    marginBottom: 5,
    color:'#454545',
  },
  reviewDate: {
    fontSize:12,
    color:'#cecece'

  },
  bottomBarContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fbfbfb',
    padding: 20,
    borderTopColor: "#efefef",
    borderTopWidth: 2,
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
  descriptionActivity: {
    fontSize:11,
    lineHeight: 15,
  },
  lidescriptionActivity: {
    fontSize:11,
    marginBottom: 2,
    lineHeight: 15,
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: '#efefef',
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
