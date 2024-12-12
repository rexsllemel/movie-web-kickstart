import React from 'react';
import { siteConfig } from '@/configs/site';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
// import { Icons } from "@/components/icons";
import tealLogo from '/public/teal_logo.png';
import Script from 'next/script';
import { CPM } from '@/components/cpm';

const SiteFooter = () => {
  return (
    <footer aria-label="Footer" className="w-full">
      <div className="container grid w-full max-w-6xl gap-7 py-10">
        {/* <div className="flex flex-wrap items-center gap-2">
          {siteConfig.socialLinks.map(
            (item, i) =>
              item.href && (
                <Link key={i} href={item.href} target="_blank" rel="noreferrer">
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                      className:
                        // "rounded-none text-neutral-700 hover:bg-transparent dark:text-neutral-50 dark:hover:bg-transparent",
                        "rounded-none hover:bg-transparent",
                    })}
                  >
                    {item.icon && <item.icon className="h-6 w-6" />}
                    <span className="sr-only">{item.title}</span>
                  </div>
                </Link>
              ),
          )}
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {siteConfig.footerItems.map(
            (item, i) =>
              item.href && (
                <li
                  key={i}
                  className="text-xs text-foreground/60 hover:underline sm:text-sm"
                >
                  <Link href={item.href}>{item.title}</Link>
                </li>
              ),
          )}
        </ul> */}
        <CPM />
        <div className="mt-4 flex items-center justify-center">
          <Script
            src="//www.highperformanceformat.com/8a147717f26470e2cbe6e10557afdf68/invoke.js"
            strategy="afterInteractive"
          />
          <Script id="setAtOptions" strategy="afterInteractive">
            {`
            atOptions = {
              key: '8a147717f26470e2cbe6e10557afdf68',
              format: 'iframe',
              height: 300,
              width: 160,
              params: {}
            };
          `}
          </Script>
        </div>
        <p className="text-xs text-foreground/60 sm:text-sm">
          @ {new Date().getFullYear()} {siteConfig.author}. This site does not
          store any files on our server, we only linked to the media which is
          hosted on 3rd party services.
        </p>
      </div>
      {/* <div className="container flex flex-col items-center justify-between md:h-24 md:flex-row md:py-0 gap-4"> */}
      <div className="container flex h-24 items-center gap-2 px-8">
        {/* <Icons.play className="hidden h-6 w-6 md:block" /> */}
        <img src={tealLogo.src} alt="Logo" className="h-6 w-6" />
        <p className="text-center text-xs leading-loose sm:text-sm md:text-left">
          Built by{' '}
          <a
            href={'https://faithcloud.net'}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4">
            {'Faith Cloud Services'}
          </a>
          {/* . The source code is available on{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a> */}
          .
        </p>
      </div>
      {/* </div> */}
    </footer>
  );
};

export default SiteFooter;
