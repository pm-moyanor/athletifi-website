import { NextResponse } from 'next/server';
import axiosClient from '@/utils/axiosClient';

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
