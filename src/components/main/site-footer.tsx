import React from 'react';
import { siteConfig } from '@/configs/site';
// import { Icons } from "@/components/icons";
import tealLogo from '/public/teal_logo.png';
// import { CPM } from '@/components/cpm';

const SiteFooter = () => {
  return (
    <footer
      aria-label="Footer"
      className="bg-black/35 mt-16 w-full border-t border-white/10">
      <div className="container grid w-full max-w-6xl gap-5 py-10">
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
        {/* <CPM />
        <div className="fixed bottom-0 left-0 right-0 mt-4 flex items-center justify-center bg-white">
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
        </div> */}
        <p className="max-w-3xl text-xs leading-6 text-muted-foreground sm:text-sm">
          @ {new Date().getFullYear()} {siteConfig.author}. This site does not
          store any files on our server, we only linked to the media which is
          hosted on 3rd party services.
        </p>
      </div>
      {/* <div className="container flex flex-col items-center justify-between md:h-24 md:flex-row md:py-0 gap-4"> */}
      <div className="min-h-24 container flex flex-col items-start justify-center gap-3 border-t border-white/5 px-8 py-6 sm:flex-row sm:items-center sm:justify-between">
        {/* <Icons.play className="hidden h-6 w-6 md:block" /> */}
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-primary/25 bg-primary/10">
            <img src={tealLogo.src} alt="Logo" className="h-5 w-5" />
          </span>
          <span className="font-heading text-sm text-foreground">
            {siteConfig.name}
          </span>
        </div>
        <p className="text-xs leading-loose text-muted-foreground sm:text-sm md:text-left">
          Built by IDK.
        </p>
      </div>
      {/* </div> */}
      {/* <div className="mx-auto mt-8 w-full max-w-[1200px]">
        <iframe
          src="https://omg10.com/4/11204670"
          title="Embedded Content"
          className="h-[200px] w-full rounded-lg border"
          frameBorder="0"
          allowFullScreen></iframe>
      </div> */}
    </footer>
  );
};

export default SiteFooter;
