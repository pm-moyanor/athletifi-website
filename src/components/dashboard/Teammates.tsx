import React from 'react';
import { BlueShadow, UnderLineText } from '../common/Icon';
import Image from 'next/image';
import portrait from './portrait.jpg';

const players = [
  'Paul smith',
  'Carlos Fuentes',
  'Leo Messi',
  'Paul Sanders',
  'Frank Lampard',
  'Luis Diaz',
  'Andrea Pirlo',
  'Andres Iniesta',
];

const AOS_DURATION = 400;
const AOS_DELAY = 300;
const AOS_OFFSET = 100;

const Teammates = () => {
  const handlePlayerClick = (player: string) => {
    console.log(player);
  };
  return (
    <div className="w-full xl:w-1/3 2xl:w-1/3 min-h-full">
      <div className="container__border--blue-gradient bg-blue_linear_gradient after:absolute relative lg:py-16 py-5 md:py-10 z-0  after:contents-[''] after:inset-0 after:p-1 after:rounded-30 rounded-30 h-full flex items-center justify-center">
        <div
          className="flex flex-col justify-center items-center z-20 gap-4"
          data-aos="fade-up"
          data-aos-duration={AOS_DURATION}
          data-aos-easing="ease-in-sine"
          data-aos-delay={AOS_DELAY}
          data-aos-offset={AOS_OFFSET}
        >
          <h2 className="font-HelveticaNeueMedium md:text-4xl text-basemd text-primary font-medium leading-60 relative z-20 text-center md:mb-4">
            <span className="relative ">
              Teammates
              <span className="absolute -bottom-2 left-0 z-0">
                <UnderLineText />
              </span>
            </span>
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-5 max-w-sm p-5">
            {players.map((player, index) => (
              <button
                key={index}
                onClick={() => handlePlayerClick(player)}
                className="flex flex-col items-center mb-4"
              >
                <img className="w-100 h-70" src={portrait.src} />
                <div className="w-full text-primary font-Segoe text-center">
                  {player}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teammates;
