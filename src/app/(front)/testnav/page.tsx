import { siteConfig } from '@/configs/site';
import MainNav from '@/components/navigation/main-nav';

export default function AnimeIframePage() {
  return (
    <>
      <div>
        <MainNav items={siteConfig.mainNav} />
      </div>
    </>
  );
}
