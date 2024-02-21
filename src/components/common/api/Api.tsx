import { PostData } from '@/types/Api.type';
import { axiosRequest, RequestMethod } from './ApiHelper';

// NEWS GET REQUEST HANDLER
// Function to handle GET requests for news articles from the Strapi CMS.
// Path: The specific API endpoint within the Strapi CMS for news articles.
export async function getRequestHandler(path: string) {
  try {
    // Use the axiosRequest function to make a GET request to the Strapi CMS.
    return await axiosRequest(RequestMethod.GET, path, null);
  } catch (error) {
    console.error(`Error occurred while making GET request: ${error}`);
    throw error;
  }
}

// NEWSLETTER POST REQUEST HANDLER
export async function postRequestHandler<T>(
  path: string,
  data: PostData<T> | null | undefined,
) {
  try {
    // Function to handle POST requests for newsletters to the Strapi CMS.
    return await axiosRequest(RequestMethod.POST, path, data);
  } catch (error) {
    console.error(`Error occurred while making POST request: ${error}`);
    throw error;
  }
}

// NEW SWR Fetcher function for Next.js v14
export const swrFetcher = async (path: string) => {
  try {
    // Performing the GET operation directly.
    const response = await axiosRequest(RequestMethod.GET, path, null);
    return response;
  } catch (error) {
    console.error(`Error fetching data from ${path}: ${error}`);
    throw error;
  }
};
