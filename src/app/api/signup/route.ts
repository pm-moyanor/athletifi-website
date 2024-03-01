import { axiosRequest, RequestMethod } from '@/utils/ApiHelper'; // Ensure this path is correct

// Assuming RequestMethod is an enum or a set of predefined strings for HTTP methods
// export async function POST(request: Request): Promise<Response> {
//   try {
//     // Parse the incoming request body
//     const formData = await request.json();

//     // Define the API path for the external request
//     const apiPath = '/join-newsletters';
//     const strapiData = { data: formData.data };

//     // Now passing strapiData to axiosRequest
//     const responseData = await axiosRequest(
//       RequestMethod.POST,
//       apiPath,
//       strapiData, // This should match Strapi's expected format
//     );
//     // Return a successful response back to the client
//     return new Response(
//       JSON.stringify({ status: 'success', data: responseData }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       },
//     );
//   } catch (error) {
//     console.error(`Error in sign-up Route Handler: ${error}`);

//     // Return an error response back to the client
//     return new Response(
//       JSON.stringify({ status: 'error', message: 'Failed to process sign-up' }),
//       {
//         status: 500, // Internal Server Error
//         headers: { 'Content-Type': 'application/json' },
//       },
//     );
//   }
// }
// export async function POST(request: Request): Promise<Response> {
//   try {
//     // Extracting the email directly from the request body
//     const { email } = await request.json();

//     // Preparing the data object according to Strapi's expected format
//     const strapiData = {
//       data: {
//         email: email,
//         // newsletter: "email" // Assuming this needs to be included based on your schema, though its usage is still unclear
//       }
//     };

//     const apiPath = '/join-newsletter';
//     // Sending the request to Strapi using the axiosRequest function
//     const responseData = await axiosRequest(
//       "POST", // or RequestMethod.POST if you have an enum defined
//       apiPath,
//       strapiData // Pass the correctly structured data
//     );
//       console.log('responseData')
//       console.log(responseData);

//     return new Response(JSON.stringify({ status: 'success', data: responseData }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error(`Error in sign-up Route Handler: ${error}`);

//     // Constructing and returning an error response
//     return new Response(JSON.stringify({ status: 'error', message: 'Failed to process sign-up' }), {
//       status: 500, // Internal Server Error
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

export async function POST(request: Request): Promise<Response> {
  try {
    const stuff = await request.json();
    console.log('stuff');
    console.log(stuff);

    // const email = stuff.email;
    const dataToSendToStrapi = stuff.data;
    // Prepare the data object according to Strapi's expected format
    // const dataToSendToStrapi = {
    //   data: { email } // This matches your successful Axios request structure
    // };
    console.log(
      'Request payload to Strapi:',
      JSON.stringify(dataToSendToStrapi),
    );

    const apiPath = '/join-newsletters';
    const responseData = await axiosRequest(
      RequestMethod.POST, // Assuming RequestMethod.POST maps to "POST"
      apiPath,
      dataToSendToStrapi, // Correctly structured data for Strapi
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
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      },
    );
  }
}
