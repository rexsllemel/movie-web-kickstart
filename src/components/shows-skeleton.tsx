import { motion } from 'framer-motion';

import { Skeleton } from '@/components/ui/skeleton';
import { itemFade, itemsReveal } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useSearchStore } from '@/stores/search';
import CustomImage from './custom-image';

interface ShowsSkeletonProps {
  count?: number;
  classname?: string;
  variant?: 'with-title' | 'without-title';
}

const ShowsSkeleton = ({
  count = 6,
  classname = '',
  variant = 'with-title',
}: ShowsSkeletonProps) => {
  const searchStore = useSearchStore();

  return (
    <>
      {variant === 'with-title' ? (
        <div
          className={cn(
            'no-scrollbar container mx-0 w-full max-w-[100%] overflow-x-auto overflow-y-hidden',
            classname,
          )}>
          <Skeleton className="h-7 w-40 rounded-full bg-white/10" />
          <div
            className={cn(
              'xxs:grid-cols-2 mt-5 grid w-fit gap-3 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4 xl:grid-cols-6',
              searchStore.query && 'max-sm:grid-cols-3 max-[375px]:grid-cols-2',
            )}
            // initial="hidden"
            // animate="visible"
            // variants={itemsReveal}>
          >
            {Array.from({ length: count }, (_, i) => (
              <motion.div key={i} variants={itemFade}>
                {/* <picture className="relative aspect-[2/3] md:aspect-video"> */}
                <picture className="relative block aspect-[2/3] overflow-hidden rounded-xl border border-white/10 bg-card shadow-xl shadow-black/25">
                  {/* <source */}
                  {/*   media="(min-width: 780px)" */}
                  {/*   srcSet={'/images/grey-thumbnail.jpg'} */}
                  {/* /> */}
                  <CustomImage
                    alt={'poster'}
                    src={'/images/grey-thumbnail.jpg'}
                    fill={true}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
                    className="h-full w-full rounded-xl opacity-40"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="absolute inset-0 animate-pulse bg-white/5" />
                </picture>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <motion.div
          className="no-scrollbar container mx-0 flex w-full items-center gap-3 overflow-x-auto overflow-y-hidden"
          initial="hidden"
          animate="visible"
          variants={itemsReveal}>
          {Array.from({ length: count }, (_, i) => (
            <motion.div key={i} variants={itemFade}>
              <Skeleton className="aspect-[2/3] min-w-[12rem] rounded-xl border border-white/10 bg-white/10" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default ShowsSkeleton;
