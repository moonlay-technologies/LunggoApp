//// CONSTANTS
export const clientId = 'V1ZoQ2RXTjZiM2xNYWtGMVRVUnZlVTVFUm14T1JFVTBXbGRWZVU5RWJHcE9WRUY2VGpKYWFsbDZVVFZhYlVVeVQxUk5NVmxxVlhwUFYwcHNXVzFWZUZwcVozbz0=';
export const clientSecret = 'V1RKSk1sa3lUWGxOUkdOM1dYcEdhMDB5VW1wT2VrMDFUWHBPYTA5RVNUVlBWRmsxVGtkYWEwMVViRzFhYlVsNVdWUkNhZz09';
// export const apiDomain = '';
const domain = 'http://travorama-local-api.azurewebsites.net';


//// fetch API
export var fetchTravoramaApi = (request, callback, errCallback) => {
  let url = domain + (request.path || request);
  // console.log(request.data)
  fetch(url, {
    method: request.method || 'GET',
    headers: request.headers || {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request.data),
  }).then(response => response.json())
  .then(callback)
  .catch( (!!errCallback)? errCallback : //cannot use || operator
    error => {
      console.log("Fetch error!!")
      console.log(error)
    }
  );
}