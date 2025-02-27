import React from "react";

const Hero = () => {
  return (
    <div className="relative flex flex-col items-end bg-[url(/hero_bg.png)] bg-cover bg-center h-[300px] md:h-[500px] w-full rounded-[50px] shadow-2xl ring-1 ring-gray-300 overflow-hidden -z-50">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#262626] rounded-[50px]">
        <h1 className="absolute top-10 md:top-16 right-4 md:right-24 text-4xl md:text-8xl opacity-85 font-bold font-custom select-none text-transparent bg-clip-text bg-gradient-to-tr from-zinc-500 to-zinc-950 hero-title">
          Car Rental
        </h1>
      </div>
    </div>
  );
};

export default Hero;
