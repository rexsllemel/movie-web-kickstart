'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useSwipeable, type SwipeableHandlers } from 'react-swipeable';
import { DownloadNow } from '@/components/DownloadNow';
import Image from 'next/image';

// Screenshot slideshow images
const screenshotImages = Array.from(
  { length: 8 },
  (_, i) => `/images/screenshots/${i + 1}.jpg`,
);

// Instruction images and descriptions
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

  // Auto-play carousel
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
    <div
      style={{
        maxWidth: 600,
        margin: '0 auto',
        padding: 16,
      }}>
      {/* Download Button */}
      <DownloadNow />
      <h2 style={{ textAlign: 'center' }}>App Screenshots</h2>
      <div
        {...swipeHandlers}
        style={{
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
          borderRadius: 16,
          maxWidth: '100%',
          height: 'clamp(320px, 40vw, 480px)',
          background: '#222',
          margin: '0 auto 24px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          src={screenshotImages[current]}
          alt={`Screenshot ${current + 1}`}
          width={600}
          height={400}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: 16,
            transition: 'opacity 0.3s',
            boxShadow: '0 2px 16px #0004',
            userSelect: 'none',
            background: '#222',
          }}
          draggable={false}
        />
        <button
          onClick={prev}
          style={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff8',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            cursor: 'pointer',
            fontSize: 24,
            zIndex: 2,
            boxShadow: '0 1px 4px #0002',
          }}
          aria-label="Previous">
          ‹
        </button>
        <button
          onClick={next}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#fff8',
            border: 'none',
            borderRadius: '50%',
            width: 40,
            height: 40,
            cursor: 'pointer',
            fontSize: 24,
            zIndex: 2,
            boxShadow: '0 1px 4px #0002',
          }}
          aria-label="Next">
          ›
        </button>
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            gap: 6,
          }}>
          {screenshotImages.map((_, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: i === current ? '#fff' : '#8888',
                border: i === current ? '2px solid #333' : 'none',
                transition: 'background 0.2s',
                cursor: 'pointer',
              }}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      <h2 style={{ marginTop: 32, textAlign: 'center' }}>How to Install</h2>
      <ol
        className="install-steps-list"
        style={{
          padding: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}>
        {instructionSteps.map((step, idx) => (
          <li
            key={idx}
            className="install-steps-item"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              background: 'hsl(var(--card))',
              color: 'hsl(var(--card-foreground))',
              borderRadius: 16,
              padding: 16,
              boxShadow: '0 1px 8px #0001',
            }}>
            <Image
              src={step.img}
              alt={`Step ${idx + 1}`}
              width={180}
              height={320}
              style={{
                width: 'clamp(120px, 30vw, 180px)',
                height: 'clamp(220px, 40vw, 320px)',
                objectFit: 'contain',
                borderRadius: 12,
                boxShadow: '0 1px 8px #0002',
                flexShrink: 0,
                background: '#222',
              }}
            />
            <div style={{ flex: 1, minWidth: 0 }}>
              <strong
                style={{ fontSize: 20, display: 'block', marginBottom: 8 }}>
                Step {idx + 1}
              </strong>
              <div
                style={{ fontSize: 17, lineHeight: 1.5 }}
                dangerouslySetInnerHTML={{ __html: step.desc }}
              />
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
