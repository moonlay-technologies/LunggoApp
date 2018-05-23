'use strict';

import React from 'react';
import {
  Image, Platform, ScrollView, Text, TouchableOpacity, View,
  Button, TextInput, StyleSheet, Dimensions
} from 'react-native';
import SearchHeader from './SearchActivity/SearchHeader';
import { Icon } from 'react-native-elements';
import WishButton from '../components/WishButton';
import search from './SearchActivity/SearchController';
import Swiper from 'react-native-swiper';
import * as Formatter from '../components/Formatter';
import Carousel from 'react-native-snap-carousel';
import LoadingAnimation from '../components/LoadingAnimation';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../api/Common';
import UpdateNotifModal from '../components/UpdateNotifModal';
import { observer } from 'mobx-react';
import cartCountStore from './Cart/CartCountStorage';
import OfflineNotificationBar from './../../commons/components/OfflineNotificationBar';
import withConnectivityHandler from '../../higherOrderComponents/withConnectivityHandler';

const { width } = Dimensions.get('window');
const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

@observer class ExploreScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      tiketList: [],
      paketList: [],
      tripList: [],
      turList: [],
      promoList: [],
      isLoading: undefined,
      // wishlists: {},
      isNotifModalVisible: false,
      currentVersion: '0.0.0',
      latestVersion: '0.0.0',
      urlPlatform: '',
      errorMessage:'',
    };
    setItemAsync('skipIntro', 'true');
  }

  static navigationOptions = {
    title: 'Jelajah',
    header: (props) => <SearchHeader {...props} />
  };

  _checkVersion = () => {
    //currentVersion di Api masih 1.0.1
    //let currentVersion = "1.0.0";
    let currentVersion = Expo.Constants.manifest.version;
    let urlPlatform = '';
    let platform = Platform.OS;
    const version = 'v1';
    fetchTravoramaApi({
      method: 'POST',
      path: '/checkversion',
      requiredAuthLevel: AUTH_LEVEL.Guest,
      data: { currentVersion, platform },
    }).then(response => {
      console.log('cek versi');
      console.log(response);
      console.log('tutub');
      console.log(Platform);
      console.log(Expo.Constants.manifest);
      if (response.mustUpdate == true) {
        this.setState({
          isNotifModalVisible: true,
          currentVersion: currentVersion,
          latestVersion: response.latestVersion,
          urlPlatform: response.updateUrl,
          forceToUpdate: response.forceToUpdate
        });
      }
    });
  }

  _getWishlist = async () => {
    setTimeout(async () => {
      let wishlistItems = await getItemAsync('wishlist');
      if (wishlistItems != null) {
        let activityList = JSON.parse(wishlistItems);
        let wishlists = {};
        for (let i = 0; i < activityList.length; i++)
          wishlists[activityList[i].id] = true;
        this.setState({ wishlists });
      }
    }, 0);
  }

  _getPromos = async () => {
    const path = '/v1/featpromo';
    let request = { path, requiredAuthLevel: AUTH_LEVEL.Guest }
    try {
      let response = await fetchTravoramaApi(request);
      if (response) {
        return response.featuredPromos;
      } else {
        console.error('PromoAPI: no response returned!');
        return 'no response returned';
      }
    } catch (error) {
      console.error(error);
    }
  }

  _refreshContents = () => {
    this.setState({isLoading: true});
    this.props.withConnectivityHandler( () => {
      Promise.all([
        search('tiket').then(tiketList => this.setState({ tiketList })),
        search('paket').then(paketList => this.setState({ paketList })),
        search('trip').then(tripList => this.setState({ tripList })),
        search('tur').then(turList => this.setState({ turList })),
        this._getPromos().then(promoList => this.setState({ promoList })),
        this._getWishlist(),
      ]);
    }, true).catch( err => this.setState({errorMessage: err}))
            .finally( () => this.setState({ isLoading: false }) );
  }

  componentDidMount() {
    this._refreshContents();
    this.props.navigation.addListener('willFocus', this._getWishlist);
    //this.props.navigation.addListener('willFocus', this._cartCountGetter);
    this._getWishlist();
    cartCountStore.setCartCount();
  }

  render() {
    const { props } = this;
    const { turList, tripList, paketList, tiketList } = this.state;
    let allList = [...turList, ...tripList, ...paketList, ...tiketList];
    let placeSrc = [require('../../assets/images/yogya.jpg'), require('../../assets/images/surabaya.jpg'), require('../../assets/images/bg.jpg')];
    let places = [...placeSrc, ...placeSrc, ...placeSrc];
    let placeList = places.map(place => { return { mediaSrc: place } });

    if (this.state.isLoading) {
      return <LoadingAnimation />
    }
    else
      console.log('version modal: ' + this.state.isNotifModalVisible);
    return (
      <ScrollView style={{ backgroundColor: '#fff' }}>
        <UpdateNotifModal isVisible={this.state.isNotifModalVisible} currentVersion={this.state.currentVersion} latestVersion={this.state.latestVersion} urlPlatform={this.state.urlPlatform} forceToUpdate={this.state.forceToUpdate} />
        {/*<ActivityFlightHotelTab/>*/}

        { this.state.errorMessage ?
          <Text>{this.state.errorMessage}</Text>
          :
          <View>
            <RenderHeader title='Tiket' searchUrl='tiket' {...props}/>
            <RenderContent list={this.state.tiketList} itemsPerScreen={1} height={200} {...props}/>

            <RenderHeader title='Paket' searchUrl='paket' {...props}/>
            <RenderContent list={this.state.paketList} itemsPerScreen={2} height={150} {...props}/>
           
            <RenderHeader title='Trip' searchUrl='trip' {...props}/>
            <RenderContent list={this.state.tripList} itemsPerScreen={3} height={150} {...props}/>
           
            <RenderHeader title='Tur Keliling Kota' searchUrl='tur' {...props}/>
            <RenderContent list={this.state.turList} itemsPerScreen={1} height={100} {...props}/>
           
            <RenderHeader title='Promo Terkini' {...props}/>
            <RenderPromo list={this.state.promoList} itemsPerScreen={1} height={100} {...props}/>
            {/* {this._renderHeader({ title: 'Destinasi Favorit' })} */}
            {/* {this._renderContent({ list: placeList, itemsPerScreen: 3, height: 150 })} */}
          </View>
          
        }

          <View style={{ paddingTop: 10 }}></View>
        </ScrollView>
      );
  }

}
export default withConnectivityHandler(ExploreScreen);

