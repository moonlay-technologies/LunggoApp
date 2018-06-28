'use strict';
import { observable, action } from 'mobx';

class MyBookingStoreMobx {
  
  @observable hasNewBooking = false;
  @observable pendingMyBookingTrxs = null;
  @observable activeMyBookings = null;
  @observable unreviewedMyBookings = null;
  @observable myBookingHistories = null;
  
  @action setNewBookingMark = () => this.hasNewBooking = true
  @action removeNewBookingMark = () => this.hasNewBooking = false

  @action setMyBookingStore = (state, list) => {
    const observable = this._getObservableNameFromMyBookingState(state);
    this[observable] = list;
  }

  removeMyBookingStore = state => this.setMyBookingStore(state, null)

  _getObservableNameFromMyBookingState(state) {
    if (state == 'pending')
      return 'pendingMyBookingTrxs';
    else if (state == 'active')
      return 'activeMyBookings';
    else if (state == 'unreviewed')
      return 'unreviewedMyBookings';
    else if (state == 'history')
      return 'myBookingHistories';
    else
      throw `MyBookingController MyBookingStoreMobx.setMyBookingStore: state not recognized, expected 'pending', 'active', 'unreviewed', or 'history' but got '${state}' instead`;
  }

}

export const cancelReservationInMobX = rsvNo => {
  MyBookingStoreMobx.activeMyBookings.forEach(a => {
    if (a.rsvNo == rsvNo) {
      a.bookingStatus = "CancelByCustomer";
    }
  });
}

export const myBookingStore = new MyBookingStoreMobx;