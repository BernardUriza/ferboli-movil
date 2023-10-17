import React from 'react';
import { CheckIcon } from "@heroicons/react/outline";

const CustomCheckbox = ({ checked, onChange }) => {
  return (
    <label className="flex items-center space-x-2 cursor-pointer">
      <div
        className={`w-6 h-6 border rounded-md transition-colors duration-300 ease-in-out border-gray-400 ${checked ? 'bg-blue-500 border-blue-500' : ''}`}
      >
        <input type="checkbox" className="hidden" checked={checked} onChange={onChange} />
        {checked && (
          <CheckIcon color='white'/>
        )}
      </div>
      <span className="text-gray-700">Label</span>
    </label>
  );
};

export default CustomCheckbox;
