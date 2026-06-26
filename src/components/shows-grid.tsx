'use client';

import { useModalStore } from '@/stores/modal';
import type { Show } from '@/types';
import ShowModal from './shows-modal';
import { ShowCard } from './shows-carousel';
import { usePathname } from 'next/navigation';
import { useSearchStore } from '@/stores/search';
import ShowsSkeleton from './shows-skeleton';
import { cn } from '@/lib/utils';

interface SearchedShowsProps {
  shows: Show[];
  query?: string;
}

const ShowsGrid = ({ shows, query }: SearchedShowsProps) => {
  const pathname = usePathname();
  // modal store
  const modalStore = useModalStore();
  const searchStore = useSearchStore();

  return (
    <section aria-label="Grid of shows" className="container w-full max-w-none">
      {modalStore.open && <ShowModal />}
      <div className="main-view min-h-[800px] py-24" id="main-view">
        {query && searchStore.loading ? (
          <ShowsSkeleton classname="pl-0" />
        ) : query && !shows?.length ? (
          <div className="flex justify-center text-center">
            <div className="cinema-panel inline-block max-w-xl rounded-2xl p-8 text-left text-sm">
              <p className="mb-4 font-heading text-2xl text-foreground">{`No matches for "${query}"`}</p>
              <p className="mb-4 text-muted-foreground">Try one of these:</p>
              <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                <li>Try different keywords</li>
                <li>Looking for a movie or TV show?</li>
                <li>Try using a movie, TV show title, an actor or director</li>
                <li>Try a genre, like comedy, romance, sports, or drama</li>
              </ul>
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'xxs:grid-cols-2 grid gap-3 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-6',
              query && 'max-sm:grid-cols-3 max-[375px]:grid-cols-2',
            )}>
            {shows.map((show: Show) => (
              <ShowCard key={show.id} show={show} pathname={pathname} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ShowsGrid;
