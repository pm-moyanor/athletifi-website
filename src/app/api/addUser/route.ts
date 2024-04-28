import { NextResponse } from 'next/server';
import axiosClient from '@/utils/axiosClient';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const endpoint = `/adduser?name=${searchParams.get('name')}&email=${searchParams.get('email')}&amplify_id=${searchParams.get('amplify_id')}`;
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
