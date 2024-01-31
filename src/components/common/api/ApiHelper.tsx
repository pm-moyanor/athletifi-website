import Axios from 'axios';
import { SignUp } from '@/types/SignUp.type';

type SignUpData = {data: SignUp};

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

// const SERVER_URL = "http://127.0.0.1:1337/api";

//The below Server URL is for AthletiFi's Strapi CMS implementation, which is hosted on the vidalco.in domain
const SERVER_URL = 'https://vidalco.in/api';

// Function to make API requests to the Strapi CMS using Axios.
// Method: The HTTP method (GET, POST, etc.) to use for the request.
// URL: The specific API endpoint within the Strapi CMS.
// Data: Optional payload for POST or PUT requests.

export async function axiosRequest(
  method: RequestMethod,
  url: string,
  data : SignUpData | null | undefined
) {
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
