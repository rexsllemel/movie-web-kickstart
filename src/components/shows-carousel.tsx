'use client';

import { useModalStore } from '@/stores/modal';
import { MediaType, type Show } from '@/types';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn, getNameFromShow, getSlug } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import CustomImage from './custom-image';

interface ShowsCarouselProps {
  title: string;
  shows: Show[];
}

const ShowsCarousel = ({ title, shows }: ShowsCarouselProps) => {
  const pathname = usePathname();

  const showsRef = React.useRef<HTMLDivElement>(null);
  const [isScrollable, setIsScrollable] = React.useState(false);

  // handle scroll to left and right
  const scrollToDirection = (direction: 'left' | 'right') => {
    if (!showsRef.current) return;

    setIsScrollable(true);
    const { scrollLeft, offsetWidth } = showsRef.current;
    const handleSize = offsetWidth > 1400 ? 60 : 0.04 * offsetWidth;
    const offset =
      direction === 'left'
        ? scrollLeft - (offsetWidth - 2 * handleSize)
        : scrollLeft + (offsetWidth - 2 * handleSize);
    showsRef.current.scrollTo({ left: offset, behavior: 'smooth' });

    if (scrollLeft === 0 && direction === 'left') {
      showsRef.current.scrollTo({
        left: showsRef.current.scrollWidth,
        behavior: 'smooth',
      });
    } else if (
      scrollLeft + offsetWidth === showsRef.current.scrollWidth &&
      direction === 'right'
    ) {
      showsRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section aria-label="Carousel of shows" className="relative my-8 p-0">
      {shows.length !== 0 && (
        <div className="space-y-3">
          <h2 className="m-0 px-4 font-heading text-xl text-foreground sm:px-[4%] sm:text-2xl 2xl:px-[60px]">
            {title ?? '-'}
          </h2>
          <div className="relative w-full items-center justify-center overflow-hidden">
            <Button
              aria-label="Scroll to left"
              variant="ghost"
              className={cn(
                'absolute left-0 top-0 z-10 mr-2 hidden h-full w-[4%] items-center justify-center rounded-none bg-gradient-to-r from-background via-background/70 to-transparent py-0 text-transparent hover:text-primary md:block 2xl:w-[60px]',
                isScrollable ? 'md:block' : 'md:hidden',
              )}
              onClick={() => scrollToDirection('left')}>
              <Icons.chevronLeft className="h-8 w-8" aria-hidden="true" />
            </Button>
            <div
              ref={showsRef}
              className="no-scrollbar m-0 grid auto-cols-[42%] grid-flow-col gap-3 overflow-x-auto overflow-y-hidden px-4 py-1 duration-500 ease-in-out xs:auto-cols-[34%] sm:auto-cols-[25%] sm:px-[4%] md:touch-pan-y lg:auto-cols-[20%] xl:auto-cols-[15.5%] 2xl:px-[60px]">
              {shows.map((show) => (
                <ShowCard key={show.id} show={show} pathname={pathname} />
              ))}
            </div>
            <Button
              aria-label="Scroll to right"
              variant="ghost"
              className="absolute right-0 top-0 z-10 m-0 ml-2 hidden h-full w-[4%] items-center justify-center rounded-none bg-gradient-to-l from-background via-background/70 to-transparent py-0 text-transparent hover:text-primary md:block 2xl:w-[60px]"
              onClick={() => scrollToDirection('right')}>
              <Icons.chevronRight className="h-8 w-8" aria-hidden="true" />
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShowsCarousel;

export const ShowCard = ({ show }: { show: Show; pathname: string }) => {
  const imageOnErrorHandler = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    event.currentTarget.src = '/images/grey-thumbnail.jpg';
  };

  return (
    // <picture className="relative aspect-[2/3] md:aspect-video">
    <picture className="group relative block aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-card shadow-xl shadow-black/25">
      <a
        className="pointer-events-none"
        aria-hidden={false}
        role="link"
        aria-label={getNameFromShow(show)}
        href={`/${show.media_type}/${getSlug(show.id, getNameFromShow(show))}`}
      />
      {/* <source */}
      {/*   // srcSet={`https://image.tmdb.org/t/p/w342/${show.poster_path ?? show.backdrop_path}`} */}
      {/*   srcSet={ */}
      {/*     show.backdrop_path ?? show.poster_path */}
      {/*       ? `https://image.tmdb.org/t/p/w500/${ */}
      {/*           show.backdrop_path ?? show.poster_path */}
      {/*         }` */}
      {/*       : '/images/grey-thumbnail.jpg' */}
      {/*   } */}
      {/*   media="(min-width: 780px)" */}
      {/* /> */}
      <CustomImage
        src={
          show.poster_path ?? show.backdrop_path
            ? `https://image.tmdb.org/t/p/w500${
                show.poster_path ?? show.backdrop_path
              }`
            : '/images/grey-thumbnail.jpg'
        }
        alt={show.title ?? show.name ?? 'poster'}
        className="h-full w-full cursor-pointer rounded-xl transition duration-300 md:group-hover:scale-105"
        fill
        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
        style={{
          objectFit: 'cover',
        }}
        onClick={() => {
          const name = getNameFromShow(show);
          const path: string =
            show.media_type === MediaType.TV ? 'tv-shows' : 'movies';
          window.history.pushState(
            null,
            '',
            `${path}/${getSlug(show.id, name)}`,
          );
          useModalStore.setState({
            show: show,
            open: true,
            play: true,
          });
        }}
        onError={imageOnErrorHandler}
      />
      <span className="min-h-20 via-black/35 pointer-events-none absolute inset-x-0 bottom-0 flex items-end bg-gradient-to-t from-black/90 to-transparent p-3 opacity-0 transition-opacity duration-300 md:group-hover:opacity-100">
        <span className="line-clamp-2 text-sm font-semibold leading-tight text-white">
          {getNameFromShow(show)}
        </span>
      </span>
    </picture>
  );
};
