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
    window.open('https://whomeenoaglauns.com/4/8671506', '_blank');
    window.location.href = '/mobile-app';
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Link
        className={buttonVariants({ size: 'lg' })}
        href="/mobile-app"
        onClick={handleClick}>
        Download APP <ArrowDownToLine className="ml-1 inline-block" />
      </Link>
      <div style={{ fontSize: 13, color: '#888', marginTop: 6 }}>
        Latest version &bull; Safe &amp; direct download &bull; No Pop up ads
        <br />
        <span style={{ color: '#6366f1', fontWeight: 600, fontSize: 15 }}>
          {formatCount(displayCount)} downloads
        </span>
      </div>
    </div>
  );
}
