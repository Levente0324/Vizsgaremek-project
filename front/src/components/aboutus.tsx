import React from "react";
import { TRANSITIONS } from "@/utils/styles";

const Aboutus = () => {
  return (
    <section id="about" className="w-full px-4 md:px-8 mt-16 scroll-mt-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-medium text-center text-[#1C1F20] mb-6">
          <span className="bg-gradient-to-r from-[#AA4D2B] to-[#78270a] bg-clip-text text-transparent">
            About Us
          </span>
        </h1>

        <div className="bg-gradient-to-br from-[#F1EFEA] to-[#ffd6c8] rounded-3xl shadow-2xl p-6 md:p-10 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#AA4D2B]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#AA4D2B]/10 rounded-full blur-3xl"></div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
            <div className="flex-shrink-0 flex justify-center items-center">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-[#AA4D2B] rounded-full flex place-items-center justify-center shadow-lg transform hover:rotate-3 hover:scale-105 transition-transform duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="w-16 h-16 md:w-20 md:h-20"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-grow">
              <h3 className="text-2xl md:text-3xl font-semibold text-[#AA4D2B] mb-4">
                Your Premium Car Rental Experience
              </h3>

              <p className="text-lg text-[#1C1F20] mb-6 leading-relaxed">
                Since 2010, we've been providing exceptional car rental services
                with a focus on customer satisfaction, quality vehicles, and
                competitive pricing.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {[
                  {
                    title: "Premium Fleet",
                    description: "Latest models, regularly maintained",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                      />
                    ),
                  },
                  {
                    title: "24/7 Support",
                    description: "Always here when you need us",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    ),
                  },
                  {
                    title: "Best Rates",
                    description: "Competitive pricing guaranteed",
                    icon: (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                      />
                    ),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md ${TRANSITIONS.DEFAULT} hover:translate-y-[-2px]`}
                  >
                    <div className="bg-white p-2 rounded-full shadow-md text-[#AA4D2B]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        {item.icon}
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#1C1F20]">
                        {item.title}
                      </h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutus;
