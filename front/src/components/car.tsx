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
  return (
    <div className="m-4 p-6 w-[300px] bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-gray-800">
          {car.manufacturer} {car.model}
        </h2>
        <div className="text-gray-600">
          <p className="flex justify-between">
            <span>Type:</span>
            <span className="font-medium">{car.type}</span>
          </p>
          <p className="flex justify-between">
            <span>Seats:</span>
            <span className="font-medium">{car.numberOfSeats}</span>
          </p>
          <p className="flex justify-between">
            <span>Suitcases:</span>
            <span className="font-medium">{car.numberOfSuitcases}</span>
          </p>
          <p className="flex justify-between">
            <span>Fuel Type:</span>
            <span className="font-medium">{car.fuelType}</span>
          </p>
          <p className="flex justify-between">
            <span>Transmission:</span>
            <span className="font-medium">{car.clutchType}</span>
          </p>
          <p className="flex justify-between mt-4 text-lg">
            <span>Price per day:</span>
            <span className="font-bold text-blue-600">
              {car.priceForOneDay} Ft
            </span>
          </p>
        </div>
        <div className="mt-4">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
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
