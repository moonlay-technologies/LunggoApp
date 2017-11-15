import {clientId, clientSecret, deviceId,
  DOMAIN, AUTH_LEVEL } from '../constants/env';
// function fetchWrapper(url, method, headers, data, then, error) {
//   headers.Accept = headers["Content-Type"] = "application/json";
//   fetch(url, {method, headers, body: JSON.stringify(data) })
//   .then(response => response.json())
//   .then(then).catch(error);
// }

const {getItemAsync,setItemAsync,deleteItemAsync} = Expo.SecureStore;
export async function fetchTravoramaLoginApi(username, password) {
  let url = DOMAIN + '/v1/login';
  let data = {clientId, clientSecret, deviceId, username, password};
  setItemAsync('authLevel', AUTH_LEVEL.User)
  //redundant with getAuthAccess()
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });
  response = await response.json();
  ({accessToken, refreshToken, expTime, status} = response);
  switch (status + '') { //// cast to string
    case '200':
      setItemAsync('accessToken', accessToken);
      setItemAsync('refreshToken', refreshToken);
      setItemAsync('expTime', expTime);
      break;
    case '400':
    case '500':
    default:
      console.log('error ' + status)
  }
  //end of redundant
  return response;
}

async function getAuthAccess() {
  let url = DOMAIN + '/v1/login';
  try {
    let [accessToken, refreshToken, expTime, authLevel] = 
        await Promise.all([
          getItemAsync('accessToken'), getItemAsync('refreshToken'),
          getItemAsync('expTime'), getItemAsync('authLevel')
        ]);
    //console.log(accessToken)
    let data = {clientId, clientSecret, deviceId};
    if( new Date(expTime) > new Date() ) { //// token not expired
      //already logged in, go to next step
      return {accessToken, authLevel};
    } //// else then token is expired or client dont have expTime
    if (refreshToken) {
      console.log('login-by-refreshToken---------')
      data.refreshToken = refreshToken;
    } else {
      console.log('login-as-guest---------')
      authLevel = AUTH_LEVEL.Guest
      setItemAsync('authLevel', AUTH_LEVEL.Guest);
    }

    console.log('prepare fetching auth')
    let response = await fetch(url, {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });
    response = await response.json();
    console.log(response)
    ({accessToken, refreshToken, expTime, status} = response);
    switch (status + '') { //// cast to string
      case '200':
        setItemAsync('accessToken', accessToken);
        setItemAsync('refreshToken', refreshToken);
        setItemAsync('expTime', expTime);
        break;
      case '400':
      case '500':
      default:
        console.log('error ' + status)
    }
    return {accessToken, authLevel};
  } catch (error) {
    console.log('get auth access error');
    console.log(error);
  }
}

//// fetch API
export async function fetchTravoramaApi (request) {
  let {path, method, data, requiredAuthLevel} = request;
  if (!requiredAuthLevel)
    throw 'ERROR fetch: requiredAuthLevel needed!';

  //// Get auth info and check if user authorized for the request
  let {accessToken, authLevel} = await getAuthAccess();
  //// check if client have sufficent authLevel for request
  if (authLevel < requiredAuthLevel) return {
    status: 400, message:'Not Authorized!', requiredAuthLevel
  }

  //// Execute request
  let url = DOMAIN + (path || request);
  let response = await fetch(url, {
    method: method || 'GET',
    headers: {
      accessToken,
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request.data),
  });
  if (response.status == 401) {
    await deleteItemAsync('expTime');
    return fetchTravoramaApi(request);
  }
  response = await response.json();
  console.log(response) ///
  return response;
}
