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
      if (response.status!=200) {
        switch (response.error) {
          case 'ERR_INVALID_FORMAT_PHONENUMBER':
            response.message = 'Format nomor telepon salah!'; break;
          case 'ERR_PHONENUMBER_NOT_REGISTERED':
            response.message = 'Nomor tidak terdaftar!'; break;
          case 'ERR_INVALID_REQUEST':
            response.message = 'Mohon masukkan nomor telepon!'; break;
          default: response.message = 'Something bad happened!';
        }
      }
    } else {
      console.error('ForgotPasswordAPI: no response returned!');
    }
    return response;
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
      if (response.status!=200) {
        switch (response.error) {
          case 'ERR_INVALID_FORMAT_PHONENUMBER':
            response.message = 'Format nomor telepon salah!'; break;
          case 'ERR_PHONENUMBER_NOT_REGISTERED':
            response.message =  'Nomor tidak terdaftar!'; break;
          case 'ERR_INVALID_REQUEST':
            response.message = 'Mohon masukkan kode verifikasi!'; break;
          case 'ERR_OTP_NOT_VALID':
            response.message = 'Kode verifikasi tidak cocok!'; break;
          case 'ERR_OTP_EXPIRED':
            response.message = 'Masa kode verifikasi telah habis!'; break;
          default:
            response.message = 'Something bad happened!';
            console.warning(response);
        }
      }
    } else {
      console.error('verifyOtpAPI: no response returned!');
    }
    return response;
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
      if (response.status!=200) {
        switch (response.error) {
          case 'ERR_INVALID_FORMAT_PHONENUMBER':
            response.message = 'Format nomor telepon salah!'; break;
          case 'ERR_PHONENUMBER_NOT_REGISTERED':
            response.message =  'Nomor tidak terdaftar!'; break;
          case 'ERR_INVALID_REQUEST':
            response.message = 'Mohon masukkan password baru!'; break;
          case 'ERR_OTP_NOT_VALID':
            response.message = 'Kode verifikasi tidak cocok!'; break;
          case 'ERR_OTP_EXPIRED':
            response.message = 'Masa kode verifikasi telah habis!'; break;
          default: response.message = 'Something bad happened!';
        }
      }
    } else {
      console.error('resetPasswordAPI: no response returned!');
    }
    return response;
  } catch(error) {
    console.error(error);
  }
}

