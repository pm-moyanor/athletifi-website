import axios from 'axios';
import { axiosRequest } from './ApiHelper';

// NEWS GET REQUEST HANDLER
// Function to handle GET requests for news articles from the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for news articles.

export const getRequestHandler = async (path: any) => {
  try {
    return await axiosRequest('GET', `${path}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error?.response || error.code === 'ECONNABORTED') {
        console.log(
          `No server response or GET request has timed out. Try again shortly: ${error}`
        );
      } else if (error.response?.status === 400) {
        console.log(`Bad request error while making GET request: ${error}`);
      } else if (error.response?.status === 401) {
        console.log(`Unauthorized to make GET request: ${error}`);
      } else {
        console.log(`Error ocurred while making GET request: ${error}`);
      }
    }

    throw error;
  }
};
// Use the axiosRequest function to make a GET request to the Strapi CMS.

// NEWSLETTER POST REQUEST HANDLER
// Function to handle POST requests for newsletters to the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for newsletters.
// Data: The payload to be sent in the POST request.
export const postRequestHandler = async (path: any, data: any) => {
  try {
    return await axiosRequest('Post', path, data);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (!error?.response || error.code === 'ECONNABORTED') {
        console.log(
          `No server response or POST request has timed out. Try again shortly: ${error}`
        );
      } else if (error.response?.status === 400) {
        console.log(`Bad request error while making POST request: ${error}`);
      } else if (error.response?.status === 401) {
        console.log(`Unauthorized to make POST request: ${error}`);
      } else {
        console.log(`Error ocurred while making POST request: ${error}`);
      }
    }

    throw error;
  }
};
// Function to handle POST requests for newsletters to the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for newsletters.
// Data: The payload to be sent in the POST request.
