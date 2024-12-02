// app/actions/uploadVideo.ts
'use server';
import { Player } from '../../types/CoachesForm';
import { revalidatePath } from 'next/cache';


// const matchDataUploadUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/matchDataUpload`;
// const videoUploadUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/videoUpload`;



interface MatchDataUpload {
 
  homeAway: string;
  newOrExistingMatch: string;
  matchDate: string;
  matchRoster: Player[];
  opponentColors: string;
  yourTeamColors: string;
  opponentTeam: string;
  matchType: string;
  existingMatch: string;
  matchTime: string;
  permanentRoster: Player[];
  team: string;
  venue: string;
  // images: File[];
}

interface UploadResponse {
  message?: string | null;
  error?: string | null;
}

// interface VideoUploadResult {
//   success: boolean;
//   fileKey?: string;
//   error?: string;
// }

async function uploadMatchDataHelper(
  matchDataUpload: MatchDataUpload,
): Promise<UploadResponse> {
  console.log('matchDataUpload', matchDataUpload);

  // const response = await fetch(`${matchDataUploadUrl}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-type': 'application/json',
  //     Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
  //   } as HeadersInit,
  //   body: JSON.stringify(matchDataUpload),
  // const data: UploadResponse = await response.json();
  // return data;

  return { message: 'Data logged to console (simulated response)' };
}

export async function uploadMatchData(formData: FormData) {
  // const teamImageFront = formData.get('team_image_front') as File;
  // const teamImageBack = formData.get('team_image_back') as File;

  const matchUploadData: MatchDataUpload = {
    existingMatch: formData.get('existingMatch') as string,
    homeAway: formData.get('homeAway') as string,
    matchDate: formData.get('matchDate') as string,
    matchRoster: JSON.parse(formData.get('matchRoster') as string) as Player[],
    matchTime: formData.get('matchTime') as string,
    matchType: formData.get('matchType') as string,
    newOrExistingMatch: formData.get('newOrExistingMatch') as string,
    opponentColors: formData.get('opponentColors') as string,
    opponentTeam: formData.get('opponentTeam') as string,
    permanentRoster: JSON.parse(formData.get('permanentRoster') as string || '[]') as Player[],
    team: formData.get('team') as string,
    venue: formData.get('venue') as string,
    yourTeamColors: formData.get('yourTeamColors') as string,
    // images: [teamImageFront, teamImageBack],
  };

  try {
    const response = await uploadMatchDataHelper(matchUploadData);
    console.log('response', response);
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

// export async function uploadVideo(
//   formData: FormData,
// ): Promise<VideoUploadResult> {
//   const file = formData.get('file') as File | null;
//   if (!file) {
//     throw new Error('No file provided');
//   }

//   const buffer = await file.arrayBuffer();
//   const filename = file.name;
//   const contentType = file.type;

//   try {
//     const response = await fetch(videoUploadUrl, {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//         Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
//       } as HeadersInit,
//       body: JSON.stringify({
//         filename,
//         contentType,
//         file: Buffer.from(buffer).toString('base64'),
//       }),
//     });

//     // if (!response.ok) {
//     //   throw new Error('Failed to upload file');
//     // }

//     const result = (await response.json()) as { fileKey: string };

//     // Optionally store the file key in a cookie
//     cookies().set('lastUploadedFile', result.fileKey);

//     // Revalidate the page to reflect the new upload
//     revalidatePath('/coach-profile');

//     return { success: true, fileKey: result.fileKey };
//   } catch (error) {
//     console.error('Error uploading file:', error);
//     return {
//       success: false,
//       error:
//         error instanceof Error ? error.message : 'An unknown error occurred',
//     };
//   }
// }
