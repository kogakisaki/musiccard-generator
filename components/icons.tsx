
import React from 'react';

export const SkipBackIcon: React.FC = () => (
  <div className="text-inherit" data-icon="SkipBack" data-size="32px" data-weight="fill">
    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M208,47.88V208.12a16,16,0,0,1-24.43,13.43L64,146.77V216a8,8,0,0,1-16,0V40a8,8,0,0,1,16,0v69.23L183.57,34.45A15.95,15.95,0,0,1,208,47.88Z"></path>
    </svg>
  </div>
);

export const RewindIcon: React.FC = () => (
  <div className="text-inherit" data-icon="Rewind" data-size="32px" data-weight="fill">
    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M232,71.84V184.16a15.92,15.92,0,0,1-24.48,13.34L128,146.86v37.3a15.92,15.92,0,0,1-24.48,13.34L15.33,141.34a15.8,15.8,0,0,1,0-26.68L103.52,58.5A15.91,15.91,0,0,1,128,71.84v37.3L207.52,58.5A15.91,15.91,0,0,1,232,71.84Z"></path>
    </svg>
  </div>
);

export const PlayIcon: React.FC = () => (
  <div className="text-inherit" data-icon="Play" data-size="32px" data-weight="fill">
    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M240,128a15.74,15.74,0,0,1-7.6,13.51L88.32,229.65a16,16,0,0,1-16.2.3A15.86,15.86,0,0,1,64,216.13V39.87a15.86,15.86,0,0,1,8.12-13.82,16,16,0,0,1,16.2.3L232.4,114.49A15.74,15.74,0,0,1,240,128Z"></path>
    </svg>
  </div>
);

export const PauseIcon: React.FC = () => (
    <div className="text-inherit" data-icon="Pause" data-size="32px" data-weight="fill">
      <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
         <path d="M216,48V208a16,16,0,0,1-16,16H160a16,16,0,0,1-16-16V48a16,16,0,0,1,16-16h40A16,16,0,0,1,216,48ZM96,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V48A16,16,0,0,0,96,32Z"></path>
      </svg>
    </div>
);

export const FastForwardIcon: React.FC = () => (
  <div className="text-inherit" data-icon="FastForward" data-size="32px" data-weight="fill">
    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M248,128a15.76,15.76,0,0,1-7.33,13.34L152.48,197.5A15.91,15.91,0,0,1,128,184.16v-37.3L48.48,197.5A15.91,15.91,0,0,1,24,184.16V71.84A15.91,15.91,0,0,1,48.48,58.5L128,109.14V71.84A15.91,15.91,0,0,1,152.48,58.5l88.19,56.16A15.76,15.76,0,0,1,248,128Z"></path>
    </svg>
  </div>
);

export const SkipForwardIcon: React.FC = () => (
  <div className="text-inherit" data-icon="SkipForward" data-size="32px" data-weight="fill">
    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M208,40V216a8,8,0,0,1-16,0V146.77L72.43,221.55A15.95,15.95,0,0,1,48,208.12V47.88A15.95,15.95,0,0,1,72.43,34.45L192,109.23V40a8,8,0,0,1,16,0Z"></path>
    </svg>
  </div>
);

export const CameraIcon: React.FC<{ size?: string }> = ({ size = "48px" }) => (
    <div className="inline-block" data-icon="Camera" style={{width: size, height: size}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" viewBox="0 0 256 256">
            <path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.72,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm-80,112a40,40,0,1,1,40-40A40,40,0,0,1,128,168Z"></path>
        </svg>
    </div>
);

export const CaretDownIcon: React.FC = () => (
  <div className="text-inherit" data-icon="CaretDown" data-size="32px" data-weight="fill">
    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
    </svg>
  </div>
);

export const DotsThreeIcon: React.FC = () => (
  <div className="text-inherit" data-icon="DotsThree" data-size="32px" data-weight="fill">
    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="currentColor" viewBox="0 0 256 256">
      <path d="M144,128a16,16,0,1,1-16-16A16,16,0,0,1,144,128ZM48,112a16,16,0,1,0,16,16A16,16,0,0,0,48,112Zm160,0a16,16,0,1,0,16,16A16,16,0,0,0,208,112Z"></path>
    </svg>
  </div>
);

export const InfoIcon: React.FC = () => (
  <div className="text-inherit" data-icon="Info" data-size="24px">
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 640 640">
      <path d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/>
    </svg>
  </div>
);

export const GitHubIcon: React.FC = () => (
  <div className="text-inherit" data-icon="GitHub" data-size="24px">
    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  </div>
);
