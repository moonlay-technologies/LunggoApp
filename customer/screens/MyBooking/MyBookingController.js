'use strict';
import {fetchTravoramaApi, AUTH_LEVEL} from '../../../api/Common';

export async function getBookingList () {
  const version = 'v1';
  let request = {
    path: `/${version}/activities/mybooking`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  let {status} = response;
  if (status == 200) return {list: response.myBookings, status};
  else return response;
}
