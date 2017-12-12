import {fetchTravoramaApi, AUTH_LEVEL} from '../../api/Common';

function getQueryPath (key, value, pageNumber) {
  const version = 'v1';
  const data = {
      name: 'hiking',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  // data[key] = value;
//?name=hiking&startDate=2017-02-18&endDate=2017-02-30&page=1&perPage=10

  // const querystring = Object.keys(data)
  //   .map(key => key + '=' + encodeURIComponent(data[key]))
  //   .join('&');
  // const querystring = '';
  const querystring = 'startDate=2017-02-18';
  // const querystring = 'name='+value;

  /// wisata dan kegiatan
  return `/${version}/activities?${querystring}`;
  //+'?searchActivityType=ActivityName&name=tiket&page=1&perPage=10&date=180217';
}

export default async function search(searchString) {
  const path = getQueryPath('place_name', searchString, 1);
  console.log(path)
  let request = {path, requiredAuthLevel: AUTH_LEVEL.Guest}
  try {
    let response = await fetchTravoramaApi(request);
    if(response) {
      return response.activityList;
    } else {
      // this.setState({ message: 'Location not recognized!'})
      console.log('location not recognized')
      console.log(response)
    }
  } catch(error) {
    // this.setState({message: 'Something bad happened :\n'+ error});
    console.log(error);
  }
}