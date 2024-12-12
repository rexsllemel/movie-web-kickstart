// components/WatchNowButton.tsx
'use client';
import Script from 'next/script';

export function CPM() {
  return (
    <div className="mt-4 flex items-center justify-center">
      <Script
        src="//www.highperformanceformat.com/5de907592370c3df88f9bdd23615e6d2/invoke.js"
        strategy="afterInteractive"
      />
      <Script id="setAtOptions" strategy="afterInteractive">
        {`
      atOptions = {
        key: '5de907592370c3df88f9bdd23615e6d2',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {}
      };
    `}
      </Script>
    </div>
  );
}
