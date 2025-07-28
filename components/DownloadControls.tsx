
import React from 'react';
import { InfoIcon } from './icons';

interface DownloadControlsProps {
  accentColor: string;
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDownload: () => void;
  isDownloading: boolean;
  onShowHelp: () => void;
}

export const DownloadControls: React.FC<DownloadControlsProps> = ({
  accentColor,
  onColorChange,
  onDownload,
  isDownloading,
  onShowHelp,
}) => (
  <div className="flex flex-col items-center justify-center p-4 gap-4">
    <button
      onClick={onDownload}
      disabled={isDownloading}
      className="flex items-center justify-center px-6 py-3 download-button-bg text-[#141f18] font-bold rounded-full shadow-lg hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDownloading ? 'Đang tạo...' : 'Tải thẻ nhạc dưới dạng ảnh'}
    </button>
    <div className="flex items-center gap-4 text-white">
      <div className="flex items-center gap-2">
        <label htmlFor="player-color-picker" className="text-sm font-medium">
          Màu nút điều khiển:
        </label>
        <input
          type="color"
          id="player-color-picker"
          value={accentColor}
          onChange={onColorChange}
          className="rounded-md cursor-pointer border-2 border-white"
        />
      </div>
      <button 
        onClick={onShowHelp} 
        className="text-white/70 hover:text-white transition-colors"
        aria-label="Show help"
      >
        <InfoIcon />
      </button>
    </div>
  </div>
);
