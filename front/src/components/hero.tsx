import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-end bg-[url(/hero_bg.png)] bg-cover bg-no-repeat bg-[center_top_-14rem] h-[300px] md:h-[500px] w-full rounded-[50px] shadow-2xl">
      <div className="flex flex-col items-end w-full h-full bg-black bg-opacity-0 bg-gradient-to-b from-transparent via-transparent to-[#262626] rounded-[50px]">
        <h1 className="text-4xl md:text-8xl text-black opacity-85 font-bold font-custom mt-10 md:mt-16 mr-4 md:mr-24 select-none">
          Car Rental
        </h1>
      </div>
    </div>
  );
};

export default Hero;
