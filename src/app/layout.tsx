import dynamic from 'next/dynamic';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// const GoogleAnalyticsWithNoSSR = dynamic(
//   () => import('nextjs-google-analytics').then((mod) => mod.GoogleAnalytics),
//   { ssr: false },
// );

const AOSInitializerWithNoSSR = dynamic(
  () => import('@/utils/AOSInitializer'),
  { ssr: false },
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <head></head>
      <body>
        <GoogleAnalytics gaId={gaId as string} />
        <AOSInitializerWithNoSSR />
        <SkeletonTheme baseColor="#032436" highlightColor="#525252">
          {children}
        </SkeletonTheme>
      </body>
    </html>
  );
}
