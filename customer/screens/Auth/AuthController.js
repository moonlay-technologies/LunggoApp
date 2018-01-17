'use strict';
import {fetchTravoramaApi, AUTH_LEVEL} from '../../../api/Common';

export async function getProfile () {
  const version = 'v1';
  let request = {
    path: `/${version}/profile`,
    requiredAuthLevel: AUTH_LEVEL.User,
  }
  let response = await fetchTravoramaApi(request);
  let {status} = response;
  if (status == 200) {
  	let {name, email, countryCallCd, phone } = response;
  	return {
      status,
      contact: {
        name, email, phone,
    		countryCode: countryCallCd,
    	},
    };
  }
  else return response;
}
