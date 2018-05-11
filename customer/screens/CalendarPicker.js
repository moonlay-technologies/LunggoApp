/* BUGS:
    when user repeatedly tap date, selectedDate pointer will gone
*/

'use strict';

import React from 'react';
import { CalendarList } from 'react-native-calendars';
import {
  StyleSheet, Platform, View, Text, TouchableOpacity,
} from 'react-native';
import globalStyles from '../../commons/globalStyles';
import Modal from 'react-native-modal';
import Button from 'react-native-button';
import * as Formatter from '../components/Formatter';

export default class CalendarPicker extends React.Component {

  constructor(props) {
    super(props)
    let { selectedDate, selectedTime, availableDateTimes, price, selectedPaxSlot
    } = props.navigation.state.params;
    let markedDates = {};
    availableDateTimes.map(item => {
      //// if the date has passed, do nothing
      if (new Date(item.date) < new Date()) return;
      //// set markedDates to record every date in available date
      markedDates[item.date] = { disabled: false };
      if (item.availableSessionAndPaxSlots) {
        markedDates[item.date].availableSessionAndPaxSlots = item.availableSessionAndPaxSlots;
      }
    });
    if (selectedDate) markedDates[selectedDate].selected = true;

    this.state = {
      selectedDate, selectedTime, price, markedDates, selectedPaxSlot,
      minDate: Date(), //'2018-01-10',////kalo ada yg minimal H-3 dsb
      isModalVisible: false,
      tempSelectedDate: null,
    };
  }

  static navigationOptions = {
    title: 'Pilih Tanggal',
  }

  _checkIsDateAvailable = dateString => {
    //// if clicked date is available, return true
    return !!this.state.markedDates[dateString];
  }

  _selectDate = dateString => {
    let prevSelectedDate = this.state.selectedDate;
    let { markedDates } = this.state;
    let changedDate = {
      [prevSelectedDate]: { ...markedDates[prevSelectedDate] },
      [dateString]: { ...markedDates[dateString], selected: true }
    };

    //// if there's previous selectedDate, remove the selected flag
    if (prevSelectedDate) changedDate[prevSelectedDate].selected = false;
    this.setState({
      markedDates: { ...markedDates, ...changedDate },
      selectedDate: dateString
    });
  }

  _return = () => {
    this.props.navigation.state.params.setSchedule({
      date: this.state.selectedDate,
      time: this.state.selectedTime || '',
      paxSlot: this.state.selectedPaxSlot,
    })
    this.props.navigation.goBack()
  }

  _setModalVisible = vis => this.setState({ isModalVisible: vis })

  _closeModal = () => this._setModalVisible(false)

  _onDayPressed = selectedDate => {
    let markedDates = { ...this.state.markedDates }
    //// if the date is unavailable (disabled), do nothing
    if (this._checkIsDateAvailable(selectedDate) == false) return;

    //// choose session, if any
    if (!!markedDates[selectedDate].availableSessionAndPaxSlots[0].availableHour) {
      this.setState({ tempSelectedDate: selectedDate })
      this._setModalVisible(true);
    } else {
      //// if not, change marked date immediately
      this.setState({ selectedTime: null });
      this._selectDate(selectedDate);
      this.setState({ selectedPaxSlot: markedDates[selectedDate].availableSessionAndPaxSlots[0].paxSlot })
    }
  }

  _onAvailableHoursClicked = index => {
    let { tempSelectedDate } = this.state;
    let markedDates = { ...this.state.markedDates };
    let selectedTime = markedDates[tempSelectedDate].availableSessionAndPaxSlots[index].availableHour;
    let selectedPaxSlot = markedDates[tempSelectedDate].availableSessionAndPaxSlots[index].paxSlot;
    this.setState({ selectedTime, selectedPaxSlot });
    this._selectDate(tempSelectedDate);
    this._setModalVisible(false);
  }

