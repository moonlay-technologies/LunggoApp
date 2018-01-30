'use strict';
import {fetchTravoramaApi, AUTH_LEVEL} from '../../../api/Common';

export async function sendOtp(phoneNumber) {
  const version = 'v1';
  let request = {
    method: 'POST',
    path: `/${version}/account/forgotpassword`,
    requiredAuthLevel: AUTH_LEVEL.Guest,
    data: { phoneNumber },
  };
  try {
    let response = await fetchTravoramaApi(request);
    if(response) {
      if (response.status == 200) return true;
    } else {
      console.error('ForgotPasswordAPI: no response returned!');
      return 'no response returned';
    }
  } catch(error) {
    console.error(error);
  }
}

export async function verifyOtp(phoneNumber, otp) {
  const version = 'v1';
  let request = {
    method: 'POST',
    path: `/${version}/account/checkotp`,
    requiredAuthLevel: AUTH_LEVEL.Guest,
    data: { phoneNumber, otp },
  };
  try {
    let response = await fetchTravoramaApi(request);
    if(response) {
      switch (response.status) {
        case 200: return true;
        case 400: return 'not registered';
      }
    } else {
      console.error('verifyOtpAPI: no response returned!');
      return 'no response returned';
    }
  } catch(error) {
    console.error(error);
  }
}

export async function resetPassword(phoneNumber, otp, newPassword) {
  const version = 'v1';
  let request = {
    method: 'POST',
    path: `/${version}/account/resetpassword`,
    requiredAuthLevel: AUTH_LEVEL.Guest,
    data: { phoneNumber, otp, newPassword },
  };
  try {
    let response = await fetchTravoramaApi(request);
    if(response) {
      if (response.status == 200) return true;
    } else {
      console.error('resetPasswordAPI: no response returned!');
      return 'no response returned';
    }
  } catch(error) {
    console.error(error);
  }
}

