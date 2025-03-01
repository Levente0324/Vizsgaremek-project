import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "../utils/currency";

interface CarProps {
  car: {
    id: number;
    manufacturer: string;
    model: string;
    type: string;
    numberOfSeats: number;
    numberOfSuitcases: number;
    fuelType: string;
    clutchType: string;
    priceForOneDay: number;
    isAvailable: boolean;
  };
}

const Car = ({ car }: CarProps) => {
  return (
    <Link href={`/cars/${car.id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-300 hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:scale-[1.02] w-[300px] mx-2 my-3">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={`/${car.id}.png`}
            alt={`${car.manufacturer} ${car.model}`}
            fill
            style={{ objectFit: "cover" }}
            priority
            className=""
          />
        </div>

        <div className="px-5 flex flex-col flex-grow bg-gradient-to-b from-white to-gray-200">
          <h2 className="text-2xl font-bold text-[#1C1F20] mb-3 truncate">
            {car.manufacturer}{" "}
            <span className="text-[#AA4D2B]">{car.model}</span>
          </h2>

          <div className="text-base text-gray-600">
            <div className="flex justify-between mb-1.5">
              <span>Type:</span>
              <span className="font-medium text-[#1C1F20]">{car.type}</span>
            </div>
            <div className="flex justify-between mb-1.5">
              <span>Seats:</span>
              <span className="font-medium text-[#1C1F20]">
                {car.numberOfSeats}
              </span>
            </div>
            <div className="flex justify-between mb-1.5">
              <span>Transmission:</span>
              <span className="font-medium text-[#1C1F20]">
                {car.clutchType}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Fuel:</span>
              <span className="font-medium text-[#1C1F20]">{car.fuelType}</span>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[#1C1F20]">Per day:</span>
              <span className="font-black text-xl text-[#AA4D2B]">
                {formatPrice(car.priceForOneDay)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Car;
