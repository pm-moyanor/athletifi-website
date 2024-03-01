import { NextResponse } from 'next/server';
import { axiosRequest, RequestMethod } from '@/utils/ApiHelper';

const newsListApiPath =
  '/news-lists?populate=image&populate=author&populate=categories&sort=createdAt:desc';

export async function GET() {
  const data = await axiosRequest(RequestMethod.GET, newsListApiPath, null);

  return NextResponse.json(data);
}
