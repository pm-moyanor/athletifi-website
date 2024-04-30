import { NextResponse } from 'next/server';
import axiosClient from '@/utils/axiosClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const endpoint = `/userData?amplify_id=${searchParams.get('amplify_id')}`;
  try {
    const response = await axiosClient.get(endpoint);
    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const endpoint = `/userData`;
  try {
    const body = await request.json();
    const response = await axiosClient.post(endpoint, body);
    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const endpoint = `/userData?amplify_id=${searchParams.get('amplify_id')}&notification_type=${searchParams.get('notification_type')}`;
  try {
    const response = await axiosClient.delete(endpoint);
    const data = response.data;

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
