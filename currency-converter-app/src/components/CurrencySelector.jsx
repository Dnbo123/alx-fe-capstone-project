import React from 'react'

//Setting up currency selector arrow function
const CurrencySelector = ({label, value, onChange, currencies}) => {

  return (
    <div className="flex flex-col">
      <label htmlFor={`currency-${label}`} className="mb-2 font-medium text-gray-700">
        {label}
        </label>

        <select
        id={`currency-${label}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
        </select>
    </div>
  );
};

export default CurrencySelector