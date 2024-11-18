import dynamic from 'next/dynamic';
import '@/styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Open_Sans } from 'next/font/google';
import Auth from '@/components/auth/Auth';
import { SEO_CONFIG, BASEURL } from '@/utils/seoConfig';
import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import { PageLogo } from '@/components/common/Icon';
import * as Sentry from '@sentry/nextjs';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const AOSInitializerWithNoSSR = dynamic(
  () => import('@/utils/AOSInitializer'),
  { ssr: false },
);

export async function generateMetadata(): Promise<Metadata> {
  const span = Sentry.getRootSpan(Sentry.getActiveSpan()!);
  return {
    metadataBase: new URL(BASEURL),
    keywords: ['AthletiFi', 'Club Soccer', 'Club Football'], // TODO: update keywords
    title: SEO_CONFIG.home.title,
    description: SEO_CONFIG.home.description,
    openGraph: {
      images: SEO_CONFIG.home.image,
    },

    other: {
      // NOTE: This does not work if the metadata is static
      ['sentry-trace']: Sentry.spanToTraceHeader(span),
      baggage: Sentry.spanToBaggageHeader(span) ?? '',
    },
  };
}

function Fallback() {
  return (
    <div className="min-h-screen top-0 left-0 w-full z-50 flex justify-center items-center">
      <span className="preloader__icon">
        <PageLogo />
      </span>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en" className={openSans.className}>
      <head></head>
      <body>
        <GoogleAnalytics gaId={gaId as string} />
        <AOSInitializerWithNoSSR />
        <NextTopLoader showSpinner={false} />
        <SkeletonTheme baseColor="#032436" highlightColor="#525252">
          <Suspense fallback={<Fallback />}>
            <Auth>{children}</Auth>
          </Suspense>
        </SkeletonTheme>
      </body>
    </html>
  );
}
