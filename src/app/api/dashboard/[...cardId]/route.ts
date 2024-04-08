import { NextResponse } from 'next/server';
import axiosClient from '@/utils/axiosClient';

// Setting up interceptors for detailed logging
axiosClient.interceptors.request.use(
  (request) => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  (response) => {
    console.log('Response:', JSON.stringify(response.data, null, 2));
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error Response:', {
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error Request:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }
    console.error('Config:', error.config);
    return Promise.reject(error);
  },
);

export async function GET(
  request: Request,
  { params }: { params: { cardId: string } },
) {
  const cardId = Array.isArray(params.cardId)
    ? params.cardId.join('/')
    : params.cardId;
  const dashboardEndpoint = `dashboardData?dashboardSlug=${cardId}`;

  console.log('Received cardId:', cardId);
  console.log('Dashboard endpoint:', dashboardEndpoint);

  try {
    console.log('Making API request...');
    const response = await axiosClient.get(dashboardEndpoint, {
      timeout: 10000,
    });

    const data = response.data;
    console.log('API response data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
