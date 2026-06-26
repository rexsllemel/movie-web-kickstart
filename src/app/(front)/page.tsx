import { siteConfig } from '@/configs/site';
import { WatchNowButton } from '@/components/WatchNowButton';
import { PreDownload } from '@/components/PreDownload';
import { Clapperboard, MonitorPlay, Search, ShieldCheck } from 'lucide-react';

export default function Index() {
  const features = [
    {
      title: 'Free movie shelves',
      description:
        'Jump into trending movies, TV shows, anime, and genre rows without signing up first.',
      icon: Clapperboard,
    },
    {
      title: 'Quick title search',
      description:
        'Find a movie or show by title, genre, actor, or director and get back to watching faster.',
      icon: Search,
    },
    {
      title: 'Made for every screen',
      description:
        'Open the site on desktop, tablet, or mobile, with the Android app ready for quicker access.',
      icon: MonitorPlay,
    },
    {
      title: 'No-login access',
      description:
        'No account setup or subscription flow, just a direct path to the titles you want to play.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="overflow-hidden">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-[calc(100vh-4rem)] overflow-hidden px-[4vw] pb-20 pt-28">
        <div className="absolute inset-0 -z-10">
          <div className="opacity-35 absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="via-background/35 absolute inset-0 bg-gradient-to-t from-background to-black/30" />
        </div>
        {/* <Link href={siteConfig.links.twitter} target="_blank" rel="noreferrer">
          <Badge
            aria-hidden="true"
            className="rounded-md px-3.5 py-1.5"
            variant="secondary">
            <Icons.twitter className="mr-2 h-3.5 w-3.5" />
            Follow along on Twitter
          </Badge>
          <span className="sr-only">Twitter</span>
        </Link> */}
        <div className="mx-auto flex min-h-[calc(100vh-12rem)] max-w-6xl flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Free movies, no login
          </div>
          <h1
            id="hero-heading"
            className="text-balance max-w-4xl font-heading text-5xl leading-[0.95] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {siteConfig.name}
            {/* {siteConfig.name} - watch tv shows online, watch movies online. */}
            {/* An e-commerce skateshop built with everything new in Next.js 13 */}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
            {siteConfig.slogan}. Browse movies, TV shows, anime, and new
            releases with no account setup between you and the next title.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              No sign-up
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              No subscription
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
              Poster-first browsing
            </span>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <WatchNowButton />
            <PreDownload />
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-8 py-12 md:py-16 lg:py-24">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-heading text-3xl leading-tight sm:text-4xl md:text-5xl">
            Start watching with fewer steps.
          </h2>
          <p className="leading-7 text-muted-foreground sm:text-lg">
            Cleaner browsing, sharper artwork, and a no-login path from search
            to play.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="cinema-panel relative overflow-hidden rounded-2xl p-6">
                <Icon className="mb-8 h-7 w-7 text-primary" />
                <h3 className="mb-2 font-heading text-xl">{feature.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
          {/* <Script
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
          </Script> */}
        </div>
        {/* <div className="mx-auto text-center md:max-w-[58rem]"> */}
        {/*   <p className="leading-normal text-muted-foreground sm:text-lg sm:leading-7"> */}
        {/*     Taxonomy also includes a blog and a full-featured documentation site */}
        {/*   </p> */}
        {/* </div> */}
      </section>
    </div>
  );
}
