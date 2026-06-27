import { TailwindIndicator } from '@/components/tailwind-indicator';
import { ThemeProvider } from '@/components/theme-provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
// import { TrpcProvider } from '@/client/trpc-provider';
import type { Metadata, Viewport } from 'next';
import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';
// import { Analytics } from '@/components/analytics';
import { siteConfig } from '@/configs/site';
import { env } from '@/env.mjs';
// import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import LoadScript from '@/app/LoadScript';
import LoadDreamy from '@/app/LoadDreamy';
// import Seo from '@/components/Seo';

export const runtime = 'edge';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: '../assets/fonts/CalSans-SemiBold.woff2',
  variable: '--font-heading',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    images: siteConfig.ogImage,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.author,
  },
  icons: {
    icon: '/images/icon.ico',
  },
  other: { referrer: 'no-referrer-when-downgrade' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>
          FMovies - Watch Free Movies Online Free | 123movies Alternative | To
          Play Movies
        </title>
        <meta
          name="description"
          content="To Play Movies (FMovies) — watch free movies online free and find the best free streaming sites. The top FMovies and 123movies alternative with movies to watch for free, TV shows, anime, and new releases, no login required."
        />
        <meta
          name="keywords"
          content="FMovies, To Play Movies, free movies, movies to watch for free, free streaming sites, 123movies, watch free movies online, free movies online free, fmovies alternative, 123movies alternative, free movie streaming sites, watch tv shows online, anime online, no sign up movies, stream movies"
        />
        <meta
          property="og:title"
          content="FMovies - Watch Free Movies Online Free | To Play Movies"
        />
        <meta
          property="og:description"
          content="Watch free movies online on To Play Movies — the best FMovies and 123movies alternative. Free streaming sites for movies to watch for free, TV shows, and anime."
        />
        <meta property="og:url" content="https://toplaymovies.link" />
        <meta property="og:image" content="https://toplaymovies.link/og.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://toplaymovies.link" />
        <link
          rel="alternate"
          type="text/plain"
          href="/llms.txt"
          title="AI crawler site context"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <LoadScript />
        <LoadDreamy />

        <meta name="monetag" content="52eeb41ba7db02fcf547f5164d28c8dc" />
        {/* <Seo
          title="To Play Movies - Watch Free Movies Online"
          description="To Play Movies just like Fmovies is a file-sharing website that allows people to watch a wide range of movies and TV shows for free."
        /> */}
      </head>
      <body
        className={cn(
          'overlflow-y-auto min-h-screen overflow-x-hidden bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {/* <TrpcProvider> */}
          {children}
          <TailwindIndicator />
          {/* <Analytics /> */}
          {/* <SpeedInsights /> */}
          {/* </TrpcProvider> */}

          {env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
            <>
              <Script
                id="_next-ga-init"
                dangerouslySetInnerHTML={{
                  __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}', { cookie_flags: 'max-age=86400;secure;samesite=none' });`,
                }}
              />
              <Script
                id="_next-ga"
                src={`https://www.googletagmanager.com/gtag/js?id=${env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
              />
            </>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
