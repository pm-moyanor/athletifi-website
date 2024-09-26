// app/actions/uploadVideo.ts
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

const matchDataUploadUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/matchDataUpload`;
const videoUploadUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videoUpload`;

interface UploadResult {
  success: boolean;
  fileKey?: string;
  error?: string;
}

export async function uploadVideo(formData: FormData): Promise<UploadResult> {
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
