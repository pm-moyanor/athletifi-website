import React from 'react';
import { ArrowButton } from './Icon';

interface BlueButtonProps {
  text: string;
}

const BlueButton = ({ text }: BlueButtonProps) => {
  return (
    <>
      <span className="sm:px-24pixel px-4 sm:py-14.5 py-2 flex bg-skyblue text-base font-semibold text-black font-Segoe leading-6 gap-6 group border border-skyblue hover:bg-black hover:text-skyblue join_now_btn transition duration-300 ease-in-out cursor-pointer">
        {text}
        {/* Arrow */}
        <span className="group-hover:translate-x-3 transition duration-300 ease-out">
          <ArrowButton />
        </span>
      </span>
    </>
  );
};

export default BlueButton;
