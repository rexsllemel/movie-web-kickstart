// components/Seo.tsx
import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  keywords?: string;
}

const Seo = ({
  title,
  description,
  image = 'https://toplaymovies.site/og.jpg',
  url = 'https://toplaymovies.site',
  keywords = 'free movies, netflix, disney+, hbo, 123movies, fmovies, cinemax, sony, movie download, stream movies',
}: SeoProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default Seo;
