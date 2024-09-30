// app/actions/uploadVideo.ts
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const matchDataUploadUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/matchDataUpload`;
const videoUploadUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videoUpload`;

interface Player {
  id: string;
  name: string;
  number: string;
  notes: string;
  status: string;
}

interface MatchDataUpload {
  date: string;
  location: string;
  main_team: string;
  opp_team: string;
  main_team_side: string;
  roster: Player[];
  main_jersey_color: string;
  opp_jersey_color: string;
  images: string;
}

interface UploadResponse {
  message?: string | null;
  error?: string | null;
}

interface VideoUploadResult {
  success: boolean;
  fileKey?: string;
  error?: string;
}

async function uploadMatchDataHelper(
  matchDataUpload: MatchDataUpload,
): Promise<UploadResponse> {
  const response = await fetch(`${matchDataUploadUrl}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    } as HeadersInit,
    body: JSON.stringify(matchDataUpload),
  });

  const data: UploadResponse = await response.json();
  return data;
}

export async function uploadMatchData(formData: FormData) {
  const matchUploadData: MatchDataUpload = {};

  try {
    const response = await uploadMatchDataHelper(matchUploadData);

    // Revalidate the page to reflect the new upload
    revalidatePath('/coach-portal');

    return { success: true };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

export async function uploadVideo(
  formData: FormData,
): Promise<VideoUploadResult> {
  const file = formData.get('file') as File | null;
  if (!file) {
    throw new Error('No file provided');
  }

  const buffer = await file.arrayBuffer();
  const filename = file.name;
  const contentType = file.type;

  try {
    const response = await fetch(videoUploadUrl, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
      } as HeadersInit,
      body: JSON.stringify({
        filename,
        contentType,
        file: Buffer.from(buffer).toString('base64'),
      }),
    });

    // if (!response.ok) {
    //   throw new Error('Failed to upload file');
    // }

    const result = (await response.json()) as { fileKey: string };

    // Optionally store the file key in a cookie
    cookies().set('lastUploadedFile', result.fileKey);

    // Revalidate the page to reflect the new upload
    revalidatePath('/');

    return { success: true, fileKey: result.fileKey };
  } catch (error) {
    console.error('Error uploading file:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}
