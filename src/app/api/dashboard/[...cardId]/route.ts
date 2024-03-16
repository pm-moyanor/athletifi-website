import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import axiosClient from '@/utils/axiosClient';

export async function GET(
  req: NextApiRequest,
  { params }: { params: { cardId: string } },
) {
  const cardId = Array.isArray(params.cardId)
    ? params.cardId.join('/')
    : params.cardId;

  const endpoints = [
    `latestMatch?dashboardSlug=${cardId}`,
    // `latestPlayerRating?dashboardSlug=${cardId}`,
    // `matchDetails?dashboardSlug=${cardId}`,
    `matchesList?dashboardSlug=${cardId}`,
    `playerProfile?dashboardSlug=${cardId}`,
    `teammates?dashboardSlug=${cardId}`,
  ];
  try {
    const responses = await Promise.all(
      endpoints.map((endpoint) => axiosClient.get(endpoint)),
    );

    const data = await Promise.all(responses.map((response) => response.data));

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
