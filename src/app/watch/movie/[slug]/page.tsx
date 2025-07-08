import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;

export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
  return (
    <EmbedPlayer url={`https://player.videasy.net/movie/${id}?color=006c48`} />
    // <EmbedPlayer url={`https://player.videasy.net/movie/${id}?color=006c48`} />
  );
  // return <EmbedPlayer url={`https://vidsrc.cc/v3/embed/movie/${id}`} />;
}
