import React from "react";
import { formatPrice } from "@/utils/currency";

interface BookingStepsProps {
  carPrice: number;
  onComplete: (data: BookingData) => void;
  onCancel: () => void;
  startDate: Date;
  endDate: Date;
}

interface BookingData {
  protectionPackage: Protection | null;
  extras: Extra[];
  paymentDetails: PaymentDetails;
  totalPrice: number;
}

interface Protection {
  name: string;
  price: number;
  description: string;
}

interface Extra {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface PaymentDetails {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

const PROTECTION_PACKAGES: Protection[] = [
  {
    name: "Basic",
    price: 5000,
    description: "Basic coverage for minor damages",
  },
  {
    name: "Premium",
    price: 8000,
    description: "Extended coverage including tire and glass damage",
  },
  {
    name: "Full",
    price: 12000,
    description: "Complete coverage with zero deductible",
  },
  {
    name: "None",
    price: 0,
    description: "No additional protection",
  },
];

const EXTRA_SERVICES: Extra[] = [
  {
    id: "1",
    name: "GPS Navigation",
    price: 2000,
    description: "Built-in GPS navigation system",
  },
  {
    id: "2",
    name: "Child Seat",
    price: 3000,
    description: "Safe and comfortable child seat",
  },
  {
    id: "3",
    name: "Additional Driver",
    price: 5000,
    description: "Register an additional driver",
  },
  {
    id: "4",
    name: "Airport Pickup",
    price: 8000,
    description: "Pickup service from airport",
  },
];

const formatCardNumber = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  return numbers.slice(0, 16);
};

const formatExpiryDate = (value: string): string => {
  const numbers = value.replace(/\D/g, "");
  if (numbers.length >= 2) {
    return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
  }
  return numbers;
};

const isValidName = (name: string): boolean => {
  return /^[A-Za-z\s]{3,}$/.test(name);
};

const isValidExpiryDate = (date: string): boolean => {
  if (!/^\d{2}\/\d{2}$/.test(date)) return false;

  const [month, year] = date.split("/").map((num) => parseInt(num));
  const currentYear = new Date().getFullYear() % 100;

  return (
    month >= 1 &&
    month <= 12 &&
    year >= 25 &&
    (year > currentYear ||
      (year === currentYear && month > new Date().getMonth() + 1))
  );
};

export default function BookingSteps({
  carPrice,
  onComplete,
  onCancel,
  startDate,
  endDate,
}: BookingStepsProps) {
  const [step, setStep] = React.useState(1);
  const [selectedProtection, setSelectedProtection] =
    React.useState<Protection | null>(null);
  const [selectedExtras, setSelectedExtras] = React.useState<Extra[]>([]);
  const [paymentDetails, setPaymentDetails] = React.useState<PaymentDetails>({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });
  const [error, setError] = React.useState("");

  const rentalDays = Math.ceil(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  const calculateTotal = () => {
    const basePrice = carPrice * rentalDays;
    const protectionPrice = selectedProtection?.price || 0;
    const extrasTotal = selectedExtras.reduce(
      (sum, extra) => sum + extra.price,
      0
    );
    return basePrice + protectionPrice + extrasTotal;
  };

  const validateCard = () => {
    if (paymentDetails.cardNumber.length !== 16) {
      setError("Card number must be 16 digits");
      return false;
    }

    if (!isValidName(paymentDetails.cardHolder)) {
      setError(
        "Card holder name must be at least 3 letters and contain only letters and spaces"
      );
      return false;
    }

    if (paymentDetails.cvv.length !== 3) {
      setError("CVV must be 3 digits");
      return false;
    }

    if (!isValidExpiryDate(paymentDetails.expiryDate)) {
      setError(
        "Invalid expiry date. Must be MM/YY format and date must be in the future"
      );
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = () => {
    if (!validateCard()) return;

    onComplete({
      protectionPackage: selectedProtection,
      extras: selectedExtras,
      paymentDetails,
      totalPrice: calculateTotal(),
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((number) => (
          <div
            key={number}
            className={`w-20 flex flex-col items-center ${
              step === number ? "text-[#AA4D2B]" : "text-gray-400"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full text-lg flex items-center justify-center mb-2 ${
                step === number
                  ? "bg-[#AA4D2B] text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {number}
            </div>
            <span className="text-base">
              {number === 1
                ? "Protection"
                : number === 2
                ? "Extras"
                : "Payment"}
            </span>
          </div>
        ))}
      </div>

      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-medium text-[#1C1F20]">
            Choose Protection Package
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROTECTION_PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedProtection?.name === pkg.name
                    ? "border-[#AA4D2B] bg-[#ffebe5]"
                    : "border-gray-200 hover:border-[#AA4D2B]"
                }`}
                onClick={() => setSelectedProtection(pkg)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-2xl text-[#1C1F20]">
                    {pkg.name}
                  </h3>
                  <span className="text-[#AA4D2B] text-xl font-medium">
                    {pkg.price > 0 ? formatPrice(pkg.price) : "Free"}
                  </span>
                </div>
                <p className="text-gray-600 text-base">{pkg.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 text-xl text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => setStep(2)}
              disabled={!selectedProtection}
              className="px-6 py-2 bg-[#AA4D2B] text-white rounded-lg text-xl hover:bg-[#943f21] disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-medium text-[#1C1F20]">
            Select Extra Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXTRA_SERVICES.map((service) => (
              <div
                key={service.id}
                className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedExtras.some((e) => e.id === service.id)
                    ? "border-[#AA4D2B] bg-[#ffebe5]"
                    : "border-gray-200 hover:border-[#AA4D2B]"
                }`}
                onClick={() => {
                  setSelectedExtras((prev) =>
                    prev.some((e) => e.id === service.id)
                      ? prev.filter((e) => e.id !== service.id)
                      : [...prev, service]
                  );
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-2xl text-[#1C1F20]">
                    {service.name}
                  </h3>
                  <span className="text-[#AA4D2B] font-medium text-xl">
                    {formatPrice(service.price)}
                  </span>
                </div>
                <p className="text-gray-600 text-base">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-2 text-xl text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2 bg-[#AA4D2B] text-white text-xl rounded-lg hover:bg-[#943f21]"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-3xl font-medium text-[#1C1F20]">
            Payment Details
          </h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-[#1C1F20] font-medium mb-1 text-lg">
                Card Number
              </label>
              <input
                type="text"
                maxLength={16}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA4D2B]"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  setPaymentDetails((prev) => ({
                    ...prev,
                    cardNumber: formatCardNumber(e.target.value),
                  }))
                }
                placeholder="1234567890123456"
              />
            </div>
            <div>
              <label className="block text-[#1C1F20] font-medium mb-1 text-lg">
                Card Holder
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA4D2B]"
                value={paymentDetails.cardHolder}
                onChange={(e) =>
                  setPaymentDetails((prev) => ({
                    ...prev,
                    cardHolder: e.target.value.replace(/[^A-Za-z\s]/g, ""),
                  }))
                }
                placeholder="John Doe"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1C1F20] font-medium mb-1 text-lg">
                  Expiry Date
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA4D2B]"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => {
                    const formatted = formatExpiryDate(e.target.value);
                    if (formatted.length <= 5) {
                      setPaymentDetails((prev) => ({
                        ...prev,
                        expiryDate: formatted,
                      }));
                    }
                  }}
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-[#1C1F20] font-medium mb-1 text-lg">
                  CVV
                </label>
                <input
                  type="text"
                  maxLength={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#AA4D2B]"
                  value={paymentDetails.cvv}
                  onChange={(e) =>
                    setPaymentDetails((prev) => ({
                      ...prev,
                      cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                    }))
                  }
                  placeholder="123"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-[#1C1F20] text-lg">
                <span>Base Price ({rentalDays} days)</span>
                <span>{formatPrice(carPrice * rentalDays)}</span>
              </div>
              {selectedProtection && selectedProtection.price > 0 && (
                <div className="flex justify-between text-[#1C1F20] text-base">
                  <span>Protection Package</span>
                  <span>{formatPrice(selectedProtection.price)}</span>
                </div>
              )}
              {selectedExtras.length > 0 && (
                <div className="space-y-1">
                  {selectedExtras.map((extra) => (
                    <div
                      key={extra.id}
                      className="flex justify-between text-[#1C1F20]"
                    >
                      <span>{extra.name}</span>
                      <span>{formatPrice(extra.price)}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-between text-2xl font-semibold text-[#1C1F20] pt-2 border-t">
                <span>Total</span>
                <span className="text-[#AA4D2B]">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2 text-xl text-gray-600 hover:text-gray-800"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 text-xl bg-[#AA4D2B] text-white rounded-lg hover:bg-[#943f21]"
            >
              Complete Booking
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
