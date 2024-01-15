import Axios from 'axios';
// const SERVER_URL = "http://127.0.0.1:1337/api";

//The below Server URL is for AthletiFi's Strapi CMS implementation, which is hosted on the vidalco.in domain
const SERVER_URL = 'https://vidalco.in/api';

// Function to make API requests to the Strapi CMS using Axios.
// Method: The HTTP method (GET, POST, etc.) to use for the request.
// URL: The specific API endpoint within the Strapi CMS.
// Data: Optional payload for POST or PUT requests.

export async function axiosRequest(method: any, url: any, data = null) {
  try {
    // Make the API request to the Strapi CMS and await the response.
    const response = await Axios({
      data: data,
      method: method,
      url: `${SERVER_URL}${url}`,
    });
    // Return the data received from the Strapi CMS.
    return await response.data;
  } catch (error) {
    // Handle any errors that occur during the API request.
    return error;
  }
}
