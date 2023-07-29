
import React from "react";
import { ArrowButton } from "./Icon";

interface BlueButtonProps {
  // Define the expected props and their types here
  // For example:
  onClick: () => void;
  text: string;
}

const BlueButton: React.FC<BlueButtonProps> = (props) => {
  // Now, you can safely use the props with their specified types
  // For example:
  return (
    <>
      <button
        className="sm:px-[24px] px-4 sm:py-[14.5px] py-2 flex bg-skyblue text-base font-semibold text-black font-Segoe leading-6 gap-[6px] group border border-skyblue hover:bg-black hover:text-skyblue join_now_btn transition duration-300 ease-in-out"
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  );
};

export default BlueButton;