'use strict';
import { fetchTravoramaApi } from '../../api/Common';
import { clientId, clientSecret, deviceId, API_DOMAIN, AUTH_LEVEL,
} from '../../constants/env';

export async function getProfile() {
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
      status, contact: { name, email, phone, countryCallCd },
    };
  }
  else return response;
}

async function fetchAuth(data) {
  let url = API_DOMAIN + '/v1/login';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }).catch(console.error);
  response = await response.json();
  // __DEV__ && console.log('AUTH response:');
  // __DEV__ && console.log(response);
  return response;
}

const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export async function fetchTravoramaLoginApi(userName, password) {
  let data = { clientId, clientSecret, deviceId, userName, password };
  //redundant with getAuthAccess()

  let response = await fetchAuth(data);

  switch (response.status + '') { //// cast to string
    case '200':
      ({ accessToken, refreshToken, expTime } = response);
      setItemAsync('accessToken', accessToken);
      setItemAsync('refreshToken', refreshToken);
      setItemAsync('authLevel', AUTH_LEVEL.User);
      setItemAsync('expTime', expTime);
      break;
    case '400':
    case '500':
    default:
      console.log('LOGIN API error ' + response.status);
      console.log('LOGIN API request data:');
      console.log(data);
  }
  //end of redundant
  return response;
}

export async function getAuthAccess() {
  try {
    let [accessToken, refreshToken, expTime, authLevel] =
      await Promise.all([
        getItemAsync('accessToken'), getItemAsync('refreshToken'),
        getItemAsync('expTime'), getItemAsync('authLevel')
      ]);
    let data = { clientId, clientSecret, deviceId };
    if ( new Date(expTime) > new Date() ) { //// token not expired
      console.log(
        'session not expired, continue the request...'
      )
      //already logged in, go to next step
      return { accessToken, authLevel };
    } //// else then token is expired or client dont have expTime
    else if (refreshToken) {
      console.log('....     prepare login by refreshToken')
      data.refreshToken = refreshToken;
    } else {
      console.log('....     login as guest')
      authLevel = AUTH_LEVEL.Guest;
    }

    let response = await fetchAuth(data);
    
    switch (response.status + '') { //// cast to string
      case '200':
        ({ accessToken, refreshToken, expTime } = response);
        setItemAsync('accessToken', accessToken);
        setItemAsync('refreshToken', refreshToken);
        setItemAsync('expTime', expTime);
        setItemAsync('authLevel', authLevel);
        break;
      case '400':
      case '500':
      default:
        await removeAccessToken();
        return getAuthAccess();
    }
    return { accessToken, authLevel };
  } catch (error) {
    console.log('get auth access error');
    console.log(error);
    // console.error('get auth access error');
  }
}

export async function checkUserLoggedIn(request) {
  let { authLevel } = await getAuthAccess();
  return (authLevel >= AUTH_LEVEL.User);
}

export async function removeAccessToken() {
  await Promise.all([
    deleteItemAsync('accessToken'), deleteItemAsync('refreshToken'),
    deleteItemAsync('expTime'), deleteItemAsync('authLevel')
  ]);
  return;
}