  render() {
    let { selectedDate, selectedTime, tempSelectedDate, selectedPaxSlot } = this.state;
    let markedDates = { ...this.state.markedDates };
    let date = (selectedDate)
      ? Formatter.dateFullShort(selectedDate)
      : <Text style={styles.activityDesc1}>Pilih Tanggal</Text>;

    let availableHoursList =
      (!!tempSelectedDate && !!markedDates[tempSelectedDate].availableSessionAndPaxSlots) ?
        markedDates[tempSelectedDate].availableSessionAndPaxSlots.map(
          (currValue, index) =>
            <View
              key={index} style={styles.availableHoursItem}
            >
              <View style={{flexDirection:'row', flex:1}}>
                <View style={{flex:1}}>
                  <Text style={styles.activityDesc1}>{currValue.availableHour}</Text>
                  {currValue.paxSlot <= 5 && <Text style={styles.slot}>Tersisa {currValue.paxSlot} slot lagi!</Text>}
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                  <Button
                    containerStyle={globalStyles.ctaButton7}
                    style={{ fontSize: 14, color: '#fff' }}
                    onPress={() => this._onAvailableHoursClicked(index)}
                  >
                    Pilih
                  </Button>
                </View>
              </View>

            </View>
        )
        : null;

    return (
      <View>
        <CalendarList
          minDate={this.state.minDate}
          markedDates={markedDates}
          disabledByDefault={true}
          onDayPress={day => this._onDayPressed(day.dateString)}
          pastScrollRange={0}
          futureScrollRange={6}
        //theme={styles.theme}
        />

        <Modal
          style={styles.modal}
          transparent={true}
          isVisible={this.state.isModalVisible}
          onBackdropPress={this._closeModal}
          onBackButtonPress={this._closeModal}

        >
          <View style={{ backgroundColor: 'white', padding: 20, }}>
            <Text style={styles.activityTitle}>
              Pilih jadwal
            </Text>
            <Text style={[styles.activityDesc,{marginBottom:10}]}>
              {Formatter.dateFullLong(this.state.tempSelectedDate)}
            </Text>
            {availableHoursList}
          </View>
        </Modal>

        <View style={globalStyles.bottomCtaBarContainer2}>
          <View style={styles.bottomDateTimeContainer}>
            <Text style={styles.activityDesc}>{date}</Text>
            <Text style={styles.activityDesc}>{selectedTime}</Text>
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={{alignItems: 'flex-start', flex:1.5, justifyContent:'center'}}>
              <View>
                <Text style={{
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: 17,
                }}>{Formatter.price(this.state.price)}</Text>
                {/*<Text>/ 2 orang</Text>*/}
              </View>
              {/* <Text style={{fontSize:15, color:'#000',}}>
                {Formatter.price(this.state.price/this.state.pax)} per orang
                pax && pax.length>0 ? pax.length+' orang' : 'Start from'
              </Text>  */}
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1, justifyContent: 'flex-end' }}>
              <Button
                containerStyle={globalStyles.ctaButton}
                style={{ fontSize: 16, color: '#fff', fontWeight: 'bold' }}
                onPress={this._return}
              >
                OK
              </Button>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  activityTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#454545',
    marginBottom: 5
  },
  activityDesc: {
    fontSize: 15,
    color: '#454545',
    fontFamily: 'Hind',
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
  activityDesc1: {
    fontSize: 16,
    color: '#454545',
    fontFamily: 'Hind-SemiBold',
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
  activityDesc2: {
    fontSize: 13,
    color: '#767676',
    fontFamily: 'Hind',
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
  slot: {
    fontSize: 13,
    color: '#ff0000',
    fontFamily: 'Hind',
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomDateTimeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#efefef',
    paddingBottom: 10,
    marginBottom: 20,
  },
  availableHoursItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopColor: '#efefef',
    borderTopWidth: 1,
    paddingVertical: 15,
  }
  // theme: { dayTextColor: '#d9e1e8', textDisabledColor: '#2d4150',},
});