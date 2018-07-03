'use strict';

// import { downloadPdfVouchers } from "./MyBookingHelpers";
// import { myBookingStore } from "./MyBookingStore";
import MyBookingStoreMobX from "./MyBookingStore";
import { fetchTravoramaApi, AUTH_LEVEL } from '../../../api/Common';
import { NavigationActions } from 'react-navigation';
const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export const myBookingStore = new MyBookingStoreMobX();


export async function getMyBookingTrxList() {
  const secureStoreVarName = 'myBookings';
  const shouldRefreshVarName = 'shouldRefresh.myBookingTrxList';
  getBookingList('pending', secureStoreVarName, shouldRefreshVarName);
}

export async function getMyBookingActivityList() {
  const secureStoreVarName = 'myBookingsActivity';
  const shouldRefreshVarName = 'shouldRefreshmyBookingActivityList';
  getBookingList('active', secureStoreVarName, shouldRefreshVarName)
}

export async function getUnreviewedBookingList() {
  const secureStoreVarName = 'unreviewedMyBookings';
  const shouldRefreshVarName = 'shouldRefresh.unreviewedBookingList';
  getBookingList('unreviewed', secureStoreVarName, shouldRefreshVarName)
}

export async function getMyBookingHistoryList() {
  const secureStoreVarName = 'myBookingHistories';
  const shouldRefreshVarName = 'shouldRefresh.myBookingHistoryList';
  getBookingList('history', secureStoreVarName, shouldRefreshVarName)
}

async function getBookingList(myBookingState, secureStoreVarName, shouldRefreshVarName) {
  const shouldRefreshFromServer = await getItemAsync(shouldRefreshVarName);
  if (shouldRefreshFromServer) {
    deleteItemAsync(shouldRefreshVarName);
    myBookingStore.removeNewBookingMark();
    return getListFromServer(myBookingState);
  }
  const secureStoreJSONData = await getItemAsync(secureStoreVarName);
  if (secureStoreJSONData) {
    const parsedSecureStoreData = await JSON.parse(secureStoreJSONData);
    myBookingStore.setMyBookingStore(myBookingState, parsedSecureStoreData);
    // let bookings = parsedSecureStoreData.reduce((a, b) => a.concat(b.activities), []);
    // setTimeout(() => downloadPdfVouchers(bookings), 0);
    return parsedSecureStoreData;
  } else {
    return getListFromServer(myBookingState);
  }
}

async function getListFromServer(myBookingState) {
  let fetchFn;
  switch (myBookingState) {
    case 'pending':
      fetchFn = fetchMyBookingTrxList;
      break;
    case 'active':
      fetchFn = fetchMyBookingActivityList;
      break;
    case 'unreviewed':
      fetchFn = fetchUnreviewedBookingList;
      break;
    case 'history':
      fetchFn = fetchBookingHistoryList;
      break;
  }
  const fetched = await fetchFn();
  if (fetched.status == 200)
    return fetched.data;
  throw `status not 200 while fetching myBooking ${myBookingState}`;
}

export async function fetchMyBookingTrxList() {
  const secureStoreVarName = 'myBookings';
  const lastUpdateVarName = 'myBookingTrxLastUpdate';
  const itemStructure = 'trx';
  const myBookingState = 'pending';
  return fetchFromServer(myBookingState, itemStructure, secureStoreVarName, lastUpdateVarName);
}

export async function fetchMyBookingActivityList() {
  const secureStoreVarName = 'myBookingsActivity';
  const lastUpdateVarName = 'myBookingActivityLastUpdate';
  const itemStructure = 'reservation';
  const myBookingState = 'active';
  return fetchFromServer(myBookingState, itemStructure, secureStoreVarName, lastUpdateVarName);
}

export async function fetchUnreviewedBookingList() {
  const secureStoreVarName = 'unreviewedMyBookings';
  const lastUpdateVarName = secureStoreVarName + 'LastUpdate';
  const itemStructure = 'reservation';
  const myBookingState = 'unreviewed';
  return fetchFromServer(myBookingState, itemStructure, secureStoreVarName, lastUpdateVarName);
}

export async function fetchBookingHistoryList() {
  const secureStoreVarName = 'myBookingHistories';
  const lastUpdateVarName = secureStoreVarName + 'LastUpdate';
  const itemStructure = 'reservation';
  const myBookingState = 'history';
  return fetchFromServer(myBookingState, itemStructure, secureStoreVarName, lastUpdateVarName);
}

async function fetchFromServer(myBookingState, itemStructure, secureStoreVarName, lastUpdateVarName) {
  const version = 'v1';
  const lastUpdate = await getItemAsync(lastUpdateVarName) || '';
  // if (itemStructure == 'trx') myBookingState = 'active';
  const request = {
    path: `/${version}/activities/mybooking/${itemStructure}?state=${myBookingState}&lastupdate=${lastUpdate}&perpage=1000`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  if (response.mustUpdate) {
    const listJSON = JSON.stringify(response.list);
    await setItemAsync(secureStoreVarName, listJSON);
    await setItemAsync(lastUpdateVarName, response.lastUpdate);
    
    myBookingStore.setMyBookingStore(myBookingState, response.list);
    myBookingStore.setNewBookingMark();
  }
  return response;
}

export async function shouldRefreshMyBookingTrxList() {
  await setItemAsync('shouldRefresh.myBookingTrxList', 'true');
  await deleteItemAsync("myBookingTrxLastUpdate");
  myBookingStore.setNewBookingMark();
}

export async function shouldRefreshMyBookingActivityList() {
  await setItemAsync('shouldRefreshmyBookingActivityList', 'true');
  await deleteItemAsync("myBookingActivityLastUpdate");
  myBookingStore.setNewBookingMark();
}

export async function shouldRefreshUnreviewedMyBookingList() {
  setItemAsync('shouldRefreshUnreviewedMyBookingList', 'true');
  deleteItemAsync("unreviewedMyBookingsLastUpdate");
  myBookingStore.setNewBookingMark();
}

export async function shouldRefreshMyBookingHistoryList() {
  setItemAsync('shouldRefreshMyBookingHistoryList', 'true');
  deleteItemAsync("myBookingHistoriesLastUpdate");
  myBookingStore.setNewBookingMark();
}

export async function myBookingListenerFunction({ origin, data }) {
  if (data.function && data.function == "refreshMyBooking" && origin == "received") {
    shouldRefreshMyBookingTrxList();
  }
  if (data.function && data.function == "refreshMyBooking" && origin == "selected") {
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

export async function cancelReservation(rsvNo,cancellationReason) {
  const version = 'v1';
  let request = {
    path: `/${version}/activities/mybooking/${rsvNo}/cancel`,
    method: 'POST',
    requiredAuthLevel: AUTH_LEVEL.User,
    data: {
      cancellationReason: cancellationReason
    }
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
