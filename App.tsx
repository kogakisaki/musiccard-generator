
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MusicCard } from './components/MusicCard';
import { DownloadControls } from './components/DownloadControls';
import { WelcomeModal } from './components/WelcomeModal';
import { GitHubIcon } from './components/icons';

// Declare html2canvas to avoid TypeScript errors since it's loaded from a CDN.
declare const html2canvas: any;

// --- Color Conversion Helpers ---

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).padStart(6, '0');
}

const createDarkBackgroundColor = (hexColor: string): string => {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#141f18'; // Default fallback
    const [h, s] = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const darkL = 0.1; // 10% lightness
    const darkS = s * 0.35; // 35% of original saturation
    const [newR, newG, newB] = hslToRgb(h, darkS, darkL);
    return rgbToHex(newR, newG, newB);
};


const App: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string>('#94e0b2');
  const [backgroundColor, setBackgroundColor] = useState<string>(() => createDarkBackgroundColor(accentColor));
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [title, setTitle] = useState<string>('Waterfall');
  const [artist, setArtist] = useState<string>('Kotori & JVNA');
  const [albumArtSrc, setAlbumArtSrc] = useState<string>('https://i1.sndcdn.com/artworks-000239212561-zfayie-t500x500.jpg');
  const [dailySongText, setDailySongText] = useState<string>('Daily song');
  const [dayText, setDayText] = useState<string>('Day 1');
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const [showMobileWarning, setShowMobileWarning] = useState<boolean>(false);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.style.setProperty('--player-accent-color', accentColor);
    setBackgroundColor(createDarkBackgroundColor(accentColor));
  }, [accentColor]);

  // Clean up blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (albumArtSrc.startsWith('blob:')) {
        URL.revokeObjectURL(albumArtSrc);
      }
    };
  }, [albumArtSrc]);

  // Detect mobile device and show warning
  useEffect(() => {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    if (isMobile) {
      setShowMobileWarning(true);
    }
  }, []);

  const handleAlbumArtChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Revoke the old URL if it's a blob
      if (albumArtSrc.startsWith('blob:')) {
        URL.revokeObjectURL(albumArtSrc);
      }
      const newSrc = URL.createObjectURL(file);
      setAlbumArtSrc(newSrc);
    }
  };

  const handleDownload = useCallback(async () => {
    if (!cardRef.current) return;
    
    setIsDownloading(true);
    setError(null);

    try {
      await document.fonts.ready;
      
      const albumArtImg = cardRef.current.querySelector('#album-art-img') as HTMLImageElement;
      if (albumArtImg) {
        await new Promise<void>((resolve, reject) => {
            if (albumArtImg.complete && albumArtImg.naturalHeight !== 0) {
                resolve();
            } else {
                albumArtImg.onload = () => resolve();
                albumArtImg.onerror = () => reject(new Error('Image failed to load.'));
            }
        });
      }

      const canvas = await html2canvas(cardRef.current, {
        useCORS: true,
        backgroundColor: null, // Transparent background for initial capture
        scale: 4, // Tăng scale để tăng chất lượng ảnh
        onclone: (clonedDocument: Document) => {
          const clonedCard = clonedDocument.getElementById('card-to-download');
          if (!clonedCard) return;
          
          clonedCard.style.backgroundColor = backgroundColor;
          
          // Remove border radius from the card itself for sharp corners
          clonedCard.style.borderRadius = '0px';

          // Remove border radius from children (e.g., album art)
          const roundedChildren = clonedCard.querySelectorAll('.rounded-xl');
          roundedChildren.forEach(el => {
            (el as HTMLElement).style.borderRadius = '0px';
          });

          // Replace editable inputs with static divs for rendering
          const inputs = clonedCard.querySelectorAll('input.editable-text');
          inputs.forEach(node => {
            const input = node as HTMLInputElement;
            const div = clonedDocument.createElement('div');
            div.className = input.className;
            div.textContent = input.value;
            div.style.border = '1px solid transparent';
            div.style.backgroundColor = 'transparent';
            div.style.padding = '2px 4px';
            div.style.margin = '-2px -4px';
            input.parentNode?.replaceChild(div, input);
          });

          // Ensure play/pause button remains circular
          const playPauseButton = clonedCard.querySelector('.player-button-bg');
          if (playPauseButton) {
            (playPauseButton as HTMLElement).style.borderRadius = '50%';
          }
        },
      });
      
      // Create a new canvas to add bottom padding
      const bottomPadding = 64; // Add 32px of padding at 2x scale
      const finalCanvas = document.createElement('canvas');
      const ctx = finalCanvas.getContext('2d');

      if (!ctx) {
          throw new Error('Could not get canvas context');
      }

      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height + bottomPadding;

      // Fill the new canvas with the background color
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, finalCanvas.width, finalCanvas.height);

      // Draw the original captured canvas onto the new one
      ctx.drawImage(canvas, 0, 0);

      const imageDataUrl = finalCanvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageDataUrl;
      const safeFilename = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      link.download = `the-nhac-${safeFilename || 'untitled'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (err) {
      console.error('Error generating or downloading image:', err);
      setError('Không thể tải ảnh. Vui lòng thử lại.');
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsDownloading(false);
    }
  }, [title, backgroundColor]);

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col dark group/design-root overflow-y-auto py-8 transition-colors duration-500"
      style={{ backgroundColor: backgroundColor }}
    >
      <WelcomeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {showMobileWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="bg-red-700 text-white p-6 rounded-lg shadow-lg text-center max-w-sm mx-4">
            <h3 className="text-xl font-bold mb-4">Cảnh báo: Chế độ xem trên thiết bị di động</h3>
            <p className="mb-4">Để có trải nghiệm tốt nhất, vui lòng chuyển sang chế độ xem trên máy tính hoặc sử dụng thiết bị máy tính.</p>
            <button
              onClick={() => setShowMobileWarning(false)}
              className="bg-white text-red-700 px-4 py-2 rounded-full font-semibold hover:bg-gray-200 transition-colors"
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}

      <div className="my-auto">
        <MusicCard
          ref={cardRef}
          isPlaying={isPlaying}
          onPlayPauseClick={() => setIsPlaying(!isPlaying)}
          title={title}
          artist={artist}
          albumArtSrc={albumArtSrc}
          onTitleChange={(e) => setTitle(e.target.value)}
          onArtistChange={(e) => setArtist(e.target.value)}
          onAlbumArtChange={handleAlbumArtChange}
          dailySongText={dailySongText}
          onDailySongTextChange={(e) => setDailySongText(e.target.value)}
          dayText={dayText}
          onDayTextChange={(e) => setDayText(e.target.value)}
          backgroundColor={backgroundColor}
        />
        <DownloadControls
          accentColor={accentColor}
          onColorChange={(e) => setAccentColor(e.target.value)}
          onDownload={handleDownload}
          isDownloading={isDownloading}
          onShowHelp={() => setIsModalOpen(true)}
        />
      </div>
      
      <footer className="text-center text-white/50 text-sm mt-auto">
        <a
          href="https://github.com/kogakisaki"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:text-white transition-colors duration-200"
          aria-label="View developer's GitHub profile"
        >
          <GitHubIcon />
        </a>
      </footer>

      {error && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default App;
