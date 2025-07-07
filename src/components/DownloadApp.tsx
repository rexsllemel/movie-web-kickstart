// components/WatchNowButton.tsx
'use client';

import { ArrowDownToLine } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function DownloadApp() {
  return (
    <div style={{ textAlign: 'center' }}>
      <Link
        className={`${buttonVariants({ size: 'lg' })}`}
        href="/mobile-app"
        onClick={(e) => {
          e.preventDefault(); // Prevent the default link behavior
          window.open('https://whomeenoaglauns.com/4/8671506', '_blank'); // Open the second link in a new tab
          window.location.href = '/mobile-app'; // Navigate to the original link
        }}>
        Download APK <ArrowDownToLine className="ml-1 inline-block" />
      </Link>
      <div style={{ fontSize: 13, color: '#888', marginTop: 6 }}>
        Latest version &bull; Safe &amp; direct download
      </div>
    </div>
  );
}
