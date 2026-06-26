'use client';

import { DownloadNow } from '@/components/DownloadNow';
import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useSwipeable, type SwipeableHandlers } from 'react-swipeable';

const screenshotImages = Array.from(
  { length: 8 },
  (_, i) => `/images/screenshots/${i + 1}.jpg`,
);

const instructionSteps = [
  {
    img: '/images/instructions/1.jpg',
    desc: 'Locate the downloaded <b>toplaymovies.apk</b> file on your device. Tap it to begin installation. If prompted, allow installation from unknown sources in your device settings.',
  },
  {
    img: '/images/instructions/2.jpg',
    desc: 'You may see a security scan prompt. It is recommended to tap <b>Scan app</b> for your safety, or tap <b>More details</b> to proceed without scanning.',
  },
  {
    img: '/images/instructions/3.jpg',
    desc: 'If you choose <b>Install anyway</b>, you can proceed without scanning. However, scanning is recommended for your peace of mind. The app contains no malicious code.',
  },
  {
    img: '/images/instructions/4.jpg',
    desc: 'Wait for the security scan to complete. This may take a few moments depending on your device.',
  },
  {
    img: '/images/instructions/5.jpg',
    desc: 'Once the scan is complete and the app is deemed safe, tap <b>Install</b>. Wait for the installation process to finish.',
  },
  {
    img: '/images/instructions/6.jpg',
    desc: 'After installation, find the <b>Toplay Movies</b> app icon in your app drawer. Tap it to open and enjoy streaming!',
  },
];

export default function MobileAppPage() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % screenshotImages.length);
    }, 3500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const prev = () =>
    setCurrent((c) => (c === 0 ? screenshotImages.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === screenshotImages.length - 1 ? 0 : c + 1));

  const swipeHandlers: SwipeableHandlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  });

  return (
    <div className="container max-w-6xl py-24">
      <section className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <Smartphone className="h-4 w-4" />
            Android app
          </div>
          <h1 className="text-balance font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Take the cinema shelf with you.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground">
            Download the mobile app, browse quickly, and keep the same
            movie-first experience close at hand.
          </p>
          <DownloadNow />
        </div>

        <div className="cinema-panel rounded-3xl p-4 sm:p-6">
          <h2 className="mb-4 font-heading text-2xl">App Screenshots</h2>
          <div
            {...swipeHandlers}
            className="relative mx-auto flex h-[clamp(360px,58vw,620px)] max-w-full items-center justify-center overflow-hidden rounded-2xl bg-black/50">
            <Image
              src={screenshotImages[current]}
              alt={`Screenshot ${current + 1}`}
              width={600}
              height={400}
              className="h-full w-full select-none rounded-2xl bg-black object-contain shadow-2xl shadow-black/40 transition-opacity"
              draggable={false}
            />
            <button
              onClick={prev}
              className="border-white/15 absolute left-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border bg-black/50 text-foreground backdrop-blur-md transition hover:bg-white/10 hover:text-primary"
              aria-label="Previous">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="border-white/15 absolute right-3 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border bg-black/50 text-foreground backdrop-blur-md transition hover:bg-white/10 hover:text-primary"
              aria-label="Next">
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
              {screenshotImages.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Show screenshot ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    i === current
                      ? 'w-8 bg-primary'
                      : 'bg-white/35 w-2.5 hover:bg-white/60'
                  }`}
                  onClick={() => setCurrent(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16 space-y-8">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl">How to Install</h2>
          <p className="text-muted-foreground">
            Follow these steps on your Android device after downloading the APK.
          </p>
        </div>
        <ol className="install-steps-list grid list-none gap-5 p-0">
          {instructionSteps.map((step, idx) => (
            <li
              key={idx}
              className="install-steps-item cinema-panel flex flex-col gap-5 rounded-2xl p-4 sm:flex-row sm:items-center sm:p-5">
              <Image
                src={step.img}
                alt={`Step ${idx + 1}`}
                width={180}
                height={320}
                className="install-steps-img mx-auto h-[clamp(220px,40vw,320px)] w-[clamp(120px,30vw,180px)] shrink-0 rounded-xl bg-black object-contain shadow-xl shadow-black/30 sm:mx-0"
              />
              <div className="min-w-0 flex-1">
                <strong className="mb-2 block font-heading text-2xl text-primary">
                  Step {idx + 1}
                </strong>
                <div
                  className="text-base leading-7 text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: step.desc }}
                />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
