import Axios from 'axios';
// const SERVER_URL = "http://127.0.0.1:1337/api";

//The below Server URL is for AthletiFi's Strapi CMS implementation, which is hosted on the vidalco.in domain
const SERVER_URL = 'https://vidalco.in/api';

// Function to make API requests to the Strapi CMS using Axios.
// Method: The HTTP method (GET, POST, etc.) to use for the request.
// URL: The specific API endpoint within the Strapi CMS.
// Data: Optional payload for POST or PUT requests.

const REQUEST_TIMEOUT_MS = 5000;

export async function axiosRequest(method: any, url: any, data = null) {
  try {
    // Make the API request to the Strapi CMS and await the response.
    const response = await Axios({
      data: data,
      method: method,
      timeout: REQUEST_TIMEOUT_MS,
      url: `${SERVER_URL}${url}`,
    });
    // Return the data received from the Strapi CMS.
    return await response.data;
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      if (!error?.response || error.code === 'ECONNABORTED') {
        console.error(
          'No server response or request timed out. Try again later'
        );
      }

      switch (error.response?.status) {
        case 400:
          console.error('Bad request error');
          break;
        case 401:
          console.error('Unauthorized to make request');
          break;
        case 404:
          console.error('Requested resource was not found');
          break;
        case 500 || 503:
          console.error('Hit an internal server error');
          break;
        default:
          console.error('Ran into a general error');
      }
    }
    // Handle any errors that occur during the API request.
    return error;
  }
}
