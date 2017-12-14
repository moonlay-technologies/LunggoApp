import {clientId, clientSecret, deviceId,
  DOMAIN, AUTH_LEVEL } from '../constants/env';
// function fetchWrapper(url, method, headers, data, then, error) {
//   headers.Accept = headers["Content-Type"] = "application/json";
//   fetch(url, {method, headers, body: JSON.stringify(data) })
//   .then(response => response.json())
//   .then(then).catch(error);
// }

const {getItemAsync,setItemAsync,deleteItemAsync} = Expo.SecureStore;
export {AUTH_LEVEL} from '../constants/env';


async function fetchAuth(data) {
  let url = DOMAIN + '/v1/login';
  let response = await fetch(url, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  }).catch(console.error);
  response = await response.json();
  console.log('AUTH response:')
          __DEV__ && console.log(response);
  return response;
}

export async function fetchTravoramaLoginApi(userName, password) {
  let data = {clientId, clientSecret, deviceId, userName, password};
  //redundant with getAuthAccess()

  let response = await fetchAuth(data);
  ({accessToken, refreshToken, expTime, status} = response);
  switch (status + '') { //// cast to string
    case '200':
      setItemAsync('accessToken', accessToken);
      setItemAsync('refreshToken', refreshToken);
      setItemAsync('authLevel', AUTH_LEVEL.User);
          if (__DEV__) console.log(response)
      setItemAsync('expTime', expTime);
      break;
    case '400':
    case '500':
    default:
      console.log('LOGIN API error ' + status);
      console.log('LOGIN API request data:');
      console.log(data);
  }
  //end of redundant
  return response;
}

async function getAuthAccess() {
  try {
    let [accessToken, refreshToken, expTime, authLevel] = 
        await Promise.all([
          getItemAsync('accessToken'), getItemAsync('refreshToken'),
          getItemAsync('expTime'), getItemAsync('authLevel')
        ]);
    let data = {clientId, clientSecret, deviceId};
    // console.log('accessToken: '+accessToken);
    // console.log('refreshToken: '+refreshToken);
    // console.log('expTime    : '+expTime+ '; authLevel: '+authLevel);
    // console.log('new Date() : '+new Date().toISOString())
    if( new Date(expTime) > new Date() ) { //// token not expired
      console.log(
        'session not expired, continue the request...'
      )
      //already logged in, go to next step
      return {accessToken, authLevel};
    } //// else then token is expired or client dont have expTime
    else if (refreshToken) {
      console.log('....     prepare login by refreshToken')
      data.refreshToken = refreshToken;
    } else {
      console.log('....     login as guest')
      authLevel = AUTH_LEVEL.Guest;
    }

    let response = await fetchAuth(data);
    ;({accessToken, refreshToken, expTime, status} = response);
    switch (status + '') { //// cast to string
      case '200':
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
        // console.log(response);
    }
    return {accessToken, authLevel};
  } catch (error) {
    console.log('get auth access error');
    console.log(error);
  }
}

//// fetch API
export async function fetchTravoramaApi (request) {
  try{
    let {path, method, data, requiredAuthLevel} = request;
    let url = DOMAIN + (path || request);
    console.log('fetching from '+url+' ...')
    if (!requiredAuthLevel)
      throw 'ERROR fetch: requiredAuthLevel needed!';

    //// Get auth info and check if user authorized for the request
    let {accessToken, authLevel} = await getAuthAccess();

    //// check if client have sufficent authLevel for request
    authLevel = parseInt(authLevel);
    requiredAuthLevel = parseInt(requiredAuthLevel);
    if (authLevel < requiredAuthLevel) return {
      status: 400, message:'Not Authorized: Not enough auth level!',
      requiredAuthLevel
    }
    //// Execute request
    let response = await fetch(url, {
      method: method || 'GET',
      headers: {
        "Authorization": 'Bearer ' + accessToken,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.data),
    }).catch(console.error);
    if (response.status == 401) {
      await deleteItemAsync('expTime');
      return fetchTravoramaApi(request);
    } else if (response.error == "ERRGEN98") { //invalid JSON format
      console.log(JSON.stringify(request.data))
      throw 'invalid JSON format :' + JSON.stringify(request.data);
    }
    response = await response.json();

                  console.log('response from '+ url +' :')
                  console.log(response)
    if (response.status != 200) {
      console.log('status is not 200! \n data:')
      console.log(request.data)
    }
    return response;
  } catch (err) {
    console.log('error while fetching this request :')
    console.log(request)
    console.log(err)
  }
}

export async function checkUserLoggedIn (request) {
  let {authLevel} = await getAuthAccess();
  console.log(authLevel);
  return (authLevel >= AUTH_LEVEL.User);
}

export async function removeAccessToken () {
  await Promise.all([
    deleteItemAsync('accessToken'), deleteItemAsync('refreshToken'),
    deleteItemAsync('expTime'), deleteItemAsync('authLevel')
  ]);
  return;
}
