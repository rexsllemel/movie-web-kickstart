'use client';

import { ArrowDownToLine } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import {
  getFirestore,
  doc,
  updateDoc,
  increment,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { app } from '@/firebase/clientApp';

export function DownloadNow() {
  const handleDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    void (async () => {
      try {
        const db = getFirestore(app);
        const counterRef = doc(db, 'counters', 'downloads');
        const snap = await getDoc(counterRef);

        if (snap.exists()) {
          await updateDoc(counterRef, {
            count: increment(1),
          });
        } else {
          await setDoc(counterRef, { count: 1 });
        }
      } catch (err) {
        // Optional: handle error (log or toast)
      }

      // Open external link and redirect
      window.open('https://whomeenoaglauns.com/4/8671506', '_blank');
      window.location.href = '/app/toplaymovies.apk';
    })();
  };

  return (
    <div className="text-left sm:text-center">
      <Link
        className={buttonVariants({
          size: 'lg',
          className:
            'rounded-full bg-primary px-7 font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90',
        })}
        href="/app/toplaymovies.apk"
        onClick={handleDownload}>
        Download NOW <ArrowDownToLine className="ml-1 inline-block" />
      </Link>
      <div className="mt-2 text-xs leading-5 text-muted-foreground">
        Latest version &bull; Safe &amp; direct download &bull; No pop-up ads
      </div>
    </div>
  );
}