function RenderHeader({ title, searchUrl, navigation }) {
  const _onPressCategory = str => navigation.navigate('SearchActivity', { searchString: str });
  return (
    <View style={[styles.container, { flexDirection: 'row', }]}>
      <Text style={[{ flex: 2 }, styles.categoryTitle]}>{title}</Text>
      {searchUrl && (
        <TouchableOpacity style={{ flex: 1, alignItems: 'flex-end' }}
          onPress={() => this._onPressCategory(searchUrl)} >
          <Text style={styles.seeMore}>Lihat Semua</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

function RenderPromo({ list, itemsPerScreen, height, navigation }) {
  const _onPressPromo = promo => navigation.navigate('WebViewScreen', { title: promo.title, url: promo.detailsUrl });
  let itemWidth = ((width - 1.5 * THUMBNAIL_SPACING) / itemsPerScreen - THUMBNAIL_SPACING);
  let style = StyleSheet.create({
    containerThumbnail: {
      backgroundColor: 'transparent',
      paddingBottom: 8,
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 3,
          shadowOpacity: 0.7
        },
      })
    },
    thumbnail: {
      backgroundColor: 'transparent',
      resizeMode: 'cover',
      width: itemWidth,
      height: height,
      borderRadius: 5,
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 6,
          shadowOpacity: 0.7
        },

      }),
    }
  });

  let _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={item.id}
        style={{
          width: itemWidth,
          marginLeft: THUMBNAIL_SPACING,

        }}
        activeOpacity={1}
        onPress={() => _onPressPromo(item)}
      >
        <View style={[style.containerThumbnail, { paddingTop: 0 }]}>
          <Image
            style={style.thumbnail}
            source={{ uri: item.bannerUrl }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <Carousel
      data={list}
      renderItem={_renderItem}
      sliderWidth={width}
      itemWidth={itemWidth + THUMBNAIL_SPACING}
      layout={'default'}
      firstItem={0}
      activeSlideAlignment={'start'}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
    />
  );
}


class RenderContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: props.list,
      wishlists: {},
    };
    this._onWishlist.bind(this);
  }

  componentWillReceiveProps({list}) {
    if (list && list.length > 0) this.setState({list});
  }

  _onWishlist = async ({ id, wishlisted }) => {
    const { wishlists } = this.state;
    wishlists[id] = wishlisted;
    this.setState({ wishlists });
  }

  itemWidth = (width - THUMBNAIL_PEEK) / this.props.itemsPerScreen - THUMBNAIL_SPACING;
  style = StyleSheet.create({
    containerThumbnail: {
      backgroundColor: 'transparent',
      paddingBottom: 8,
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 3,
          shadowOpacity: 0.7
        },
      })
    },
    thumbnail: {
      backgroundColor: 'transparent',
      resizeMode: 'cover',
      width: this.itemWidth,
      height: this.props.height,
      borderRadius: 5,
      ...Platform.select({
        ios: {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 2
          },
          shadowRadius: 6,
          shadowOpacity: 0.7
        },

      }),
    }
  });
  
  _onPressProduct = item => this.props.navigation.navigate('DetailScreen', { details: item });
  
  _renderItem = ({ item, index }) => (
    <TouchableOpacity key={item.id}
      style={{
        width: this.itemWidth,
        marginLeft: THUMBNAIL_SPACING,
      }}
      activeOpacity={1}
      onPress={() => this._onPressProduct(item)}
    >
      <View style={[this.style.containerThumbnail, { paddingTop: 0 }]}>
        <Image
          style={this.style.thumbnail}
          source={item.mediaSrc.toString().startsWith('http') ? { uri: item.mediaSrc } : item.mediaSrc}
        />
      </View>
      {item.name && (
        <View style={{ marginTop: 5, flexDirection: 'row', paddingTop: 0 }}>
          <View style={{
            flex: 4,
            paddingBottom: 20,
            backgroundColor: 'transparent',
          }}>
            <Text style={this.props.itemsPerScreen == 1 ? styles.namaKotaBig : styles.namaKota}>
              {item.city}
            </Text>
            <Text style={this.props.itemsPerScreen == 1 ? styles.activityTitleBig : styles.activityTitle}>
              {item.name}
            </Text>
            <Text style={this.props.itemsPerScreen == 1 ? styles.priceTitleBig : styles.priceTitle}>
              {Formatter.price(item.price)}
            </Text>
          </View>
          { (this.props.itemsPerScreen < 3) && (
            <View>
              <WishButton wishlisted={this.state.wishlists[item.id]} onPress={this._onWishlist}
                id={item.id} big={this.props.itemsPerScreen == 1} {...this.props} />
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  )

  render() {
    return (
      <Carousel
        data={this.state.list}
        renderItem={this._renderItem}
        sliderWidth={width}
        itemWidth={this.itemWidth + THUMBNAIL_SPACING}
        layout={'default'}
        firstItem={0}
        activeSlideAlignment={'start'}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
      />
    );
  }
}

function ActivityFlightHotelTab(props) {
  return(
    <View style={{flexDirection:'row', marginTop:20}}>
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
    </View>
  )
}

const THUMBNAIL_SPACING = 10;
const THUMBNAIL_PEEK = width * 0.06;
const styles = StyleSheet.create({
  /*  slides:{
      backgroundColor:'red',
      width:width/2,
       marginLeft:15
    },
    wrapper: {
      height:200,
    },
    wrapperContainer: {
      width:width/2
    },*/
  placeTitleContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    bottom: 15
  },
  placeTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },

  namaKota: {
    fontSize: 12,
    color: '#454545',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        lineHeight: 6,
        paddingTop: 14,
        marginBottom: -4,
        //backgroundColor:'red'
      },
      android: {
        lineHeight: 18,
        marginBottom: -2

      },
    }),
  },
  namaKotaBig: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {

        lineHeight: 6,
        paddingTop: 14,
        marginBottom: -4,
        //backgroundColor:'red'
      },
      android: {
        lineHeight: 18,
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityTitleBig: {
    fontFamily: 'Hind-Bold',
    fontSize: 20,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 12,
        paddingTop: 14,
        marginBottom: -13,
      },
      android: {
        lineHeight: 24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityTitle: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind-Bold',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 10,
        marginBottom: -12,
        //backgroundColor:'red'
      },
      android: {
        lineHeight: 20,
        //paddingTop: 23 - (23* 1),


      },
    }),
  },
  containerThumbnailBig: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.7
      },
    }),
  },
  thumbnailBig: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    width: width * 0.90,
    height: 200,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.7
      },

    }),
  },
  thumbnailPromo: {
    resizeMode: 'cover',
    width: width * 0.85,
    height: 150,
    borderRadius: 5,
  },
  containerThumbnailMedium: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
      },
      android: {
        elevation: 2,
      },
    }),
  },
  thumbnailMedium: {
    resizeMode: 'cover',
    width: width * 0.4,
    height: 150,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 1
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
      },
    }),
  },
  thumbnailPlaces: {
    resizeMode: 'cover',
    width: '100%',
    height: 150,
    borderRadius: 5,
    opacity: 0.7
  },
  priceTitle: {
    fontSize: 13,
    color: '#676767',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        //backgroundColor:'red'
      },
      android: {
        marginTop: 1

      },
    }),
  },
  priceTitleBig: {
    fontSize: 15,
    color: '#676767',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        //backgroundColor:'red'
      },
      android: {
        marginTop: 3

      },
    }),
  },
  categoryTitle: {
    fontFamily: 'Hind-Bold',
    fontSize: 22,
    color: '#454545',
  },
  seeMore: {
    fontSize: 14,
    color: '#acacac',
    marginTop: 5,
    fontFamily: 'Hind'
  },
  container: {
    // flex: 1,
    padding: THUMBNAIL_SPACING,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        paddingBottom: 0,
      },
      android: {
        paddingBottom: 15,

      },
    }),
  },
});