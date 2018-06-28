'use strict';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../../api/Common';
import { Permissions, Notifications } from 'expo';
import { NavigationActions } from 'react-navigation';
import { observable, action } from 'mobx';
const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export async function getMyBookingTrxList() {
  console.log("running getMyBookingTrxList");
  let shouldRefresh = await getItemAsync('shouldRefresh.myBookingTrxList');
  console.log("shouldRefresh: " + shouldRefresh)
  if (shouldRefresh) {
    deleteItemAsync('shouldRefresh.myBookingTrxList');
    myBookingStore.removeNewBookingMark();

    let fetched = await fetchMyBookingTrxList();
    if (fetched.status != 200)
      return [];

    return fetched.myBookings;
  }

  let myBookingsJson = await getItemAsync('myBookings');
  if (!myBookingsJson) {
    let fetched = await fetchMyBookingTrxList();
    if (fetched.status != 200)
      return [];

    return fetched.myBookings;
  } else {
    let myBookings = await JSON.parse(myBookingsJson);
    let bookings = myBookings.reduce((a, b) => a.concat(b.activities), []);
    myBookingTrxItemStore.setMyBookingTrxItem(myBookings);
    // setTimeout(() => downloadPdfVouchers(bookings), 0);
    return myBookings;
  }
}

export async function getMyBookingActivityList() {
  console.log("running getMyBookingActivityList");
  let shouldRefresh = await getItemAsync('shouldRefreshmyBookingActivityList');
  console.log("shouldRefresh: " + shouldRefresh)
  if (shouldRefresh) {
    deleteItemAsync('shouldRefreshmyBookingActivityList');
    myBookingStore.removeNewBookingMark();

    let fetched = await fetchMyBookingActivityList();
    if (fetched.status != 200)
      return [];

    return fetched.myReservations;
  }

  let myBookingsActivityJson = await getItemAsync('myBookingsActivity');
  if (!myBookingsActivityJson) {
    let fetched = await fetchMyBookingActivityList();
    if (fetched.status != 200)
      return [];

    return fetched.myReservations;
  } else {
    let myBookingsActivity = await JSON.parse(myBookingsActivityJson);
    myBookingActivityItemStore.setMyBookingActivityItem(myBookingsActivity);
    // setTimeout(() => downloadPdfVouchers(bookings), 0);
    return myBookingsActivity;
  }
}

