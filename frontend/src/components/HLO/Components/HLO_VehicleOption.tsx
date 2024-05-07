import React, { useState } from 'react';

interface Option {
  id: string;
  label: string;
}

const options: Option[] = [
  { id: 'light-duty', label: 'Light-duty (2,700 kg - 6350 kg)' },
  { id: 'medium-duty', label: 'Medium-duty (6,350 kg - 12,000 kg)' },
  { id: 'heavy-duty', label: 'Heavy-duty (12,000+ kg)' }
];
interface HLO_VehicleOptionProps {
  vehicleType: string;
  onOptionSelected: (selectedOptionId: string) => void;
}

const HLO_VehicleOption: React.FC<HLO_VehicleOptionProps> = ({ vehicleType, onOptionSelected }) => {
  const [isChecked, setIsChecked] = useState<string>(vehicleType);

  const handleRadioChange = (value: string) => {
    setIsChecked(value);
    if (onOptionSelected) {
      onOptionSelected(value);
    }
  };

  return (
    <div className="mb-5.5 w-full xl:w-1/2">
      <label
        htmlFor="roleSelect"
        className="mb-4.5 block text-sm font-medium text-black dark:text-white"
      >
        Select your vehicle type
      </label>

      <div className="flex flex-wrap items-center gap-5.5">
        {options.map((option) => (
          <div key={option.id}>
            <label className="relative flex cursor-pointer select-none items-center gap-2 text-sm font-medium text-black dark:text-white">
              <input
                className="sr-only"
                type="radio"
                name="roleSelect"
                id={option.id}
                onChange={() => handleRadioChange(option.id)}
              />
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${isChecked === option.id ? 'border-primary' : 'border-body'
                  }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full bg-primary ${isChecked === option.id ? 'flex' : 'hidden'
                    }`}
                ></span>
              </span>
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HLO_VehicleOption;
