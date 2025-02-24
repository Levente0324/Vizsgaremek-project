import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col items-end bg-[url(/hero_bg.png)] bg-cover bg-no-repeat bg-center h-[300px] md:h-[500px] w-full rounded-3xl">
      <h1 className="text-4xl md:text-8xl text-black opacity-85 font-bold font-custom mt-10 md:mt-20 mr-4 md:mr-24">
        Car Rental
      </h1>
    </div>
  );
};

export default Hero;
