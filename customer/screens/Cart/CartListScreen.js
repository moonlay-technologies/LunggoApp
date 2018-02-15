'use strict';

import React from 'react';
import Button from 'react-native-button';
import {
  Platform, StyleSheet, Text, View, Image, ScrollView,
  FlatList, TouchableOpacity, ActivityIndicator
} from 'react-native';
import globalStyles from '../../../commons/globalStyles';
import { Rating, Icon } from 'react-native-elements';
import * as Formatter from '../../components/Formatter';
import { deleteCart } from './CartController';

class ListItem extends React.PureComponent {

  _onPressDelete = () =>
    this.props.onPressDelete(this.props.index, this.props.item.rsvNo)

  render() {
    const { item } = this.props;
    const { date, time } = item.selectedDateTime;
    let timeText = (!!time) ? ' - ' + time : '';
    const selectedDateTimeText =
      Formatter.dateFullShort(date) + timeText;
    // Moment(date).format('ddd, D MMM YYYY') + timeText;

    return (
      <View style={{ borderWidth: 1, borderRadius: 5, borderColor: '#ececec', marginBottom: 15 }}>

        <View style={{ flexDirection: 'row', padding: 10 }}>
          <View style={{ flex: 1 }}>
            <Image style={{ width: 70, height: 70, resizeMode: 'cover' }}
              source={{ uri: item.activityDetail.mediaSrc[0] }} />
          </View>
          <View style={{ flex: 3, paddingLeft: 15 }}>
            <View>
              <Text style={styles.activitydetailTitle}>
                {item.activityDetail.name}
              </Text>
            </View>
            <View style={{ marginTop: 5 }}>
              <Text style={styles.infoActivity}>
                {item.activityDetail.city}
              </Text>
              <Text style={styles.infoActivity}>
                {selectedDateTimeText}
              </Text>
              <Text style={styles.infoActivity}>
                {item.ticketCount.map((t) => `${t.count} ${t.type}`).join(', ')}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ paddingVertical: 15, paddingHorizontal: 10, borderTopWidth: 1, borderTopColor: '#ececec', flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.priceTitle}>
              {Formatter.price(item.payment.originalPrice)}
            </Text>
          </View>
          <View style={{ flex: 1, alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'flex-end' }}>
            {/*<TouchableOpacity style={{marginRight:20}}>
              <Text style={styles.actionText}>Edit</Text>
            </TouchableOpacity>*/}
            <TouchableOpacity onPress={this._onPressDelete}>
              <Text style={styles.actionText}>Delete</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>

    );
  }

}



export default class CartListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: props.list,
      totalPrice: props.totalPrice,
    };
  }

  static navigationOptions = {
    title: 'Cart',
  };;

  _keyExtractor = (item, index) => index;

  _renderItem = ({ item, index }) => (
    <ListItem
      item={item}
      index={index}
      onPressDelete={this._onPressDelete}
    />
  );

  _onPressItem = item => {
    this.props.navigation.navigate('DetailScreen', { details: item })
  };

  _onPressDelete = (index, rsvNo) => {
    this.setState({ isLoading: true });
    let { list, totalPrice } = this.state;
    let deletedItemPrice = list[index].payment.originalPrice;
    deleteCart(rsvNo).then(response => {
      if (response.status == 200) {
        list.splice(index, 1);
        totalPrice -= deletedItemPrice;
        this.setState({ totalPrice, isLoading: false });
        this.forceUpdate();
      }
    }).catch(error => console.error(error));
  }

  _goToPayment = () => this.props.navigation.navigate('WebViewScreen', { cartId: this.props.cartId });

  render() {
    return this.state.isLoading ?
      <LoadingAnimation /> : (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: '#fff', }}>
            <View style={styles.container}>
              <FlatList
                contentContainerStyle={styles.list}
                data={this.state.list}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
          </ScrollView>

          {/*bottom CTA button*/}
          <View style={globalStyles.bottomCtaBarContainer}>
            <View style={{ alignItems: 'flex-start', flex: 1.5 }}>
              <View>
                <Text style={{ fontSize: 12, color: '#676767', }}>Total</Text>
              </View>
              <View>
                <Text style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 20,
                }}>{Formatter.price(this.state.totalPrice)}</Text>
              </View>

            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <Button
                containerStyle={globalStyles.ctaButton}
                style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}
                onPress={() => this._goToPayment()}
                styleDisabled={{ color: '#aaa' }}
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
    padding: 15,
    backgroundColor: '#fff',
    flex: 1,
    paddingBottom: 100
  },
  activitydetailTitle: {
    fontFamily: 'Hind-SemiBold',
    fontSize: 16,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 9,
        paddingTop: 14,
        //backgroundColor:'red',
        marginBottom: -10,
      },
      android: {
        lineHeight: 20
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  infoActivity: {
    fontFamily: 'Hind',
    fontSize: 14,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 5,
        paddingTop: 14,
        // backgroundColor:'red',
        marginBottom: -5
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),
      },
    }),
  },
  priceTitle: {
    fontSize: 16,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
    ...Platform.select({
      ios: {
        lineHeight: 5,
        paddingTop: 14,
        // backgroundColor:'red',
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  actionText: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind',
    ...Platform.select({
      ios: {
        lineHeight: 5,
        paddingTop: 14,
        // backgroundColor:'red',
        marginBottom: -10
      },
      android: {
        lineHeight: 24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },

});
