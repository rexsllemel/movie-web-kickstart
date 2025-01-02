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
        window.open('https://whomeenoaglauns.com/4/8736265', '_blank'); // Open the second link in a new tab
      }}></Link>
  );
}
