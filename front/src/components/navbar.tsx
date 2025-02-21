import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#F1EFEA] py-4 px-24 flex justify-between items-center rounded-3xl">
      <div className="text-black text-4xl font-bold font-custom tracking-wide">
        Car Rental
      </div>
      <div>
        <button className="bg-[#F1EFEA] text-black text-sm px-4 py-2 rounded border-2 border-black">
          Login / Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
