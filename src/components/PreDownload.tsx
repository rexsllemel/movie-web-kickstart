'use client';

import { ArrowDownToLine } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState, useRef, useCallback } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '@/firebase/clientApp';

function formatCount(count: number) {
  return '+' + count.toLocaleString();
}

export function PreDownload() {
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchCount = useCallback(async () => {
    try {
      const db = getFirestore(app);
      const counterRef = doc(db, 'counters', 'downloads');
      const snap = await getDoc(counterRef);
      if (snap.exists()) {
        const data = snap.data();
        const realCount = typeof data.count === 'number' ? data.count : 0;
        setTargetCount(realCount);
      } else {
        setTargetCount(0);
      }
    } catch {
      setTargetCount(0);
    }
  }, []);

  useEffect(() => {
    if (displayCount === targetCount) return;

    const step = Math.max(
      1,
      Math.floor(Math.abs(targetCount - displayCount) / 20),
    );

    if (displayCount < targetCount) {
      intervalRef.current = setInterval(() => {
        setDisplayCount((prev) => {
          if (prev + step >= targetCount) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return targetCount;
          }
          return prev + step;
        });
      }, 30);
    } else {
      setDisplayCount(targetCount);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetCount, displayCount]);

  useEffect(() => {
    void fetchCount();
    const poll = setInterval(() => {
      void fetchCount();
    }, 10000);
    return () => clearInterval(poll);
  }, [fetchCount]);

  useEffect(() => {
    if (displayCount === 0 && targetCount > 0) {
      setDisplayCount(1);
    }
  }, [targetCount, displayCount]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.open('/mobile-app', '_blank');
    window.location.href = 'https://omg10.com/4/11204670';
  };

  return (
    <div className="text-left sm:text-center">
      <Link
        className={buttonVariants({
          size: 'lg',
          className:
            'border-white/15 hover:bg-white/15 rounded-full border bg-white/10 px-7 font-bold text-foreground backdrop-blur-md hover:text-foreground',
        })}
        href="/mobile-app"
        onClick={handleClick}>
        Download APP <ArrowDownToLine className="ml-1 inline-block" />
      </Link>
      <div className="mt-2 text-xs leading-5 text-muted-foreground">
        Latest version &bull; Safe &amp; direct download &bull; No pop-up ads
        <br />
        <span className="text-sm font-semibold text-primary">
          {formatCount(displayCount)} downloads
        </span>
      </div>
    </div>
  );
}
