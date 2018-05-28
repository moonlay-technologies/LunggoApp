'use strict';
import { AUTH_LEVEL, fetchTravoramaApi } from '../../../api/Common';
import { async } from './../../../api/Common';
import SearchHeader from './../SearchActivity/SearchHeader';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import cartCountStore from './CartCountStorage';

const { getItemAsync, setItemAsync, deleteItemAsync } = Expo.SecureStore;

export async function getCart() {
  const version = 'v1';
  const path = `/${version}/cart`;
  let request = {path, requiredAuthLevel: AUTH_LEVEL.User}
  try {
    let response = await fetchTravoramaApi(request);
    let { cartId, status, rsvList, totalPrice } = response;
    if (status!=200) {
      console.log(response)
    }
    return { cartId, status, list:rsvList, totalPrice };
    // else if (response.status == 401) return {list:[], totalPrice:0};
  } catch(error) {
    console.log(error);
  }
}

export async function deleteCart(rsvNo) {
  const version = 'v1';
  const path = `/${version}/cart/${rsvNo}`;
  const method = 'DELETE';
  let request = {path, method, requiredAuthLevel: AUTH_LEVEL.User}
  try {
    return await fetchTravoramaApi(request);
  } catch(error) {
    console.log(error);
  }
}

