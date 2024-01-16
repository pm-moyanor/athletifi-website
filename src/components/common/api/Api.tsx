import { axiosRequest } from './ApiHelper';

// NEWS GET REQUEST HANDLER
// Function to handle GET requests for news articles from the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for news articles.

export const GetRequestHandler = async (path: any) =>
  // Use the axiosRequest function to make a GET request to the Strapi CMS.
  await axiosRequest('GET', `${path}`);

// NEWSLETTER POST REQUEST HANDLER
// Function to handle POST requests for newsletters to the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for newsletters.
// Data: The payload to be sent in the POST request.
export const PostRequestHandler = async (path: any, data: any) =>
  // Function to handle POST requests for newsletters to the Strapi CMS.
  // Path: The specific API endpoint within the Strapi CMS for newsletters.
  // Data: The payload to be sent in the POST request.
  await axiosRequest('Post', path, data);
