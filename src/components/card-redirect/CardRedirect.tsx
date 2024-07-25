import { redirect } from 'next/navigation';

export default async function CardRedirect({ id }: { id: string }) {
  const userDataUrl = `${process.env.NEXT_BACKEND_API_URL}/cardRedirectUrl?qr_code=${id}`;
  const response = await fetch(userDataUrl, {
    headers: {
      Authorization: process.env.NEXT_PUBLIC_TEMP_API_AUTH,
    } as HeadersInit,
    next: {
      tags: ['qrCodeRedirect'],
    },
  });

  const responseJson = await response.json();
  if (responseJson.message !== 'Success') {
    return null;
  }
  const redirectUrl = responseJson.result.redirect_url;

  redirect(redirectUrl);

  return (
    <div>
      <p>Please wait while we redirect you to your player card dashboard</p>
    </div>
  );
}
