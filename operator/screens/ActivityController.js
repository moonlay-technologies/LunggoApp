'use strict';
import { fetchTravoramaApi, AUTH_LEVEL } from '../../api/Common';

export async function fetchActivityList () {
  const version = 'v1';
  const path = `/${version}/operator/myactivity`;
  let request = {path, requiredAuthLevel: AUTH_LEVEL.User}
  return await fetchTravoramaApi(request);
}
