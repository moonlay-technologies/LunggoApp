'use strict';
import { fetchTravoramaApi } from '../api/Common';
import { AUTH_LEVEL } from '../constants/env';

const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export async function fetchProfile() {
  const version = 'v1';
  let request = {
    path: `/${version}/profile`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  let { status } = response;
  if (status == 200) {
    let { name, email, countryCallCd, phone } = response;
    await setItemAsync('profile', JSON.stringify(response));
    return {
      status, contact: { name, email, phone, countryCallCd },
    };
  }
  else return response;
}

export async function getProfile() {
  let contactJson = await getItemAsync('profile');
  if (!contactJson) return { contact:{} };
  let contact = JSON.parse(contactJson);
  return { contact };
}