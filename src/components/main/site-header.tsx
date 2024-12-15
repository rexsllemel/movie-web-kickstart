import { siteConfig } from '@/configs/site';
import React from 'react';
import MainNav from '@/components/navigation/main-nav';

const SiteHeader = () => {
  return (
    <header className="fixed bottom-0 left-0 z-50 bg-gray-800 text-white">
      <MainNav items={siteConfig.mainNav} />
      {/* <MobileNav items={siteConfig.mainNav} className="md:hidden" /> */}
    </header>
  );
};

export default SiteHeader;
