import React, { useState } from "react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqData: FaqItem[] = [
  {
    question: "What documents do I need to rent a car?",
    answer:
      "You'll need a valid driver's license, a credit card in the renter's name, and a valid form of identification. International renters may need additional documentation.",
  },
  {
    question: "Is insurance included in the rental price?",
    answer:
      "Basic insurance is included, but we offer additional protection packages for comprehensive coverage. You can select your preferred insurance option during the booking process.",
  },
  {
    question: "What is your fuel policy?",
    answer:
      "Our cars are provided with a full tank of fuel and should be returned with a full tank. If not returned full, a refueling fee will be charged.",
  },
  {
    question: "Can I modify or cancel my reservation?",
    answer:
      "Yes, you can modify or cancel your reservation up to 24 hours before the pickup time. Please contact our customer service for assistance.",
  },
  {
    question: "What happens if I return the car late?",
    answer:
      "Late returns may incur additional charges. If you think you'll be late, please contact us as soon as possible to discuss options.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-16 px-4">
      <h2 className="text-4xl md:text-5xl font-medium text-center text-[#1C1F20] mb-12 select-none">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden shadow-2xl hover:ring-2 hover:ring-gray-200 transition-all"
          >
            <button
              className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
              onClick={() => toggleFaq(index)}
            >
              <span className="text-xl font-medium text-[#1C1F20]">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 transform transition-transform ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white">
                <p className="text-gray-600 text-base">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
