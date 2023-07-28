import React from "react";
import { ArrowButton } from "./Icon";

const BlueButton = (props) => {
  return (
    <>
      <button className=" px-[24px] py-[14.5px] flex bg-skyblue text-base font-semibold text-black font-Segoe leading-6 gap-[6px]">
        {props.text} <ArrowButton />
      </button>
    </>
  );
};

export default BlueButton;
