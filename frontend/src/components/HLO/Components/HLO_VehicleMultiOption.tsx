import React, { useState } from 'react';

interface Vehicle {
  id: string;
  name: string;
}

const vehicles: Vehicle[] = [
  { id: 'Hatchback', name: 'Hatchback' },
  { id: 'Sedan', name: 'Sedan' },
  { id: 'Van', name: 'Van' },
  { id: 'Truck', name: 'Truck' },
];

const CheckboxInputGroup: React.FC<{
  id: string;
  isChecked: boolean;
  onChange: () => void
}> = ({ id, isChecked, onChange }) => (
  <div className="flex items-center gap-2"> {/* Updated class: flex-row */}
    <div>
      <label className="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
        <div className="relative">
          <input
            className="sr-only"
            type="checkbox"
            name="roleSelect"
            id={id}
            checked={isChecked}
            onChange={onChange}
          />
          <div className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${isChecked && 'border-primary bg-gray dark:bg-transparent'}`}>
            <span className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'}`} />
          </div>
        </div>
        {id}
      </label>
    </div>
  </div>
);

const HLO_VehicleMultiOption = () => {
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);

  const handleVehicleChange = (id: string) => {
    setSelectedVehicles((prevSelectedVehicles) => {
      if (prevSelectedVehicles.includes(id)) {
        // Deselect the vehicle if it's already selected
        return prevSelectedVehicles.filter((lang) => lang !== id);
      } else {
        // Select the vehicle if it's not selected
        return [...prevSelectedVehicles, id];
      }
    });
  };

  return (
    <div className="w-full xl:w-1/2">
      <label className="mb-4.5 block text-sm font-medium text-black dark:text-white">
        Types of vehicles
      </label>

      <div className="flex flex-wrap flex-col gap-2.5">
        {vehicles.map((vehicle) => (
          <CheckboxInputGroup key={vehicle.id} id={vehicle.id}
            isChecked={selectedVehicles.includes(vehicle.id)}
            onChange={() => handleVehicleChange(vehicle.id)} />
        ))}
      </div>
    </div>
  );
};

export default HLO_VehicleMultiOption;