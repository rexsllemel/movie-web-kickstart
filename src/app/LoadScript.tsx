'use client';

import { useEffect } from 'react';

const LoadScript: React.FC = () => {
  useEffect(() => {
    (function (d: string, z: number, s: HTMLScriptElement) {
      s.src = `https://${d}/401/${z}`;
      try {
        (document.body || document.documentElement).appendChild(s);
      } catch (e) {
        console.error('Failed to append script:', e);
      }
    })('groleegni.net', 8671199, document.createElement('script'));
  }, []);

  return null; // This component does not render anything.
};

export default LoadScript;
