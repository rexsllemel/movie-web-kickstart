// components/WatchNowButton.tsx
'use client';
import Script from 'next/script';

export function CPM() {
  return (
    <div className="fixed bottom-0 left-0 right-0 mt-4 flex items-center justify-center bg-white">
      <Script
        src="//latelyninetyfeelings.com/5de907592370c3df88f9bdd23615e6d2/invoke.js"
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
