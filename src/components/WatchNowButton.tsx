// components/WatchNowButton.tsx
'use client';

import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function WatchNowButton() {
  return (
    <Link
      className={`${buttonVariants({ size: 'lg' })}`}
      href="/home"
      onClick={(e) => {
        e.preventDefault(); // Prevent the default link behavior
        // window.open(
        //   'https://latelyninetyfeelings.com/esxakj3b?key=4fa27388d230df37216df8c1510e10ba',
        //   '_blank',
        // ); // Open the second link in a new tab
        window.location.href = '/home'; // Navigate to the original link
      }}>
      Watch Now <ArrowRight className="ml-1 inline-block" />
    </Link>
  );
}
