import React from 'react';

const Dropdown = ({ label, options, value, onChange }) => {
  console.debug('Dropdown rendered for', label);
  return (
    <label className="block mb-2">
      <span className="sr-only">{label}</span>
      <select
        className="border rounded p-1 w-full dark:bg-gray-700"
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
