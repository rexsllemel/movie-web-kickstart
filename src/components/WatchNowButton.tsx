// components/WatchNowButton.tsx
'use client';

import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function WatchNowButton() {
  return (
    <Link
      className={`${buttonVariants({
        size: 'lg',
        className:
          'rounded-full bg-primary px-7 font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90',
      })}`}
      href="/home"
      onClick={(e) => {
        e.preventDefault(); // Prevent the default link behavior
        window.open('https://omg10.com/4/11204670', '_blank'); // Open the second link in a new tab
        window.location.href = '/home'; // Navigate to the original link
      }}>
      Watch Now <ArrowRight className="ml-1 inline-block" />
    </Link>
  );
}
