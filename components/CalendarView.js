import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';
import { StyleSheet, Platform, View, Text } from 'react-native';
import Button from 'react-native-button';

export default class CalendarView extends Component {

  constructor (props) {
    super(props)
    this.state = {
      markedDates : {
        '2017-11-20': {marked: true},
        '2017-11-21': {disabled: true},
        '2017-10-24': {disabled: true},
        
        //// for markingType = interactive
        // '2017-10-23': [{textColor: '#d9e1e8'}],
        // '2017-10-24': [{textColor: '#d9e1e8'}],
        // '2017-11-20': [{textColor: 'green'}],
        // '2017-11-22': [{startingDay: true, color: 'green'}],
        // '2017-11-23': [{color: 'green', textColor: 'gray'}],
        // '2017-11-24': [{endingDay: true, color: 'green', textColor: 'gray'}],
        // '2017-11-04': [{startingDay: true, color: 'green'}, {endingDay: true, color: 'green'}]
      }
    };
  }

  static navigationOptions = {
    title: 'Pilih Tanggal',
  };

  _selectDate = dateString => {
    let {markedDates} = this.state;
    markedDates[dateString] = {selected: true}
    // markedDates[dateString] = [{startingDay: true, color: 'blue'}]
    this.setState({ markedDates });
  }

  render() {
    return(
      <View>
        <CalendarList
          minDate={Date()}
          markedDates={this.state.markedDates}
          onDayPress={ day => this._selectDate(day.dateString)}
          pastScrollRange={0}
          futureScrollRange={12}
          // markingType={'interactive'}
        />
        <View style={styles.bottomBarContainer}>
          <View style={{alignItems: 'flex-start', flex:1}}>
            <Text>
              Judul Activity
            </Text>
            <Text>
              Location
            </Text>
            <Text>
              19 Oct | 12.00 - 15.00
            </Text>
          </View>
          <Button
            containerStyle={{
              height:35,
              width:100,
              paddingTop:10,
              paddingBottom:10,
              overflow:'hidden',
              borderRadius:4,
              backgroundColor: '#437ef7'
            }}
            style={{fontSize: 12, color: '#ffffff'}}
            // onPress={() => this.props.navigation.navigate(
            //   'CalendarView'//, { list: response.activityList}
            // )}
          >
            Pilih Tanggal / Tambahkan Peserta
          </Button>
        </View>
      </View>
    );
  }
}

/* For calendar styling and themes, check out
   https://github.com/wix/react-native-calendars#customizing-look--feel
*/
var styles = StyleSheet.create({
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
});