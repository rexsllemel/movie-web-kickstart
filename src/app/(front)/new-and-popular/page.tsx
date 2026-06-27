import { type Metadata } from 'next';
import Hero from '@/components/hero';
import ShowsContainer from '@/components/shows-container';
import { siteConfig } from '@/configs/site';
import { RequestType, type ShowRequest } from '@/enums/request-type';
import { getRandomShow } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { MediaType, type Show } from '@/types';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'New & Popular Movies and TV Shows',
  description:
    'Discover what is new and popular on To Play Movies — trending and top-rated movies and TV shows updated regularly, free to watch with no sign up.',
};

export default async function NewAndPopularPage() {
  const h1 = `${siteConfig.name} New And Popular`;
  const requests: ShowRequest[] = [
    {
      title: 'Netflix',
      req: { requestType: RequestType.NETFLIX, mediaType: MediaType.TV },
      visible: false,
    },
    {
      title: 'Trending TV Shows',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Trending Movies',
      req: { requestType: RequestType.TRENDING, mediaType: MediaType.MOVIE },
      visible: true,
    },
    {
      title: 'Top Rated TV Shows',
      req: { requestType: RequestType.TOP_RATED, mediaType: MediaType.TV },
      visible: true,
    },
    {
      title: 'Top Rated Movies',
      req: { requestType: RequestType.TOP_RATED, mediaType: MediaType.MOVIE },
      visible: true,
    },
  ];
  const allShows = await MovieService.getShows(requests);
  const randomShow: Show | null = getRandomShow(allShows);

  return (
    <>
      <h1 className="hidden">{h1}</h1>
      <Hero randomShow={randomShow} />
      <ShowsContainer shows={allShows} />
      <section className="container space-y-3 py-10">
        <h2 className="font-heading text-2xl sm:text-3xl">
          New and popular movies and TV shows
        </h2>
        <p className="max-w-3xl leading-7 text-muted-foreground">
          See what everyone is watching on {siteConfig.name}. The New &amp;
          Popular page collects the trending and top-rated movies and TV shows
          of the moment, refreshed regularly so you always land on something
          worth your time — all free to stream with no sign up.
        </p>
      </section>
    </>
  );
}
