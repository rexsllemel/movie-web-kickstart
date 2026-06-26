import { WatchNowButton } from '@/components/WatchNowButton';
import { siteConfig } from '@/configs/site';
import { Clapperboard, MonitorPlay, Search, ShieldCheck } from 'lucide-react';

const features = [
  {
    title: 'Browse faster',
    description:
      'Open a mobile-first shelf of movies, TV shows, anime, and new releases.',
    icon: Clapperboard,
  },
  {
    title: 'Search from the top',
    description:
      'The mobile branch keeps search close to your thumb on every browse page.',
    icon: Search,
  },
  {
    title: 'Poster-first layout',
    description:
      'Cards, rows, and previews are tuned for small screens and touch browsing.',
    icon: MonitorPlay,
  },
  {
    title: 'Simple access',
    description:
      'No extra account flow in the way. Tap in, pick a title, and play.',
    icon: ShieldCheck,
  },
];

export default function Index() {
  return (
    <div className="overflow-hidden">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="relative min-h-[calc(100dvh-4rem)] overflow-hidden px-4 pb-16 pt-28">
        <div className="absolute inset-0 -z-10">
          <div className="opacity-35 absolute inset-0 bg-[url('/images/hero.jpg')] bg-cover bg-center" />
          <div className="via-background/85 absolute inset-0 bg-gradient-to-r from-background to-background/40" />
          <div className="via-background/35 absolute inset-0 bg-gradient-to-t from-background to-black/30" />
        </div>
        <div className="mx-auto flex min-h-[calc(100dvh-12rem)] max-w-4xl flex-col justify-center gap-6">
          <div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Mobile cinema
          </div>
          <h1
            id="hero-heading"
            className="text-balance font-heading text-5xl leading-[0.95] text-foreground sm:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
            {siteConfig.slogan}. A darker, faster, poster-first movie experience
            tuned for mobile browsers.
          </p>
          <div>
            <WatchNowButton />
          </div>
        </div>
      </section>

      <section id="features" className="container space-y-8 py-12">
        <div className="max-w-3xl space-y-3">
          <h2 className="font-heading text-3xl leading-tight sm:text-4xl">
            Built for browsing with one hand.
          </h2>
          <p className="leading-7 text-muted-foreground">
            The mobile branch keeps the controls compact, the cards readable,
            and the preview modal comfortable on small screens.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="cinema-panel relative overflow-hidden rounded-2xl p-5">
                <Icon className="mb-7 h-7 w-7 text-primary" />
                <h3 className="mb-2 font-heading text-xl">{feature.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
