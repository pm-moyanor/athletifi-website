import { axiosRequest, RequestMethod } from '@/utils/ApiHelper'; // Ensure this path is correct

// Assuming RequestMethod is an enum or a set of predefined strings for HTTP methods
export async function POST(request: Request): Promise<Response> {
  try {
    // Parse the incoming request body
    const formData = await request.json();

    // Define the API path for the external request
    const apiPath = '/join-newsletters';
    const strapiData = { data: formData.data };

    // Now passing strapiData to axiosRequest
    const responseData = await axiosRequest(
      RequestMethod.POST,
      apiPath,
      strapiData, // This should match Strapi's expected format
    );
    // Return a successful response back to the client
    return new Response(
      JSON.stringify({ status: 'success', data: responseData }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error(`Error in sign-up Route Handler: ${error}`);

    // Return an error response back to the client
    return new Response(
      JSON.stringify({ status: 'error', message: 'Failed to process sign-up' }),
      {
        status: 500, // Internal Server Error
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
