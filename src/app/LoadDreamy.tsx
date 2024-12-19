'use client';

import { useEffect } from 'react';

const LoadDreamy: React.FC = () => {
  useEffect(() => {
    (function (d: string, z: number, s: HTMLScriptElement) {
      s.src = `https://${d}/401/${z}`;
      try {
        (document.body || document.documentElement).appendChild(s);
      } catch (e) {
        console.error('Failed to append script:', e);
      }
    })('cimtaiphos.com', 8671255, document.createElement('script'));
  }, []);

  return null; // This component does not render anything.
};

export default LoadDreamy;
