import { siteConfig } from '@/configs/site';
export const revalidate = 3600;

export default function AnimeIframePage() {
  const h1 = `${siteConfig.name} Anime`;
  return (
    <>
      <h1 className="hidden">{h1}</h1>
      <div
        style={{
          position: 'fixed',
          top: 50,
          left: 0,
          width: '100%',
          height: '100%',
        }}>
        <iframe
          src="https://another-anime-app.vercel.app"
          frameBorder="0"
          title="anime"
          style={{ width: '100%', height: '100%' }}></iframe>
      </div>
    </>
  );
}
