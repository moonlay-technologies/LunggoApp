'use strict';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../../api/Common';

export async function fetchAppointmentRequests() {
  const version = 'v1';
  let request = {
    path: `/${version}/operator/appointments/request`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  fetchTravoramaApi(request).then(response => {
    return response;
  }).catch(error => console.log(error));
}
