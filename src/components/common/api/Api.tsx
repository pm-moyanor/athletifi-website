import axios from 'axios';
import { axiosRequest } from './ApiHelper';

// NEWS GET REQUEST HANDLER
// Function to handle GET requests for news articles from the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for news articles.

export const getRequestHandler = async (path: any) => {
  try {
    return await axiosRequest('GET', `${path}`);
  } catch (error) {
    console.log(`Error ocurred while making GET request: ${error}`);
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
    console.log(`Error ocurred while making POST request: ${error}`);
    throw error;
  }
};
// Function to handle POST requests for newsletters to the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for newsletters.
// Data: The payload to be sent in the POST request.
