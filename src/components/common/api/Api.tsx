import { SignUp } from '@/types/SignUp.type';
import { axiosRequest, RequestMethod } from './ApiHelper';

type SignUpData = {data: SignUp};

// NEWS GET REQUEST HANDLER
// Function to handle GET requests for news articles from the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for news articles.
export const getRequestHandler = async (path: string) => {
  try {
    // Use the axiosRequest function to make a GET request to the Strapi CMS.
    return await axiosRequest(RequestMethod.GET, path, null);
  } catch (error) {
    console.error(`Error occurred while making GET request: ${error}`);
    throw error;
  }
};

// NEWSLETTER POST REQUEST HANDLER
export const postRequestHandler = async (path: string, data:null | SignUpData | undefined) => {
  try {
    // Function to handle POST requests for newsletters to the Strapi CMS.
    return await axiosRequest(
      RequestMethod.POST,
      path,
      data
    );
  } catch (error) {
    console.error(`Error occurred while making POST request: ${error}`);
    throw error;
  }
};
