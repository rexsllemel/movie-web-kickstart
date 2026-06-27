'use client';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { getIdFromSlug } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { useModalStore } from '@/stores/modal';
import { useSearchStore } from '@/stores/search';
import { MediaType, type Show } from '@/types';
import { type AxiosResponse } from 'axios';
import Link from 'next/link';
import React from 'react';
import CustomImage from './custom-image';

interface HeroProps {
  randomShow: Show | null;
}

const Hero = ({ randomShow }: HeroProps) => {
  React.useEffect(() => {
    window.addEventListener('popstate', handlePopstateEvent, false);
    return () => {
      window.removeEventListener('popstate', handlePopstateEvent, false);
    };
  }, []);

  const handlePopstateEvent = () => {
    const pathname = window.location.pathname;
    if (!/\d/.test(pathname)) {
      modalStore.reset();
    } else if (/\d/.test(pathname)) {
      const movieId: number = getIdFromSlug(pathname);
      if (!movieId) {
        return;
      }
      const findMovie: Promise<AxiosResponse<Show>> = pathname.includes(
        '/tv-shows',
      )
        ? MovieService.findTvSeries(movieId)
        : MovieService.findMovie(movieId);
      findMovie
        .then((response: AxiosResponse<Show>) => {
          const { data } = response;
          useModalStore.setState({ show: data, open: true, play: true });
        })
        .catch((error) => {
          console.log(`findMovie: `, error);
        });
    }
  };

  // stores
  const modalStore = useModalStore();
  const searchStore = useSearchStore();

  if (searchStore.query.length > 0) {
    return null;
  }

  return (
    <section aria-label="Hero" className="relative w-full overflow-hidden">
      {randomShow && (
        <>
          <div className="absolute inset-0 z-0 h-[78vh] min-h-[520px] w-full">
            <CustomImage
              src={`https://image.tmdb.org/t/p/original${
                randomShow?.backdrop_path ?? randomShow?.poster_path ?? ''
              }`}
              alt={randomShow?.title ?? 'poster'}
              className="-z-40 h-full w-full scale-105 object-cover"
              sizes="100vw"
              fill
              priority
            />
            <div className="via-background/78 absolute inset-0 bg-gradient-to-r from-background to-background/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-black/30" />
            <div className="absolute bottom-0 left-0 right-0 top-0">
              <div className="absolute inset-x-4 bottom-[14%] z-10 flex max-w-xl flex-col justify-end space-y-4">
                <div className="w-fit rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                  Featured
                </div>
                <h1 className="text-balance font-heading text-4xl leading-[0.95] text-foreground drop-shadow-2xl sm:text-5xl">
                  {randomShow?.title ?? randomShow?.name}
                </h1>
                <div className="text-foreground/85 flex flex-wrap gap-2 text-sm font-semibold">
                  <p className="bg-primary/15 rounded-full px-3 py-1 text-primary">
                    {Math.round(randomShow?.vote_average * 10) ?? '-'}% Match
                  </p>
                  {/* <p className="text-gray-300">{randomShow?.release_date ?? "-"}</p> */}
                  <p className="rounded-full bg-white/10 px-3 py-1">
                    {randomShow?.release_date ?? '-'}
                  </p>
                </div>
                {/* <p className="line-clamp-4 text-sm text-gray-300 md:text-base"> */}
                <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
                  {randomShow?.overview ?? '-'}
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <Link
                    prefetch={false}
                    href={`/watch/${
                      randomShow.media_type === MediaType.MOVIE ? 'movie' : 'tv'
                    }/${randomShow.id}`}
                    onClick={(e) => {
                      // e.preventDefault(); // Prevent the default link behavior
                      window.open('https://omg10.com/4/11204670', '_blank'); // Open the second link in a new tab
                      // window.location.href = '/home'; // Navigate to the original link
                    }}>
                    <Button
                      aria-label="Play video"
                      className="h-12 flex-shrink-0 gap-2 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90"
                      // onClick={() => {
                      //   modalStore.setShow(randomShow);
                      //   modalStore.setOpen(true);
                      //   modalStore.setPlay(true);
                      // }}
                    >
                      <Icons.play className="fill-current" aria-hidden="true" />
                      Play
                    </Button>
                  </Link>
                  <Button
                    aria-label="Open show's details modal"
                    variant="outline"
                    className="border-white/15 hover:bg-white/15 h-12 flex-shrink-0 gap-2 rounded-full bg-white/10 px-6 font-semibold text-foreground backdrop-blur-md hover:text-foreground"
                    onClick={() => {
                      modalStore.setShow(randomShow);
                      modalStore.setOpen(true);
                      modalStore.setPlay(true);
                    }}>
                    <Icons.info aria-hidden="true" />
                    More Info
                  </Button>
                </div>
              </div>
            </div>{' '}
            <div className="absolute bottom-[-1px] left-0 right-0 z-[8] h-32 bg-gradient-to-b from-background/0 via-background/70 to-background"></div>
          </div>
          <div className="relative inset-0 -z-50 h-[78vh] min-h-[520px]"></div>
        </>
      )}
    </section>
  );
};

export default Hero;
