import React, { useState } from 'react';
import { CheckIcon } from "@heroicons/react/outline";

const CustomCheckbox = ({ checked, onChange, label }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleCheckboxChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState); // Pass the new checked state to the parent component.
  };

  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div
        className={`w-6 h-6 border rounded-md transition-colors duration-300 ease-in-out border-gray-400 ${isChecked ? 'bg-blue-500 border-blue-500' : ''}`}
        onClick={handleCheckboxChange}
      >
        {isChecked && (
          <CheckIcon color='white' />
        )}
      </div>
      {label && <span className="text-gray-700">{label}</span>}
    </label>
  );
};

export default CustomCheckbox;
