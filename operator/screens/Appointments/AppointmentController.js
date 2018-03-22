'use strict';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../../api/Common';

const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export async function fetchAppointmentRequests() {
  const version = 'v1';
  let request = {
    path: `/${version}/operator/appointments/request`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  try {
    return await fetchTravoramaApi(request);
  } catch (error) {
    console.error(error);
  }
}

export const fetchAppointmentList = async () => {
  const version = 'v1';
  const path = `/${version}/operator/appointments`;
  let request = { path, requiredAuthLevel: AUTH_LEVEL.Guest }
  try {
    let list = await fetchTravoramaApi(request);
    await setItemAsync('appointmentList', JSON.stringify(list));
    console.log('list');
    console.log(list);
    return list;
  } catch (error) {
    console.log(error);
  }
}

export const getAppointmentList = async () => {
  let shouldRefresh = await getItemAsync('shouldRefresh.appointmentList');
  console.log('shouldRefresh');
  console.log(shouldRefresh);
  if (shouldRefresh) {
    deleteItemAsync('shouldRefresh.appointmentList');
    return fetchAppointmentList();
  }

  let listJson = await getItemAsync('appointmentList');
  console.log('listJson');
  console.log(listJson);
  if (!listJson) return fetchAppointmentList();

  let list = JSON.parse(listJson);
  return list;
}

export async function shouldRefreshAppointmentList() {
  setItemAsync('shouldRefresh.appointmentList', 'true');
}