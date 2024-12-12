// components/WatchNowButton.tsx
'use client';

import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function ForPlay() {
  return (
    <Link
      className={`${buttonVariants({ size: 'lg' })}`}
      href="/home"
      onClick={(e) => {
        e.preventDefault(); // Prevent the default link behavior
        window.open(
          'https://www.profitablecpmrate.com/esxakj3b?key=4fa27388d230df37216df8c1510e10ba',
          '_blank',
        ); // Open the second link in a new tab
      }}></Link>
  );
}
