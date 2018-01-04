'use strict';

import React from 'react';
import Button from 'react-native-button';
import { Platform, StyleSheet, Text, View, Image, ScrollView
} from 'react-native';
import globalStyles from '../../../commons/globalStyles';
import { Rating, Icon } from 'react-native-elements';

export default class ListScreen extends React.Component {
  
  static navigationOptions = {
    title: 'Cart',
  };;

  render() {
    return (
      <View style={{flex:1}}>
      <ScrollView style={{backgroundColor:'#fff',}}>
        <View style={styles.container}>

          <View style={{borderWidth:1, borderRadius:5, borderColor:'#ececec', marginBottom:15}}>
            <View style={{flexDirection:'row', padding:10}}>
              <View style={{flex:1}}>
                <Image style={{width:70, height:70, resizeMode:'cover'}} source={require('../../assets/images/detailimg2.jpg')}/>
              </View>
              <View style={{flex:3, paddingLeft:15}}>
                <View>
                  <Text style={styles.activitydetailTitle}>
                    Visit old temple in Japan south east asia
                  </Text>
                </View>
                <View style={{marginTop:5}}>
                  <Text style={styles.infoActivity}>
                    Jepang
                  </Text>
                  <Text style={styles.infoActivity}>
                    20 Aug 2018 - 19.00
                  </Text>
                  <Text style={styles.infoActivity}>
                    4 orang
                  </Text>
                </View>
              </View>
            </View>
            <View style={{paddingVertical:15, paddingHorizontal:10, borderTopWidth:1, borderTopColor:'#ececec',flexDirection:'row'}}>

              <View style={{flex:1}}>
                <Text style={styles.priceTitle}>
                  IDR 300.000
                </Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', flexDirection:'row', justifyContent:'flex-end' }}>
                <View style={{marginRight:20}}>
                  <Text style={styles.actionText}>Edit</Text>
                </View>
                <View>
                  <Text style={styles.actionText}>Delete</Text>
                </View>
              </View>
              
            </View>
          </View>

          <View style={{borderWidth:1, borderRadius:5, borderColor:'#ececec', marginBottom:15}}>
            <View style={{flexDirection:'row', padding:10}}>
              <View style={{flex:1}}>
                <Image style={{width:70, height:70, resizeMode:'cover'}} source={require('../../assets/images/detailimg3.jpg')}/>
              </View>
              <View style={{flex:3, paddingLeft:15}}>
                <View>
                  <Text style={styles.activitydetailTitle}>
                    Visit old temple in Japan south east asia
                  </Text>
                </View>
                <View style={{marginTop:5}}>
                  <Text style={styles.infoActivity}>
                    Jepang
                  </Text>
                  <Text style={styles.infoActivity}>
                    20 Aug 2018 - 19.00
                  </Text>
                  <Text style={styles.infoActivity}>
                    4 orang
                  </Text>
                </View>
              </View>
            </View>
            <View style={{paddingVertical:15, paddingHorizontal:10, borderTopWidth:1, borderTopColor:'#ececec',flexDirection:'row'}}>

              <View style={{flex:1}}>
                <Text style={styles.priceTitle}>
                  IDR 300.000
                </Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', flexDirection:'row', justifyContent:'flex-end' }}>
                <View style={{marginRight:20}}>
                  <Text style={styles.actionText}>Edit</Text>
                </View>
                <View>
                  <Text style={styles.actionText}>Delete</Text>
                </View>
              </View>
              
            </View>
          </View>

          <View style={{borderWidth:1, borderRadius:5, borderColor:'#ececec', marginBottom:15}}>
            <View style={{flexDirection:'row', padding:10}}>
              <View style={{flex:1}}>
                <Image style={{width:70, height:70, resizeMode:'cover'}} source={require('../../assets/images/detailimg.jpg')}/>
              </View>
              <View style={{flex:3, paddingLeft:15}}>
                <View>
                  <Text style={styles.activitydetailTitle}>
                    Visit old temple in Japan south east asia
                  </Text>
                </View>
                <View style={{marginTop:5}}>
                  <Text style={styles.infoActivity}>
                    Jepang
                  </Text>
                  <Text style={styles.infoActivity}>
                    20 Aug 2018 - 19.00
                  </Text>
                  <Text style={styles.infoActivity}>
                    4 orang
                  </Text>
                </View>
              </View>
            </View>
            <View style={{paddingVertical:15, paddingHorizontal:10, borderTopWidth:1, borderTopColor:'#ececec',flexDirection:'row'}}>

              <View style={{flex:1}}>
                <Text style={styles.priceTitle}>
                  IDR 300.000
                </Text>
              </View>
              <View style={{flex:1, alignItems:'flex-end', flexDirection:'row', justifyContent:'flex-end' }}>
                <View style={{marginRight:20}}>
                  <Text style={styles.actionText}>Edit</Text>
                </View>
                <View>
                  <Text style={styles.actionText}>Delete</Text>
                </View>
              </View>
              
            </View>
          </View>



        </View>
      </ScrollView>

      {/*bottom CTA button*/}
      <View style={globalStyles.bottomCtaBarContainer}>
        <View style={{alignItems: 'flex-start', flex:1.5}}>
          <View >
            <Text style={{fontSize:12, color:'#676767',}}>Total</Text> 
          </View>
          <View>
            <Text style={{
              color:'#000',
              fontWeight: 'bold',
              fontSize:20,
            }}>Rp 300.000</Text>
          </View> 
          
        </View>
        <View style={{alignItems: 'flex-end', flex:1}}>
          <Button
            containerStyle={globalStyles.ctaButton}
            style={{fontSize: 16, color: '#fff', fontWeight:'bold'}}
            onPress={() => this._goToBookingDetail()}
            styleDisabled={{color:'#aaa'}}
          >
            Bayar
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
    flex:1,
    paddingBottom:100
  },
  activitydetailTitle: {
    fontFamily: 'Hind-SemiBold',
    fontSize:16,
    color:'#454545',
    ...Platform.select({
      ios: {
        lineHeight:9,
        paddingTop: 14,
        //backgroundColor:'red',
        marginBottom:-10,
      },
      android: {
        lineHeight:20
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  infoActivity: {
    fontFamily:'Hind', 
    fontSize:14, 
    color:'#454545',
     ...Platform.select({
      ios: {
        lineHeight:5,
        paddingTop: 14,
       // backgroundColor:'red',
        marginBottom:-5
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),
      },
    }),
  },
  priceTitle: {
    fontSize:16,
    color:'#454545',
    fontFamily:'Hind-SemiBold',
    ...Platform.select({
      ios: {
        lineHeight:5,
        paddingTop: 14,
       // backgroundColor:'red',
        marginBottom:-10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  actionText: {
    fontSize:15,
    color:'#454545',
    fontFamily:'Hind',
    ...Platform.select({
      ios: {
        lineHeight:5,
        paddingTop: 14,
       // backgroundColor:'red',
        marginBottom:-10
      },
      android: {
        lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  
});
