import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';
import { StyleSheet, Platform, View, Text, TouchableOpacity,
          TouchableHighlight } from 'react-native';
import globalStyles from '../../commons/globalStyles';
import Modal from 'react-native-modal';
import Button from 'react-native-button';
import * as Formatter from '../components/Formatter';

export default class CalendarPicker extends Component {

  constructor (props) {
    super(props)
    let { selectedDate, selectedTime, availableDateTimes, price } =
      this.props.navigation.state.params;
    let markedDates = [];
    availableDateTimes && availableDateTimes.map( item => {
      markedDates[item.date] = {disabled: false};
      if (item.availableHours) {
        markedDates[item.date].availableHours = item.availableHours;
      }
    });
    if (selectedDate) markedDates[selectedDate].selected = true;

    this.state = {
      selectedDate, selectedTime, price, markedDates,
      // minDate : '2018-01-10', //// kalo ada yg minimal H-3 dsb
      minDate : Date(),
      isModalVisible: false,
      tempSelectedDate: null,
    };
  }

  static navigationOptions = {
    title: 'Pilih Tanggal',
  };

  _checkIsDateAvailable = dateString => {
    //// if clicked date is available, return true
    return !!this.state.markedDates[dateString];
  }


  //// TODO: sometimes all state has already changed but the ui only
  //// partly updated
  //// (only text is updated, CalendarList's marked date isn't)
  _selectDate = dateString => {
    let { selectedDate } = this.state;
    let markedDates = {...this.state.markedDates};
    //// set remove prev selectedDate from markedDates
    if (selectedDate) markedDates[selectedDate].selected = false;
    
    //// set selectedDate
    selectedDate = dateString;
    markedDates[dateString].selected = true;

    this.setState({ markedDates, selectedDate });
    return;
  }

  _return = () => {
    this.props.navigation.state.params.setSchedule({
      date: this.state.selectedDate,
      time: this.state.selectedTime || '',
    })
    this.props.navigation.goBack()
  }
  
  _setModalVisible = vis => this.setState({isModalVisible: vis})

  _onDayPressed = selectedDate => {
    let markedDates = {...this.state.markedDates}
    //// if the date is unavailable (disabled), do nothing
    if (this._checkIsDateAvailable(selectedDate) == false) return;

    //// choose session, if any
    if (!!markedDates[selectedDate].availableHours) {
      this.setState({tempSelectedDate: selectedDate})
      this._setModalVisible(true);
    } else {
    //// if not, change marked date immediately
      this._selectDate(selectedDate);
    }
  }

  _onAvailableHoursClicked = index => {
    let { tempSelectedDate} = this.state;
    let markedDates = {...this.state.markedDates};
    let selectedTime = markedDates[tempSelectedDate].availableHours[index]
    this.setState({selectedTime});
    this._selectDate(tempSelectedDate);
    this._setModalVisible(false);
  }

  render() {
    let {selectedDate, selectedTime, tempSelectedDate} = this.state;
    let markedDates = {...this.state.markedDates};
    let date = (selectedDate)
      ? Formatter.dateFullShort(selectedDate)
      : "Pilih Tanggal";

    let availableHoursList =
      (!!tempSelectedDate && !!markedDates[tempSelectedDate].availableHours) ?
        markedDates[tempSelectedDate].availableHours.map(
          (currValue, index) =>
            <TouchableOpacity
              key={index} style={styles.availableHoursItem}
              onPress={ () => this._onAvailableHoursClicked(index) }
            >
              <Text style={{marginTop:5}}>{currValue}</Text>
            </TouchableOpacity>
        ) : '';

    return(
      <View>
        <CalendarList
          minDate={this.state.minDate}
          markedDates={markedDates}
          disabledByDefault={true}
          onDayPress={ day => this._onDayPressed(day.dateString)}
          pastScrollRange={0}
          futureScrollRange={6}
          //theme={styles.theme}
        />

        <Modal
          style={styles.modal}
          animationType="fade"
          transparent={true}
          isVisible={this.state.isModalVisible}
        >
          <View style={{flex:1}} />
          <View style={{flex:1, backgroundColor:'white', padding:20,}}>
            <Text style={styles.activityTitle}>
              Choose activity time
            </Text>
            <Text style={styles.activityDesc}>
              {Formatter.dateFullLong(this.state.tempSelectedDate)}
            </Text>
            {availableHoursList}
          </View>
        </Modal>

        <View style={globalStyles.bottomCtaBarContainer2}>
          <View style={styles.bottomDateTimeContainer}>
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
                }}>{ Formatter.price(this.state.price) }</Text>
                {/*<Text>/ 2 orang</Text>*/}
              </View>
              <Text style={{fontSize:15, color:'#000',}}>
                ???????per orang????)
                {/* pax && pax.length>0 ? pax.length+' orang' : 'Start from'*/}
              </Text> 
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
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomDateTimeContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#cdcdcd',
    paddingBottom: 10,
    marginBottom: 20,
  },
  availableHoursItem: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomColor: '#efefef',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
  }
  // theme: { dayTextColor: '#d9e1e8', textDisabledColor: '#2d4150',},
});