import React, { forwardRef } from 'react';
import { 
  SkipBackIcon, 
  RewindIcon, 
  PlayIcon,
  PauseIcon,
  FastForwardIcon, 
  SkipForwardIcon,
  CameraIcon
} from './icons';

interface MusicCardProps {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  title: string;
  artist: string;
  albumArtSrc: string;
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onArtistChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAlbumArtChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dailySongText: string;
  onDailySongTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dayText: string;
  onDayTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  backgroundColor: string;
}

export const MusicCard = forwardRef<HTMLDivElement, MusicCardProps>(({ 
  isPlaying, 
  onPlayPauseClick,
  title,
  artist,
  albumArtSrc,
  onTitleChange,
  onArtistChange,
  onAlbumArtChange,
  dailySongText,
  onDailySongTextChange,
  dayText,
  onDayTextChange,
  backgroundColor
}, ref) => (
  <div 
    ref={ref} 
    id="card-to-download"
    className="card-background flex flex-col items-stretch gap-4 px-4 pt-6 pb-12 text-white mx-auto w-full max-w-sm transition-colors duration-500"
    style={{ backgroundColor: backgroundColor }}
  >
    <div className="text-center">
      <input
        type="text"
        value={dailySongText}
        onChange={onDailySongTextChange}
        className="editable-text text-center player-button-text text-xs font-medium uppercase tracking-widest"
        aria-label="Daily song label"
      />
      <input
        type="text"
        value={dayText}
        onChange={onDayTextChange}
        className="editable-text text-center text-white text-xl font-bold leading-tight mt-1"
        aria-label="Day number"
      />
    </div>
    <div className="flex items-center justify-center py-4">
        <label className="relative group cursor-pointer block">
            <img
                id="album-art-img"
                src={albumArtSrc}
                alt="Album Art"
                className="rounded-xl w-72 aspect-square object-cover"
                crossOrigin="anonymous"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = 'https://placehold.co/500x500/333333/FFFFFF?text=Image+Error';
                }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none">
                <span className="text-white text-center">
                    <CameraIcon />
                    <p className="text-sm font-semibold mt-1">Đổi ảnh</p>
                </span>
            </div>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onAlbumArtChange}
                aria-label="Change album art"
            />
        </label>
    </div>
    <div className="text-center py-2">
      <input
        type="text"
        value={title}
        onChange={onTitleChange}
        className="editable-text text-white text-[22px] font-bold leading-tight tracking-[-0.015em]"
        aria-label="Song title"
      />
      <input
        type="text"
        value={artist}
        onChange={onArtistChange}
        className="editable-text player-button-text text-base font-normal leading-normal"
        aria-label="Artist name"
      />
    </div>
    <div className="flex items-center justify-center gap-6 pt-1">
      <button className="flex shrink-0 items-center justify-center rounded-full size-10 player-button-text player-button-hover-bg-20 transition-colors duration-200">
        <SkipBackIcon />
      </button>
      <button className="flex shrink-0 items-center justify-center rounded-full size-10 player-button-text player-button-hover-bg-20 transition-colors duration-200">
        <RewindIcon />
      </button>
      <button 
        onClick={onPlayPauseClick}
        className="flex shrink-0 items-center justify-center rounded-xl size-16 player-button-bg text-[#141f18] shadow-lg hover:scale-105 transition-transform duration-200"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <button className="flex shrink-0 items-center justify-center rounded-full size-10 player-button-text player-button-hover-bg-20 transition-colors duration-200">
        <FastForwardIcon />
      </button>
      <button className="flex shrink-0 items-center justify-center rounded-full size-10 player-button-text player-button-hover-bg-20 transition-colors duration-200">
        <SkipForwardIcon />
      </button>
    </div>
  </div>
));