'use strict';

import React from 'react';
import Button from 'react-native-button';
import { Platform, StyleSheet, Text, View, Image, ScrollView,
  RefreshControl, FlatList, //TouchableOpacity
} from 'react-native';
import { getBookingList } from './MyBookingController';
import globalStyles from '../../../commons/globalStyles';
import * as Formatter from '../../components/Formatter';

class ActivityListItem extends React.PureComponent {
  render() {
    let {item} = this.props;
    return (
      <View>
        <View style={{flexDirection:'row'}}>
          <Image style={styles.thumbprofile} source={{ uri:item.mediaSrc }} />
          <View style={{flex:1}}>
            <Text style={styles.activityTitle}>
              { item.name }
            </Text>
            <Text style={styles.activityDesc}>{ Formatter.dateLong(item.date) }</Text>
            <Text style={styles.activityDesc}>
              {item.paxCount.map(p=>p.count+' '+p.type+'\n')}
              status: {item.bookingStatus}
            </Text>
          </View>
        </View>

        <View style={{flexDirection:'row', marginTop:15}}>
          <View style={{flex:1}}>
            <Button
              containerStyle={globalStyles.ctaButton5}
              style={{fontSize: 12, color: '#777',}}>
              Review
            </Button>
          </View>
          <View style={{flex:1, alignItems:'flex-end'}}>
            <Button
              containerStyle={globalStyles.ctaButton4}
              style={{fontSize: 12, color: '#fff',}}>
              Lihat Voucher
            </Button>
          </View>
        </View>
        <View style={styles.separator} />
      </View>
    )
  }
}

class CartListItem extends React.PureComponent {

  _keyExtractor = (item, index) => index
  _renderItem = ({item, index}) => (
    <ActivityListItem
      item={item}
      index={index}
      // onPressItem={this._onPressItem}
    />
  )
  render() {
    let {item} = this.props;
    return (
      <View style={styles.cartbox}>

        <FlatList
          data={item.activities}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />

        <View style={styles.total}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Text style={styles.activityDesc}>Total</Text>
              <Text style={styles.activityDesc}>Status: Terbit</Text>
            </View>
            <View style={{flex:1, alignItems:'flex-end'}}>
              <Text style={styles.activityDesc}>{Formatter.price(item.totalFinalPrice)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.invoice}>
          <View style={{flexDirection:'row'}}>
            <View style={{flex:1}}>
              <Button
                containerStyle={globalStyles.ctaButton6}
                style={{fontSize: 12, color: '#fff',}}>
                Lihat Invoice
              </Button>
            </View>
          </View>
        </View>

      </View>
    )
  }
}

export default class MyBookingListScreen extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = {
      bookingList: props.list,
      isRefreshing:false
    };
  }

  static navigationOptions = {
    title: 'Pesananku',
  };

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    getBookingList().then( response => {
      console.log(response)
      this.setState({isRefreshing: false});
    });
  }

  _keyExtractor = (item, index) => index
  _renderItem = ({item, index}) => (
    <CartListItem
      item={item}
      index={index}
      // onPressItem={this._onPressItem}
    />
  )
  // _onPressItem = (item) => {
  //   this.props.navigation.navigate(
  //     'BookedPageDetail',{details: item}
  //   );
  // };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <FlatList
          data={this.state.bookingList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />


      {/* Tab Button

        <View style={{
          flex:1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor:'#fff',
          marginTop:10,
        }}>
          <Button
            containerStyle={{
              marginRight:3,
              height:40, width:120, paddingTop:10, paddingBottom:10,
              overflow:'hidden', borderRadius:4,
              backgroundColor: '#437ef7'
            }}
            style={{fontSize: 14, color: '#ffffff'}}
            onPress={() => this._handlePress()}>
            Active
          </Button>
          <Button
            containerStyle={{ height:40, width:120, paddingTop:10,
              paddingBottom:10, overflow:'hidden', borderRadius:4,
              borderWidth: 1,
              borderColor: '#437ef7',backgroundColor: '#ffffff'
            }}
            style={{fontSize: 14, color: '#437ef7'}}
            onPress={() => this._handlePress()}>
            History 
          </Button>
        </View>
        
      */}


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:15,
    flex:1,
    backgroundColor:'#f7f9fc',
  },
  cartbox: {
    backgroundColor:'#fff',
    padding:15,
    marginBottom:20,
    borderRadius:3,
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
    activityTitle: {
    fontFamily: 'Hind-Bold',
    fontSize:15,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:10,
        paddingTop:10,
        marginBottom:-12,
      },
      android: {
        lineHeight:20,

      },
    }),
  },
  activityPrize: {
    fontFamily: 'Hind-Light',
    fontSize:14,
    color:'#000',
    ...Platform.select({
      ios: {
        lineHeight:10,
        paddingTop:13,
        marginBottom:-12,
      },
      android: {
        lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  activityDesc: {
    fontSize:14,
    color:'#454545',
    fontFamily: 'Hind-Light',
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
  thumbprofile: {
    height: 70,
    width:70,
    marginRight:10
  },
  separator: {
    backgroundColor:'#ececec',
    height:0.3,
    width:'100%',
    marginVertical:20
  },
  total: {
    paddingBottom:15,
    borderBottomWidth:1,
    borderBottomColor:'#ececec'
  },
  invoice: {
    marginTop:10,
    paddingVertical:10,
  },
});
