
export default function getQueryPath (key, value, pageNumber) {
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
  const querystring = 'name='+value;

  /// wisata dan kegiatan
  return `/${version}/activities?${querystring}`;
  //+'?searchActivityType=ActivityName&name=tiket&page=1&perPage=10&date=180217';
}



  _handleResponse = (response) => {
    if(response) {
      //// navigate
      this.props.navigation.navigate(
        'SearchResults', { list: response.activityList}
      )
    } else {
      this.setState({ message: 'Location not recognized!'})
    }
  }

  _executeRequest = (searchString) => {
    const path = getQueryPath('place_name', searchString, 1);
    this.setState({ isLoading: true });
    let request = {path, requiredAuthLevel: AUTH_LEVEL.Guest}
    fetchTravoramaApi(request).then(response => {
      this.setState({ isLoading: false });
      this._handleResponse(response);
    }).catch(error => {
      this.setState({
        isLoading: false,
        message: 'Something bad happened :\n'+ error
      });
      console.log(error);
    });
  };
