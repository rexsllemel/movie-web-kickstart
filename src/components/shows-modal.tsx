'use client';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { getMobileDetect, getYear } from '@/lib/utils';
import MovieService from '@/services/MovieService';
import { useModalStore } from '@/stores/modal';
import Script from 'next/script';
import {
  MediaType,
  type Genre,
  type ShowWithGenreAndVideo,
  type VideoResult,
} from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import Youtube from 'react-youtube';
import CustomImage from './custom-image';
// import { CPM } from '@/components/cpm';

type YouTubePlayer = {
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
  seekTo: (value: number) => void;
  container: HTMLDivElement;
  internalPlayer: YouTubePlayer;
};

type YouTubeEvent = {
  target: YouTubePlayer;
};

const userAgent =
  typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
const { isMobile } = getMobileDetect(userAgent);
const defaultOptions: Record<string, object> = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    rel: 0,
    mute: isMobile() ? 1 : 0,
    loop: 1,
    autoplay: 1,
    controls: 0,
    showinfo: 0,
    disablekb: 1,
    enablejsapi: 1,
    playsinline: 1,
    cc_load_policy: 0,
    modestbranding: 3,
  },
};

const ShowModal = () => {
  // stores
  const modalStore = useModalStore();
  const IS_MOBILE: boolean = isMobile();

  const [trailer, setTrailer] = React.useState('');
  const [isPlaying, setPlaying] = React.useState(true);
  const [genres, setGenres] = React.useState<Genre[]>([]);
  const [isMuted, setIsMuted] = React.useState<boolean>(
    modalStore.firstLoad || IS_MOBILE,
  );
  const [options, setOptions] =
    React.useState<Record<string, object>>(defaultOptions);

  const youtubeRef = React.useRef(null);
  const imageRef = React.useRef<HTMLImageElement>(null);

  // get trailer and genres of show
  React.useEffect(() => {
    if (modalStore.firstLoad || IS_MOBILE) {
      setOptions((state: Record<string, object>) => ({
        ...state,
        playerVars: { ...state.playerVars, mute: 1 },
      }));
    }
    void handleGetData();
  }, []);

  const handleGetData = async () => {
    const id: number | undefined = modalStore.show?.id;
    const type: string =
      modalStore.show?.media_type === MediaType.TV ? 'tv' : 'movie';
    if (!id || !type) {
      return;
    }
    const data: ShowWithGenreAndVideo = await MovieService.findMovieByIdAndType(
      id,
      type,
    );
    if (data?.genres) {
      setGenres(data.genres);
    }
    if (data.videos?.results?.length) {
      const videoData: VideoResult[] = data.videos?.results;
      const result: VideoResult | undefined = videoData.find(
        (item: VideoResult) => item.type === 'Trailer',
      );
      if (result?.key) setTrailer(result.key);
    }
  };

  const handleCloseModal = () => {
    modalStore.reset();
    if (!modalStore.show || modalStore.firstLoad) {
      window.history.pushState(null, '', '/home');
    } else {
      window.history.back();
    }
  };

  const onEnd = (event: YouTubeEvent) => {
    event.target.seekTo(0);
  };

  const onPlay = () => {
    if (imageRef.current) {
      imageRef.current.style.opacity = '0';
    }
    if (youtubeRef.current) {
      const iframeRef: HTMLElement | null =
        document.getElementById('video-trailer');
      if (iframeRef) iframeRef.classList.remove('opacity-0');
    }
  };

  const onReady = (event: YouTubeEvent) => {
    event.target.playVideo();
  };

  const handleChangeMute = () => {
    setIsMuted((state: boolean) => !state);
    if (!youtubeRef.current) return;
    const videoRef: YouTubePlayer = youtubeRef.current as YouTubePlayer;
    if (isMuted && youtubeRef.current) {
      videoRef.internalPlayer.unMute();
    } else if (youtubeRef.current) {
      videoRef.internalPlayer.mute();
    }
  };

  return (
    <Dialog
      open={modalStore.open}
      onOpenChange={handleCloseModal}
      aria-label="Modal containing show's details">
      <DialogContent className="w-[calc(100vw-1.5rem)] gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#10131A] p-0 text-left align-middle text-foreground shadow-2xl shadow-black/60 sm:max-w-3xl lg:max-w-5xl">
        <div className="video-wrapper relative z-10 aspect-video overflow-hidden">
          <CustomImage
            fill
            priority
            ref={imageRef}
            alt={modalStore?.show?.title ?? 'poster'}
            className="-z-40 z-[1] h-auto w-full object-cover"
            src={`https://image.tmdb.org/t/p/original${modalStore.show?.backdrop_path}`}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 100vw, 33vw"
          />
          <div className="via-[#10131A]/35 pointer-events-none inset-x-0 -bottom-6 top-0 z-10 bg-gradient-to-t from-[#10131A] to-black/20" />
          {trailer && (
            <Youtube
              opts={options}
              onEnd={onEnd}
              onPlay={onPlay}
              ref={youtubeRef}
              onReady={onReady}
              videoId={trailer}
              id="video-trailer"
              title={
                modalStore.show?.title ??
                modalStore.show?.name ??
                'video-trailer'
              }
              className="absolute inset-0 h-full w-full"
              style={{ width: '100%', height: '100%' }}
              iframeClassName="pointer-events-none absolute inset-0 h-full w-full opacity-0"
            />
          )}
          <div className="absolute bottom-5 z-20 flex w-full items-center justify-between gap-3 px-5 sm:bottom-7 sm:px-8">
            <div className="flex items-center gap-2.5">
              <Link
                href={`/watch/${
                  modalStore.show?.media_type === MediaType.MOVIE
                    ? 'movie'
                    : 'tv'
                }/${modalStore.show?.id}`}
                onClick={(e) => {
                  // e.preventDefault(); // Prevent the default link behavior
                  window.open('https://omg10.com/4/11204670', '_blank'); // Open the second link in a new tab
                  // window.location.href = '/home'; // Navigate to the original link
                }}>
                <Button
                  aria-label={`${isPlaying ? 'Pause' : 'Play'} show`}
                  className="group h-11 rounded-full bg-primary px-6 font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90">
                  <>
                    <Icons.play
                      className="mr-1.5 h-5 w-5 fill-current"
                      aria-hidden="true"
                    />
                    Play
                  </>
                </Button>
              </Link>
            </div>
            <Button
              aria-label={`${isMuted ? 'Unmute' : 'Mute'} video`}
              variant="ghost"
              className="bg-black/45 h-10 w-10 rounded-full border border-white/20 p-0 text-foreground/80 opacity-80 backdrop-blur-md hover:bg-white/10 hover:text-primary hover:opacity-100 focus:ring-offset-0"
              onClick={handleChangeMute}>
              {isMuted ? (
                <Icons.volumeMute className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Icons.volume className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
        <div className="relative z-0 -mt-px grid gap-4 bg-[#10131A] px-5 pb-6 pt-5 sm:px-8 sm:pb-8">
          <DialogTitle className="font-heading text-2xl leading-tight text-foreground sm:text-3xl">
            {modalStore.show?.title ?? modalStore.show?.name}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
            <p className="bg-primary/15 rounded-full px-3 py-1 font-semibold text-primary">
              {Math.round((Number(modalStore.show?.vote_average) / 10) * 100) ??
                '-'}
              % Match
            </p>
            {modalStore.show?.release_date ? (
              <p className="rounded-full bg-white/10 px-3 py-1">
                {getYear(modalStore.show?.release_date)}
              </p>
            ) : modalStore.show?.first_air_date ? (
              <p className="rounded-full bg-white/10 px-3 py-1">
                {getYear(modalStore.show?.first_air_date)}
              </p>
            ) : null}
            {modalStore.show?.original_language && (
              <span className="min-w-10 border-white/15 grid h-7 place-items-center rounded-full border px-2 text-xs font-bold text-muted-foreground">
                {modalStore.show.original_language.toUpperCase()}
              </span>
            )}
          </div>
          {/* <CPM /> */}
          <DialogDescription className="line-clamp-4 max-w-3xl text-sm leading-6 text-muted-foreground sm:text-base">
            {modalStore.show?.overview ?? '-'}
          </DialogDescription>
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
            <span className="text-muted-foreground">Genres:</span>
            <span className="text-foreground/85">
              {genres.map((genre) => genre.name).join(', ')}
            </span>
          </div>
          {/* <div className="mx-auto mt-8 w-full max-w-[1200px]">
            <iframe
              src="https://omg10.com/4/11204670"
              title="Embedded Content"
              className="h-[200px] w-full rounded-lg border"
              frameBorder="0"
              allowFullScreen></iframe>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShowModal;
