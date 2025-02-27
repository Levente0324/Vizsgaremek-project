import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/currency";
import { TRANSITIONS } from "@/utils/styles";

interface CarType {
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
}

const Car = ({ car }: { car: CarType }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/cars/${car.id}`)}
      className={`w-full md:w-[300px] m-4 p-6 shadow-lg bg-white rounded-xl hover:shadow-2xl hover:scale-[1.02] ${TRANSITIONS.DEFAULT} cursor-pointer relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-[#AA4D2B]/5 to-[#AA4D2B]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-[#1C1F20]">
          {car.manufacturer} {car.model}
        </h2>
        <hr className="my-2 border-gray-200" />
        <div className="text-gray-600 space-y-1.5">
          <p className="flex justify-between">
            <span className="text-gray-500">Type:</span>
            <span className="font-medium text-gray-800">{car.type}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Seats:</span>
            <span className="font-medium text-gray-800">
              {car.numberOfSeats}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Suitcases:</span>
            <span className="font-medium text-gray-800">
              {car.numberOfSuitcases}
            </span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Fuel Type:</span>
            <span className="font-medium text-gray-800">{car.fuelType}</span>
          </p>
          <p className="flex justify-between">
            <span className="text-gray-500">Transmission:</span>
            <span className="font-medium text-gray-800">{car.clutchType}</span>
          </p>
          <hr className="my-2 border-gray-200" />
          <p className="flex justify-between mt-4 text-xl text-[#1C1F20]">
            <span>Price per day:</span>
            <span className="font-bold text-[#AA4D2B]">
              {formatPrice(car.priceForOneDay)}
            </span>
          </p>
        </div>

        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              car.isAvailable
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {car.isAvailable ? "Available" : "Not Available"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Car;
