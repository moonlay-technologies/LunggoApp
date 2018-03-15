'use strict';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../../api/Common';

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
