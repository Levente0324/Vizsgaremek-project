import React from "react";

const Location = () => {
  return (
    <div className="w-full py-6 px-4 mt-10">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-medium text-[#1C1F20] mb-4">
          Find Us Here
        </h2>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-xl shadow-2xl ring-2 ring-gray-300">
          <h3 className="text-2xl font-semibold text-[#1C1F20] mb-4">
            Contact Information
          </h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#AA4D2B] mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <h4 className="font-medium text-[#1C1F20]">Address</h4>
                <p className="text-gray-600">1146 Budapest, Thököly út 48-54</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#AA4D2B] mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <h4 className="font-medium text-[#1C1F20]">Phone</h4>
                <p className="text-gray-600">+36 1 234 5678</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#AA4D2B] mt-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h4 className="font-medium text-[#1C1F20]">Opening Hours</h4>
                <p className="text-gray-600">Monday - Friday: 8:00 - 18:00</p>
                <p className="text-gray-600">Saturday: 9:00 - 14:00</p>
                <p className="text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-2xl ring-2 ring-gray-300">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.0447991332973!2d19.09597287678847!3d47.50199997117819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741dc79974d8a3f%3A0x716d821ca6654e44!2sBudapest%2C%20Th%C3%B6k%C3%B6ly%20%C3%BAt%2048-54%2C%201146!5e0!3m2!1sen!2shu!4v1710729577955!5m2!1sen!2shu"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="hover:opacity-90 transition-opacity duration-300"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Location;