export async function fetchMyBookingTrxList() {
  const version = 'v1';

  var lastUpdateFromStore = await getItemAsync('myBookingTrxLastUpdate');
  console.log(lastUpdateFromStore);
  var lastUpdate = lastUpdateFromStore ? lastUpdateFromStore : "";

  let request = {
    path: `/${version}/activities/mybooking/cart/active?lastupdate=${lastUpdate}`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let onPageMyBookingTrx = await getItemAsync("onMyBookingTrxPage");
  console.log("data my on page booking cart");
  console.log(onPageMyBookingTrx);
  let response = await fetchTravoramaApi(request);
  if (response.mustUpdate) {
    let myBookingsJson = await JSON.stringify(response.myBookings);
    console.log("last update json");
    await setItemAsync('myBookings', myBookingsJson);
    await setItemAsync('myBookingTrxLastUpdate', response.lastUpdate);
    console.log("bagian sini");
    myBookingTrxItemStore.setMyBookingTrxItem(response.myBookings);
    myBookingStore.setNewBookingMark();
  }
  return response;
}

export async function fetchMyBookingActivityList() {
  const version = 'v1';

  var lastUpdateFromStore = await getItemAsync('myBookingActivityLastUpdate');
  console.log(lastUpdateFromStore);
  var lastUpdate = lastUpdateFromStore ? lastUpdateFromStore : "";

  let request = {
    path: `/${version}/activities/mybooking/reservation/active?lastupdate=${lastUpdate}`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  if (response.mustUpdate) {
    let myReservationsJson = await JSON.stringify(response.myReservations);
    console.log("last update json");
    await setItemAsync('myBookingsActivity', myReservationsJson);
    await setItemAsync('myBookingActivityLastUpdate', response.lastUpdate);
    myBookingActivityItemStore.setMyBookingActivityItem(response.myReservations);
    myBookingStore.setNewBookingMark();

  }
  return response;
}

export async function shouldRefreshMyBookingTrxList() {
  setItemAsync('shouldRefresh.myBookingTrxList', 'true');
  deleteItemAsync("myBookingTrxLastUpdate");
  myBookingStore.setNewBookingMark();
  console.log("refreshing my bookinglist")
}

export async function shouldRefreshMyBookingActivityList() {
  setItemAsync('shouldRefreshmyBookingActivityList', 'true');
  deleteItemAsync("myBookingActivityLastUpdate");
  myBookingStore.setNewBookingMark();
  console.log("refreshing my bookinglist")
}

export async function myBookingListenerFunction({ origin, data }) {
  console.log("cool data: " + origin + data);
  if (data.function && data.function == "refreshMyBooking" && origin == "received") {
    console.log("refreshing my bookinglist");
    shouldRefreshMyBookingTrxList();
  }
  if (data.function && data.function == "refreshMyBooking" && origin == "selected") {
    console.log("selecting notif");
    goToMyBookingScreen();
  }
}

export function goToMyBookingScreen() {
  let { reset, navigate } = NavigationActions;
  shouldRefreshMyBookingTrxList();
  this.props.navigation.navigate("Main", 1);
}

export async function purgeMyBookingList() {
  deleteItemAsync('myBookings');
}

export async function cancelReservation(rsvNo) {
  const version = 'v1';
  let request = {
    path: `/${version}/activities/mybooking/${rsvNo}/cancel`,
    method: 'POST',
    requiredAuthLevel: AUTH_LEVEL.User
  }
  let response = await fetchTravoramaApi(request);
  return (response.status === 200);
}

export async function fetchMyBookingActivityHistoryList(startDate, endDate, page, perPage) {
  const version = 'v1';
  let request = {
    path: `/${version}/activities/mybooking?startDate=${startDate}&endDate=${endDate}&page=${page}&perPage=${perPage}`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  return response;
}

export async function fetchMyBookingTrxHistoryList(startDate, endDate, page, perPage) {
  const version = 'v1';
  let request = {
    path: `/${version}/activities/mybooking?startDate=${startDate}&endDate=${endDate}&page=${page}&perPage=${perPage}`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  return response;
}

async function downloadPdfVouchers(bookings) {
  console.log('download');

  for (let i = 0; i < bookings.length; i++) {
    let booking = bookings[i];
    if (!booking.isPdfUploaded)
      continue;
    let { rsvNo, pdfUrl } = booking;
    let directory = Expo.FileSystem.documentDirectory;
    let path = directory + 'myBookings/';
    let info = await Expo.FileSystem.getInfoAsync(path);
    let isDirectoryExist = info.exists && info.isDirectory;
    if (!isDirectoryExist)
      Expo.FileSystem.makeDirectoryAsync(path);
    let isLocalUriExist = await getItemAsync('myBookings.pdfVoucher.' + rsvNo);
    if (!isLocalUriExist) {
      let { status, uri } = await Expo.FileSystem.downloadAsync(pdfUrl, path + rsvNo);
      if (status == 200)
        await setItemAsync('myBookings.pdfVoucher.' + rsvNo, uri);
    }
  }
}
class MyBookingStoreMobx {
  @observable hasNewBooking = false;

  @action setNewBookingMark = () => {
    console.log('diset');
    this.hasNewBooking = true;
  }

  @action removeNewBookingMark = () => {
    console.log('dibuang');
    this.hasNewBooking = false;
  }
}

class MyBookingTrxItemStoreMobx {
  @observable myBookingTrxItem;

  @action setMyBookingTrxItem = item => {
    this.myBookingTrxItem = item;
    console.log("ngeset myBooking cart item mobx");
  }

  @action removeMyBookingTrxItem = () => {
    this.myBookingTrxItem = undefined;
  }
}

class MyBookingActivityItemStoreMobx {
  @observable myBookingActivityItem;

  @action setMyBookingActivityItem = item => {
    this.myBookingActivityItem = item;
    console.log("ngeset myBooking activities item mobx");
  }

  @action removeMyBookingActivityItem = () => {
    this.myBookingActivityItem = undefined;
  }
}

export const changeReservationToCancelMobx = rsvNo =>{
  myBookingActivityItemStore.myBookingActivityItem.forEach(a => {
    if(a.rsvNo == rsvNo){
      a.bookingStatus = "CancelByCustomer";
    }
  })
}

export const myBookingTrxItemStore = new MyBookingTrxItemStoreMobx;
export const myBookingActivityItemStore = new MyBookingActivityItemStoreMobx;
export const myBookingStore = new MyBookingStoreMobx;