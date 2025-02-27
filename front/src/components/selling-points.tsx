import React from "react";

const SellingPoint = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 md:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center backdrop-blur-sm backdrop-filter relative overflow-hidden group hover:transform hover:-translate-y-0.5">
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      ></div>

      <div className="absolute top-0 left-0 right-0 h-[60%] bg-gradient-to-b from-white/60 to-transparent rounded-t-2xl transform origin-top group-hover:scale-y-110 transition-transform duration-300"></div>

      <div className="absolute inset-0 bg-gradient-to-tr from-[#AA4D2B]/5 via-transparent to-blue-100/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="relative z-10 mb-5">
        <div className="text-[#AA4D2B] mb-4 flex justify-center w-full">
          <div className="flex justify-center items-center p-4 rounded-full bg-white shadow-lg group-hover:shadow-xl group-hover:shadow-[#AA4D2B]/20 transition-all duration-300 relative">
            <div className="absolute inset-0 rounded-full bg-[#AA4D2B]/10 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative z-10">{icon}</div>
          </div>
        </div>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-[#1C1F20] mb-3 relative z-10 group-hover:text-[#AA4D2B] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 relative z-10 group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};

const Selling = () => {
  return (
    <div className="w-full max-w-6xl mt-6 mx-auto px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SellingPoint
          title="Premium Vehicles"
          description="Experience luxury and comfort with our meticulously maintained, high-quality fleet of vehicles."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
          }
        />
        <SellingPoint
          title="Stress-Free Booking"
          description="Our streamlined process makes booking your vehicle quick and hassle-free, from selection to checkout."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
        />
        <SellingPoint
          title="24/7 Customer Support"
          description="Our dedicated team is available around the clock to ensure your journey is smooth and worry-free."
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h.01M12 12h.01M15 12h.01M12 16v-4"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default Selling;
