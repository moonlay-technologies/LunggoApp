import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';
import { StyleSheet, Platform, View, Text, TouchableOpacity,
          TouchableHighlight } from 'react-native';
import globalStyles from '../../commons/globalStyles';
import Modal from 'react-native-modal';
import Button from 'react-native-button';
import Moment from 'moment';
import 'moment/locale/id';

export default class CalendarPicker extends Component {

  constructor (props) {
    super(props)
    let {selectedDate, selectedTime, availableDateTimes} =
      this.props.navigation.state.params;
    this.state = {
      selectedDate, selectedTime,
      // minDate : '2018-01-10', //// kalo ada yg minimal H-3 dsb
      minDate : Date(),
      isModalVisible: false,
      markedDates : {},
      /*markedDates : {
        '2018-01-20': {marked: true},
        '2018-01-24': {
          disabled: false,
          availableTime: [
            "1.00 - 2.00",
            "3.00 - 4.00"
          ],
        },
        '2018-01-25': {
          disabled: false,
          availableTime: [
            "12.00 - 18.00",
            "9.00 - 10.00"
          ],
        },
        
        //// for markingType = interactive
        // '2017-10-23': [{textColor: '#d9e1e8'}],
        // '2017-10-24': [{textColor: '#d9e1e8'}],
        // '2017-11-20': [{textColor: 'green'}],
        // '2017-11-22': [{startingDay: true, color: 'green'}],
        // '2017-11-23': [{color: 'green', textColor: 'gray'}],
        // '2017-11-24': [{endingDay: true, color: 'green', textColor: 'gray'}],
        // '2017-11-04': [{startingDay: true, color: 'green'}, {endingDay: true, color: 'green'}]
      },*/ 
    };
    let {markedDates} = this.state;
    availableDateTimes.map( item => {
      markedDates[item.date] = {disabled: false};
      if (item.availableTime) {
        markedDates[item.date].availableTime = item.availableTime;
      }
    });
    if (selectedDate) markedDates[selectedDate].selected = true;
  }

  static navigationOptions = {
    title: 'Pilih Tanggal',
  };

  _checkIsDateAvailable = dateString => {
    //// if clicked date is available, return true
    return !!this.state.markedDates[dateString];
  }

  _selectDate = dateString => {
    let {markedDates, selectedDate} = this.state;
    //// set remove prev selectedDate from markedDates
    if (selectedDate) markedDates[selectedDate].selected = false;
    // if (selectedDate) delete markedDates[selectedDate].selected;
    // markedDates[selectedDate] = [{startingDay: true, color: 'blue'}]
    
    //// set selectedDate
    selectedDate = dateString;
    markedDates[dateString].selected = true;
    // markedDates[dateString] = [{startingDay: true, color: 'blue'}]

    this.setState({ markedDates, selectedDate });
    //// TODO: sometimes all state has already changed but the ui only partly updated
    //// (only text is updated, CalendarList's marked date isn't)
  };

  _return = () => {
    this.props.navigation.state.params.setSchedule({
      date:this.state.selectedDate,
      shift:'1'
    })
    this.props.navigation.goBack()
  }

  _setModalVisible(visible) {
    this.setState({isModalVisible: visible});
  }

  _onDatePressed = dateString => {
    if (this._checkIsDateAvailable(dateString) == false) return;

    let {selectedDate, markedDates} = this.state;
    //// choose session, if any

    // console.log('--')
    // console.log(selectedDate && markedDates[selectedDate] &&
    //           markedDates[selectedDate].availableTime );
    console.log(!!selectedDate);
    // console.log(markedDates[selectedDate]);
    console.log(markedDates[selectedDate]? markedDates[selectedDate].availableTime : 'z');

    //// continue set date
    this._selectDate(dateString);
    this._setModalVisible(true);
  }

  _onAvailableTimeClicked = index => {
    let {markedDates, selectedDate} = this.state;
    let selectedTime = markedDates[selectedDate].availableTime[index]
    this.setState({selectedTime});
    this._setModalVisible(false);
  }

  render() {
    let {selectedDate, markedDates, selectedTime} = this.state;
    let date = (selectedDate)
      ? Moment(selectedDate).format('ddd, D MMM YYYY')
      : "Pilih Tanggal";
      console.log('markedDates')
      console.log(markedDates)
    let availableTimeList = !!selectedDate ?
        markedDates[selectedDate].availableTime.map(
          (currValue, index) =>
            <TouchableOpacity
              key={index} style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                borderBottomColor: '#efefef',
                borderBottomWidth: 1,
                paddingTop: 15,
                paddingBottom: 15,
              }}
              onPress={() => this._onAvailableTimeClicked(index)}
            >
              <View style={{marginTop:5}}
                
              >
                <Text>{currValue}</Text>
              </View>
            </TouchableOpacity>
        ) : '';

    return(
      <View>
          {/*this.state.selectedDate*/}
        <CalendarList
          minDate={this.state.minDate}
          markedDates={markedDates}
          disabledByDefault={true}
          onDayPress={ day => this._onDatePressed(day.dateString)}
          pastScrollRange={0}
          futureScrollRange={6}
          theme={{
            // dayTextColor: '#d9e1e8',
            // textDisabledColor: '#2d4150',
          }}
        />
        <Modal
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
          animationType="fade"
          transparent={true}
          isVisible={this.state.isModalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={{flex:1}}></View>
          <View style={{flex:1, backgroundColor:'white', padding:20,}}>
            <TouchableHighlight
              style={{alignItems: 'flex-end',}}
              onPress={() => this._setModalVisible(false)}>
              <Text>X</Text>
            </TouchableHighlight>
            <View>
              <Text style={styles.activityTitle}>
                Choose activity time
              </Text>
            </View>
            <View>
              <Text style={styles.activityDesc}>
                {Moment(selectedDate).format('dddd, D MMMM YYYY')}
              </Text>
            </View>
            {availableTimeList}
          </View>
        </Modal>
        <View style={globalStyles.bottomCtaBarContainer2}>
          <View style={{borderBottomWidth:1, borderBottomColor:'#cdcdcd', paddingBottom:10, marginBottom:20}}>
            <Text>{date}</Text>
            <Text>{selectedTime}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{alignItems: 'flex-start', flex:1.5}}>
              <View style={{marginTop:3}}>
                <Text style={{
                  color:'#000',
                  fontWeight: 'bold',
                  fontSize:17,
                }}>Rp 500.000</Text>
                {/*<Text>/ 2 orang</Text>*/}
              </View>
              <View>
                <Text style={{fontSize:15, color:'#000',}}>
                  per orang
                  {/* pax && pax.length>0 ? pax.length+' orang' : 'Start from'*/}
                </Text> 
              </View>
            </View>
            <View style={{alignItems: 'flex-end', flex:1, justifyContent:'flex-end'}}>
              <Button
                containerStyle={globalStyles.ctaButton}
                style={{fontSize: 16, color: '#fff', fontWeight:'bold'}}
                onPress={this._return}
              >
              Pilih
              </Button>
            </View>
            </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: '#fff',
    flex:1
  },
  activityTitle: {
    fontWeight:'bold',
    fontSize:15,
    color:'#454545',
    marginBottom:5
  },
  activityDesc: {
    fontSize:14,
    color:'#454545',
    lineHeight: 20,
  },
});