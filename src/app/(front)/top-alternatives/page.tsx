import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Top Free Movie Streaming Sites Like 123Movies & FMovies',
  description:
    'A roundup of free movie streaming sites like 123Movies, FMovies, and To Play Movies — watch movies, TV shows, and anime online with no login or subscription.',
};

const alternatives = [
  'To Play Movies — watch free movies, TV shows, and anime with no login',
  'FMovies',
  '123Movies',
  'Cineb.net',
  'Soap2Day',
  'SolarMovie',
];

export default function TopAlternativesPage() {
  return (
    <section className="container space-y-6 py-12 md:py-16">
      <h1 className="font-heading text-3xl leading-tight sm:text-4xl md:text-5xl">
        Top Free Movie Streaming Sites Like 123Movies in 2026
      </h1>
      <p className="max-w-2xl leading-7 text-muted-foreground sm:text-lg">
        Looking for free alternatives to paid services? Here are popular
        streaming sites for movies, TV shows, and anime — including To Play
        Movies, which lets you start watching with no account setup or
        subscription flow.
      </p>
      <ol className="ml-6 list-decimal space-y-2 leading-7 text-muted-foreground">
        {alternatives.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </section>
  );
}
