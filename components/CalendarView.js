import React, { Component } from 'react';
import { CalendarList } from 'react-native-calendars';
// import {StyleSheet} from 'react-native';

export default class CalendarView extends Component {

  calendar = '';
  _selectDay = (day) => {
    calendar.props.markingType = 'simple'
    calendar.props.markedDates[day] = [{textColor: 'green'}]
    // calendar.props.minDate = '2017-10-23'
    console.log(day)
  }

  render() {
  calendar = <CalendarList
    minDate={Date()}
    pastScrollRange={0}
    futureScrollRange={12}
    onDayPress={ (day) => this._selectDay(day)}
    markedDates={{
      '2017-10-23': [{textColor: '#d9e1e8'}],
      '2017-10-24': [{textColor: '#d9e1e8'}],
      '2017-11-20': [{textColor: 'green'}],
      '2017-11-22': [{startingDay: true, color: 'green'}],
      '2017-11-23': [{color: 'green', textColor: 'gray'}],
      '2017-11-24': [{endingDay: true, color: 'green', textColor: 'gray'}],
      '2017-11-04': [{startingDay: true, color: 'green'}, {endingDay: true, color: 'green'}]
    }}
    markingType={'interactive'}
  />

    return (calendar);
  }
}

/* For calendar styling and themes, check out
   https://github.com/wix/react-native-calendars#customizing-look--feel
*/
// var styles = StyleSheet.create({
  // blablabla: {
  // },
// });