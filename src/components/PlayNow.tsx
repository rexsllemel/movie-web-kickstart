// components/PlayNow.tsx
'use client';

import { ArrowRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function PlayNow() {
  return (
    <Link
      className={`${buttonVariants({ size: 'lg' })}`}
      href="/home"
      onClick={(e) => {
        e.preventDefault(); // Prevent the default link behavior
        window.open('https://luglawhaulsano.net/4/8671506', '_blank'); // Open the second link in a new tab
        window.location.href = '/home'; // Navigate to the original link
      }}>
      Watch Now <ArrowRight className="ml-1 inline-block" />
    </Link>
  );
}
