'use strict';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../../api/Common';
import { Permissions, Notifications } from 'expo';
import { NavigationActions } from 'react-navigation';
import { observable, action } from 'mobx';
const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export async function getMyBookingTrxList() {
  const dataVarName = 'myBookings';
  const shouldRefreshVarName = 'shouldRefresh.myBookingTrxList';
  getBookingList('cartList', dataVarName, shouldRefreshVarName);
}

export async function getMyBookingActivityList() {
  const dataVarName = 'myBookingsActivity';
  const shouldRefreshVarName = 'shouldRefreshmyBookingActivityList';
  getBookingList('reservationList', dataVarName, shouldRefreshVarName)
}

async function getBookingList(listType, dataVarName, shouldRefreshVarName) {
  const shouldRefreshFromServer = await getItemAsync(shouldRefreshVarName);
  if (shouldRefreshFromServer) {
    deleteItemAsync(shouldRefreshVarName);
    myBookingStore.removeNewBookingMark();
    return getListFromServer(listType);
  }
  const secureStoreJSONData = await getItemAsync(dataVarName);
  if (secureStoreJSONData) {
    const parsedSecureStoreData = await JSON.parse(secureStoreJSONData);
    setMobXBookingItem(parsedSecureStoreData, listType);
    // let bookings = parsedSecureStoreData.reduce((a, b) => a.concat(b.activities), []);
    // setTimeout(() => downloadPdfVouchers(bookings), 0);
    return parsedSecureStoreData;
  } else {
    return getListFromServer(listType);
  }
}

async function getListFromServer(listType) {
  const fetched = listType == 'cartList'
    ? await fetchMyBookingTrxList()
    : await fetchMyBookingActivityList();
  if (fetched.status != 200)
    return [];
  else return listType == 'cartList'
    ? fetched.myBookings
    : fetched.myReservations;
}

export async function fetchMyBookingTrxList() {
  const responseVarName = 'myBookings';
  const secureStoreVarName = 'myBookings';
  const lastUpdateVarName = 'myBookingTrxLastUpdate';
  const itemType = 'cart';
  return fetchFromServer(itemType, responseVarName, secureStoreVarName, lastUpdateVarName);
}

export async function fetchMyBookingActivityList() {
  const responseVarName = 'myReservations';
  const secureStoreVarName = 'myBookingsActivity';
  const lastUpdateVarName = 'myBookingActivityLastUpdate';
  const itemType = 'reservation';
  return fetchFromServer(itemType, responseVarName, secureStoreVarName, lastUpdateVarName);
}

async function fetchFromServer(itemType, responseVarName, secureStoreVarName, lastUpdateVarName) {
  const version = 'v1';
  const lastUpdate = await getItemAsync(lastUpdateVarName) || '';
  const request = {
    path: `/${version}/activities/mybooking/${itemType}/active?lastupdate=${lastUpdate}`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  if (response.mustUpdate) {
    let listJSON = await JSON.stringify(response[responseVarName]);
    
    await setItemAsync(secureStoreVarName, listJSON);
    await setItemAsync(lastUpdateVarName, response.lastUpdate);
    
    setMobXBookingItem(response[responseVarName], `${itemType}List`);
    myBookingStore.setNewBookingMark();
  }
  return response;
}

function setMobXBookingItem (data, listType) {
  if (listType == 'cartList')
    myBookingTrxItemStore.setMyBookingTrxItem(data);
  else
    myBookingActivityItemStore.setMyBookingActivityItem(data);
}

export async function shouldRefreshMyBookingTrxList() {
  setItemAsync('shouldRefresh.myBookingTrxList', 'true');
  deleteItemAsync("myBookingTrxLastUpdate");
  myBookingStore.setNewBookingMark();
}

export async function shouldRefreshMyBookingActivityList() {
  setItemAsync('shouldRefreshmyBookingActivityList', 'true');
  deleteItemAsync("myBookingActivityLastUpdate");
  myBookingStore.setNewBookingMark();
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
  return await fetchTravoramaApi(request);
}

export async function fetchMyBookingTrxHistoryList(startDate, endDate, page, perPage) {
  const version = 'v1';
  let request = {
    path: `/${version}/activities/mybooking?startDate=${startDate}&endDate=${endDate}&page=${page}&perPage=${perPage}`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  return await fetchTravoramaApi(request);
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
  @observable hasNewBooking = false

  @action setNewBookingMark = () => {
    this.hasNewBooking = true;
  }

  @action removeNewBookingMark = () => {
    this.hasNewBooking = false;
  }
}

class MyBookingTrxItemStoreMobx {
  @observable myBookingTrxItem

  @action setMyBookingTrxItem = item => {
    this.myBookingTrxItem = item;
  }

  @action removeMyBookingTrxItem = () => {
    this.myBookingTrxItem = undefined;
  }
}

class MyBookingActivityItemStoreMobx {
  @observable myBookingActivityItem

  @action setMyBookingActivityItem = item => {
    this.myBookingActivityItem = item;
  }

  @action removeMyBookingActivityItem = () => {
    this.myBookingActivityItem = undefined;
  }
}

export const changeReservationToCancelMobx = rsvNo =>{
  myBookingActivityItemStore.myBookingActivityItem.map(a => {
    if(a.rsvNo == rsvNo){
      a.bookingStatus = "CancelByCustomer";
    }
  })
}

export const myBookingTrxItemStore = new MyBookingTrxItemStoreMobx;
export const myBookingActivityItemStore = new MyBookingActivityItemStoreMobx;
export const myBookingStore = new MyBookingStoreMobx;