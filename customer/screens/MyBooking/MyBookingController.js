'use strict';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../../api/Common';

const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export async function getMyBookingList() {
  let myBookingsJson = await getItemAsync('myBookings');
  if (!myBookingsJson) {
    let fetched = await fetchMyBookingList();
    if (fetched.status != 200)
      return [];

    let myBookingsJson = await JSON.stringify(fetched.myBookings);
    await setItemAsync('myBookings', myBookingsJson);
    return myBookings;
  } else {
    let myBookings = await JSON.parse(myBookingsJson);
    return myBookings;
  }
}

async function fetchMyBookingList() {
  const version = 'v1';
  let request = {
    path: `/${version}/activities/mybooking`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  return response;
}
