
import React from 'react';
import { CaretDownIcon, DotsThreeIcon } from './icons';

export const Header: React.FC = () => (
  <header className="flex items-center bg-[#141f18] p-6 pb-4 justify-between">
    <div className="text-white flex size-12 shrink-0 items-center">
      <CaretDownIcon />
    </div>
    <div className="flex w-12 items-center justify-end">
      <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
        <DotsThreeIcon />
      </button>
    </div>
  </header>
);
