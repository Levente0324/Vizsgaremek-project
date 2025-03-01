import React from "react";

interface FiltersProps {
  manufacturers: string[];
  types: string[];
  fuelTypes: string[];
  selectedFilters: {
    manufacturer: string;
    type: string;
    fuelType: string;
    seats: string;
    transmission: string;
  };
  onFilterChange: (filterType: string, value: string) => void;
}

const Filters = ({
  manufacturers,
  types,
  fuelTypes,
  selectedFilters,
  onFilterChange,
}: FiltersProps) => {
  return (
    <div className="w-full max-w-[1100px] mb-6 mt-2">
      <div className="bg-white py-4 px-7 rounded-xl shadow">
        <h2 className="text-3xl font-semibold mb-4 text-[#1C1F20]">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Manufacturer
            </label>
            <select
              value={selectedFilters.manufacturer}
              onChange={(e) => onFilterChange("manufacturer", e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-[#1C1F20] hover:cursor-pointer focus:cursor-default"
            >
              <option value="">All Manufacturers</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer} value={manufacturer}>
                  {manufacturer}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Vehicle Type
            </label>
            <select
              value={selectedFilters.type}
              onChange={(e) => onFilterChange("type", e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-[#1C1F20] hover:cursor-pointer focus:cursor-default"
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Fuel Type
            </label>
            <select
              value={selectedFilters.fuelType}
              onChange={(e) => onFilterChange("fuelType", e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-[#1C1F20] hover:cursor-pointer focus:cursor-default"
            >
              <option value="">All Fuel Types</option>
              {fuelTypes.map((fuelType) => (
                <option key={fuelType} value={fuelType}>
                  {fuelType}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Number of Seats
            </label>
            <select
              value={selectedFilters.seats}
              onChange={(e) => onFilterChange("seats", e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-[#1C1F20] hover:cursor-pointer focus:cursor-default"
            >
              <option value="">Any Seats</option>
              {[2, 4, 5, 7].map((seats) => (
                <option key={seats} value={seats}>
                  {seats} seats
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Transmission
            </label>
            <select
              value={selectedFilters.transmission}
              onChange={(e) => onFilterChange("transmission", e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-[#1C1F20] hover:cursor-pointer focus:cursor-default"
            >
              <option value="">Any Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
