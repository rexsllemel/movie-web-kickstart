'use client';
import { useEffect } from 'react';

export function CPM() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cimtaiphos.com/401/8671254';
    try {
      (document.body || document.documentElement).appendChild(script);
    } catch (e) {
      console.error('Failed to append script:', e);
    }
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 mt-4 flex items-center justify-center bg-white">
      {/* Add any additional content here if needed */}
    </div>
  );
}
