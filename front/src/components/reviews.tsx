import React from "react";

const StarRating = () => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className="w-8 h-8 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const Reviews = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      comment:
        "Amazing experience with this car rental service! The vehicle was in perfect condition and the staff was incredibly helpful.",
    },
    {
      name: "Michael Chen",
      comment:
        "The best car rental experience I've ever had. Great selection of vehicles, competitive prices, and outstanding customer service.",
    },
    {
      name: "Emma Thompson",
      comment:
        "Exceptional service from start to finish. The car was immaculate, pickup was quick, and the return process was hassle-free.",
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-12 px-4 md:px-0">
      <h1 className="text-4xl md:text-5xl text-[#1C1F20] font-medium text-center select-none">
        What our customers say
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-6xl">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-2xl transition-shadow"
          >
            <StarRating />
            <h2 className="text-2xl font-medium text-[#1C1F20] mt-4 mb-2">
              {review.name}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
