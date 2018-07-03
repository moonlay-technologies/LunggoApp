'use strict';

import React from 'react';
import { Text, View, Image, TouchableOpacity,
  TouchableWithoutFeedback } from 'react-native';


export class ActivityListItem extends React.PureComponent {

  _goToBookedPageDetail = () => {
    this.props.navigation.navigate
      ('BookedPageDetail', { details: this.props.item })
  };

  render() {
    let { item, myBookingState } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this._goToBookedPageDetail}>
        <View>
          <View style={{ paddingVertical: 25, paddingHorizontal: 15 }}>
            <View style={{ flexDirection: 'row', position: 'relative' }}>
              <View style={{ width: 70 }}>
                <Image style={styles.thumbprofile} source={{ uri: item.mediaSrc }} />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={styles.activityTitle}>
                  {item.name}
                </Text>
                <View style={{ flexDirection: 'row', }}>
                  <Text style={styles.activityDesc}>Tgl. Aktivitas: {Formatter.dateLong(item.date)}</Text>
                  <Text style={styles.activityDesc}>, </Text>
                  <Text style={styles.activityDesc}>{item.selectedSession}</Text>
                </View>
              </View>
                
              <TouchableOpacity
                onPress={this._goToBookedPageDetail}
              >
                <Text style={styles.teks3a}>Lihat Detail</Text>
              </TouchableOpacity>

            </View>
          </View>
          <View style={styles.separator} />
          <View>
            {myBookingState == 'unreviewed' && this._inputRating(item)}
            {myBookingState == 'history' && this._buyAgain(item)}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _inputRating = item =>
    <View>
      <Text>Beri Rating</Text>
      <TouchableOpacity onPress={ () => this._writeRating(item)}>

        <Text>bintangbintang</Text>
      
      </TouchableOpacity>
    </View>

  _buyAgain = item =>
    <View style={{flexDirection: 'row'}}>
      <Text style={{flex:1}}>{Formatter.price(item.price)}</Text>
      <StatusButton text="Beli Lagi"
        onPress={() => this._onClickBuyAgain(item)}
      />
    </View>

  _writeRating = item => {
    const dest = item.requestRating ? 'SubmitRating' : 'SubmitReview';
    this.props.navigation.navigate( dest, { rsvNo: item.rsvNo });
  }

  _onClickBuyAgain = item => {
    this.props.navigation.navigate('DetailScreen', { details: item });
  }

}

const StatusButton = props =>
  <Button
    containerStyle={styles.containerbtn}
    style={styles.statusbtn}
    onPress={props.onPress}
  >
    {props.text}
  </Button>

const styles = StyleSheet.create({
  activityTitle: {
    fontFamily: 'HindBold',
    fontSize: 15,
    color: '#454545',
    ...Platform.select({
      ios: {
        lineHeight: 10,
        paddingTop: 10,
        marginBottom: -12,
      },
      android: {
        lineHeight: 20,

      },
    }),
  },
  activityDesc: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'HindLight',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 10,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),

      },
    }),
  },
  thumbprofile: {
    height: 60,
    width: 60,
  },
  separator: {
    backgroundColor: '#bfbfbf',
    height: 0.5,
    width: '100%',
  },
  teks3a: {
    fontSize: 14,
    color: '#454545',
    fontFamily: 'Hind',
    textAlign: 'left',
    ...Platform.select({
      ios: {
        // lineHeight:19*0.8,
        // paddingTop: 20 - (19 * 0.4),
        marginBottom: -10,
      },
    }),
  },
  containerbtn: {
    backgroundColor: '#00d3c5',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 7
  },
  statusbtn: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'HindSemiBold',
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        lineHeight: 15 * 0.8,
        paddingTop: 4,
        marginBottom: -10
      },
      android: {
        //lineHeight:24
        //paddingTop: 23 - (23* 1),
      },
    }),
  },
});
