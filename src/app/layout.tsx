import dynamic from 'next/dynamic';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';

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
        {children}
      </body>
    </html>
  );
}

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <Html lang="en">
//       <Head>{/* Any site-wide meta tags, styles or scripts */}</Head>
//       <body>
//         {/* <GoogleAnalyticsWithNoSSR trackPageViews />
//         <AOSInitializerWithNoSSR /> */}
//         {children}
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }
